# tina-ds — an agentic design system

A small, opinionated React design system that ships with **machine-readable specs** for every component. Built so AI agents (Claude, Cursor, Copilot, MCP servers) can read the contract, validate against it, and extend the system without hallucinating tokens or breaking accessibility.

> Most design systems ship code + Storybook and hope documentation keeps up. This one ships a third artifact — `/specs/<component>/` — that an agent can load and treat as the source of truth. See [AGENTS.md](./AGENTS.md) for the full architecture.

## What's inside

| Package | What |
|---|---|
| [`packages/tokens`](./packages/tokens) | Style Dictionary source: primitives → semantic-light → semantic-dark |
| [`packages/ui`](./packages/ui) | 10 React components, Mantine-backed |
| [`apps/storybook`](./apps/storybook) | Live component sandbox |
| [`specs/`](./specs) | ⭐ Per-component agentic specs (frontmatter contract + closed token list) |
| [`_templates/`](./_templates) | Scaffolding for new specs |
| [`guidelines/`](./guidelines) | Cross-cutting design principles |

## Components

| Component | Status | Spec |
|---|---|---|
| Button | AI-Ready | [specs/button](./specs/button/index.md) |
| Badge | Draft | [specs/badge](./specs/badge/index.md) |
| Checkbox | Draft | [specs/checkbox](./specs/checkbox/index.md) |
| Modal | Draft | [specs/modal](./specs/modal/index.md) |
| Radio | Draft | [specs/radio](./specs/radio/index.md) |
| Select | Draft | [specs/select](./specs/select/index.md) |
| Switch | Draft | [specs/switch](./specs/switch/index.md) |
| Tabs | Draft | [specs/tabs](./specs/tabs/index.md) |
| TextInput | Draft | [specs/text-input](./specs/text-input/index.md) |
| Textarea | Draft | [specs/textarea](./specs/textarea/index.md) |

`AI-Ready` means: every interaction state has a Storybook story, every visual value comes from a declared token, and the spec has been reconciled with the code on `last_verified`.

## Quick start

```bash
pnpm install
pnpm storybook         # http://localhost:6006
pnpm build             # build all packages
```

## Why agentic?

When an AI agent (Claude Code, Cursor, an MCP server) is asked to build a screen using this system, the failure modes are predictable:

- Invents tokens that don't exist (`color.brand.primary`)
- Misses required ARIA (focus ring, `aria-busy` on loading)
- Skips an interaction state (focus, disabled, loading)
- Picks the wrong variant for the context

The specs in `/specs/` are designed to eliminate those failures by making the contract explicit and closed:

- **Closed token list** — `specs/<component>/tokens.json` is the complete set of tokens that component may use. Anything else is a lint failure.
- **Named parts** — every token must target a declared region (`root`, `label`, `icon-leading`).
- **Required states** — `interaction_states:` enumerates what must exist in code + stories.
- **Source pointers** — the spec tells the agent exactly which file to open.

The agent reads the spec first, then writes the code. Reverse-engineering from a hex value or a screenshot is no longer needed.

## How to extend

See [AGENTS.md § Workflow: adding a new component](./AGENTS.md#workflow-adding-a-new-component).

Short version:

1. Copy `_templates/component.md.template` → `specs/<name>/index.md`
2. Fill `semantic_parts` + `interaction_states` first
3. Build `tokens.json` from existing semantic tokens (extend `semantic-*.json` if you need new ones — never inline a hex)
4. Implement against the spec in `packages/ui/src/components/`
5. Add a Storybook story per state
6. Flip `status: AI-Ready` when all `checks:` are `true`

## License

MIT — see [LICENSE](./LICENSE).

---

Built by [Tina Singh](https://github.com/tishsingh399). Working on agentic design tooling at the design ↔ code boundary.
