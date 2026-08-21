# @clementine-ds/eslint-plugin

Local ESLint packaging for Clementine's agent-facing contract checks.

These rules run in CI via `pnpm lint:ds` (wired into `.github/workflows/contract-checks.yml`)
and in the editor via the root `eslint.config.mjs`:

- `clementine/no-raw-style-values` flags raw colors and durations inside JSX
  style contexts, mirroring the style-context heuristic from
  `scripts/check-spec-honesty.mjs`.
- `clementine/no-unknown-component-token` flags invented token paths and
  `--cds-*` / `--tds-*` variables across **all three tiers** — component,
  semantic, and primitive. A lookup either hits an exact token or it fails;
  there is no nearest match. This is the rule that stops "use the primary
  colour" from becoming `color.primary`, a name the contract does not define.

The plugin imports Clementine's generated token types from
`packages/tokens/dist/tokens.d.ts` for its public TypeScript surface, and reads
`components.generated.json`, `semantic-light.json`, `semantic-dark.json`, and
`primitives.json` at runtime so the rule follows the same source as the
contract gates.

The CSS-variable inventory mirrors what `cssVariablesResolver` in
`packages/ui/src/theme/clementine-theme.ts` actually emits: semantic tokens two
levels deep under `--cds-` and `--tds-`, component tokens at full depth under
`--cds-`. Primitives are consumed as JS imports and never become CSS variables,
so `var(--cds-color-blue-6)` is reported — it resolves to nothing in a browser.

A trailing dash is treated as a prefix, so a dynamic name like
``var(`--cds-alert-bg-${intent}`)`` passes when the contract emits anything
under it, while a typo'd `--cds-alrt-bg-` still fails.

Example flat config:

```js
import clementine from '@clementine-ds/eslint-plugin';

export default [
  ...clementine.configs.recommended,
];
```
