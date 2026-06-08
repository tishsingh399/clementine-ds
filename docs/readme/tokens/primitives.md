# Primitives

[Source](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/primitives.json)

## Overview

Tier 1 of the cascade. Raw scales with no intent. Every value here is a literal hex, pixel, or number.

## What you can use

| Group | Scale | Notes |
|---|---|---|
| `color.blue` | 0 through 9 | Cool, used for primary action |
| `color.red` | 0 through 9 | Error, destructive |
| `color.gray` | 0 through 9 | Surface, text, borders |
| `color.green` | 0 through 9 | Success |
| `color.orange` | 0 through 9 | Warning, the Clementine accent |
| `color.white`, `color.black` | n/a | Literal |
| `radius` | xs, sm, md, lg, xl | 2px, 4px, 8px, 12px, 16px |
| `spacing` | xs, sm, md, lg, xl | 4px, 8px, 16px, 24px, 32px |
| `shadow` | xs, sm, md, lg, xl | Elevation scale |
| `typography.font-family` | sans, mono | System stack |
| `typography.font-size` | xs through xl | Type scale |
| `typography.line-height` | xs through xl | Paired with font-size |

## Rule: do not reference primitives from components

If you are editing a file in `packages/tokens/src/components/`, you cannot use a primitive on the right side of `$value`. The cascade requires the semantic tier in between.

```json
// WRONG, component file referencing primitive
{ "button": { "bg": { "default": { "$value": "{color.blue.6}" } } } }

// RIGHT, component file referencing semantic
{ "button": { "bg": { "default": { "$value": "{action.primary}" } } } }
```

## When to add a new primitive

You almost never need to. The existing scales cover the visual surface area for a small system. Cases where you might:

- A new color family the design language requires (a brand accent that does not fit any existing scale)
- An additional step at the top or bottom of an existing scale (a tint lighter than `color.blue.0`)

If you add one, the workflow is the same as any other change: extend `primitives.json`, run the build, add a semantic that uses it, add a component token that references the semantic.

## Related

- [Semantic tokens](./semantic.md)
- [The cascade rule](./the-cascade-rule.md)
