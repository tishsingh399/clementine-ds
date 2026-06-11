# Pattern · Reversibility / least-consequence default

> Tray 3 · **Governance pattern.** Destructive agent actions are gated and undoable; the default path is the least consequential.

## Problem it solves

Destructive agent actions are gated and undoable; the default path is the least consequential.

## Approach

- Gate irreversible actions behind explicit approval.
- Offer undo for reversible ones.
- Default to the least-consequence option.

## Built from

- HITLGate
- UndoBar
- PermissionRequest

## Do / Don't

**Do:** Gate destructive actions; offer undo where possible; Default to least consequence.

**Don't:** Run irreversible actions without a gate; Offer Undo for things that cannot be undone.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
