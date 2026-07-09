# CSS-Calipers verdict for Clementine

Date: 2026-07-08  
Branch: `spike/calipers-button-dimensions`  
Package tested: `css-calipers@1.0.0`

## Question

Can CSS-Calipers add useful compile-time safety to Clementine's dimension
tokens, specifically button radius/spacing-style values, without becoming a
mainline dependency yet?

## Result

Yes, for the narrow thing we tested.

CSS-Calipers caught a seeded `px` vs `rem` mistake at TypeScript compile time:

```text
Argument of type 'InscribedMeasurement<"rem">' is not assignable to parameter of type
'number | IMeasurement<"px">'.
```

That is real value for dimension tokens. It catches a class of mistake
Clementine's existing color/token cascade is not designed to catch.

## Runtime finding

CommonJS runtime works:

```text
10px
```

Node ESM runtime fails in `css-calipers@1.0.0`:

```text
ERR_MODULE_NOT_FOUND: Cannot find module '.../css-calipers/dist/esm/core'
```

The installed ESM build imports extensionless internal modules such as `./core`.
TypeScript still type-checks the package in this repo, and CommonJS works, but
the Node ESM path is not clean.

## Recommendation

Do not merge CSS-Calipers into Clementine main yet.

Keep it as a collaboration/adoption conversation with Stephane. It is promising
for generated radius/spacing helpers, but Clementine should not take it as a
main dependency until the ESM package issue is fixed or Clementine has enough
dimension-token math to justify the dependency.

Colors should stay under Clementine's existing cascade and agentic-spec gates.
