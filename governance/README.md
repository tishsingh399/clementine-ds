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
| **Code Connect** | map Figma AI components ↔ code (planned; see below) |
| **Disclosure & provenance** | enforced via [content/disclosure-copy.md](../content/disclosure-copy.md) + `DisclosureBadge` / `CitationChip` |
| **Least privilege** | agent actions gated by `HITLGate`; tool scopes documented per surface |

## Extending the contract for AI
Each AI surface's spec adds two fields beyond the standard frontmatter:
- `model_baseline` — the model id it was tuned/verified against
- `prompt_version` — the prompt template version

These mirror `ds_version`: when the model or prompt changes, the surface is re-verified the same way a token change re-verifies a component.

## Code Connect (planned)
Figma → code mapping for the AI tray, so the Clementine DS Figma file stays in lockstep with `packages/ui/src/components/ai/`. Tracked in Wave 6 of [AI-READY-ARCHITECTURE.md](../AI-READY-ARCHITECTURE.md).
