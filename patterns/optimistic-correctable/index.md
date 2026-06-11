# Pattern · Optimistic + correctable output

> Tray 3 · **Agentic pattern.** Lets users edit and steer the agent's output rather than re-prompting from scratch.

## Problem it solves

Lets users edit and steer the agent's output rather than re-prompting from scratch.

## Approach

- Render output as editable, not final.
- Offer inline correction that the agent continues from.
- Keep an undo path for applied changes.

## Built from

- DiffView
- MessageActions (edit/regenerate)
- UndoBar
- Composer

## Do / Don't

**Do:** Let users edit and continue from the correction; Show what changed (DiffView); Keep edits reversible.

**Don't:** Force a full re-prompt to fix a small error; Apply edits with no undo.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
