# @clementine-ds/eslint-plugin

Local ESLint packaging for Clementine's agent-facing contract checks.

This package does not replace the existing CI gates. It repackages two useful
checks for IDE-time feedback:

- `clementine/no-raw-style-values` flags raw colors and durations inside JSX
  style contexts, mirroring the style-context heuristic from
  `scripts/check-spec-honesty.mjs`.
- `clementine/no-unknown-component-token` flags invented component-tier token
  paths and `--cds-*` component variables by reading the generated component
  token contract.

The plugin imports Clementine's generated token types from
`packages/tokens/dist/tokens.d.ts` for its public TypeScript surface, and reads
`packages/tokens/src/components.generated.json` at runtime so the rule follows
the same source as the contract gates.

Example flat config:

```js
import clementine from '@clementine-ds/eslint-plugin';

export default [
  ...clementine.configs.recommended,
];
```
