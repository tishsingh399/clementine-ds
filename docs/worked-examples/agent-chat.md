# Agent chat (pattern: AI chat assistants)

Story: **Worked examples/Agent chat** · [`AgentChat.stories.tsx`](../../apps/storybook/stories/examples/AgentChat.stories.tsx)

A chat where the assistant searches, asks permission before a side-effecting action, and shows a file in a side panel. Built only from existing AI components plus `JsonViewer`.

| Region | Component | Why this one |
|---|---|---|
| Model choice | `ModelSelector` | Not a bare `Select`. It carries the model-picker semantics. |
| AI disclosure + context use | `DisclosureBadge`, `ContextMeter` (`used`, `total`) | Trust surfaces live in the header, always visible. |
| Thread | `ConversationThread` > `Message role=…` | Roles set colour and alignment. Don't style bubbles yourself. |
| Tool call | `ToolCallCard name args status result` | `result` renders inside a `<p>`, so keep it a short string. |
| Tool output payload | `JsonViewer` **next to** the card | A block inside `ToolCallCard.result` would be invalid HTML (see agent-mistakes #3). |
| Approval gate | `PermissionRequest action scope onAllow onDeny` | Any action that writes, revokes or spends needs it. After the decision, show the follow-up `ToolCallCard` (running or denied). |
| Message actions | `MessageActions` | Copy and regenerate, under the last assistant message. |
| Input | `Composer` | Handles Enter-to-send, stop and busy state. |
| Artifact panel | `ArtifactFrame` + `CodeBlock` | The frame owns the title and kind. The code block owns copying. |

**Agent checklist**
- Never let a side-effecting tool run without `PermissionRequest` or `HITLGate` before it.
- Check prop names in the spec. `ContextMeter` takes `total`, not `limit`.
