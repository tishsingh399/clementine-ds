// Wave J Figma sync — pushes the 7 dependency-gated components into the
// canonical Clementine DS file (w4JB0MOEIzOtSKx5Y3YSQR):
//
//   Phase 1  inspect: locate the three Clementine variable collections
//   Phase 2  variables: add the ~57 missing component vars (date-picker,
//            date-input, calendar, toast, chart, sparkline, carousel),
//            aliased to their semantic counterparts (radius → primitive)
//   Phase 3  render: new page "Dates · Charts · Toast · Carousel" with all
//            7 drawn as token-bound frames, matching the category-page style
//
// Run with the figma-cli daemon up (figma-ds-cli connect --safe) and the
// FigCli plugin open on the target file:   node docs/figma/sync-wave-j.mjs

import { readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const TOKEN = readFileSync(join(homedir(), '.figma-ds-cli', '.daemon-token'), 'utf8').trim();
const PORT = 3456;

const WAVE = ['date-picker', 'date-input', 'calendar', 'toast', 'chart', 'sparkline', 'carousel'];

// Flatten the 7 component token files into [{ path, ref }] with / separators
const flat = [];
for (const name of WAVE) {
  const data = JSON.parse(readFileSync(join(ROOT, 'packages', 'tokens', 'src', 'components', `${name}.json`), 'utf8'));
  (function walk(obj, prefix) {
    for (const [k, v] of Object.entries(obj)) {
      const p = prefix ? `${prefix}/${k}` : k;
      if (v && typeof v === 'object' && '$value' in v) flat.push({ path: p, ref: v.$value, type: v.$type });
      else if (v && typeof v === 'object') walk(v, p);
    }
  })(data, '');
}

async function exec(code) {
  const res = await fetch(`http://127.0.0.1:${PORT}/exec`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Daemon-Token': TOKEN },
    body: JSON.stringify({ action: 'eval', code }),
  });
  const body = await res.json();
  if (body.error) throw new Error(body.error);
  return body.result;
}

// ── Phase 1+2: add missing component variables, aliased through the cascade ──
const varsScript = `(async () => {
  if (figma.root.children.length < 9) return 'ABORT: wrong file (' + figma.root.children.length + ' pages) — open FigCli in the 9+-page Clementine DS file';
  const tokens = ${JSON.stringify(flat)};
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const primCol = cols.find(c => /primitives/i.test(c.name));
  const semCol  = cols.find(c => /semantic/i.test(c.name));
  const compCol = cols.find(c => /components/i.test(c.name));
  if (!primCol || !semCol || !compCol) {
    return 'MISSING COLLECTIONS — found: ' + cols.map(c => c.name).join(' | ');
  }
  const all = await figma.variables.getLocalVariablesAsync();
  const byCol = (col) => Object.fromEntries(all.filter(v => v.variableCollectionId === col.id).map(v => [v.name, v]));
  const prim = byCol(primCol), sem = byCol(semCol), comp = byCol(compCol);
  const compMode = compCol.modes[0].modeId;

  function refToPath(s) {
    const m = /^\\{(.+)\\}$/.exec(String(s));
    return m ? m[1].replace(/\\./g, '/') : null;
  }
  function hexToRgba(s) {
    const m = /^#([0-9a-f]{6})$/i.exec(String(s));
    if (!m) return null;
    const h = m[1];
    return { r: parseInt(h.slice(0,2),16)/255, g: parseInt(h.slice(2,4),16)/255, b: parseInt(h.slice(4,6),16)/255, a: 1 };
  }

  let added = 0, skipped = 0; const errors = [];
  for (const t of tokens) {
    if (comp[t.path]) { skipped++; continue; }
    const refPath = refToPath(t.ref);
    const target = refPath ? (sem[refPath] ?? prim[refPath]) : null;
    let figmaType = 'COLOR';
    if (target) figmaType = target.resolvedType;
    else if (/^[\\d.]+px$/.test(String(t.ref))) figmaType = 'FLOAT';
    try {
      const v = figma.variables.createVariable(t.path, compCol, figmaType);
      if (target) {
        v.setValueForMode(compMode, { type: 'VARIABLE_ALIAS', id: target.id });
      } else if (figmaType === 'FLOAT') {
        v.setValueForMode(compMode, parseFloat(String(t.ref)));
      } else {
        const c = hexToRgba(t.ref);
        if (c) v.setValueForMode(compMode, c);
      }
      added++;
    } catch (e) { errors.push(t.path + ': ' + e.message); }
  }
  return 'vars added=' + added + ' skipped=' + skipped + (errors.length ? ' | ERRORS: ' + errors.slice(0,5).join('; ') : '');
})()`;

// ── Phase 3: render the 7 components on a new page ──────────────────────────
const renderScript = `(async () => {
  if (figma.root.children.length < 9) return 'ABORT: wrong file (' + figma.root.children.length + ' pages)';
  // Remove stray wave pages left by earlier crashed runs — load only those pages
  for (const p of [...figma.root.children]) {
    if (p.name === 'Dates · Charts · Toast · Carousel' && figma.root.children.length > 1) {
      if (figma.currentPage === p) await figma.setCurrentPageAsync(figma.root.children.find(x => x !== p));
      try { await p.loadAsync(); p.remove(); } catch {}
    }
  }
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const compCol = cols.find(c => /components/i.test(c.name));
  const all = await figma.variables.getLocalVariablesAsync();
  const V = Object.fromEntries(all.filter(v => v.variableCollectionId === compCol.id).map(v => [v.name, v]));

  const bound = (v) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', v);
  function frame(name, o = {}) {
    const f = figma.createFrame(); f.name = name;
    f.fills = o.fill && V[o.fill] ? [bound(V[o.fill])] : [];
    if (o.stroke && V[o.stroke]) { f.strokes = [bound(V[o.stroke])]; f.strokeWeight = o.sw ?? 1; }
    if (o.r != null) f.cornerRadius = o.r;
    if (o.layout) {
      f.layoutMode = o.layout; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
      if (o.p != null) { f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = o.p; }
      if (o.px != null) { f.paddingLeft = f.paddingRight = o.px; }
      if (o.py != null) { f.paddingTop = f.paddingBottom = o.py; }
      if (o.gap != null) f.itemSpacing = o.gap;
      if (o.align) f.counterAxisAlignItems = o.align;
    }
    if (o.w && o.h) f.resize(o.w, o.h); else if (o.w) f.resize(o.w, f.height); else if (o.h) f.resize(f.width, o.h);
    return f;
  }
  function text(s, o = {}) {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: o.weight || 'Regular' };
    t.fontSize = o.size || 13; t.characters = s;
    if (o.v && V[o.v]) t.fills = [bound(V[o.v])];
    return t;
  }
  function card(title) {
    const c = frame(title, { layout: 'VERTICAL', p: 20, gap: 12, fill: undefined });
    c.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    c.cornerRadius = 12;
    c.resize(360, c.height);
    c.counterAxisSizingMode = 'FIXED';
    c.appendChild(text(title, { weight: 'Semi Bold', size: 15 }));
    return c;
  }

  const page = figma.createPage();
  page.name = 'Dates · Charts · Toast · Carousel';
  await figma.setCurrentPageAsync(page);
  const board = frame('Wave J — board', { layout: 'HORIZONTAL', p: 56, gap: 32 });
  board.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.97 } }];
  board.layoutWrap = 'WRAP';
  board.counterAxisSizingMode = 'AUTO';
  board.resize(1680, board.height);
  page.appendChild(board);
  const label = text('Clementine · Dates, Charts, Toast & Carousel (Wave J)', { weight: 'Semi Bold', size: 20 });
  label.x = 0; label.y = -56; page.appendChild(label);

  // DatePicker — mini month
  const dp = card('DatePicker');
  const dpPanel = frame('panel', { layout: 'VERTICAL', p: 12, gap: 8, fill: 'date-picker/bg', stroke: 'date-picker/day-today-border', sw: 0, r: 8 });
  dpPanel.strokes = [];
  dpPanel.appendChild(text('June 2026', { weight: 'Medium', size: 13, v: 'date-picker/header-fg' }));
  const wk = frame('weekdays', { layout: 'HORIZONTAL', gap: 10 });
  for (const d of ['M','T','W','T','F','S','S']) wk.appendChild(text(d, { size: 10, v: 'date-picker/weekday-fg' }));
  dpPanel.appendChild(wk);
  const days = frame('days', { layout: 'HORIZONTAL', gap: 6, align: 'CENTER' });
  const mk = (n, kind) => {
    const d = frame('d' + n, { layout: 'HORIZONTAL', px: 8, py: 5, r: 6,
      fill: kind === 'sel' ? 'date-picker/day-selected-bg' : kind === 'range' ? 'date-picker/day-in-range-bg' : undefined,
      stroke: kind === 'today' ? 'date-picker/day-today-border' : undefined, sw: kind === 'today' ? 1.5 : 0 });
    if (kind !== 'today') d.strokes = [];
    d.appendChild(text(String(n), { size: 12, v: kind === 'sel' ? 'date-picker/day-selected-fg' : kind === 'muted' ? 'date-picker/day-muted-fg' : 'date-picker/fg' }));
    return d;
  };
  days.appendChild(mk(9, 'muted')); days.appendChild(mk(10, 'plain')); days.appendChild(mk(11, 'today'));
  days.appendChild(mk(12, 'range')); days.appendChild(mk(13, 'sel')); days.appendChild(mk(14, 'plain'));
  dpPanel.appendChild(days);
  dp.appendChild(dpPanel);
  board.appendChild(dp);

  // DateInput
  const di = card('DateInput');
  di.appendChild(text('Due date', { weight: 'Medium', size: 11, v: 'date-input/fg' }));
  const diBox = frame('input', { layout: 'HORIZONTAL', px: 12, py: 10, fill: 'date-input/bg', stroke: 'date-input/border', sw: 1, r: 8, align: 'CENTER', gap: 8 });
  diBox.resize(280, 40); diBox.counterAxisSizingMode = 'FIXED'; diBox.primaryAxisSizingMode = 'FIXED';
  diBox.appendChild(text('11 Jun 2026', { size: 13, v: 'date-input/fg' }));
  di.appendChild(diBox);
  const diErr = frame('input-error', { layout: 'HORIZONTAL', px: 12, py: 10, fill: 'date-input/bg', stroke: 'date-input/border-error', sw: 1.5, r: 8, align: 'CENTER' });
  diErr.resize(280, 40); diErr.counterAxisSizingMode = 'FIXED'; diErr.primaryAxisSizingMode = 'FIXED';
  diErr.appendChild(text('tomorrowish', { size: 13, v: 'date-input/placeholder' }));
  di.appendChild(diErr);
  board.appendChild(di);

  // Calendar
  const cal = card('Calendar');
  const calPanel = frame('panel', { layout: 'VERTICAL', p: 12, gap: 8, fill: 'calendar/bg', r: 8 });
  calPanel.appendChild(text('June 2026', { weight: 'Medium', size: 13, v: 'calendar/header-fg' }));
  const calRow = frame('row', { layout: 'HORIZONTAL', gap: 6 });
  const cmk = (n, today) => {
    const d = frame('c' + n, { layout: 'HORIZONTAL', px: 8, py: 5, r: 6, stroke: today ? 'calendar/day-today-border' : undefined, sw: today ? 1.5 : 0 });
    if (!today) d.strokes = [];
    d.appendChild(text(String(n), { size: 12, v: today ? 'calendar/fg' : 'calendar/day-muted-fg' }));
    return d;
  };
  for (let i = 9; i <= 14; i++) calRow.appendChild(cmk(i, i === 11));
  calPanel.appendChild(calRow);
  cal.appendChild(calPanel);
  board.appendChild(cal);

  // Toast
  const to = card('Toast');
  const mkToast = (titleTxt, iconVar) => {
    const t = frame('toast', { layout: 'HORIZONTAL', px: 14, py: 12, gap: 10, fill: 'toast/bg', stroke: 'toast/border', sw: 1, r: 8, align: 'CENTER' });
    const dot = frame('icon', { r: 99, fill: iconVar }); dot.resize(10, 10);
    t.appendChild(dot);
    const col = frame('texts', { layout: 'VERTICAL', gap: 2 });
    col.fills = [];
    col.appendChild(text(titleTxt, { weight: 'Medium', size: 12, v: 'toast/fg' }));
    col.appendChild(text('Just now', { size: 10, v: 'toast/description-fg' }));
    t.appendChild(col);
    return t;
  };
  to.appendChild(mkToast('Changes saved', 'toast/icon-success'));
  to.appendChild(mkToast('Could not connect', 'toast/icon-error'));
  to.appendChild(mkToast('Deleted 3 items — Undo', 'toast/icon-info'));
  board.appendChild(to);

  // Chart
  const ch = card('Chart (Area · Line · Bar)');
  const plot = frame('plot', { layout: 'HORIZONTAL', p: 12, gap: 8, fill: 'chart/tooltip-bg', stroke: 'chart/grid', sw: 1, r: 8, align: 'MAX' });
  plot.resize(320, 120); plot.primaryAxisSizingMode = 'FIXED'; plot.counterAxisSizingMode = 'FIXED';
  const heights = [40, 64, 52, 88, 72];
  const seriesVars = ['chart/series-1','chart/series-2','chart/series-3','chart/series-4','chart/series-5'];
  heights.forEach((h, i) => {
    const bar = frame('bar' + i, { r: 3, fill: seriesVars[i] });
    bar.resize(36, h);
    plot.appendChild(bar);
  });
  ch.appendChild(plot);
  ch.appendChild(text('5-series palette · grid · axis · tooltip — one contract for Area/Line/Bar', { size: 10, v: 'chart/axis-fg' }));
  board.appendChild(ch);

  // Sparkline
  const sp = card('Sparkline');
  const spRow = frame('row', { layout: 'HORIZONTAL', gap: 4, align: 'MAX' });
  [12, 20, 16, 26, 22, 32, 38].forEach((h, i) => {
    const b = frame('s' + i, { r: 2, fill: 'sparkline/stroke' });
    b.resize(10, h);
    spRow.appendChild(b);
  });
  sp.appendChild(spRow);
  const spTrends = frame('trends', { layout: 'HORIZONTAL', gap: 8, align: 'CENTER' });
  const up = frame('up', { r: 99, fill: 'sparkline/stroke-trend-up' }); up.resize(10, 10);
  const dn = frame('dn', { r: 99, fill: 'sparkline/stroke-trend-down' }); dn.resize(10, 10);
  spTrends.appendChild(up); spTrends.appendChild(text('trend-up', { size: 10 }));
  spTrends.appendChild(dn); spTrends.appendChild(text('trend-down', { size: 10 }));
  sp.appendChild(spTrends);
  board.appendChild(sp);

  // Carousel
  const ca = card('Carousel');
  const caRow = frame('row', { layout: 'HORIZONTAL', gap: 8, align: 'CENTER' });
  const ctrl = (ch2) => {
    const c = frame('ctrl', { layout: 'HORIZONTAL', px: 9, py: 5, fill: 'carousel/control-bg', stroke: 'carousel/control-border', sw: 1, r: 99 });
    c.appendChild(text(ch2, { size: 12, v: 'carousel/control-fg' }));
    return c;
  };
  caRow.appendChild(ctrl('‹'));
  const slide = frame('slide', { layout: 'HORIZONTAL', px: 36, py: 28, fill: 'carousel/control-bg', stroke: 'carousel/control-border', sw: 1, r: 8 });
  slide.appendChild(text('Slide 2 / 3', { size: 12, v: 'carousel/control-fg' }));
  caRow.appendChild(slide);
  caRow.appendChild(ctrl('›'));
  ca.appendChild(caRow);
  const dots = frame('indicators', { layout: 'HORIZONTAL', gap: 6, align: 'CENTER' });
  for (let i = 0; i < 3; i++) {
    const d = frame('dot' + i, { r: 99, fill: i === 1 ? 'carousel/indicator-active' : 'carousel/indicator' });
    d.resize(i === 1 ? 18 : 8, 8);
    dots.appendChild(d);
  }
  ca.appendChild(dots);
  board.appendChild(ca);

  return 'rendered page=' + page.name + ' cards=' + board.children.length;
})()`;

console.log(`tokens to sync: ${flat.length}`);
console.log('— phase 1+2: variables —');
console.log(await exec(varsScript));
console.log('— phase 3: render —');
console.log(await exec(renderScript));
