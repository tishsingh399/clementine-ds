# Accessibility Lens

Use for customer-facing components, AI surfaces, patterns, and the Observatory playground.

## Check

| Area | Clementine expectation |
|---|---|
| Keyboard | Every interactive element is reachable, ordered, and escapable. |
| Focus | Focus indicator is visible and token-backed. |
| Semantics | Native HTML first; ARIA only where native HTML is insufficient. |
| Labels | Icon-only controls, generated content actions, and inputs have programmatic names. |
| Target size | Pointer targets are at least 44x44px, or have enough spacing to be reliably tapped. |
| Contrast | Text, UI boundaries, state indicators, and focus rings meet WCAG 2.2 AA. |
| Reduced motion | Motion-heavy states respect `prefers-reduced-motion`. |

## PR Note Format

```md
Accessibility lens:
- Keyboard:
- Focus:
- Labels/ARIA:
- Contrast:
- Remaining risk:
```

## Automatic Escalation

Escalate to blocking review when a change touches:

- `required_aria`
- focus management
- modal, drawer, popover, menu, tabs, or tooltip behavior
- AI permission, approval, disclosure, citation, or provenance surfaces
