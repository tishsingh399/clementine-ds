# Stephane / CSS-Calipers collection

This collection packages Clementine's tiny CSS-Calipers spike into a shareable
feedback packet for Stephane.

## Upstream

- Repo: https://github.com/css-calipers/css-calipers
- npm: https://www.npmjs.com/package/css-calipers
- Version tested here: `css-calipers@1.0.0`

## What this contains

- `VERDICT.md` — the concise result and recommendation.
- `tests/valid.ts` — a Clementine button-dimension probe that should compile.
- `tests/seeded-unit-mistake.ts` — the intentional `px` + `rem` mistake that
  should fail TypeScript.
- `tests/tsconfig.valid.json` and `tests/tsconfig.seeded.json` — reproducible
  compile checks.

## Reproduce

From the repo root on branch `spike/calipers-button-dimensions`:

```sh
node_modules/.bin/tsc -p collections/stephane-css-calipers/tests/tsconfig.valid.json --pretty false
node_modules/.bin/tsc -p collections/stephane-css-calipers/tests/tsconfig.seeded.json --pretty false
node -e "const { m } = require('css-calipers'); console.log(m(8).add(2).css())"
node -e "import('css-calipers').then(({m})=>console.log(m(8).add(2).css())).catch(e=>{console.error(e.code + ': ' + e.message); process.exit(1)})"
```

Expected:

- Valid compile: pass.
- Seeded unit mistake: fail with a `px` vs `rem` TypeScript error.
- CommonJS runtime: prints `10px`.
- Node ESM runtime: fails in `css-calipers@1.0.0` because the ESM build imports
  extensionless internal modules.

## Boundary

This is deliberately not a Clementine main dependency. It is an adoption and
collaboration probe for dimension-token safety only.
