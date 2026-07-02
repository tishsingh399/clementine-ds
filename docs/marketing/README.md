# Clementine Marketing Notes

This is the short public story for Clementine after the governance and parity work landed.

## One-Line Positioning

Clementine is an agentic design system: code, Storybook, and machine-readable specs wired together so AI agents can extend components without inventing tokens, skipping states, or drifting from the contract.

## Proof Points

- 121 specs validate against a closed contract.
- Contract parity is 100%.
- Painted-DOM parity runs in CI/nightly and currently reports 100%.
- The verifier catches the seeded agent mistakes that shallow automation tends to miss.
- The governance layer now has a loop: watch, diagnose, fix, learn.

## Next Article Thread

The next question is not whether a design system can become machine-readable.
Clementine already tests that.

The next question is whether different AI tools can consume the same design
system context.

Git-native agents such as Codex, Claude Code, Cursor, and Replit can inspect the
repo directly. Figma Make and Claude Design may need adapters: a compact Figma
Make kit, a Claude Design handoff packet, or an MCP/context layer that serves the
right slice of Clementine at the right time.

See [`docs/AI-TOOL-ADAPTERS.md`](../AI-TOOL-ADAPTERS.md).

## LinkedIn Post Draft

I spent the last stretch turning Clementine from a component library into a governed design system for AI agents.

The important shift was not "more documentation." It was making the contract executable.

Every component now has a machine-readable spec: allowed tokens, semantic parts, required states, ARIA expectations, and source files. The tooling checks that the tokens exist, follow the 3-tier cascade, resolve to real values, and are actually consumed by the rendered component.

The part I care about most: the system now has a governance loop.

It watches for drift, diagnoses whether a failure is signal or noise, fixes the issue through a PR, and turns repeated failures into new rules. That means the design system gets harder to break over time.

Current proof:

- 121 component specs validate
- 100% contract parity
- 100% painted-DOM parity in CI/nightly
- seeded agent mistakes are caught by the validator

The lesson: if machines are going to build inside your design system, the system cannot rely on taste, memory, or screenshots alone. It needs contracts that can be checked outside the model.

That is the difference between a design system an AI can use and a design system an AI can slowly corrupt.

## Short Caption Options

- Design systems for AI need contracts, not just components.
- A design system becomes agent-ready when drift is mechanical to detect.
- The quiet failure is not bad code. It is unchecked confidence.
- Clementine now watches, diagnoses, fixes, and learns.

## Demo Script

1. Start in the README and show the three shipped surfaces: code, Storybook, specs.
2. Open one component spec and point to the closed token contract.
3. Show the same component in Storybook.
4. Run or reference the validator: specs pass, contract parity passes, painted-DOM parity passes.
5. Close on the governance loop: failures become rules, not tribal knowledge.

## Asset Map

- Cover image: `docs/clementine-cover.png`
- Article diagrams: `docs/article/`
- Governance proof page: `docs/governance-proof.html`
- Live playground: https://clementine-ds-site.vercel.app
- Live Storybook: https://clementine-ds-storybook.vercel.app
