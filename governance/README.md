# Tray 9 · Kit governance

> Carried over from any mature design system — but AI makes it harder, because the kit now also governs **models and prompts**, not just tokens and components.

## Classic governance (in place)
| Concern | How |
|---|---|
| Versioning | semver on `@clementine-ds/*`; `ds_version` pinned in every spec |
| Token pipeline | Style Dictionary (`packages/tokens` → `dist`) |
| Component contract | `specs/<component>/` validated by `agentic-spec` |
| CI / security | GitHub Actions, CodeQL, Dependabot |
| Docs | Storybook + Mintlify + this repo |
| Milestone proof | [`MILESTONE.md`](../MILESTONE.md) + [`docs/governance-proof.html`](../docs/governance-proof.html) |

## AI-era governance (net-new)
| Concern | How |
|---|---|
| **Model/prompt registry** | [`model-prompt-registry.json`](./model-prompt-registry.json) — which model + prompt version each AI surface was built and verified against |
| **Agentic indexes** | [`agentic-indexes/`](./agentic-indexes/) — generated intent and impact maps from `specs/` |
| **Review lenses** | [`review-lenses/`](./review-lenses/) — human review rubrics for a11y, copy/trust language, edge states, motion, and first-user clarity |
| **System health** | [`system-health-scorecard.md`](./system-health-scorecard.md) — release review frame across cascade, specs, parity, a11y, trust, and feedback |
| **Code Connect** | map Figma AI components ↔ code (planned; see below) |
| **Disclosure & provenance** | enforced via [content/disclosure-copy.md](../content/disclosure-copy.md) + `DisclosureBadge` / `CitationChip` |
| **Least privilege** | agent actions gated by `HITLGate`; tool scopes documented per surface |

## Extending the contract for AI
Each AI surface's spec adds two fields beyond the standard frontmatter:
- `model_baseline` — the model id it was tuned/verified against
- `prompt_version` — the prompt template version

These mirror `ds_version`: when the model or prompt changes, the surface is re-verified the same way a token change re-verifies a component.

## Agentic indexes
`pnpm agentic:indexes` generates two repo-native reasoning files:

- `agentic-indexes/component-intent-map.json` — component intent, usage guidance, parts, states, ARIA, token contracts, and sources.
- `agentic-indexes/knowledge-graph.json` — impact graph from components to tokens, source files, patterns, pages, and review lenses.

Agents use these after reading the relevant spec, not instead of it. If an index looks wrong, fix the source spec.

## Code Connect (planned)
Figma → code mapping for the AI tray, so the Clementine DS Figma file stays in lockstep with `packages/ui/src/components/ai/`. Tracked in Wave 6 of [AI-READY-ARCHITECTURE.md](../AI-READY-ARCHITECTURE.md).
