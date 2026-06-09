// Build a single multi-stage eval that creates 3 collections with proper aliasing
// Stage 1: primitives — literal hex/dimension values
// Stage 2: semantic — references to primitives (Light + Dark modes)
// Stage 3: components — references to semantics
//
// We POST one big script directly to the daemon /exec endpoint.

import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const TOKEN = readFileSync(join(homedir(), '.figma-ds-cli', '.daemon-token'), 'utf8').trim();
const PORT = 3456;

const prims      = JSON.parse(readFileSync('/Users/tinasingh/Desktop/clementine-ds/packages/tokens/src/primitives.json', 'utf8'));
const semLight   = JSON.parse(readFileSync('/Users/tinasingh/Desktop/clementine-ds/packages/tokens/src/semantic-light.json', 'utf8'));
const semDark    = JSON.parse(readFileSync('/Users/tinasingh/Desktop/clementine-ds/packages/tokens/src/semantic-dark.json', 'utf8'));

// Component files are per-component; merge into one
import { readdirSync } from 'node:fs';
const componentDir = '/Users/tinasingh/Desktop/clementine-ds/packages/tokens/src/components';
const components = {};
for (const f of readdirSync(componentDir)) {
  if (!f.endsWith('.json')) continue;
  const data = JSON.parse(readFileSync(join(componentDir, f), 'utf8'));
  Object.assign(components, data);
}

// Flatten DTCG-style tree to { 'a/b/c': { value, type } }
function flatten(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const name = prefix ? prefix + '/' + k : k;
    if (v && typeof v === 'object') {
      if ('$value' in v) {
        out[name] = { value: v.$value, type: (v.$type || 'string').toLowerCase() };
      } else {
        Object.assign(out, flatten(v, name));
      }
    }
  }
  return out;
}

const flatPrims    = flatten(prims);
const flatSemLight = flatten(semLight);
const flatSemDark  = flatten(semDark);
const flatComps    = flatten(components);

const payload = { flatPrims, flatSemLight, flatSemDark, flatComps };

// Script runs INSIDE the Figma plugin context — has `figma` global.
const script = `(async () => {
  const data = ${JSON.stringify(payload)};

  function hexToRgba(s) {
    if (!s || s[0] !== '#') return null;
    const hex = s.slice(1);
    const n = hex.length === 3
      ? hex.split('').map(c => parseInt(c + c, 16))
      : [0,2,4].map(i => parseInt(hex.slice(i, i+2), 16));
    return { r: n[0]/255, g: n[1]/255, b: n[2]/255, a: 1 };
  }
  function rgbaStr(s) {
    const m = /^rgba?\\(([\\d.]+)[,\\s]+([\\d.]+)[,\\s]+([\\d.]+)(?:[,\\s]+([\\d.]+))?\\)$/.exec(s);
    if (!m) return null;
    return { r: +m[1]/255, g: +m[2]/255, b: +m[3]/255, a: m[4] != null ? +m[4] : 1 };
  }
  function parseDim(s) {
    if (typeof s === 'number') return s;
    const m = /^([\\d.]+)px$/.exec(String(s));
    return m ? +m[1] : null;
  }
  function refToPath(s) {
    if (typeof s !== 'string') return null;
    const m = /^\\{(.+)\\}$/.exec(s);
    return m ? m[1].replace(/\\./g, '/') : null;
  }

  const log = [];

  // ── Clean slate: delete any existing Clementine collections ────────────
  const existing = await figma.variables.getLocalVariableCollectionsAsync();
  for (const c of existing) {
    if (c.name.startsWith('Clementine')) {
      try { c.remove(); } catch {}
    }
  }

  // ── STAGE 1: Primitives (literal values, 1 mode) ───────────────────────
  const primCol = figma.variables.createVariableCollection('Clementine · Primitives');
  primCol.renameMode(primCol.modes[0].modeId, 'Value');
  const primMode = primCol.modes[0].modeId;
  const primVarByPath = {};

  let primCount = 0;
  for (const [path, { value, type }] of Object.entries(data.flatPrims)) {
    let figmaType = null;
    let figmaValue = null;
    if (typeof value === 'string' && value[0] === '#') {
      figmaType = 'COLOR';
      figmaValue = hexToRgba(value);
    } else if (typeof value === 'string' && /^[\\d.]+px$/.test(value)) {
      figmaType = 'FLOAT';
      figmaValue = parseDim(value);
    } else if (typeof value === 'number') {
      figmaType = 'FLOAT';
      figmaValue = value;
    } else if (typeof value === 'string') {
      figmaType = 'STRING';
      figmaValue = value;
    }
    if (figmaType == null || figmaValue == null) continue;
    try {
      const v = figma.variables.createVariable(path, primCol, figmaType);
      v.setValueForMode(primMode, figmaValue);
      primVarByPath[path] = v;
      primCount++;
    } catch (e) {
      log.push('prim-skip ' + path + ' (' + figmaType + ', val=' + JSON.stringify(value) + '): ' + e.message);
    }
  }
  log.push('Primitives: ' + primCount);

  // ── STAGE 2: Semantic (2 modes: Light, Dark — references primitives) ───
  const semCol = figma.variables.createVariableCollection('Clementine · Semantic');
  semCol.renameMode(semCol.modes[0].modeId, 'Light');
  const lightMode = semCol.modes[0].modeId;
  const darkMode = semCol.addMode('Dark');
  const semVarByPath = {};

  function inferType(v, fallback) {
    if (v == null) return fallback;
    if (typeof v === 'number') return 'FLOAT';
    if (typeof v === 'string') {
      if (v[0] === '#') return 'COLOR';
      if (/^rgba?\\(/.test(v)) return 'COLOR';
      if (/^[\\d.]+px$/.test(v)) return 'FLOAT';
      const ref = refToPath(v);
      if (ref) {
        if (primVarByPath[ref]) return primVarByPath[ref].resolvedType;
      }
      return 'STRING';
    }
    return fallback;
  }

  const semKeys = new Set([...Object.keys(data.flatSemLight), ...Object.keys(data.flatSemDark)]);
  let semCount = 0;
  for (const key of semKeys) {
    const lightVal = data.flatSemLight[key]?.value;
    const darkVal = data.flatSemDark[key]?.value ?? lightVal;
    // Follow references through primitives if needed
    let figmaType = inferType(lightVal, null);
    if (figmaType === 'STRING' || figmaType == null) {
      figmaType = inferType(darkVal, 'STRING');
    }

    let v;
    try {
      v = figma.variables.createVariable(key, semCol, figmaType);
      semVarByPath[key] = v;
    } catch (e) {
      log.push('semCreate-skip ' + key + ' (' + figmaType + '): ' + e.message);
      continue;
    }

    function setMode(modeId, val) {
      if (val == null) return;
      try {
        // Reference?
        const refPath = refToPath(val);
        if (refPath && primVarByPath[refPath]) {
          v.setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: primVarByPath[refPath].id });
          return;
        }
        // Literal
        if (figmaType === 'COLOR') {
          if (typeof val === 'string' && val[0] === '#') v.setValueForMode(modeId, hexToRgba(val));
          else if (typeof val === 'string' && /^rgba?\\(/.test(val)) v.setValueForMode(modeId, rgbaStr(val));
        } else if (figmaType === 'FLOAT') {
          v.setValueForMode(modeId, typeof val === 'number' ? val : parseDim(val));
        } else {
          v.setValueForMode(modeId, String(val));
        }
      } catch (e) {
        log.push('semantic-skip ' + key + ' (' + figmaType + ', val=' + JSON.stringify(val) + '): ' + e.message);
      }
    }
    setMode(lightMode, lightVal);
    setMode(darkMode, darkVal);
    semCount++;
  }
  log.push('Semantic: ' + semCount);

  // ── STAGE 3: Components (references semantics, 1 mode) ─────────────────
  const compCol = figma.variables.createVariableCollection('Clementine · Components');
  compCol.renameMode(compCol.modes[0].modeId, 'Value');
  const compMode = compCol.modes[0].modeId;
  let compCount = 0;
  for (const [key, { value }] of Object.entries(data.flatComps)) {
    let figmaType = 'COLOR';
    const refPath = refToPath(value);
    // Determine type from the resolved chain
    if (refPath && semVarByPath[refPath]) {
      figmaType = semVarByPath[refPath].resolvedType;
    } else if (refPath && primVarByPath[refPath]) {
      figmaType = primVarByPath[refPath].resolvedType;
    } else if (typeof value === 'string' && value[0] === '#') {
      figmaType = 'COLOR';
    } else if (typeof value === 'string' && /^[\\d.]+px$/.test(value)) {
      figmaType = 'FLOAT';
    }

    try {
      const v = figma.variables.createVariable(key, compCol, figmaType);
      if (refPath && semVarByPath[refPath]) {
        v.setValueForMode(compMode, { type: 'VARIABLE_ALIAS', id: semVarByPath[refPath].id });
      } else if (refPath && primVarByPath[refPath]) {
        v.setValueForMode(compMode, { type: 'VARIABLE_ALIAS', id: primVarByPath[refPath].id });
      } else if (figmaType === 'COLOR' && typeof value === 'string') {
        v.setValueForMode(compMode, hexToRgba(value) ?? rgbaStr(value));
      } else if (figmaType === 'FLOAT') {
        v.setValueForMode(compMode, typeof value === 'number' ? value : parseDim(value));
      } else {
        v.setValueForMode(compMode, String(value));
      }
      compCount++;
    } catch (e) {
      log.push('comp-skip ' + key + ' (' + figmaType + ', val=' + JSON.stringify(value) + '): ' + e.message);
    }
  }
  log.push('Components: ' + compCount);

  return log.join(' | ');
})()`;

// Send to daemon
const res = await fetch(`http://127.0.0.1:${PORT}/exec`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Daemon-Token': TOKEN },
  body: JSON.stringify({ action: 'eval', code: script }),
});
const body = await res.text();
console.log(body);
