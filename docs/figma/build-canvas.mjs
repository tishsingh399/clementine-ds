// Build the Clementine DS canvas in one composed eval.
// Sections: Hero · Tier 1 swatches · Tier 2 swatches (Light + Dark) ·
// Tier 3 swatches (grouped per component) · 10 Component examples.

import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const TOKEN = readFileSync(join(homedir(), '.figma-ds-cli', '.daemon-token'), 'utf8').trim();
const PORT = 3456;

const script = `(async () => {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const primCol = cols.find(c => c.name === 'Clementine · Primitives');
  const semCol  = cols.find(c => c.name === 'Clementine · Semantic');
  const compCol = cols.find(c => c.name === 'Clementine · Components');
  if (!primCol || !semCol || !compCol) return 'Missing collections';

  const allVars = await figma.variables.getLocalVariablesAsync();
  const byColAndName = {};
  for (const v of allVars) {
    byColAndName[v.variableCollectionId + '|' + v.name] = v;
  }
  const prim = n => byColAndName[primCol.id + '|' + n];
  const sem  = n => byColAndName[semCol.id + '|' + n];
  const comp = n => byColAndName[compCol.id + '|' + n];

  const semLight = semCol.modes[0].modeId;
  const semDark  = semCol.modes[1].modeId;

  function fillSolid(hex) {
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } };
    const h = m[1];
    return { type: 'SOLID', color: {
      r: parseInt(h.slice(0,2),16)/255,
      g: parseInt(h.slice(2,4),16)/255,
      b: parseInt(h.slice(4,6),16)/255,
    } };
  }

  function fillBoundVar(v) {
    const paint = { type: 'SOLID', color: { r: 1, g: 1, b: 1 } };
    return figma.variables.setBoundVariableForPaint(paint, 'color', v);
  }

  function makeText(name, content, opts = {}) {
    const t = figma.createText();
    t.name = name;
    t.fontName = { family: 'Inter', style: opts.weight || 'Regular' };
    t.fontSize = opts.size || 14;
    t.characters = content;
    if (opts.color) {
      if (opts.color.id) {
        // bound var
        t.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', opts.color)];
      } else {
        t.fills = [fillSolid(opts.color)];
      }
    } else {
      t.fills = [fillSolid('#1a1a18')];
    }
    if (opts.letterSpacing) t.letterSpacing = { unit: 'PERCENT', value: opts.letterSpacing };
    return t;
  }

  function makeFrame(name, opts = {}) {
    const f = figma.createFrame();
    f.name = name;
    f.fills = opts.fill ? (opts.fill.id ? [fillBoundVar(opts.fill)] : [fillSolid(opts.fill)]) : [];
    f.cornerRadius = opts.radius ?? 0;
    if (opts.width != null) f.resize(opts.width, f.height);
    if (opts.height != null) f.resize(f.width, opts.height);
    if (opts.layout) {
      f.layoutMode = opts.layout;
      f.primaryAxisSizingMode = opts.primaryAxisSizing || 'AUTO';
      f.counterAxisSizingMode = opts.counterAxisSizing || 'AUTO';
      if (opts.padding != null) {
        f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = opts.padding;
      }
      if (opts.paddingX != null) { f.paddingLeft = f.paddingRight = opts.paddingX; }
      if (opts.paddingY != null) { f.paddingTop = f.paddingBottom = opts.paddingY; }
      if (opts.gap != null) f.itemSpacing = opts.gap;
      if (opts.align) f.counterAxisAlignItems = opts.align;
      if (opts.justify) f.primaryAxisAlignItems = opts.justify;
    }
    if (opts.stroke) {
      f.strokes = [opts.stroke.id ? fillBoundVar(opts.stroke) : fillSolid(opts.stroke)];
      f.strokeWeight = opts.strokeWeight ?? 1;
    }
    return f;
  }

  // ── ROOT BOARD ──────────────────────────────────────────────────────────
  const root = makeFrame('Clementine DS · Overview', {
    layout: 'VERTICAL',
    padding: 64,
    gap: 48,
    fill: '#fafaf8',
  });
  root.primaryAxisSizingMode = 'AUTO';
  root.counterAxisSizingMode = 'FIXED';
  root.resize(1600, root.height);
  root.x = 0; root.y = 0;

  // HERO HEADER
  const hero = makeFrame('Hero', { layout: 'VERTICAL', gap: 16 });
  hero.appendChild(makeText('brand', 'CLEMENTINE · DS', { weight: 'Medium', size: 13, color: '#52524e', letterSpacing: 8 }));
  hero.appendChild(makeText('hed', 'A design system that an AI agent can read', { weight: 'Semi Bold', size: 56 }));
  hero.appendChild(makeText('deck', 'Three-tier tokens (primitive → semantic → component). Closed contracts per component spec. Built so Claude, Cursor, and MCP servers stop hallucinating tokens on the first prompt.', { size: 18, color: '#52524e' }));
  root.appendChild(hero);

  // ── TIER 1: PRIMITIVES ──────────────────────────────────────────────────
  const tier1 = makeFrame('Tier 1 · Primitives', { layout: 'VERTICAL', gap: 16 });
  tier1.appendChild(makeText('label1', 'TIER 1 · PRIMITIVES', { weight: 'Medium', size: 12, color: '#a3a39e', letterSpacing: 8 }));
  tier1.appendChild(makeText('caption1', 'Raw scales. No intent. Reference nothing.', { size: 14, color: '#52524e' }));

  const families = ['blue', 'red', 'gray', 'green', 'orange'];
  for (const fam of families) {
    const row = makeFrame(fam, { layout: 'HORIZONTAL', gap: 8, align: 'CENTER' });
    const label = makeText('famLabel', 'color.' + fam, { weight: 'Medium', size: 12, color: '#52524e' });
    label.layoutSizingHorizontal = 'FIXED';
    label.resize(120, label.height);
    row.appendChild(label);
    for (let i = 0; i <= 9; i++) {
      const v = prim('color/' + fam + '/' + i);
      if (!v) continue;
      const swatch = makeFrame(fam + '/' + i, { fill: v, radius: 6 });
      swatch.resize(64, 64);
      row.appendChild(swatch);
    }
    tier1.appendChild(row);
  }
  root.appendChild(tier1);

  // ── TIER 2: SEMANTIC (LIGHT + DARK) ─────────────────────────────────────
  const tier2 = makeFrame('Tier 2 · Semantic', { layout: 'VERTICAL', gap: 16 });
  tier2.appendChild(makeText('label2', 'TIER 2 · SEMANTIC', { weight: 'Medium', size: 12, color: '#a3a39e', letterSpacing: 8 }));
  tier2.appendChild(makeText('caption2', 'Intent. References primitives. Same names, two modes.', { size: 14, color: '#52524e' }));

  const semGroups = {
    action: ['action/primary','action/primary-hover','action/primary-active','action/destructive','action/destructive-hover'],
    surface: ['surface/default','surface/elevated','surface/subtle'],
    text: ['text/primary','text/secondary','text/tertiary','text/on-action','text/link'],
    border: ['border/default','border/strong','border/focus'],
    focus: ['focus/ring'],
    feedback: ['feedback/error','feedback/error-subtle','feedback/success','feedback/success-subtle','feedback/warning','feedback/warning-subtle'],
    risk: ['risk/critical','risk/critical-subtle','risk/high','risk/high-subtle','risk/medium','risk/medium-subtle','risk/low','risk/low-subtle'],
  };

  for (const [groupName, names] of Object.entries(semGroups)) {
    const groupRow = makeFrame(groupName, { layout: 'VERTICAL', gap: 8 });
    groupRow.appendChild(makeText('gname', groupName, { weight: 'Medium', size: 12, color: '#52524e' }));
    const tokenRow = makeFrame(groupName + ' tokens', { layout: 'HORIZONTAL', gap: 12 });
    for (const n of names) {
      const v = sem(n);
      if (!v) continue;
      const card = makeFrame(n, { layout: 'VERTICAL', gap: 6, padding: 0 });
      const sw = makeFrame(n + ' sw', { fill: v, radius: 6 });
      sw.resize(72, 56);
      card.appendChild(sw);
      const lbl = makeText('n', n.replace('/', '.'), { size: 10, color: '#52524e' });
      lbl.layoutSizingHorizontal = 'FIXED';
      lbl.resize(72, lbl.height);
      card.appendChild(lbl);
      tokenRow.appendChild(card);
    }
    groupRow.appendChild(tokenRow);
    tier2.appendChild(groupRow);
  }
  root.appendChild(tier2);

  // ── TIER 3: COMPONENTS ──────────────────────────────────────────────────
  const tier3 = makeFrame('Tier 3 · Components', { layout: 'VERTICAL', gap: 16 });
  tier3.appendChild(makeText('label3', 'TIER 3 · COMPONENT TOKENS', { weight: 'Medium', size: 12, color: '#a3a39e', letterSpacing: 8 }));
  tier3.appendChild(makeText('caption3', 'Per-component bindings. Reference semantic. Never primitives.', { size: 14, color: '#52524e' }));

  // List components and their bg tokens as swatches
  const compShowcase = [
    { name: 'button', tokens: ['button/bg/default','button/bg/hover','button/bg/active','button/bg-destructive/default','button/bg-outline/default','button/border/focus'] },
    { name: 'badge',  tokens: ['badge/bg/neutral','badge/bg/success','badge/bg/error','badge/bg/warning','badge/bg/risk-critical','badge/bg/risk-high','badge/bg/risk-medium','badge/bg/risk-low'] },
    { name: 'checkbox', tokens: ['checkbox/bg/unchecked','checkbox/bg/checked','checkbox/border/default','checkbox/border/focus','checkbox/border/error'] },
    { name: 'modal',  tokens: ['modal/bg','modal/overlay','modal/border/divider'] },
    { name: 'radio',  tokens: ['radio/bg/unchecked','radio/dot/checked','radio/border/default','radio/border/focus'] },
    { name: 'select', tokens: ['select/bg/trigger','select/bg/popover','select/option/bg-selected','select/border/focus'] },
    { name: 'switch', tokens: ['switch/track/on','switch/track/off','switch/thumb/default','switch/border/focus'] },
    { name: 'tabs',   tokens: ['tabs/indicator/active','tabs/border/list','tabs/border/focus'] },
    { name: 'text-input', tokens: ['text-input/bg/default','text-input/border/default','text-input/border/focus','text-input/border/error'] },
    { name: 'textarea', tokens: ['textarea/bg/default','textarea/border/default','textarea/border/focus','textarea/border/error'] },
  ];

  for (const c of compShowcase) {
    const row = makeFrame(c.name, { layout: 'HORIZONTAL', gap: 12, align: 'CENTER' });
    const label = makeText('lbl', c.name, { weight: 'Medium', size: 13 });
    label.layoutSizingHorizontal = 'FIXED';
    label.resize(140, label.height);
    row.appendChild(label);
    for (const tn of c.tokens) {
      const v = comp(tn);
      if (!v) continue;
      const card = makeFrame(tn, { layout: 'VERTICAL', gap: 4 });
      const sw = makeFrame('sw', { fill: v, radius: 4, stroke: '#e5e5e0', strokeWeight: 1 });
      sw.resize(48, 48);
      card.appendChild(sw);
      const lbl = makeText('n', tn.split('/').slice(1).join('.'), { size: 9, color: '#a3a39e' });
      lbl.layoutSizingHorizontal = 'FIXED';
      lbl.resize(48, lbl.height);
      card.appendChild(lbl);
      row.appendChild(card);
    }
    tier3.appendChild(row);
  }
  root.appendChild(tier3);

  return 'Built: ' + root.children.length + ' top sections, root id=' + root.id;
})()`;

const res = await fetch(`http://127.0.0.1:${PORT}/exec`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Daemon-Token': TOKEN },
  body: JSON.stringify({ action: 'eval', code: script }),
});
console.log(await res.text());
