# AI tool adapter testing

Clementine is built to be agent-readable, but "agent-readable" does not mean
every AI tool consumes the same context in the same way.

Git-native coding agents can usually read this repo directly. Design-native
tools often need an interpretation layer.

This document is the testing ground for that difference.

## Current hypothesis

Clementine's core source of truth is already in place:

- `specs/<component>/index.md` declares component intent, parts, states, ARIA,
  checks, and source files.
- `specs/<component>/tokens.json` declares the closed component token contract.
- `packages/tokens/src/` holds the 3-tier token cascade.
- Storybook renders the implementation.
- CI and `agentic-spec` verify that specs, tokens, and rendered behavior stay
  aligned.

That is enough for repo-native agents to inspect and act on.

It may not be enough for tools that treat Git as background material instead of
the active working context.

## Tool fit

| Tool type | Expected fit | What it can consume | Likely missing layer |
|---|---|---|---|
| Codex, Claude Code, Cursor, Replit | High | Git repo, specs, package scripts, Storybook paths, validation commands | Mostly task framing |
| MCP servers | High to medium | Structured specs, token files, generated indexes | Better context serving and query APIs |
| Figma Make | Untested | Prompt, Figma file, exported variables, examples | Figma Make kit |
| Claude Design | Untested | Prompt, uploaded files, snapshots, design-sync instructions | Interpretation and handoff packet |

## What is not proven yet

Do not claim that Clementine works out of the box in every AI design tool.

Specifically:

- Figma Make has not been fully tested against Clementine's contracts.
- Claude Design has not been fully tested against Clementine's contracts.
- A Git repo alone may not keep enough context alive inside design-generation
  tools.
- Design-native tools may need a smaller, tool-specific packet instead of the
  full repo.

This is not a failure of the design system. It is a context-model difference.

## Figma Make kit

Figma Make likely needs a compact kit instead of the full repo.

The kit should include:

- a short Clementine system prompt
- a token summary focused on the 3-tier cascade
- component usage examples
- Figma variable mapping notes
- visual examples from Storybook or the Figma file
- do/don't rules for generated screens
- a checklist for verifying generated output against Clementine

The goal is not to teach Figma Make every repo detail. The goal is to give it
the minimum contract it needs to produce a screen that can later be checked
against Clementine.

## Claude Design handoff packet

Claude Design may need a more explicit interpretation layer.

The packet should include:

- design-sync instructions written in Claude Design's language
- a snapshot of the relevant Git state
- a Figma or exported file snapshot when visual context matters
- an explanation of how to read Clementine specs
- a mapping from spec fields to design decisions
- examples of correct and incorrect output
- reminders that specs are the source of truth, not optional background

Observed risk: Claude Design can accept a Git snapshot or Figma file and still
miss the intended handoff model unless the context is packaged explicitly.

## Testing protocol

Use one controlled task across tools.

Example task:

> Generate a small admin screen using Clementine with a form, status feedback,
> one AI-assist surface, and a review/approval action.

For each tool, capture:

1. What context was given.
2. Whether it respected component intent.
3. Whether it used Clementine tokens or invented new styling.
4. Whether required states were present.
5. Whether trust, disclosure, and feedback patterns appeared correctly.
6. What had to be repeated or explained manually.
7. What adapter material would have prevented the mistake.

Then compare the result against:

- the relevant component specs
- Storybook states
- token contracts
- Figma variables, if applicable
- `agentic-spec` validation output, where applicable

## Article-worthy angle

The next article is not just "machines need machine-readable documentation."

The stronger point is:

> AI tools do not share one context model. A design system that works for agents
> may need adapters: one packet for Git-native coding agents, another for Figma
> Make, another for Claude Design, and possibly an MCP layer that serves the
> right slice of context on demand.

This is the next question Clementine should test.

## Honest public language

Safe:

- "Git-native agents can consume the repo directly."
- "Design-native tools may need a translation kit."
- "Figma Make and Claude Design are the next testing ground."
- "The system has the source material; the next layer is packaging it for each
  tool's context model."

Avoid:

- "Clementine works across every AI design tool."
- "Figma Make can consume the repo directly."
- "Claude Design automatically understands the handoff."
- "Machine-readable docs solve the whole problem."

## Next steps

1. Create a Figma Make kit from this repo.
2. Create a Claude Design handoff packet.
3. Run the same task in Codex, Cursor/Replit, Figma Make, and Claude Design.
4. Compare outputs against Clementine specs and Storybook.
5. Turn repeated misses into adapter rules or `agentic-spec` export commands.
