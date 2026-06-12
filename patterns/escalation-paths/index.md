# Pattern · Escalation paths

> Tray 3 · **Governance pattern.** When the agent is uncertain or blocked, it routes to a human cleanly.

## Problem it solves

When the agent is uncertain or blocked, it routes to a human cleanly.

## Approach

- Detect uncertainty / blocked / out-of-scope states.
- Offer a clear hand-off to a human with context attached.
- Preserve the thread for the human to resume.

## Built from

- RefusalState
- HITLGate
- AgentStatus (waiting)
- PermissionRequest

## Do / Don't

**Do:** Route to a human with full context; Make escalation a first-class, visible path.

**Don't:** Dead-end the user when blocked; Loop on a task the agent cannot complete.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
