# Pattern · Attribution & auditability

> Tray 3 · **Governance pattern.** Every agent action is logged, attributable to a principal, and replayable.

## Problem it solves

Every agent action is logged, attributable to a principal, and replayable.

## Approach

- Give every message + action a stable id.
- Record actor, action, scope, timestamp, model/prompt version.
- Make runs replayable from the trace.

## Built from

- ToolCallCard
- PlanSteps
- AgentStatus
- model-prompt-registry.json

## Do / Don't

**Do:** Log every action attributable to a principal; Capture model + prompt version with each action.

**Don't:** Allow unattributable agent actions; Drop the audit trail for autonomous steps.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
