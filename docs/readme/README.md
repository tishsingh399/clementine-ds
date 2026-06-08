# Clementine DS — ReadMe.io documentation source

This directory holds the paste-ready (and push-ready) markdown that backs the Clementine docs on ReadMe.io.

## Structure

```
docs/readme/
├── getting-started/
│   ├── intro.md              The landing page
│   ├── install.md            Clone, install, run Storybook
│   └── first-component.md    Six-step component workflow
├── architecture/
│   ├── 3-tier-tokens.md      How tokens are organized
│   ├── agentic-specs.md      How AI agents read the system
│   └── contract-rules.md     The 14 validator rules
├── tokens/
│   ├── primitives.md         Tier 1 reference
│   ├── semantic.md           Tier 2 reference
│   ├── component.md          Tier 3 reference
│   └── the-cascade-rule.md   The one-way reference rule
└── components/
    ├── button.md             Full doc (AI-Ready)
    └── <others>.md           Stubs (Draft)
```

## Publishing to ReadMe.io

### Manual (no API key needed)

1. Copy a file's contents
2. Paste into the ReadMe.io page editor
3. Publish

The markdown is ReadMe.io-flavored: standard markdown plus `> **Note:**` callouts. No HTML hacks.

### Scripted (requires API key)

```bash
export RDM_API_KEY=rdme_xxx
export RDM_PROJECT=clementine-ds
node scripts/upload-readme-docs.js
```

The script in `scripts/upload-readme-docs.js` walks this directory, maps the folder structure to ReadMe.io categories and pages, and PUTs each one via the ReadMe v1 API. See the script header for the exact mapping.

## Editing rules

- No em dashes. Use commas, periods, or rewrite.
- No buzzwords (leverage, utilize, ensure, enhance, streamline, empower, navigate, seamless).
- Tables for state lists, prop lists, and side-by-side comparisons.
- One thought per bullet. Six bullets max per list.
- Cross-link with relative paths (`../tokens/the-cascade-rule.md`). The upload script rewrites these to ReadMe.io slugs.

## When this drifts from the repo

This directory is the source of truth for ReadMe.io. The actual `AGENTS.md`, `README.md`, and per-spec docs in the repo are the source of truth for GitHub and AI agents.

The two should not contradict each other on facts. Voice and depth can differ:

- Repo docs: terse, code-adjacent, frontmatter-heavy
- ReadMe.io docs: narrative, links between pages, explains the "why"

If you change one, check the other.
