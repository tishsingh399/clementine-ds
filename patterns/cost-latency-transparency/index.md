# Pattern · Cost & latency transparency

> Tray 3 · **Agentic pattern.** Surfaces token usage, cost, and elapsed time — especially where usage is billable and audited.

## Problem it solves

Surfaces token usage, cost, and elapsed time — especially where usage is billable and audited.

## Approach

- Show per-run tokens / cost / latency.
- Aggregate to a session/period total where relevant.
- Warn before expensive operations.

## Built from

- CostMeter
- ContextMeter
- AgentStatus

## Do / Don't

**Do:** Show cost where it is billed; Keep estimates honest and labeled.

**Don't:** Hide cost from billable users; Imply false precision.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
