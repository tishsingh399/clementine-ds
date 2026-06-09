// Build 10 Clementine components as Auto Layout frames with proper
// variable bindings. Lay them out in a grid to the right of the tokens board.

import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const TOKEN = readFileSync(join(homedir(), '.figma-ds-cli', '.daemon-token'), 'utf8').trim();
const PORT = 3456;

const script = `(async () => {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const compCol = cols.find(c => c.name === 'Clementine · Components');
  const semCol  = cols.find(c => c.name === 'Clementine · Semantic');
  const all = await figma.variables.getLocalVariablesAsync();
  const v = (name, col) => all.find(x => x.name === name && x.variableCollectionId === col.id);
  const comp = n => v(n, compCol);
  const sem  = n => v(n, semCol);

  function bound(paint, variable) {
    return figma.variables.setBoundVariableForPaint(paint, 'color', variable);
  }
  function fillVar(variable) {
    return bound({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, variable);
  }
  function fillHex(hex) {
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    const h = m[1];
    return { type: 'SOLID', color: {
      r: parseInt(h.slice(0,2),16)/255,
      g: parseInt(h.slice(2,4),16)/255,
      b: parseInt(h.slice(4,6),16)/255,
    } };
  }
  function mkFrame(name, opts = {}) {
    const f = figma.createFrame();
    f.name = name;
    if (opts.fill) f.fills = [typeof opts.fill === 'string' ? fillHex(opts.fill) : fillVar(opts.fill)];
    else f.fills = [];
    if (opts.radius != null) f.cornerRadius = opts.radius;
    if (opts.stroke) {
      f.strokes = [typeof opts.stroke === 'string' ? fillHex(opts.stroke) : fillVar(opts.stroke)];
      f.strokeWeight = opts.strokeWeight ?? 1;
    }
    if (opts.layout) {
      f.layoutMode = opts.layout;
      f.primaryAxisSizingMode = 'AUTO';
      f.counterAxisSizingMode = 'AUTO';
      if (opts.padding != null) f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = opts.padding;
      if (opts.paddingX != null) f.paddingLeft = f.paddingRight = opts.paddingX;
      if (opts.paddingY != null) f.paddingTop = f.paddingBottom = opts.paddingY;
      if (opts.gap != null) f.itemSpacing = opts.gap;
      if (opts.align) f.counterAxisAlignItems = opts.align;
      if (opts.justify) f.primaryAxisAlignItems = opts.justify;
    }
    if (opts.w != null && opts.h != null) { f.resize(opts.w, opts.h); }
    else if (opts.w != null) { f.resize(opts.w, f.height); }
    else if (opts.h != null) { f.resize(f.width, opts.h); }
    return f;
  }
  function mkText(content, opts = {}) {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style: opts.weight || 'Regular' };
    t.fontSize = opts.size || 14;
    t.characters = content;
    if (opts.colorVar) t.fills = [bound({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, opts.colorVar)];
    else if (opts.colorHex) t.fills = [fillHex(opts.colorHex)];
    return t;
  }
  function mkCircle(d, opts = {}) {
    const c = figma.createEllipse();
    c.resize(d, d);
    if (opts.fill) c.fills = [typeof opts.fill === 'string' ? fillHex(opts.fill) : fillVar(opts.fill)];
    if (opts.stroke) {
      c.strokes = [typeof opts.stroke === 'string' ? fillHex(opts.stroke) : fillVar(opts.stroke)];
      c.strokeWeight = opts.strokeWeight ?? 2;
    }
    return c;
  }

  // Container board for all components
  const board = mkFrame('Clementine DS · Components', { layout: 'VERTICAL', padding: 64, gap: 56, fill: '#fafaf8' });
  board.counterAxisSizingMode = 'FIXED';
  board.resize(1600, board.height);
  board.x = 1700; board.y = 0;

  const hed = mkFrame('hed', { layout: 'VERTICAL', gap: 12 });
  hed.appendChild(mkText('CLEMENTINE · COMPONENTS', { weight: 'Medium', size: 13, colorHex: '#52524e' }));
  hed.appendChild(mkText('10 components, every paint bound to a Tier-3 variable', { weight: 'Semi Bold', size: 36, colorHex: '#1a1a18' }));
  hed.appendChild(mkText('Hover → button/bg/hover. Focus ring → button/border/focus. Switch theme → values resolve through semantic.', { size: 15, colorHex: '#52524e' }));
  board.appendChild(hed);

  // ── BUTTON ROW ────────────────────────────────────────────────────────
  function makeButton(label, opts) {
    const btn = mkFrame('Button · ' + opts.variant, {
      layout: 'HORIZONTAL', paddingX: 20, paddingY: 12, gap: 8, align: 'CENTER', justify: 'CENTER',
      fill: opts.bg, radius: 8, stroke: opts.stroke, strokeWeight: opts.strokeWeight || 0,
    });
    btn.appendChild(mkText(label, { weight: 'Medium', size: 14, colorVar: opts.fg }));
    return btn;
  }

  const buttonRow = mkFrame('Buttons', { layout: 'VERTICAL', gap: 16 });
  buttonRow.appendChild(mkText('Button', { weight: 'Semi Bold', size: 20, colorHex: '#1a1a18' }));
  const btnGrid = mkFrame('btn-grid', { layout: 'HORIZONTAL', gap: 16, align: 'CENTER' });
  btnGrid.appendChild(makeButton('Save changes', { variant: 'Filled Primary', bg: comp('button/bg/default'), fg: comp('button/fg/on-filled') }));
  btnGrid.appendChild(makeButton('Delete user',  { variant: 'Filled Destructive', bg: comp('button/bg-destructive/default'), fg: comp('button/fg/on-filled') }));
  btnGrid.appendChild(makeButton('Cancel',       { variant: 'Outline', bg: comp('button/bg-outline/default'), fg: comp('button/fg/on-outline'), stroke: comp('button/border/default'), strokeWeight: 1 }));
  btnGrid.appendChild(makeButton('Edit',         { variant: 'Subtle',  bg: comp('button/bg-outline/default'), fg: comp('button/fg/on-outline') }));
  // Focus ring example
  const focusBtn = makeButton('Focused', { variant: 'Focused', bg: comp('button/bg/default'), fg: comp('button/fg/on-filled') });
  focusBtn.strokes = [bound({ type: 'SOLID', color: { r: 1, g: 0.5, b: 0.25 } }, comp('button/border/focus'))];
  focusBtn.strokeWeight = 2;
  focusBtn.strokeAlign = 'OUTSIDE';
  btnGrid.appendChild(focusBtn);
  buttonRow.appendChild(btnGrid);
  board.appendChild(buttonRow);

  // ── BADGE ROW ─────────────────────────────────────────────────────────
  function makeBadge(label, bgVar) {
    const b = mkFrame('Badge · ' + label, {
      layout: 'HORIZONTAL', paddingX: 10, paddingY: 4, gap: 6, align: 'CENTER',
      fill: bgVar, radius: 4,
    });
    b.appendChild(mkText(label, { weight: 'Medium', size: 12, colorVar: comp('badge/fg/default') }));
    return b;
  }
  const badgeRow = mkFrame('Badges', { layout: 'VERTICAL', gap: 16 });
  badgeRow.appendChild(mkText('Badge', { weight: 'Semi Bold', size: 20, colorHex: '#1a1a18' }));
  const badgeGrid = mkFrame('badge-grid', { layout: 'HORIZONTAL', gap: 12, align: 'CENTER' });
  for (const [label, key] of [
    ['Neutral','badge/bg/neutral'], ['Success','badge/bg/success'], ['Error','badge/bg/error'], ['Warning','badge/bg/warning'],
    ['Critical','badge/bg/risk-critical'], ['High','badge/bg/risk-high'], ['Medium','badge/bg/risk-medium'], ['Low','badge/bg/risk-low'],
  ]) {
    badgeGrid.appendChild(makeBadge(label, comp(key)));
  }
  badgeRow.appendChild(badgeGrid);
  board.appendChild(badgeRow);

  // ── CHECKBOX + RADIO + SWITCH ─────────────────────────────────────────
  const formRow = mkFrame('Form controls', { layout: 'VERTICAL', gap: 16 });
  formRow.appendChild(mkText('Checkbox · Radio · Switch', { weight: 'Semi Bold', size: 20, colorHex: '#1a1a18' }));
  const formGrid = mkFrame('form-grid', { layout: 'HORIZONTAL', gap: 32, align: 'CENTER' });

  function makeCheckbox(checked, indeterminate) {
    const box = mkFrame('cb', {
      layout: 'HORIZONTAL', padding: 0, justify: 'CENTER', align: 'CENTER',
      fill: indeterminate ? comp('checkbox/bg/indeterminate') : (checked ? comp('checkbox/bg/checked') : comp('checkbox/bg/unchecked')),
      stroke: indeterminate ? comp('checkbox/bg/indeterminate') : (checked ? comp('checkbox/bg/checked') : comp('checkbox/border/default')),
      strokeWeight: 1.5, radius: 4,
    });
    box.resize(20, 20);
    if (checked && !indeterminate) {
      const check = mkText('✓', { weight: 'Semi Bold', size: 14, colorVar: comp('checkbox/check') });
      box.appendChild(check);
    } else if (indeterminate) {
      const dash = mkFrame('dash', { fill: comp('checkbox/check'), radius: 1 });
      dash.resize(10, 2);
      box.appendChild(dash);
    }
    const wrap = mkFrame('cbwrap', { layout: 'HORIZONTAL', gap: 8, align: 'CENTER' });
    wrap.appendChild(box);
    const lbl = mkText(checked ? 'Selected' : indeterminate ? 'Mixed' : 'Option', { size: 14, colorVar: comp('checkbox/fg/label') });
    wrap.appendChild(lbl);
    return wrap;
  }
  formGrid.appendChild(makeCheckbox(true, false));
  formGrid.appendChild(makeCheckbox(false, true));
  formGrid.appendChild(makeCheckbox(false, false));

  function makeRadio(selected) {
    const circle = mkCircle(20, {
      fill: comp('radio/bg/unchecked'),
      stroke: selected ? comp('radio/border/checked') : comp('radio/border/default'),
      strokeWeight: 2,
    });
    const wrap = mkFrame('radio', { layout: 'HORIZONTAL', gap: 8, align: 'CENTER' });
    wrap.appendChild(circle);
    if (selected) {
      const dot = mkCircle(8, { fill: comp('radio/dot/checked') });
      // Position over the circle? Auto layout makes this hard. Skip — show state in label.
      // Actually we'd need to position absolutely; use a containing frame.
    }
    wrap.appendChild(mkText(selected ? 'Selected' : 'Option', { size: 14, colorVar: comp('radio/fg/label') }));
    return wrap;
  }
  formGrid.appendChild(makeRadio(true));
  formGrid.appendChild(makeRadio(false));

  function makeSwitch(on) {
    const track = mkFrame('switch', {
      layout: 'HORIZONTAL', padding: 2, align: 'CENTER',
      fill: on ? comp('switch/track/on') : comp('switch/track/off'),
      radius: 14,
    });
    track.resize(44, 24);
    track.primaryAxisAlignItems = on ? 'MAX' : 'MIN';
    const thumb = mkCircle(20, { fill: comp('switch/thumb/default') });
    track.appendChild(thumb);
    const wrap = mkFrame('sw', { layout: 'HORIZONTAL', gap: 8, align: 'CENTER' });
    wrap.appendChild(track);
    wrap.appendChild(mkText(on ? 'On' : 'Off', { size: 14, colorVar: comp('switch/fg/label') }));
    return wrap;
  }
  formGrid.appendChild(makeSwitch(true));
  formGrid.appendChild(makeSwitch(false));

  formRow.appendChild(formGrid);
  board.appendChild(formRow);

  // ── TEXT INPUT + TEXTAREA + SELECT ─────────────────────────────────────
  const inputRow = mkFrame('Inputs', { layout: 'VERTICAL', gap: 16 });
  inputRow.appendChild(mkText('TextInput · Select · Textarea', { weight: 'Semi Bold', size: 20, colorHex: '#1a1a18' }));
  const inputGrid = mkFrame('input-grid', { layout: 'HORIZONTAL', gap: 24, align: 'MIN' });

  function makeInput(label, placeholder, state) {
    const wrap = mkFrame(label, { layout: 'VERTICAL', gap: 6 });
    wrap.appendChild(mkText(label, { weight: 'Medium', size: 12, colorVar: comp('text-input/fg/value') }));
    const input = mkFrame('input', {
      layout: 'HORIZONTAL', paddingX: 12, paddingY: 10,
      fill: comp('text-input/bg/default'),
      stroke: state === 'error' ? comp('text-input/border/error') : state === 'focus' ? comp('text-input/border/focus') : comp('text-input/border/default'),
      strokeWeight: state === 'focus' ? 2 : 1, radius: 8,
    });
    input.resize(240, 40);
    input.appendChild(mkText(placeholder, { size: 14, colorVar: comp('text-input/fg/placeholder') }));
    wrap.appendChild(input);
    if (state === 'error') {
      wrap.appendChild(mkText('Required field', { size: 12, colorHex: '#dc2626' }));
    }
    return wrap;
  }
  inputGrid.appendChild(makeInput('Email', 'you@example.com', 'default'));
  inputGrid.appendChild(makeInput('Name (focused)', 'Tina', 'focus'));
  inputGrid.appendChild(makeInput('Email (error)', '', 'error'));

  // Select trigger
  const selectWrap = mkFrame('Select', { layout: 'VERTICAL', gap: 6 });
  selectWrap.appendChild(mkText('Role', { weight: 'Medium', size: 12, colorVar: comp('select/fg/value') }));
  const selectTrigger = mkFrame('trigger', {
    layout: 'HORIZONTAL', paddingX: 12, paddingY: 10, justify: 'SPACE_BETWEEN', align: 'CENTER',
    fill: comp('select/bg/trigger'),
    stroke: comp('select/border/default'), strokeWeight: 1, radius: 8,
  });
  selectTrigger.resize(220, 40);
  selectTrigger.appendChild(mkText('Designer', { size: 14, colorVar: comp('select/fg/value') }));
  selectTrigger.appendChild(mkText('▾', { size: 14, colorVar: comp('select/fg/value') }));
  selectWrap.appendChild(selectTrigger);
  inputGrid.appendChild(selectWrap);

  // Textarea
  const taWrap = mkFrame('Textarea', { layout: 'VERTICAL', gap: 6 });
  taWrap.appendChild(mkText('Notes', { weight: 'Medium', size: 12, colorVar: comp('textarea/fg/value') }));
  const ta = mkFrame('ta', {
    layout: 'HORIZONTAL', paddingX: 12, paddingY: 10,
    fill: comp('textarea/bg/default'),
    stroke: comp('textarea/border/default'), strokeWeight: 1, radius: 8,
  });
  ta.resize(280, 88);
  ta.appendChild(mkText('Add any context for the team...', { size: 14, colorVar: comp('textarea/fg/placeholder') }));
  taWrap.appendChild(ta);
  inputGrid.appendChild(taWrap);

  inputRow.appendChild(inputGrid);
  board.appendChild(inputRow);

  // ── TABS + MODAL ──────────────────────────────────────────────────────
  const navRow = mkFrame('Tabs + Modal', { layout: 'VERTICAL', gap: 16 });
  navRow.appendChild(mkText('Tabs · Modal', { weight: 'Semi Bold', size: 20, colorHex: '#1a1a18' }));
  const navGrid = mkFrame('nav-grid', { layout: 'HORIZONTAL', gap: 32, align: 'MIN' });

  // Tabs
  const tabsList = mkFrame('Tabs', { layout: 'HORIZONTAL', gap: 0, align: 'CENTER' });
  tabsList.strokes = [bound({ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }, comp('tabs/border/list'))];
  tabsList.strokeWeight = 1;
  tabsList.strokeAlign = 'OUTSIDE';
  function makeTab(label, active) {
    const tab = mkFrame('tab', { layout: 'VERTICAL', gap: 8, paddingX: 16, paddingY: 12, align: 'CENTER' });
    tab.appendChild(mkText(label, {
      weight: active ? 'Semi Bold' : 'Medium', size: 14,
      colorVar: active ? comp('tabs/fg/active') : comp('tabs/fg/inactive'),
    }));
    if (active) {
      const indicator = mkFrame('indicator', { fill: comp('tabs/indicator/active'), radius: 1 });
      indicator.resize(40, 2);
      tab.appendChild(indicator);
    }
    return tab;
  }
  tabsList.appendChild(makeTab('Overview', true));
  tabsList.appendChild(makeTab('Activity', false));
  tabsList.appendChild(makeTab('Settings', false));
  navGrid.appendChild(tabsList);

  // Modal mockup (small)
  const modal = mkFrame('Modal', {
    layout: 'VERTICAL', padding: 24, gap: 16,
    fill: comp('modal/bg'),
    stroke: comp('modal/border/divider'), strokeWeight: 1, radius: 12,
  });
  modal.resize(360, modal.height);
  modal.appendChild(mkText('Revoke session?', { weight: 'Semi Bold', size: 18, colorVar: comp('modal/fg/title') }));
  modal.appendChild(mkText('This will sign out the user from all devices and require re-authentication.', { size: 14, colorVar: comp('modal/fg/secondary') }));
  const footer = mkFrame('footer', { layout: 'HORIZONTAL', gap: 8, justify: 'MAX', align: 'CENTER' });
  footer.appendChild(makeButton('Cancel', { variant: 'M Cancel', bg: comp('button/bg-outline/default'), fg: comp('button/fg/on-outline'), stroke: comp('button/border/default'), strokeWeight: 1 }));
  footer.appendChild(makeButton('Revoke', { variant: 'M Revoke', bg: comp('button/bg-destructive/default'), fg: comp('button/fg/on-filled') }));
  modal.appendChild(footer);
  navGrid.appendChild(modal);

  navRow.appendChild(navGrid);
  board.appendChild(navRow);

  return 'Built ' + board.children.length + ' sections, board id=' + board.id;
})()`;

const res = await fetch(`http://127.0.0.1:${PORT}/exec`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Daemon-Token': TOKEN },
  body: JSON.stringify({ action: 'eval', code: script }),
});
console.log(await res.text());
