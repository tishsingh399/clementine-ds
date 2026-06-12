# Pattern · Empty state

> Tray 3 · composes `Card`/`Stack` + `Text` + `Button` (+ `Composer` starter chips for AI surfaces).

## Intent
The screen before there's data. An empty state should explain what goes here and offer the first action — never a dead blank.

## Three kinds
| Kind | Copy leads with | Primary action |
|---|---|---|
| **First use** (nothing yet) | what this is for | "Create…", or starter prompts |
| **No results** (filter/search) | what was searched | "Clear filters" |
| **Cleared** (all done) | acknowledgement | optional |

## For AI surfaces
The empty composer uses [prompt scaffolding](../../content/prompt-scaffolding.md): 3–4 starter-prompt chips tied to real capabilities, above the `Composer`.

## Rules
1. One sentence of explanation, one clear action. No walls of text.
2. Don't show an empty state during loading — that's a `Skeleton`.
3. Distinguish "no results" (offer to clear filters) from "nothing yet" (offer to create).
4. Illustration is optional and must not carry meaning alone.
