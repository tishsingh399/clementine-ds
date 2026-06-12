# Pattern · Trust calibration

> Tray 3 · **Governance pattern.** Designs against both over-trust (automation complacency) and under-trust (ignored agent).

## Problem it solves

Designs against both over-trust (automation complacency) and under-trust (ignored agent).

## Approach

- Communicate confidence honestly (no fake precision).
- Prompt verification on low-confidence or high-stakes output.
- Make the agent's limits legible.

## Built from

- ConfidenceMeter
- RefusalState
- CitationChip
- ReasoningTrace

## Do / Don't

**Do:** Calibrate confidence honestly; Prompt verification when it matters.

**Don't:** Fake precision; Present uncertain output as authoritative.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
