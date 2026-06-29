---
component: accordion
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-expanded, aria-controls, aria-labelledby]

semantic_parts:
  root:    The Accordion wrapper — owns variant and spacing
  item:    A single collapsible section
  control: The header — a native <button> that toggles the panel
  chevron: The rotation indicator on the control
  panel:   The collapsible region revealed by the control
  label:   The control's text content

token_contract:
  - accordion.bg
  - accordion.bg-hover
  - accordion.border
  - accordion.fg.label
  - accordion.fg.content
  - accordion.fg.chevron
  - accordion.border-focus
  - accordion.radius

interaction_states: [collapsed, expanded, hover, focus, disabled]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Accordion.tsx
    underlying_library: mantine
    exports: [Accordion, AccordionItem, AccordionControl, AccordionPanel, AccordionProps, AccordionItemProps, AccordionControlProps, AccordionPanelProps]
  storybook:
    path: apps/storybook/stories/Accordion.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/accordion.json

patterns_used_in: [progressive-disclosure, faq, settings-groups]
pages_used_in: [settings, help, onboarding]
---

# AGENTIC DOCUMENTATION: ACCORDION

> **Implementation:** [`packages/ui/src/components/Accordion.tsx`](../../packages/ui/src/components/Accordion.tsx) — re-exports Mantine `Accordion` and its `Item` / `Control` / `Panel` parts. House default variant is `separated`.

## 1. Purpose & Intent

Progressive disclosure for a stack of independent sections — FAQs, grouped settings, long forms. Lets users scan headers and open only what they need.

**Accordion must:**

- render each control as a native `<button>` exposing `aria-expanded`
- link each control to its panel via `aria-controls`, and the panel back via `aria-labelledby`
- be operable by keyboard: Enter/Space toggles, Tab moves between controls
- communicate open/closed with the chevron rotation AND the revealed panel — never chevron color alone
- allow single-open (default) or `multiple` open sections, never silently both

## 2. Required Contract

### 2.1 Required ARIA (Mantine wires these — keep them)

| Attribute | Where | Value |
|---|---|---|
| `aria-expanded` | control | `true` / `false` |
| `aria-controls` | control | the panel's id |
| `aria-labelledby` | panel (`role="region"`) | the control's id |
| `disabled` | control | when the item is disabled |

### 2.2 Required structure

```html
<div class="accordion">
  <div class="accordion__item">
    <h3>
      <button class="accordion__control" aria-expanded="true" aria-controls="p1">
        Label <span class="accordion__chevron">▸</span>
      </button>
    </h3>
    <div id="p1" role="region" class="accordion__panel">…</div>
  </div>
</div>
```

### 2.3 Required token bindings

| Part | State | Token | Resolves (light) |
|---|---|---|---|
| item fill | default | `accordion.bg` → `{surface.default}` | `#fafaf8` |
| control fill | hover | `accordion.bg-hover` → `{surface.subtle}` | `#f3f3f0` |
| item border | default | `accordion.border` → `{border.default}` | `#e5e5e0` |
| label | default | `accordion.fg.label` → `{text.primary}` | `#1a1a18` |
| panel text | default | `accordion.fg.content` → `{text.secondary}` | `#6b6b66` |
| chevron | default | `accordion.fg.chevron` → `{text.secondary}` | `#6b6b66` |
| control | focus | `accordion.border-focus` → `{focus.ring}` | `#ff8040` |
| corners | — | `accordion.radius` → `{radius.md}` | `6px` |

## 3. Interaction States

| State | Visual change | Token |
|---|---|---|
| collapsed | panel hidden, chevron at rest | `accordion.bg` |
| expanded | panel visible, chevron rotated | `accordion.bg`, `accordion.fg.content` |
| hover | control fill shifts | `accordion.bg-hover` |
| focus | 2px ring on the control | `accordion.border-focus` |
| disabled | control dimmed, not focusable | `{text.tertiary}` |

## 4. Variants

`default` · `contained` · `filled` · `separated` (house default). `multiple` enables more than one open section; `chevronPosition` flips the indicator side.

## 5. Do / Don't

**Do:**
- Keep control labels to a scannable phrase
- Default the most-likely section open (`defaultValue`)
- Use `multiple` for independent settings groups

**Don't:**
- Put an accordion inside an accordion — flatten or use Tabs
- Hide critical, always-needed content behind a collapsed panel
- Animate the chevron only — the panel reveal is the real signal

## 6. Agent Notes

1. Don't replace the control `<button>` with a `<div onClick>` — you'll lose `aria-expanded` and keyboard support.
2. Story names map to `interaction_states` / variants; add one per new variant.
3. All paint is `accordion.*` → semantic → primitive. No inline hex.
