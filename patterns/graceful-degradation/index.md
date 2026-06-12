# Pattern · Graceful degradation / fallback

> Tray 3 · **Agentic pattern.** When the model is down or degraded, route to a cached, simpler, or manual path — never a dead end.

## Problem it solves

When the model is down or degraded, route to a cached, simpler, or manual path — never a dead end.

## Approach

- Detect model-unavailable / timeout / rate-limit states explicitly.
- Offer a fallback: cached result, simpler model, or manual workflow.
- Tell the user what changed and what they can still do.

## Built from

- Alert
- AgentStatus
- ModelSelector
- Notification

## Do / Don't

**Do:** Provide a working fallback path; Name the degraded state + ETA if known.

**Don't:** Show a dead-end error; Silently fail or hang.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
