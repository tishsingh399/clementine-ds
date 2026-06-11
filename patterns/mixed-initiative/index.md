# Pattern · Mixed-initiative / autonomy spectrum

> Tray 3 · **Agentic pattern.** Lets the user dial how much the agent does alone — Suggest → Ask → Act — instead of a fixed level of autonomy.

## Problem it solves

Lets the user dial how much the agent does alone — Suggest → Ask → Act — instead of a fixed level of autonomy.

## Approach

- Offer a per-task or global autonomy setting (suggest only / ask first / act autonomously).
- At "ask first", route consequential steps through a HITLGate or PermissionRequest.
- Show the current mode plainly; make it changeable mid-task.

## Built from

- HITLGate
- PermissionRequest
- AgentStatus
- SegmentedControl (mode switch)

## Do / Don't

**Do:** Default to the least-autonomous mode for consequential domains; Make the active autonomy level visible; Let users change it without restarting the task.

**Don't:** Hide the autonomy level; Act autonomously on irreversible actions by default.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
