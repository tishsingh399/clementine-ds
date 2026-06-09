import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const TOKEN = readFileSync(join(homedir(), '.figma-ds-cli', '.daemon-token'), 'utf8').trim();
const script = `(async () => {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  await figma.loadFontAsync({ family: 'JetBrains Mono', style: 'Regular' });

  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const compCol = cols.find(c => c.name === 'Clementine · Components');
  const all = await figma.variables.getLocalVariablesAsync();
  const comp = n => all.find(x => x.name === n && x.variableCollectionId === compCol.id);
  function bound(p, v) { return figma.variables.setBoundVariableForPaint(p, 'color', v); }
  function fillVar(v) { return bound({type:'SOLID',color:{r:1,g:1,b:1}}, v); }
  function fillHex(h) { const m=/#([0-9a-f]{6})/i.exec(h)[1]; return {type:'SOLID',color:{r:parseInt(m.slice(0,2),16)/255,g:parseInt(m.slice(2,4),16)/255,b:parseInt(m.slice(4,6),16)/255}}; }
  function mkF(name, o={}) {
    const f=figma.createFrame(); f.name=name;
    if(o.fill) f.fills=[typeof o.fill==='string'?fillHex(o.fill):fillVar(o.fill)]; else f.fills=[];
    if(o.radius!=null) f.cornerRadius=o.radius;
    if(o.layout){ f.layoutMode=o.layout; f.primaryAxisSizingMode='AUTO'; f.counterAxisSizingMode='AUTO';
      if(o.padding!=null) f.paddingTop=f.paddingBottom=f.paddingLeft=f.paddingRight=o.padding;
      if(o.paddingX!=null) f.paddingLeft=f.paddingRight=o.paddingX;
      if(o.paddingY!=null) f.paddingTop=f.paddingBottom=o.paddingY;
      if(o.gap!=null) f.itemSpacing=o.gap;
      if(o.align) f.counterAxisAlignItems=o.align;
    }
    if(o.w&&o.h) f.resize(o.w,o.h); else if(o.w) f.resize(o.w,f.height); else if(o.h) f.resize(f.width,o.h);
    return f;
  }
  function mkT(c, o={}) {
    const t=figma.createText();
    t.fontName={family:o.mono?'JetBrains Mono':'Inter', style:o.weight||'Regular'};
    t.fontSize=o.size||14; t.characters=c;
    if(o.colorVar) t.fills=[bound({type:'SOLID',color:{r:0,g:0,b:0}}, o.colorVar)];
    else if(o.colorHex) t.fills=[fillHex(o.colorHex)];
    if(o.letterSpacing) t.letterSpacing={unit:'PERCENT',value:o.letterSpacing};
    return t;
  }

  const board = mkF('Clementine DS · Button Spec', {layout:'VERTICAL', padding:64, gap:32, fill:'#fafaf8'});
  board.counterAxisSizingMode='FIXED'; board.resize(1600, board.height);
  board.x = 3400; board.y = 0;

  const hed = mkF('hed', {layout:'VERTICAL', gap:12});
  hed.appendChild(mkT('CLEMENTINE · SPECS', {weight:'Medium', size:13, colorHex:'#52524e', letterSpacing:8}));
  hed.appendChild(mkT('How an AI agent reads a Clementine component', {weight:'Semi Bold', size:36}));
  hed.appendChild(mkT('Frontmatter on the left is the machine contract. Component on the right respects it. Validator (agentic-spec) closes the loop.', {size:15, colorHex:'#52524e'}));
  board.appendChild(hed);

  const row = mkF('row', {layout:'HORIZONTAL', gap:32, align:'MIN'});

  // YAML frontmatter card
  const yaml = mkF('yaml', {layout:'VERTICAL', gap:0, padding:24, fill:'#1a1a18', radius:12, paddingX:32, paddingY:28});
  yaml.resize(720, yaml.height);
  const yamlBlock = mkT(\`---
component: button
ds_version: clementine-ds@HEAD
status: AI-Ready
last_verified: 2026-06-08
category: Component
required_aria:
  - aria-label
  - aria-disabled
  - aria-busy
semantic_parts:
  root: native <button>
  label: text content
  icon-leading: optional
  icon-trailing: optional
  spinner: loading state
token_contract:
  - button.bg.default
  - button.bg.hover
  - button.bg.active
  - button.bg.disabled
  - button.bg-destructive.default
  - button.bg-destructive.hover
  - button.bg-outline.default
  - button.fg.on-filled
  - button.fg.on-outline
  - button.fg.disabled
  - button.border.default
  - button.border.hover
  - button.border.focus
  - button.radius
interaction_states:
  - default
  - hover
  - focus
  - active
  - disabled
  - loading
checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true
---\`, {mono:true, size:12, colorHex:'#f3f3f0'});
  yaml.appendChild(yamlBlock);
  row.appendChild(yaml);

  // RHS panel
  const rhs = mkF('rhs', {layout:'VERTICAL', gap:24, paddingX:0, paddingY:0});

  // Component preview card
  const previewCard = mkF('preview', {layout:'VERTICAL', gap:16, padding:32, fill:'#ffffff', radius:12, paddingX:32, paddingY:32});
  previewCard.appendChild(mkT('The component, paints bound to button.* tokens', {weight:'Medium', size:13, colorHex:'#52524e'}));
  const btnRow = mkF('btns', {layout:'HORIZONTAL', gap:12});
  function btn(label, opts){
    const b = mkF('b'+label, {layout:'HORIZONTAL', paddingX:20, paddingY:12, gap:8, align:'CENTER',
      fill:opts.bg, radius:8, ...(opts.stroke?{}:null)});
    if(opts.stroke){ b.strokes=[bound({type:'SOLID',color:{r:0,g:0,b:0}}, opts.stroke)]; b.strokeWeight=opts.strokeWeight||1; }
    b.appendChild(mkT(label, {weight:'Medium', size:14, colorVar:opts.fg}));
    return b;
  }
  btnRow.appendChild(btn('Save changes', {bg:comp('button/bg/default'), fg:comp('button/fg/on-filled')}));
  btnRow.appendChild(btn('Delete user', {bg:comp('button/bg-destructive/default'), fg:comp('button/fg/on-filled')}));
  btnRow.appendChild(btn('Cancel', {bg:comp('button/bg-outline/default'), fg:comp('button/fg/on-outline'), stroke:comp('button/border/default'), strokeWeight:1}));
  previewCard.appendChild(btnRow);
  rhs.appendChild(previewCard);

  // Validator card
  const vcard = mkF('val', {layout:'VERTICAL', gap:10, padding:24, fill:'#ffffff', radius:12, paddingX:32, paddingY:28});
  vcard.appendChild(mkT('agentic-spec validate specs/button', {mono:true, size:13, colorHex:'#52524e'}));
  vcard.appendChild(mkT('✓ PASS button  (15 tokens · 6 states · 5 parts)', {mono:true, size:13, colorHex:'#15803d'}));
  vcard.appendChild(mkT('aria_correct       ✓', {mono:true, size:12, colorHex:'#52524e'}));
  vcard.appendChild(mkT('structure_correct  ✓', {mono:true, size:12, colorHex:'#52524e'}));
  vcard.appendChild(mkT('states_complete    ✓', {mono:true, size:12, colorHex:'#52524e'}));
  vcard.appendChild(mkT('tokens_valid       ✓', {mono:true, size:12, colorHex:'#52524e'}));
  vcard.appendChild(mkT('no_invented_styles ✓', {mono:true, size:12, colorHex:'#52524e'}));
  rhs.appendChild(vcard);

  row.appendChild(rhs);
  board.appendChild(row);

  return 'spec board id=' + board.id;
})()`;

const res = await fetch('http://127.0.0.1:3456/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Daemon-Token': TOKEN },
  body: JSON.stringify({ action: 'eval', code: script }),
});
console.log(await res.text());
