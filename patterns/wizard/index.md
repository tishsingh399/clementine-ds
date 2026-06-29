# Pattern · Wizard (multi-step)

> Tray 3 · composes a stepper + `Card` + `Button` + form fields + `Alert`.

## Intent
Break a long or consequential task into ordered steps with clear progress — onboarding, policy creation, a guided migration.

## Anatomy
| Region | Notes |
|---|---|
| Step indicator | numbered/labelled; current step has `aria-current="step"` |
| Step body | one coherent chunk of the task |
| Navigation | Back / Next; Next disabled until the step is valid |
| Optional steps | clearly labelled "Optional"; skippable |
| Review | final step summarizes all inputs before commit |
| Errors | per-field inline + an `Alert` summary at the step top |

## Rules
1. Show total steps and current position; don't hide the finish line.
2. Validate per step, not only at the end; preserve entered data when going Back.
3. Allow Back without losing work; warn before discarding on exit.
4. Keep destructive/irreversible work behind the final Review + an explicit confirm.
5. For agent-driven multi-step actions, each consequential step is a [HITLGate](../../specs/hitl-gate/index.md).
