# CSS-Calipers spike: button dimensions

Date: 2026-07-08  
Branch: `spike/calipers-button-dimensions`  
Package tested: `css-calipers@1.0.0`

## Question

Can CSS-Calipers add useful compile-time safety to Clementine's dimension tokens, specifically
button radius/spacing-style values, without becoming a mainline dependency yet?

## Test shape

This spike deliberately avoids colors and the token cascade. Clementine already has stronger rules
there. The test only checks unit-bearing dimensions:

- `valid.ts`: expresses button radius, block/inline padding, and a focus halo radius as typed
  measurements.
- `seeded-unit-mistake.ts`: intentionally adds a `px` radius to a `rem` spacing value.

## Commands and results

```sh
node_modules/.bin/tsc -p scratchpad/calipers-button-dimensions/tsconfig.valid.json --pretty false
```

Result: pass.

```sh
node_modules/.bin/tsc -p scratchpad/calipers-button-dimensions/tsconfig.seeded.json --pretty false
```

Result: fail, as desired.

```text
scratchpad/calipers-button-dimensions/seeded-unit-mistake.ts(6,41): error TS2345:
Argument of type 'InscribedMeasurement<"rem">' is not assignable to parameter of type
'number | IMeasurement<"px">'.
```

Runtime check:

```sh
node -e "const { m } = require('css-calipers'); console.log(m(8).add(2).css())"
```

Result: `10px`.

ESM runtime check:

```sh
node -e "import('css-calipers').then(({m})=>console.log(m(8).add(2).css()))"
```

Result: fail in Node ESM.

```text
ERR_MODULE_NOT_FOUND: Cannot find module '.../css-calipers/dist/esm/core'
```

The installed ESM build imports extensionless internal modules such as `./core`. TypeScript still
type-checks the package in this repo, and CommonJS works, but the ESM runtime path is not clean in
Node.

## Verdict

CSS-Calipers passes the core thesis test: it catches a seeded `px` vs `rem` mistake at compile time
with a precise error. That is real value for dimension tokens.

Do not merge it into Clementine yet. The current published package has an ESM runtime DX issue, and
Clementine does not need this dependency for color/token governance. The strongest next move is to
send this verdict to Stephane as concrete feedback, then revisit if either:

- the ESM package path is fixed, or
- Clementine starts generating typed dimension-token modules where radius/spacing math is common.

## Recommendation

Keep CSS-Calipers as a collaborator/adoption conversation, not a Clementine dependency today.
If it comes back, scope it to generated dimension helpers for radius/spacing and keep colors under
Clementine's existing cascade/agentic-spec gates.
