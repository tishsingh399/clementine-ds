# Clementine in Figma

This directory holds the Figma artifacts and the scripts that produced them.

## Artifacts

| File | What |
|---|---|
| [`overview.png`](./overview.png) | The 3-tier token cascade as Figma swatches (primitives → semantic → component) |
| [`components.png`](./components.png) | All 10 Clementine components, every paint bound to a Tier-3 variable |
| [`spec.png`](./spec.png) | The Button spec YAML next to the live component + `agentic-spec validate` output |

## Scripts

These ran against [`silships/figma-cli`](https://github.com/silships/figma-cli) in Safe Mode (FigCli plugin in Figma Desktop).

| Script | What |
|---|---|
| [`push-clementine.mjs`](./push-clementine.mjs) | Builds 3 variable collections — Primitives (Value mode), Semantic (Light + Dark modes), Components (Value mode). Resolves the DTCG `$value` references through the cascade and uses Figma's `VARIABLE_ALIAS` so component tokens stay bound to semantic, semantic stays bound to primitives. |
| [`build-canvas.mjs`](./build-canvas.mjs) | Renders the token overview board: hero header + 5 primitive color rows + grouped semantic swatches + per-component swatch grids. |
| [`build-components.mjs`](./build-components.mjs) | Renders the components board: 5 button variants (including focused with the orange `button/border/focus` ring), 8 badge intents, checkbox/radio/switch states, text input / select / textarea with focus + error states, tabs + modal. Every paint bound to a `Clementine · Components` variable. |
| [`build-spec.mjs`](./build-spec.mjs) | Renders the spec board: dark-mode YAML frontmatter card + live Button preview + validator-output card with all 5 checks green. |

## How to re-run

1. Install [`silships/figma-cli`](https://github.com/silships/figma-cli):
   ```bash
   gh repo clone silships/figma-cli && cd figma-cli && npm install && npm link
   ```
2. Open Figma Desktop, create a fresh design file, import the FigCli plugin from `figma-cli/plugin/manifest.json` (one time).
3. Launch the plugin (`Plugins → Development → FigCli`).
4. Start the daemon and connect:
   ```bash
   figma-ds-cli connect --safe
   ```
5. Run each script in order:
   ```bash
   node docs/figma/push-clementine.mjs      # imports 3 collections of variables
   node docs/figma/build-canvas.mjs         # builds the overview board
   node docs/figma/build-components.mjs     # builds the components board
   node docs/figma/build-spec.mjs           # builds the spec board
   ```

Each script talks to the local daemon at `http://127.0.0.1:3456/exec` and executes Figma Plugin API code inside the file.

## What this proves

The Figma file and the code in this repo are **the same system**, not a screenshot of a different artifact. Every paint in `components.png` is backed by a Figma variable. Every variable matches one of the JSON files in `packages/tokens/src/`. Every component token in the file matches one in [`specs/<name>/tokens.json`](../../specs).

Drift between Figma and code becomes a thing you can lint. That is the point.

## What this does not prove yet

This Figma sync does not automatically prove that every AI design tool can use
Clementine without extra packaging. Figma Make and Claude Design may need
tool-specific kits: compact prompts, exported token summaries, examples, and
handoff instructions that translate the repo contract into each tool's context
model.

It also does not claim complete visual Figma parity. Clementine has a local
Figma MCP console bridge, backed by Tina's hardened fork of `figma-console-mcp`,
and the repo derives the expected 628 component variables from code. A live
bridge read verified that those 628 component variable names exist in Figma; the
remaining 50 live-only component variables are documented shell/organism tokens,
not part of the code contract.

The testing plan for that layer lives in
[`docs/AI-TOOL-ADAPTERS.md`](../AI-TOOL-ADAPTERS.md).
