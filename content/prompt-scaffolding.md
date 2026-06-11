# Prompt scaffolding

The empty state of an AI surface is a design problem. A blank composer is intimidating; good scaffolding shows what the assistant is *for*.

## Starter prompts
Offer 3–4 concrete, verb-first examples tied to the product's real jobs:

- "Show sessions with standing access"
- "Summarize today's audit log"
- "Who can reach the production database?"
- "Draft a least-privilege policy for contractors"

Render as clickable chips above the `Composer` (an [empty-state pattern](../patterns/empty-state/index.md)).

## Rules
1. Starter prompts must reflect **real, supported** capabilities — never suggest something the agent can't do.
2. Keep them short and outcome-shaped ("Show…", "Summarize…", "Draft…").
3. Rotate or personalize by context (current page, recent activity).
4. Once a conversation starts, scaffolding gets out of the way.

## Composer placeholder
One line, action-oriented, never cute: `"Message the assistant…"` — not `"Ask me anything! ✨"`.
