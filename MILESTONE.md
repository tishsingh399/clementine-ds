# Clementine Governance Milestone

Date: 2026-06-30

This milestone freezes the current proof state for Clementine DS and the
agentic-spec governance tooling.

## What Is Complete

- agentic-spec has the five upstream governance rules on main:
  - cascade direction
  - stale spec
  - code token usage
  - no invented inline styles
  - states complete
- agentic-spec also includes the parity subcommand and the read-only diagnose
  command.
- Clementine has 121 component specs validating against the contract layer.
- Clementine contract parity is 100% across 121 specs.
- Clementine behavior specs are present and valid for 3 hooks.
- Clementine painted DOM parity currently reports an average of 100% across
  114 measured stories, with 0 components below the 80% threshold.

## Live Verification

agentic-spec benchmark:

```sh
cd ~/Desktop/agentic-spec
npm run benchmark
```

Latest observed result:

- 7 of 7 seeded agent mistakes surfaced
- 5 block CI
- 2 warn
- 0 false positives on the clean control spec

Clementine validation:

```sh
cd ~/Desktop/clementine-ds
npx pnpm@9.15.0 validate
```

Latest observed result:

- 121 specs pass
- 121 component token files honor component -> semantic -> primitive
- 0 spec honesty errors or warnings
- 135 relative spec links resolve
- 3 behavior hook specs valid
- count markers current: 121 components, 89 primitives, 32 semantic tokens,
  628 component tokens

Clementine contract parity:

```sh
cd ~/Desktop/clementine-ds
npx pnpm@9.15.0 contract
```

Latest observed result:

- average parity: 100%
- specs checked: 121
- specs below threshold: 0

Clementine painted DOM parity:

```sh
cd ~/Desktop/clementine-ds
npx pnpm@9.15.0 storybook -- --host 127.0.0.1 --port 6006
STORYBOOK_URL=http://127.0.0.1:6006 npx pnpm@9.15.0 parity:dom
```

Latest observed result:

- average DOM parity: 100%
- measured stories: 114
- below threshold: 0
- report: `apps/observatory/parity-dom-report.json`

## Known Holdout

Badge is the named exception to keep visible. The latest DOM report shows Badge
at 83% parity because the dark-mode default `light` variant paints a Mantine
blue alpha background instead of a declared Badge component token.

This is not a token-file or cascade problem. It needs a wrapper/theme decision:
either constrain Badge to named Clementine intents or map Mantine badge variants
and colors through `badge.*` component tokens.

Decision for this milestone: park Badge as a known wrapper-level follow-up, not
a hidden failure.

## Visual Explainer

Open `docs/governance-proof.html` to see the product layer, machinery layer,
learning loop, proof numbers, and Badge follow-up as a visual map.
