# System Health Scorecard

> A review frame for Clementine as an AI-operable design system.

This scorecard is for release reviews and milestone writeups. It complements mechanical gates; it does not replace `pnpm validate`, parity checks, Storybook, or Vercel previews.

## Dimensions

| Dimension | Question | Evidence |
|---|---|---|
| Token cascade health | Do component tokens resolve through semantic tokens into primitives without shortcuts? | `pnpm validate:cascade`, `scripts/parity-report.mjs` |
| Spec completeness | Do specs define intent, parts, ARIA, states, sources, and closed token contracts? | `agentic-spec validate specs/`, `governance/agentic-indexes/component-intent-map.json` |
| Runtime parity | Does rendered UI consume the same contract the spec declares? | `parity:dom`, Storybook, Observatory |
| Accessibility | Are interaction semantics, focus, labels, contrast, and reduced-motion behavior covered? | spec `required_aria`, Storybook review, accessibility lens |
| Agent trust readiness | Can an agent understand blast radius before editing? | `governance/agentic-indexes/knowledge-graph.json`, `TRUST-LEVELS.md` |
| Feedback loop | Can failures become rules, specs, or review lenses instead of repeated reminders? | `feedback/`, validator rules, review lenses |

## Scoring

Use a 0-3 score per dimension:

| Score | Meaning |
|---|---|
| 0 | Missing or unverified |
| 1 | Exists, but manual or incomplete |
| 2 | Mechanically checked, but not yet broad |
| 3 | Mechanically checked and wired into review/release behavior |

## Release Note Template

```md
System health:
- Token cascade health:
- Spec completeness:
- Runtime parity:
- Accessibility:
- Agent trust readiness:
- Feedback loop:
- Decision:
```

## Rule

When a dimension scores `0` or `1` twice in a row, create a validator, generated index, behavior spec, or review lens. Repeated misses become system rules.
