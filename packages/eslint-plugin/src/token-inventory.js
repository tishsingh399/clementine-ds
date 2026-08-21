import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** @typedef {import('../../tokens/dist/tokens').ComponentTokenPath} ComponentTokenPath */
/** @typedef {import('../../tokens/dist/tokens').ComponentTokenNamespace} ComponentTokenNamespace */

const TOKEN_PATH = /\b([a-z][a-z0-9-]*(?:\.[a-z0-9-]+)+)\b/g;
const CDS_PREFIX = '--cds-';
const TDS_PREFIX = '--tds-';

// A dotted path whose last segment is one of these is a filename, not a token.
// `motion.json` and `color.css` sit in real token namespaces but are not tokens.
const FILE_EXTENSIONS = new Set([
  'json', 'css', 'js', 'mjs', 'cjs', 'ts', 'tsx', 'jsx', 'md', 'mdx',
  'html', 'svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'woff', 'woff2', 'yml', 'yaml',
]);

function leaves(node, prefix = []) {
  const out = [];
  for (const [key, value] of Object.entries(node ?? {})) {
    if (value && typeof value === 'object' && '$value' in value) {
      out.push(prefix.concat(key).join('.'));
    } else if (value && typeof value === 'object') {
      out.push(...leaves(value, prefix.concat(key)));
    }
  }
  return out;
}

function unique(values) {
  return [...new Set(values)];
}

function tokenToCssVariable(path, prefix = CDS_PREFIX) {
  return `${prefix}${path.replaceAll('.', '-')}`;
}

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(resolve(root, relativePath), 'utf8'));
}

function readComponentTokens(root) {
  return readJson(root, 'packages/tokens/src/components.generated.json');
}

export function loadComponentTokenPaths(options = {}) {
  const root = options.root ?? process.cwd();
  const components = readComponentTokens(root);

  return Object.entries(components)
    .flatMap(([component, tree]) => leaves(tree).map((path) => `${component}.${path}`))
    .sort();
}

export function loadSemanticTokenPaths(options = {}) {
  const root = options.root ?? process.cwd();
  return unique([
    ...leaves(readJson(root, 'packages/tokens/src/semantic-light.json')),
    ...leaves(readJson(root, 'packages/tokens/src/semantic-dark.json')),
  ]).sort();
}

export function loadPrimitiveTokenPaths(options = {}) {
  const root = options.root ?? process.cwd();
  return leaves(readJson(root, 'packages/tokens/src/primitives.json')).sort();
}

/**
 * The full three-tier inventory.
 *
 * `paths` covers every tier, so an invented path in *any* token namespace is a
 * violation — not just one inside a component namespace.
 *
 * `cssVariables` mirrors what `cssVariablesResolver` in
 * `packages/ui/src/theme/clementine-theme.ts` actually emits at runtime:
 * semantic tokens flattened two levels deep under both `--cds-` and `--tds-`,
 * and component tokens flattened at full depth under `--cds-`. Primitives are
 * consumed as JS imports and never become CSS variables, so `var(--cds-color-blue-6)`
 * resolves to nothing in the browser and is correctly reported here.
 */
export function createComponentTokenIndex(options = {}) {
  /** @type {ComponentTokenPath[]} */
  const componentPaths = loadComponentTokenPaths(options);
  const semanticPaths = loadSemanticTokenPaths(options);
  const primitivePaths = loadPrimitiveTokenPaths(options);

  /** @type {ComponentTokenNamespace[]} */
  const componentNamespaces = unique(componentPaths.map((path) => path.split('.')[0])).sort();
  const semanticNamespaces = unique(semanticPaths.map((path) => path.split('.')[0])).sort();
  const primitiveNamespaces = unique(primitivePaths.map((path) => path.split('.')[0])).sort();

  const tierByNamespace = new Map();
  for (const namespace of primitiveNamespaces) tierByNamespace.set(namespace, 'primitive');
  for (const namespace of semanticNamespaces) tierByNamespace.set(namespace, 'semantic');
  for (const namespace of componentNamespaces) tierByNamespace.set(namespace, 'component');

  // Semantic vars are emitted only two levels deep (`group-key`), under both prefixes.
  const semanticCssVariables = semanticPaths.filter((path) => path.split('.').length === 2);

  return {
    paths: new Set([...componentPaths, ...semanticPaths, ...primitivePaths]),
    componentPaths: new Set(componentPaths),
    semanticPaths: new Set(semanticPaths),
    primitivePaths: new Set(primitivePaths),
    cssVariables: new Set([
      ...componentPaths.map((path) => tokenToCssVariable(path)),
      ...semanticCssVariables.map((path) => tokenToCssVariable(path)),
    ]),
    tdsVariables: new Set(
      semanticCssVariables.map((path) => tokenToCssVariable(path, TDS_PREFIX)),
    ),
    namespaces: new Set(componentNamespaces),
    tokenNamespaces: new Set(tierByNamespace.keys()),
    tierByNamespace,
  };
}

function isCssVariableChar(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || char === '-';
}

function cssVariablesWithPrefix(text, prefix) {
  const values = [];
  let index = 0;

  while (index < text.length) {
    const start = text.indexOf(prefix, index);
    if (start === -1) break;

    let end = start + prefix.length;
    while (end < text.length && isCssVariableChar(text[end])) end += 1;

    if (end > start + prefix.length) values.push(text.slice(start, end));
    index = Math.max(end, start + prefix.length);
  }

  return values;
}

/**
 * A template literal like `var(--cds-alert-bg-${intent})` reaches the rule as the
 * fragment `--cds-alert-bg-`. Treat a trailing dash as a prefix and accept it when
 * the contract emits anything underneath it — so a real dynamic name passes, while
 * a typo'd one (`--cds-alrt-bg-`) still fails.
 */
function isKnownVariablePrefix(value, known) {
  if (!value.endsWith('-')) return false;
  for (const variable of known) if (variable.startsWith(value)) return true;
  return false;
}

function namespaceForCssVariable(value, index) {
  const body = value.slice(value.startsWith(TDS_PREFIX) ? TDS_PREFIX.length : CDS_PREFIX.length);
  // Longest namespace wins: `text-input` must beat `text`.
  let match;
  for (const namespace of index.tokenNamespaces) {
    if (body === namespace || body.startsWith(`${namespace}-`)) {
      if (!match || namespace.length > match.length) match = namespace;
    }
  }
  return match;
}

export function findComponentTokenViolations(text, index) {
  const findings = [];

  for (const match of text.matchAll(TOKEN_PATH)) {
    const value = match[1];
    const segments = value.split('.');
    const namespace = segments[0];
    if (!index.tokenNamespaces.has(namespace)) continue;
    if (FILE_EXTENSIONS.has(segments[segments.length - 1])) continue;
    if (index.paths.has(value)) continue;
    findings.push({
      kind: 'token-path',
      value,
      namespace,
      tier: index.tierByNamespace.get(namespace),
    });
  }

  for (const value of cssVariablesWithPrefix(text, CDS_PREFIX)) {
    if (index.cssVariables.has(value)) continue;
    if (isKnownVariablePrefix(value, index.cssVariables)) continue;
    findings.push({
      kind: 'css-var',
      value,
      namespace: namespaceForCssVariable(value, index) ?? 'clementine',
      tier: index.tierByNamespace.get(namespaceForCssVariable(value, index)) ?? 'unknown',
    });
  }

  for (const value of cssVariablesWithPrefix(text, TDS_PREFIX)) {
    if (index.tdsVariables.has(value)) continue;
    if (isKnownVariablePrefix(value, index.tdsVariables)) continue;
    findings.push({
      kind: 'css-var',
      value,
      namespace: namespaceForCssVariable(value, index) ?? 'clementine',
      tier: index.tierByNamespace.get(namespaceForCssVariable(value, index)) ?? 'unknown',
    });
  }

  return unique(findings.map((finding) => JSON.stringify(finding))).map((finding) =>
    JSON.parse(finding),
  );
}
