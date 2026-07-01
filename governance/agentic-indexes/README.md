# Agentic Indexes

> Generated maps that help agents reason across Clementine without replacing the specs.

The source of truth remains `specs/**/index.md` and `specs/**/tokens.json`. These files are derived views for planning, review, and impact analysis.

## Files

| File | Use |
|---|---|
| `component-intent-map.json` | Quick answer to "what is this component for, when should I use it, and what contract does it carry?" |
| `knowledge-graph.json` | Impact graph linking components to tokens, source files, patterns, pages, states, and review lenses. |

## Regenerate

```bash
pnpm agentic:indexes
```

`pnpm validate` also regenerates these indexes so they stay current with the spec layer.

## Rules

1. Do not hand-edit generated JSON.
2. If an index is wrong, fix the component spec first.
3. Use `knowledge-graph.json` before token or source changes to understand blast radius.
4. Use `component-intent-map.json` before composing a screen so agents choose the right component for the job.
