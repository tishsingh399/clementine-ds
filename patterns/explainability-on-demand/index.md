# Pattern · Explainability on demand

> Tray 3 · **Agentic pattern.** Makes "why did you do that?" reachable from any agent action without cluttering the default view.

## Problem it solves

Makes "why did you do that?" reachable from any agent action without cluttering the default view.

## Approach

- Keep reasoning collapsed by default; one tap to expand.
- Attach the trace + tool calls to the action that produced them.
- Link claims to sources.

## Built from

- ReasoningTrace
- ToolCallCard
- CitationChip
- SourcesPanel

## Do / Don't

**Do:** Make the trace reachable from any action; Default to the answer, reveal reasoning on demand.

**Don't:** Force the trace on everyone; Hide how a consequential action was decided.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
