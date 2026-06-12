# Pattern · Steerability

> Tray 3 · **Agentic pattern.** Gives users explicit controls over tone, length, format, and constraints — not just the prompt.

## Problem it solves

Gives users explicit controls over tone, length, format, and constraints — not just the prompt.

## Approach

- Expose tone/length/format controls near the composer.
- Persist user-set constraints across turns.
- Reflect active constraints visibly.

## Built from

- Composer
- SegmentedControl
- Chip
- PromptSuggestions

## Do / Don't

**Do:** Offer first-class controls for tone/length/format; Persist + show active constraints.

**Don't:** Bury steering in the prompt only; Reset constraints silently each turn.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
