# Code Connect — Figma ↔ code wiring

Code Connect links each Figma component to its real code component, so Figma **Dev Mode** shows the actual `@clementine-ds/ui` snippet instead of an auto-generated guess. This is the Tray 9 (governance) link that officially closes the design → code loop.

## What's already done (in this repo)

- ✅ All **53 new components** are **real Figma Components** in [Clementine DS](https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS) (node IDs `6:606`–`6:626` for the first 21, `16:1036`–`16:1066` for waves A–D, and TagsInput at `16:1075`) — every wave-added component has a 1:1 Figma Component.
- ✅ A `*.figma.tsx` mapping file sits next to each component (`packages/ui/src/**`), wired to its Figma node URL with an `example` snippet.
- ✅ `@figma/code-connect` is in `packages/ui` devDependencies; `figma.config.json` at the repo root points the parser at `packages/ui/src/**/*.figma.tsx`.
- ✅ `*.figma.tsx` is excluded from the component `tsc` build (Figma's CLI parses these, not your app build).

## The one step that needs you (a Figma token)

The `publish` step needs a Figma **personal access token** with the *Code Connect* write scope — which isn't available in the build environment, so it runs on your machine:

```bash
pnpm install                                    # installs @figma/code-connect
export FIGMA_ACCESS_TOKEN=<your token>          # figma.com → Settings → Security → personal access tokens
npx figma connect publish                       # uploads all mappings
```

Then open the file in **Dev Mode**, select any of the 21 components → your real `import { … } from '@clementine-ds/ui'` snippet appears.

Validate without publishing first:
```bash
npx figma connect parse        # checks all *.figma.tsx resolve
```

## Refinements (optional, later)

- **Variant props.** The components were created without Figma component *properties*, so the mappings are `example`-only. To map props (e.g. an Alert `intent` variant → code prop), add a Figma variant/property to the component, then add a `props` block:
  ```tsx
  figma.connect(Alert, '…', {
    props: { intent: figma.enum('Intent', { Info: 'info', Error: 'error' }) },
    example: (p) => <Alert intent={p.intent} title="…">…</Alert>,
  });
  ```
- **Original 10 components.** This setup covers the 21 new ones. The original 10 (button, badge, …) can be wired the same way once they're converted to Figma Components.
