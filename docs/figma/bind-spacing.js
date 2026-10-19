// Spacing, gap and radius binding for the Clementine DS Figma file
// (w4JB0MOEIzOtSKx5Y3YSQR). Plugin API snippet, run once per component page
// through the Figma MCP `use_figma` tool (one call per page, PAGE = page id).
// Idempotent: already-bound fields are skipped, so a rerun only binds new work.
//
// Walks every COMPONENT / COMPONENT_SET variant (not instances, not the set
// frame itself) and binds padding, itemSpacing, counterAxisSpacing (wrap only)
// and per-corner radius to the Primitives collection. Exact matches bind as is;
// the snaps below were approved by Tina on 2026-10-18. Anything else is
// reported in `exc` and left raw (see docs/figma/TOKEN-BINDING.md).
const PAGE = '476:3';
await figma.setCurrentPageAsync(page);
const SPID={2:'44:2',4:'1:530',6:'522:2',8:'1:531',12:'522:3',16:'1:532',20:'522:4',24:'1:533',32:'1:534',48:'44:3',64:'44:4',96:'44:5',128:'44:6'};
const RDID={2:'1:535',4:'1:536',6:'1:537',8:'1:538',12:'522:5',99:'1:539'};
const V={}; for (const id of new Set([...Object.values(SPID),...Object.values(RDID)])) V[id]=await figma.variables.getVariableByIdAsync('VariableID:'+id);
const TIGHT=/^(Chip|Pill|Tooltip|Badge|AttachmentPill|DisclosureBadge|MessageReaction|CitationChip|Kbd|Code|Mention|StatusDot)$/;
const SNAP={5:4,3:4,9:8,7:8,22:24,18:16};
function sp(v,kind,c){ if(SPID[v]) return v; if(v===10) return TIGHT.test(c)?8:12; if(v===14) return kind==='gap'?12:16; return SNAP[v]??null; }
function rd(v,n){ if(RDID[v]) return v; if(v===999) return 99; if(v>=Math.min(n.width,n.height)/2-0.5) return 99; return ({3:4,5:4,10:8,14:12,1:2})[v]??null; }
const res={exact:0,snapped:{},exc:{},errors:[]}; const snappedIds=new Set();
function bind(n,prop,v,to,kind,c,varId){ try{ n.setBoundVariable(prop,V[varId]); if(to===v) res.exact++; else { const k=c+'|'+kind+'|'+v+'>'+to; res.snapped[k]=(res.snapped[k]||0)+1; snappedIds.add(n.id);} }catch(e){ res.errors.push(n.id+' '+prop+' '+e.message); } }
function check(n,c){ const bv=n.boundVariables||{};
 const S=(prop,kind)=>{ const v=n[prop]; if(!v||bv[prop]) return; const to=sp(v,kind,c); if(to==null){ const k=c+'|'+kind+'|'+v; res.exc[k]=(res.exc[k]||0)+1; return;} bind(n,prop,v,to,kind,c,SPID[to]); };
 if('layoutMode' in n && n.layoutMode!=='NONE'){ for(const p of ['paddingLeft','paddingRight','paddingTop','paddingBottom']) S(p,'pad');
  if(n.primaryAxisAlignItems!=='SPACE_BETWEEN') S('itemSpacing','gap');
  if(n.layoutWrap==='WRAP') S('counterAxisSpacing','gap'); }
 if('topLeftRadius' in n) for(const p of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']){ const v=n[p]; if(!v||bv[p]) continue; const to=rd(v,n); if(to==null){ const k=c+'|rad|'+Math.round(v*100)/100; res.exc[k]=(res.exc[k]||0)+1; continue;} bind(n,p,v,to,'rad',c,RDID[to]); } }
function walk(n,c){ if(n.type==='INSTANCE') return; check(n,c); if('children' in n) for(const ch of n.children) walk(ch,c); }
const roots = page.findAllWithCriteria({types:['COMPONENT_SET','COMPONENT']}).filter(n=>n.type==='COMPONENT_SET'||n.parent.type!=='COMPONENT_SET');
for(const r of roots){ if(r.type==='COMPONENT_SET'){ for(const v of r.children) walk(v,r.name);} else walk(r,r.name); }
return {page:page.name, ...res, snappedNodeIds:[...snappedIds]};
