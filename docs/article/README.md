# Clementine Article Diagrams

These diagrams support the article/update thread around machine-built design systems and the Clementine governance layer. Keep both PNG and SVG versions: PNG is best for Medium, Notion, LinkedIn, and GitHub previews; SVG is the editable source for future iteration.

## Recommended Placement

| File | Use it when | Suggested caption |
|---|---|---|
| `diagram-1-token-path.png` | Introducing why a closed token contract matters | A token should travel through a contract, not through a guess. Clementine checks that path from spec to component paint. |
| `diagram-2-mirror-vs-test.png` | Explaining why self-reported checks are not enough | A checker that grades its own claim is a mirror. Clementine turns that claim into an external test. |
| `diagram-3-pitfalls.png` | Naming the failure modes that pass shallow automation | The quiet failures are not syntax errors. They are invented tokens, missing states, stale specs, and false confidence. |
| `governance-loop.png` | Showing the governance layer and the self-learning loop | The design system watches for drift, diagnoses signal vs. noise, fixes through PRs, and turns repeated failures into new rules. |

## Article Flow

1. Open with `diagram-3-pitfalls.png` after the first paragraph that says automated checks can still miss design-system failure.
2. Use `diagram-1-token-path.png` where the article explains the 3-tier token cascade.
3. Use `diagram-2-mirror-vs-test.png` in the section about check honesty and self-reporting.
4. Close with `governance-loop.png` in the update section about what changed after Clementine matured.

## Image Prompts For Future Iteration

### Token Path

Show a clean systems diagram of a design token moving from component spec to component token to semantic token to primitive value to rendered UI. The mood should be precise and editorial, with a dark Clementine palette, orange highlights, and enough whitespace for a technical article.

### Mirror Vs. Test

Show two side-by-side validation models. On the left, a self-reporting check loops back into itself like a mirror. On the right, an external verifier compares spec, code, runtime CSS, and painted DOM. Use restrained technical visuals, not cartoon metaphors.

### Pitfalls

Show five quiet failure modes that can pass shallow automation: invented tokens, missing states, stale specs, ARIA drift, and self-reported checks. Make the visual feel like a field guide or inspection board, not a warning poster.

### Governance Loop

Show a continuous governance loop around a design system: watch signals, diagnose real issue vs. noise, fix through PR, and learn a new rule so the same issue happens less next time. Center the context layer: token architecture, governance rules, learning history, and knowledge graph.

## Stable GitHub URLs

After these files land on `main`, use raw GitHub URLs for published articles:

```text
https://raw.githubusercontent.com/tishsingh399/clementine-ds/main/docs/article/diagram-1-token-path.png
https://raw.githubusercontent.com/tishsingh399/clementine-ds/main/docs/article/diagram-2-mirror-vs-test.png
https://raw.githubusercontent.com/tishsingh399/clementine-ds/main/docs/article/diagram-3-pitfalls.png
https://raw.githubusercontent.com/tishsingh399/clementine-ds/main/docs/article/governance-loop.png
```
