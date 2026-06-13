# Figma ↔ Storybook parity pass (2026-06-13)

The Figma file (`w4JB0MOEIzOtSKx5Y3YSQR`) had drifted from Storybook on three
axes — contrast, the primary-action color, and dark mode. This pass reconciled
all three, done via the **Figma Console MCP** (Desktop Bridge plugin). Every
write script begins with the page-count guard (`if (figma.root.children.length
< 9) return 'ABORT'`) so a stray connection to the 1-page draft can't take the
writes.

## 1 · Full-file contrast audit → 0 real failures

Rather than eyeballing, the pass resolved **every text node** to its rendered
color and effective background (walking up to the nearest filled ancestor,
compositing alpha over white, resolving each bound variable to its Light-mode
hex) and computed WCAG 2.1 contrast. Thresholds: 4.5:1 normal text, 3:1 large
(≥24px, or ≥18.66px bold).

**277 text nodes failed.** The dominant bug: text bound to `#d6d6d6` — a
near-invisible light gray (a generator had bound body copy, names, stats, and
headings to a *border/gray* primitive instead of a text token). It was
everywhere: Templates (106), Dates (40), Patterns (40), Organisms (39).

Fixes, all at the token tier (re-bound via `setBoundVariableForPaint`, cascade
preserved):

| Symptom | Count | Fix |
|---|---|---|
| Light-gray text on light surface (`#d6d6d6`) | 197 | → `text.primary` |
| Text on a dark/colored fill | 71 | → `text.on-action` (white) |
| White-on-color CTAs / selected states / avatars failing AA | 55 | bg → `action.primary` (see §2) |

Re-audit after the pass: **0 real failures** across all 12 content pages.

## 2 · Primary action color: orange → blue (match Storybook)

Storybook's primary button is **blue** (`primaryColor: 'blue'`,
`action.primary = {color.blue.6}`). But dozens of Figma CTAs had been
hand-built in **orange** — and worse, bound to `feedback/warning` used as a
generic orange. White-on-orange (`#ea580c`) is only 3.56:1 (fails AA for
normal text). Every such CTA, selected state, calendar-selected day, nav-active
item, and avatar was re-bound to `action.primary` (blue, white-on-blue = 5.17:1
✓). Real warning *alerts* were untouched — they use dark text on a subtle fill,
so they never appeared in the white-on-color failure set.

Orange remains the brand accent (logo, hero shapes, links) — it is no longer
misused as the primary-action fill.

### Secondary / cancel buttons

The "Cancel / Clear filters / Contact support / Continue with SSO" buttons were
rendering **muted gray text on a translucent-scrim fill** (`surface/overlay` +
`color/gray/7`) — barely legible. Re-bound to the canonical outline-secondary
recipe from `button.json`: `surface.elevated` fill + `border.strong` stroke +
`text.primary` label.

## 3 · Dark mode, side-by-side

Storybook has a light/dark toggle; Figma showed light only. The component pages
hold **main components** (186 on Actions alone), so cloning them would have
duplicated the library. Instead, each page got a **dark companion frame** placed
to the right, pinned to the Semantic collection's **Dark** mode
(`setExplicitVariableModeForCollection`), filled with **instances** of that
page's components mirrored to their light-side positions. Instances inherit the
parent frame's mode, so every bound paint reflows to dark — no library
pollution, no token drift.

Dark companions added to: Actions & Inputs, Containment & Navigation, Display &
Feedback, AI Surfaces, Enterprise, Trust & Safety, Dates · Charts · Motion,
Organisms, Templates, Patterns.

## Reproduce

The audit + fix scripts are self-contained `figma_execute` payloads (resolve
alias chains → Light hex, composite alpha, compute WCAG, re-bind failures).
Run page-by-page to stay under the 30s ceiling. Validate each batch with
`figma_capture_screenshot` (plugin export reflects live state). The code-side
companion is [`scripts/contrast-audit.mjs`](../../scripts/contrast-audit.mjs),
which runs the same WCAG math over the token JSON in CI.
