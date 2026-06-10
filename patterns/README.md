# Patterns

Patterns are **compositions of components** that solve recurring UX problems. They sit one level above components in the cascade.

## How patterns differ from components

| | Component | Pattern |
|---|---|---|
| What it is | A single UI element | A composition of 2+ components |
| Owns tokens | Yes (`<component>.json` in `packages/tokens/src/components/`) | No — inherits from its children |
| Has a spec | Yes (`specs/<name>/`) | Yes (`patterns/<name>/index.md`) |
| Validator runs | `agentic-spec validate specs/*` | `agentic-spec validate patterns/*` (future — same shape) |
| Storybook location | `apps/storybook/stories/<Name>.stories.tsx` | `apps/storybook/stories/patterns/<Name>.stories.tsx` |

## Currently shipped

| Pattern | Composes | Status |
|---|---|---|
| [form-field](./form-field/index.md) | TextInput / Select / Checkbox / Radio / Switch + Label + Helper + Error | AI-Ready |
| [action-bar](./action-bar/index.md) | Button × 1-3 | AI-Ready |
| [confirm-dialog](./confirm-dialog/index.md) | Modal + ActionBar + Button | AI-Ready |

## Pending

| Pattern | What it composes | Why useful |
|---|---|---|
| `data-table-row` | Badge + Button + Menu | Standard list-item row |
| `empty-state` | Heading + Body + ActionBar | What to show when a list is empty |
| `page-header` | Heading + Badge + ActionBar + Breadcrumb | Top-of-page layout |
| `filter-bar` | TextInput + Select + Button + Badge | Sits above tables |
| `nav-shell` | (TBD — needs Sidebar component) | App-wide chrome |

## The pattern composition rule

> **A pattern only references components that already exist as specs with `status: AI-Ready` or `In progress`.**

You cannot compose a pattern from a `Draft` component because the underlying contract isn't stable. The validator (once `agentic-spec validate patterns/*` ships) will enforce this.

## How an AI agent uses patterns

When asked to build a screen:

1. Identify the high-level intent (login form, settings page, confirm-delete flow)
2. Match to a pattern. If none fits, fall back to assembling components manually.
3. The pattern's spec tells the agent which components to use, their composition rules, and the closed token contract.

Patterns prevent the agent from inventing layouts that drift from the system.
