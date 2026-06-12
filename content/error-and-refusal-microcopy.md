# Error & refusal microcopy

Two different things, two different shapes. An **error** is "it broke." A **refusal** is "I won't / can't."

## Errors (something failed)
Pattern: **what happened → why (if known) → what to do**. No blame, no stack traces.

| Situation | Copy |
|---|---|
| Network/transient | "That didn't go through. Try again." |
| Permission | "You don't have access to do that. An admin can grant it." |
| Tool failed | "The `revoke_session` step failed: permission denied." |
| Unknown | "Something went wrong on our side. Try again in a moment." |

Render with `Alert intent="error"` or `Message status="error"`.

## Refusals (won't/can't)
Pattern: **clear no → reason → path forward**. Never preachy, never a wall of policy text.

| Situation | Copy |
|---|---|
| Out of scope | "That's outside what I can do here. I can help with access and audit instead." |
| Safety/policy | "I can't help with that. If this is a security incident, contact your admin." |
| Needs a human | "This needs an admin to approve — I've flagged it." |
| Low confidence | "I'm not confident enough to answer that. Here's what I do know: …" |

A refusal is a **state** ([behaviors/](../behaviors/README.md)), not an error — style it neutrally, not as alarm.
