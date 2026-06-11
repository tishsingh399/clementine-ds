# Pattern · Least-privilege agent permissions

> Tray 3 · **Governance pattern.** Agent access is scoped, time-boxed, and explicitly granted — mapping directly to privileged-access principles.

## Problem it solves

Agent access is scoped, time-boxed, and explicitly granted — mapping directly to privileged-access principles.

## Approach

- Request only the scope needed, when needed.
- Make grants explicit, scoped, and expiring.
- Show and allow revocation of standing grants.

## Built from

- PermissionRequest
- HITLGate
- Badge (scope)
- Tree (resource scope)

## Do / Don't

**Do:** Request minimal scope, just-in-time; Make grants explicit + expiring + revocable.

**Don't:** Request broad standing access by default; Bundle unrelated permissions into one grant.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
