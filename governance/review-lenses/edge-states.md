# Edge States Lens

Use when a component or screen depends on async data, variable content, user input, streaming, retries, or permissions.

## Check

| State | Clementine expectation |
|---|---|
| Loading | Layout is stable; user can tell work is happening. |
| Empty | The surface explains what belongs there and gives the next useful action. |
| Error | The error names what failed and whether retry is safe. |
| Partial data | Successful content remains usable when another section fails. |
| Overflow | Long labels, token names, code, citations, and messages wrap or truncate deliberately. |
| Slow network | Critical context appears before enhancement; no blank mystery state. |
| Interrupt | Streaming/tool work can stop without corrupting the UI state. |
| Retry | Retry preserves intent and avoids duplicate destructive actions. |

## PR Note Format

```md
Edge states lens:
- Loading:
- Empty:
- Error/retry:
- Overflow/mobile:
- Remaining risk:
```

## Common Clementine Triggers

- `interaction_states` changes
- hooks in `behaviors/`
- AI surfaces: `Message`, `Composer`, `ToolCallCard`, `StreamingText`, `HITLGate`
- long token lists or generated output containers
