# Review Lenses

> Human review rubrics for the parts validators cannot fully judge yet.

These lenses adapt the useful parts of the starter kit into Clementine's contract model. They are used before shipping components, AI surfaces, docs, and the Observatory playground.

## Lenses

| Lens | Primary tray | Use when |
|---|---|---|
| Accessibility | Trays 2, 4, 7 | A component, pattern, or playground screen changes interaction, labels, ARIA, or contrast. |
| Copy & trust language | Trays 4, 6, 7 | Visible copy, AI disclosure, error/refusal language, or CTA text changes. |
| Edge states | Trays 2, 4, 5, 8 | Loading, empty, error, partial-data, overflow, retry, interrupt, or streaming behavior changes. |
| Motion | Trays 1, 5 | Transition, animation, realtime feedback, streaming reveal, or reduced-motion behavior changes. |
| First-user clarity | Observatory + docs | A public page, demo, or onboarding surface changes. |

## How to Use

1. Read the component spec first.
2. Run the mechanical gates (`pnpm validate`, parity checks, Storybook where applicable).
3. Apply only the lenses relevant to the changed surface.
4. Record the review note in the PR, not in the spec, unless the review uncovers a contract gap.

The lenses are intentionally concise. They are meant to sharpen judgment, not replace it.
