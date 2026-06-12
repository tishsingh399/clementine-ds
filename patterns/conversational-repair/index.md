# Pattern · Conversational repair

> Tray 3 · **Agentic pattern.** Recovers from misunderstanding: the agent asks clarifying questions; the user corrects mid-stream.

## Problem it solves

Recovers from misunderstanding: the agent asks clarifying questions; the user corrects mid-stream.

## Approach

- When confidence is low or input is ambiguous, ask a focused clarifying question instead of guessing.
- Accept mid-stream correction and incorporate it.
- Preserve context so the user need not repeat themselves.

## Built from

- Message
- Composer
- ConfidenceMeter
- RefusalState

## Do / Don't

**Do:** Ask one precise clarifying question when ambiguous; Incorporate corrections without losing context.

**Don't:** Guess confidently when unsure; Make the user restate everything to correct one detail.

## Related

- [Behavior & state model](../../behaviors/README.md)
- [Trust, safety & governance](../../governance/README.md)
- [Content & language](../../content/README.md)
