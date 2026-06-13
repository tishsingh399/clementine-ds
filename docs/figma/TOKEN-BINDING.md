# Figma token binding & cleanup (2026-06-13)

How the Figma file (`w4JB0MOEIzOtSKx5Y3YSQR`) was brought into token compliance,
and how to reproduce it. Done via the **Figma Console MCP** (Desktop Bridge plugin),
which exposes the full Plugin API with a 30s ceiling — the earlier `figma-cli`
daemon kept timing out and binding to the wrong same-named file, so it was retired.

## What was wrong

The file had grown to 14 pages built across several sessions/tools. A full-tree
audit found **~4,000 paints using raw hex** instead of bound variables. Two causes:

1. **Off-by-a-few hexes** — the work-machine generator emitted values like
   `#1a1a1f` (vs `text.primary #1a1a18`), `#e5e3e0` (vs `border.default #e5e5e0`),
   `#faf8f5` (vs `surface.default #fafaf8`). Visually identical, not bound.
2. **Tailwind defaults** — the newest pages (Organisms, Templates, Patterns,
   Documentation) were built with Tailwind grays/slates (`#4b5563`, `#9ca3af`,
   `#334155`, `#78716c`) that aren't in the Clementine palette at all.

## The fix — two passes

**Pass 1 · exact-match bind.** Build a `hex → variable` map by resolving every
COLOR variable's alias chain to its Light-mode hex (semantic preferred over
primitive over component). Walk each page; any unbound SOLID paint whose hex
exactly matches a variable gets `setBoundVariableForPaint`. Cleared the
off-by-zero cases and all literal-Clementine usage.

**Pass 2 · nearest-color snap.** For the off-palette remainder, compute RGB
euclidean distance to every semantic/primitive variable; bind to the nearest
within a threshold (30, raised to 40 for a cleanup pass). This snaps Tailwind
grays and off-by-a-few values to their true Clementine token while **leaving
genuinely off-brand colors untouched** (emerald `#10b981`, violet `#8b5cf6`,
amber `#f59e0b`, teal `#a3ccd1` are all 55+ away from any neutral, so they never
mis-snap).

### Result

| | Before | After |
|---|---|---|
| Paints bound to variables | ~1,800 | **5,804** |
| Stray raw-hex paints | ~4,000 | **37** |
| Coverage | ~31% | **99%** |

The 37 holdouts are intentional off-brand decoratives (status/illustration
swatches on Foundations + a few accents). They are reported, not force-mapped —
inventing Clementine tokens for off-brand hex would pollute the palette.

## Componentization

"Create components of just frames" — converted the **14 reusable frames** that
were sitting as plain `FRAME`s into real Components:

- **Organisms (8):** Navbar, Footer, Sidebar+AppShell Layout, AppShell Top Bar,
  AppShell Content Area, DataGrid (×2), CommandPalette
- **Templates (6):** Login, Settings, Dashboard, List/Table, Error 404, Error 500

Each got a `description` linking it to its React composition (e.g. *"Dashboard
template · composition of Stat/Chart/Sparkline/Card/Table"*).

**Left as frames on purpose:** the Patterns and Documentation pages hold
*showcase/canvas/doc boards* (`patterns-canvas`, `clementine-docs-canvas`,
`doc-developer-guide`) — these are demos and reference material, not instantiable
components. Componentizing them would be wrong.

## Reproduce

1. `npm i && npm run build:local` in `figma-console-mcp`, then register:
   `claude mcp add --scope user figma-console -- node /abs/path/figma-console-mcp/dist/local.js`
2. In Figma Desktop, run **Plugins → Development → Figma Desktop Bridge** in the
   target file. Confirm with `figma_get_status { probe: true }` (file key must be
   `w4JB0MOEIzOtSKx5Y3YSQR`).
3. Run the bind/snap passes via `figma_execute` (the self-contained scripts used
   here resolve alias chains, prefer semantic tier, and report unmatched hexes).
   Work page-by-page to stay under the 30s ceiling; the Documentation page alone
   has 2,163 nodes.
4. Validate with `figma_capture_screenshot` (plugin export — reflects live state)
   after each batch.

> **Note on two same-named files.** A second "Clementine DS" draft exists. Every
> write script begins with a page-count guard (`if (figma.root.children.length < 9)
> return 'ABORT'`) so a stray plugin connection to the 1-page draft can't take the
> writes. Keep the Desktop Bridge open only in the 14-page canonical file.
