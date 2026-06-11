# Tray 8 · Feedback & evaluation loop

> Not a part — a **loop**. The kit ships the first link (a control + a hook) and documents the rest of the cycle.

```
👍/👎  →  telemetry  →  eval sets  →  prompt/model iteration  →  ship  →  repeat
(UI)      (event)      (curated)     (offline)                  (CI)
```

## What lives in the repo
| Link | Artifact |
|---|---|
| Capture | `FeedbackControl` (thumbs) + per-message id |
| Emit | a `logFeedback(event)` telemetry call (app-provided) |
| Curate | eval sets live **with the model**, not in this repo |
| Iterate | tracked in the [model/prompt registry](../governance/model-prompt-registry.json) |

## Event shape (recommended)
```json
{
  "messageId": "m_8123",
  "rating": "down",
  "surface": "chat",
  "model": "claude-opus-4-8",
  "promptVersion": "chat@2026-06-10",
  "ts": "2026-06-10T14:14:00Z"
}
```

## Rules
1. Every assistant message is **addressable** (stable id) so feedback maps back to a generation.
2. Capture the **model + prompt version** with the rating — a 👎 is meaningless without knowing what produced it (see registry).
3. Make rating **reversible** and low-friction; never block the UI on it.
4. Close the loop: a 👎 should be traceable to an eval case and a fix.
