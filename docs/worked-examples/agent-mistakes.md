# What agents got wrong building these screens

Mistakes made, or caught just before they shipped, while an AI agent built the seven worked examples from the specs. Each one is a candidate spec rule. "Where it bites" says which check would have caught it, or that none did.

| # | Mistake | Where it bites | Proposed rule |
|---|---|---|---|
| 1 | **Guessed prop names.** Wrote `<ContextMeter used limit>`. The prop is `total`. | `tsc` only. The specs list exports, not props. | Add a `props:` block to spec frontmatter (name, type, required) generated from the TSX, so agents read it instead of guessing. |
| 2 | **Invented a "PropertyPanel" for issue/page fields** (trackers and workspaces). `DescriptionList` already does it when its `detail` is a control. | Nothing. A new wrapper passes every gate. | In `description-list` spec: `slots: detail: [Select, DateInput, Avatar, Badge, Group, Text, TagsInput]`, plus a "Use for editable field panels" line. |
| 3 | **Put a block inside an inline slot.** `ToolCallCard result={<JsonViewer/>}`: `result` renders inside a Mantine `Text` (`<p>`), so a `<div>` inside it is invalid HTML. | Nothing at build time. A React hydration warning at runtime. | Specs mark slot *content model*: `result: inline` vs `block`. Longer term, render `result` in a `div`. |
| 4 | **Used `StatusDot` as a bare dot** beside a column title. It always renders its own text label, so the status appears twice. | Nothing. Visible only on screen. | `status-dot` spec: "Renders its own label; pass `label`, don't add text next to it." |
| 5 | **Text coloured with `feedback.*` tokens.** `feedback.success` (#16a34a) and `feedback.error` are fill/icon colours. As small text they fail AA on white or tinted rows. Found in existing `Stat` (fixed here) and nearly repeated in `TraceTree`. | axe `color-contrast`, but only for stories that render the state. | `validate:token-intent`: a component token whose role is text (`*-fg`, `label`, `delta-*`, `count`) must reference `text.*`, not `feedback.*`. |
| 6 | **`text.tertiary` on `surface.subtle`** (4.28:1) for counts and empty labels inside tinted columns. | axe, if a story renders it. | Token-intent pairing rule: `text.tertiary` is only allowed on `surface.default`/`elevated`. |
| 7 | **Raw sizes in inline styles** (`gap: 12`, `padding: '4px 8px'`, `borderRadius: 4`) in all five new components. | `validate:raw-sizes`. ✅ Caught. | Already a rule. Add it to AGENTS.md "Workflow: adding a component" so it's checked before, not after. |
| 8 | **Exported test data from a story file** (`export const sampleTrace`). Storybook reads every export as a story, so the smoke test failed. | test-runner. ✅ Caught. | AGENTS.md: story files export only `default` and stories. Put data in a non-exported const. |
| 9 | **Reached for `@mantine/core` for layout** (AppShell, NavLink, `useTree`, `TableOfContents`) because Clementine doesn't export them. | Nothing, if the agent imports Mantine directly. | Either export them with specs (gap list #1 and #5) or add an ESLint rule banning `@mantine/core` imports outside `packages/ui`. |
| 10 | **`variant="unstyled"` on `Select` isn't unstyled.** The theme still draws the input border, so an inline field panel looks like a form. | Nothing. Visual only. | Decide in the `select` spec whether `unstyled` is a supported variant, and paint it or remove it. |

## Which to turn into rules first

1. **#5 and #6.** Mechanical, and they catch real AA failures that already shipped (`Stat`).
2. **#1.** Generate `props:` into specs. The biggest source of wrong first drafts.
3. **#3.** Slot content models (inline/block) fit naturally into the `slots:` contract the slot-nesting rule already reads.
