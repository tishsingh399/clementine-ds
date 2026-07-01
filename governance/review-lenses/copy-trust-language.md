# Copy & Trust Language Lens

Use for visible copy, AI disclosure, error/refusal language, CTAs, tool-call text, and docs.

## Check

| Area | Clementine expectation |
|---|---|
| Specificity | Copy names the object, action, or risk. Avoid vague verbs like "Continue" when a real action exists. |
| Trust | AI-generated content, permissions, citations, and uncertainty are named plainly. |
| Recovery | Error and refusal copy tells the user what happened and what they can do next. |
| Tone | Direct, useful, and calm. No hype, stacked adjectives, or fake certainty. |
| Consistency | Same state means same word across components, stories, docs, and specs. |

## Preferred Patterns

| Situation | Pattern |
|---|---|
| AI disclosure | `AI-generated` + source/provenance when available |
| Permission request | `Allow [agent/tool] to [specific action]` |
| Retry | `Try again` only when the same action is safe to repeat |
| Destructive action | Verb + object, for example `Delete token` |
| Empty state | What belongs here + first useful action |

## PR Note Format

```md
Copy & trust language lens:
- Primary action:
- AI/trust copy:
- Error/empty/recovery copy:
- Remaining risk:
```
