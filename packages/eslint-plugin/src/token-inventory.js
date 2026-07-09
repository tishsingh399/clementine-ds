import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** @typedef {import('../../tokens/dist/tokens').ComponentTokenPath} ComponentTokenPath */
/** @typedef {import('../../tokens/dist/tokens').ComponentTokenNamespace} ComponentTokenNamespace */

const TOKEN_PATH = /\b([a-z][a-z0-9-]*(?:\.[a-z0-9-]+)+)\b/g;
const CSS_VAR_PREFIX = '--cds-';

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

function tokenToCssVariable(path) {
  return `--cds-${path.replaceAll('.', '-')}`;
}

function readComponentTokens(root) {
  const file = resolve(root, 'packages/tokens/src/components.generated.json');
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function loadComponentTokenPaths(options = {}) {
  const root = options.root ?? process.cwd();
  const components = readComponentTokens(root);

  return Object.entries(components)
    .flatMap(([component, tree]) => leaves(tree).map((path) => `${component}.${path}`))
    .sort();
}

export function createComponentTokenIndex(options = {}) {
  /** @type {ComponentTokenPath[]} */
  const paths = loadComponentTokenPaths(options);
  /** @type {ComponentTokenNamespace[]} */
  const namespaces = unique(paths.map((path) => path.split('.')[0])).sort(
    (a, b) => b.length - a.length,
  );

  return {
    paths: new Set(paths),
    cssVariables: new Set(paths.map(tokenToCssVariable)),
    namespaces: new Set(namespaces),
    namespacePrefixes: namespaces.map((namespace) => ({
      namespace,
      prefix: `--cds-${namespace}-`,
    })),
  };
}

function namespaceForCssVariable(value, index) {
  const hit = index.namespacePrefixes.find(({ prefix }) => value.startsWith(prefix));
  return hit?.namespace;
}

function isCssVariableChar(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || char === '-';
}

function componentCssVariables(text) {
  const values = [];
  let index = 0;

  while (index < text.length) {
    const start = text.indexOf(CSS_VAR_PREFIX, index);
    if (start === -1) break;

    let end = start + CSS_VAR_PREFIX.length;
    while (end < text.length && isCssVariableChar(text[end])) end += 1;

    if (end > start + CSS_VAR_PREFIX.length) values.push(text.slice(start, end));
    index = Math.max(end, start + CSS_VAR_PREFIX.length);
  }

  return values;
}

export function findComponentTokenViolations(text, index) {
  const findings = [];

  for (const match of text.matchAll(TOKEN_PATH)) {
    const value = match[1];
    const namespace = value.split('.')[0];
    if (!index.namespaces.has(namespace)) continue;
    if (!index.paths.has(value)) findings.push({ kind: 'token-path', value, namespace });
  }

  for (const value of componentCssVariables(text)) {
    const namespace = namespaceForCssVariable(value, index);
    if (!namespace) continue;
    if (!index.cssVariables.has(value)) findings.push({ kind: 'css-var', value, namespace });
  }

  return unique(findings.map((finding) => JSON.stringify(finding))).map((finding) =>
    JSON.parse(finding),
  );
}
