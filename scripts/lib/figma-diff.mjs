// Pure comparison logic for scripts/figma-parity.mjs. No network, so it can be
// tested against fixture responses shaped like the Figma REST API.

const hex2 = (n) => Math.round(n * 255).toString(16).padStart(2, '0');

export function figmaColorToHex({ r, g, b, a = 1 }) {
  return `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(a) : ''}`;
}

function expandHex(hex) {
  const h = hex.slice(1).toLowerCase();
  const full = h.length <= 4 ? [...h].map((c) => c + c).join('') : h;
  return full.length === 8 && full.endsWith('ff') ? `#${full.slice(0, 6)}` : `#${full}`;
}

/** Turn a resolved token value into something comparable with Figma, or null to skip. */
export function normalizeExpected(value) {
  if (typeof value !== 'string') return null;
  if (/^#[0-9a-f]{3,8}$/i.test(value)) return { type: 'color', value: expandHex(value) };
  const rgba = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)$/i.exec(value);
  if (rgba) {
    const [r, g, b] = rgba.slice(1, 4).map((n) => Number(n) / 255);
    return { type: 'color', value: figmaColorToHex({ r, g, b, a: rgba[4] == null ? 1 : Number(rgba[4]) }) };
  }
  const num = /^(-?[\d.]+)(px)?$/.exec(value);
  if (num) return { type: 'number', value: Number(num[1]) };
  return null; // shadows, rem, etc. are not Figma variables
}

/** Follow aliases (across collections) to a raw value in each collection's default mode. */
export function resolveLiveValue(variable, variables, collections, seen = new Set()) {
  if (!variable || seen.has(variable.id)) return undefined;
  seen.add(variable.id);
  const mode = collections[variable.variableCollectionId]?.defaultModeId;
  const raw = variable.valuesByMode?.[mode] ?? Object.values(variable.valuesByMode ?? {})[0];
  if (raw && raw.type === 'VARIABLE_ALIAS') return resolveLiveValue(variables[raw.id], variables, collections, seen);
  return raw;
}

function normalizeLive(raw) {
  if (raw && typeof raw === 'object' && 'r' in raw) return { type: 'color', value: figmaColorToHex(raw) };
  if (typeof raw === 'number') return { type: 'number', value: Math.round(raw * 1000) / 1000 };
  return { type: typeof raw, value: raw };
}

/**
 * Diff expected component variables against a /v1/files/:key/variables/local response.
 * Returns null when the collection is missing.
 */
export function diffVariables(expected, live, collectionName) {
  const variables = live.meta?.variables ?? {};
  const collections = live.meta?.variableCollections ?? {};
  const collection = Object.values(collections).find((c) => c.name === collectionName);
  if (!collection) return null;

  const liveByName = new Map(
    Object.values(variables)
      .filter((v) => v.variableCollectionId === collection.id)
      .map((v) => [v.name, v]),
  );
  const expectedNames = new Set(expected.map((e) => e.name));
  const result = { missing: [], extra: [], mismatched: [], skipped: [] };

  for (const e of expected) {
    const v = liveByName.get(e.name);
    if (!v) { result.missing.push(e.name); continue; }
    const want = normalizeExpected(e.value);
    if (!want) { result.skipped.push(e.name); continue; }
    const got = normalizeLive(resolveLiveValue(v, variables, collections));
    if (got.type !== want.type || got.value !== want.value) {
      result.mismatched.push({ name: e.name, expected: want.value, figma: got.value });
    }
  }
  for (const name of liveByName.keys()) if (!expectedNames.has(name)) result.extra.push(name);
  return result;
}

/** Pull { component, fileKey, nodeId, source } out of figma.connect(...) calls. */
export function parseCodeConnect(source, file) {
  const links = [];
  const re = /figma\.connect\(\s*([A-Za-z0-9_.]+)\s*,\s*['"`]https:\/\/www\.figma\.com\/(?:design|file)\/([A-Za-z0-9]+)\/[^'"`]*?node-id=([0-9]+[-:][0-9]+)/g;
  for (const m of source.matchAll(re)) {
    links.push({ component: m[1], fileKey: m[2], nodeId: m[3].replace('-', ':'), source: file });
  }
  return links;
}

/** Check links against a /v1/files/:key/nodes response: node must exist and be a component. */
export function checkCodeConnect(links, nodesResponse) {
  const broken = [];
  for (const link of links) {
    const type = nodesResponse.nodes?.[link.nodeId]?.document?.type;
    if (!type) broken.push({ ...link, problem: 'node not found in Figma' });
    else if (type !== 'COMPONENT' && type !== 'COMPONENT_SET') {
      broken.push({ ...link, problem: `node is a ${type}, not a component` });
    }
  }
  return broken;
}
