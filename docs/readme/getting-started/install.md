# Install

[GitHub](https://github.com/tishsingh399/clementine-ds)

## Overview

Clementine is a pnpm + turborepo monorepo. Node 18 or newer.

## Clone and install

```bash
git clone https://github.com/tishsingh399/clementine-ds.git
cd clementine-ds
pnpm install
```

## Run Storybook

```bash
pnpm storybook
# http://localhost:6006
```

## Build all packages

```bash
pnpm build
```

## What gets installed

| Package | Path | Purpose |
|---|---|---|
| `clementine-ds` | root | Workspace root, turborepo scripts |
| `@clementine-ds/tokens` | `packages/tokens` | Style Dictionary source files (3 tiers) |
| `@clementine-ds/ui` | `packages/ui` | React components, Mantine-backed |
| `storybook` | `apps/storybook` | Live sandbox |

## Validate specs

The spec validator lives in a separate CLI:

```bash
npm install -g agentic-spec
agentic-spec validate specs/button
# PASS button (specs/button)
#   tokens: 15 in contract, 15 in tokens.json · states: 6 · parts: 5
```

You can also run it against every spec at once:

```bash
agentic-spec validate specs/*
```

See the [agentic-spec README](https://github.com/tishsingh399/agentic-spec) for the full command surface.

## Required environment

None for development. The optional pieces:

| Variable | Used for | Required? |
|---|---|---|
| `RDM_API_KEY` | Pushing these docs to ReadMe.io | Only if you publish to ReadMe.io |
| `FIGMA_FILE_KEY` | Pulling tokens from Figma via figma-console-mcp | Only if you use the `from-figma` flow |

> **Not applicable.** No Figma file key is required to build, run Storybook, or validate specs locally.
