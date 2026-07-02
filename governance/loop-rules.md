# Loop rules — the ledger the self-healing loop reads

This file is the **Encode** stage of the loop made concrete. When a human
rejects (closes without merging) a `self-heal` pull request, a rule gets
written here. The loop reads this file at the start of every run and obeys it.

## How to switch a fixer off

Add a line anywhere in this file in the form:

```
skip: name-of-fixer
```

Valid fixer names: `tokens-index` · `agentic-indexes` · `counts`

The nightly run greps for these lines and skips the named fixer. Delete the
line to switch the fixer back on. (The whole loop pauses with the repo
variable `LOOP_PAUSED=true` — that's the kill switch, this is the scalpel.)

## Rules ledger

Rules learned from rejections and false positives. Each entry: date, what was
rejected or wrong, and the rule that came out of it.

- **2026-06-29 — aria greps false-flagged Mantine wrappers.** The honesty
  check grepped wrapper source for ARIA attributes that Mantine renders at
  runtime. Rule: source-grep ARIA only on components that don't import
  `@mantine/*`; the rendered DOM (axe) is the honest place to check the rest.
  Encoded in `scripts/check-spec-honesty.mjs`.
- **2026-06-30 — a check must not grade its own homework.** The painted-DOM
  harness penalised inherited semantic text and phantom borders, deflating the
  score it was supposed to protect. Rule: a verifier's false positives get
  fixed in the verifier, not waived in the caller. Encoded in
  `scripts/parity-dom.mjs`.

<!-- The loop only ever *adds* to this file. Fixers must never edit it. -->
