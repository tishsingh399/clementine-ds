# Disclosure copy

AI involvement is **always disclosed**. Never let a user mistake generated content for verified fact or human action.

| Context | Copy | Component |
|---|---|---|
| Generated content marker | "AI-generated" | `DisclosureBadge` |
| Assisted (human in loop) | "AI-assisted" | `DisclosureBadge label="AI-assisted"` |
| May be wrong | "AI can make mistakes — verify important info." | footer line under `Composer` |
| Sourced claim | inline `[n]` linking to source | `CitationChip` |
| Action on your behalf | "I'll do X. Approve first?" | `HITLGate` |

## Rules
1. Disclosure is **visible**, not buried in a tooltip or settings page.
2. Consequential or destructive actions get an explicit **approval** step ([HITLGate](../specs/hitl-gate/index.md)), not just a disclosure.
3. Claims of fact carry **provenance** (`CitationChip`) wherever a source exists.
4. Never imply certainty the model doesn't have.
