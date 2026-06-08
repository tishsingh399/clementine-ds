# Contract rules

[agentic-spec validator source](https://github.com/tishsingh399/agentic-spec/blob/main/src/validate/index.ts)

## Overview

The 14 rules the validator enforces, why each one exists, and how to fix a failure.

> **Note:** These rules are not stylistic preferences. Every one of them prevents a class of bug that comes up when AI agents write code against a design system.

## The rules

### Identity and structure

| Rule | What it checks | Why |
|---|---|---|
| `missing-spec` | `index.md` exists in the directory | Without a spec, there is no contract. |
| `missing-tokens` | `tokens.json` exists in the directory | Without it, the closed list is missing. |
| `no-frontmatter` | The `index.md` has a parseable YAML frontmatter block | The frontmatter is the machine-readable contract. |
| `bad-frontmatter` | The YAML parses cleanly | A spec the agent cannot parse is worse than no spec. |
| `identity-mismatch` | `index.md`'s `component:` matches `tokens.json`'s `component:` | Drift between the two files is a wiring error. |

### Token cascade

| Rule | What it checks | Why |
|---|---|---|
| `missing-token-entry` | Every name in `token_contract` has an entry in `tokens.json` | A contract that points at nothing is not a contract. |
| `orphan-token-entry` | Every `tokens.json` entry is referenced by `token_contract` | Orphans are a sign of stale tokens or a missing spec update. |
| `bad-token-tier` | Each entry's `tier` is `primitive`, `semantic`, or `component` | Other values mean the entry is malformed. |
| `bad-token-path` | Each entry has a non-empty `path` | Without a path, the entry cannot resolve. |
| `missing-token-role` | Each entry has a non-empty `role` | The role is what tells an agent which value to pick. |

### Metadata sanity

| Rule | What it checks | Why |
|---|---|---|
| `bad-status` | `status` is one of `AI-Ready`, `In progress`, `Draft` | Other values break the gate logic. |
| `bad-date` | `last_verified` is `YYYY-MM-DD` | Other formats are not sortable. |
| `future-date` | `last_verified` is not in the future | A spec verified tomorrow has not been verified. |

### Honesty gates

| Rule | What it checks | Why |
|---|---|---|
| `lying-check` | `checks.tokens_valid: true` only when the validator agrees | A spec that lies about its own readiness corrupts the system. |
| `ai-ready-gate` | `status: AI-Ready` requires all five `checks` to be `true` | This is what `AI-Ready` means. |

## Fixing a failure

Every error message in the validator output includes the rule name. Look it up here.

### Example failure

```
FAIL button (./specs/button)
  error missing-token-entry    Spec lists "button.bg.invalid" in token_contract but tokens.json has no entry (token_contract → button.bg.invalid)
```

Fix:
1. Either add `button.bg.invalid` to `tokens.json` (with a real path and references)
2. Or remove `button.bg.invalid` from `token_contract` in the frontmatter

### Example warning

```
PASS button (./specs/button)
  warn  orphan-token-entry     tokens.json entry "button.legacy" is not referenced by token_contract
```

Fix:
1. Either add `button.legacy` to `token_contract`
2. Or remove the entry from `tokens.json`

Warnings do not block the build. They will block AI-Ready promotion.

## What the rules do NOT check

The validator is mechanical. It checks for structural consistency. It does not check:

- Whether the spec is *correct* about the component's behavior
- Whether the chosen tokens are good design decisions
- Whether the ARIA attributes are sufficient
- Whether the interaction states cover real user needs

That is human work. The rules above keep the spec internally consistent, so a human or an agent can trust what they read.

## Output formats

Human-readable:

```bash
agentic-spec validate specs/button
```

Machine-readable, good for CI:

```bash
agentic-spec validate specs/button --json
```

Exit code is non-zero on any error, zero on warning-only or pass. Use this in pre-commit hooks or PR checks.

## Related

- [agentic-specs](./agentic-specs.md)
- [Your first component](../getting-started/first-component.md)
- [The 3-tier cascade](./3-tier-tokens.md)
