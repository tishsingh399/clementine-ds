# Tray 5 · Behavior & state model

> The connective tissue. These are **interaction contracts + hooks**, not visuals. Every AI surface component references states defined here in its spec's `interaction_states`.

## The AI state vocabulary

| State | Meaning | Surfaced by |
|---|---|---|
| **idle** | Waiting for input | Composer enabled |
| **becoming / streaming** | Output is being produced token-by-token | `StreamingText`, `Message status="streaming"`, `useStreaming` |
| **tool-waiting** | Paused on an external tool/function call | `ToolCallCard status="running"` |
| **interrupt** | User stopped generation mid-flight | `Composer busy` → Stop, `useInterruptible.interrupt()` |
| **retry** | Re-attempting after a transient failure | `useRetry` (`Retrying 2/3…`) |
| **refusal** | Model declines for policy/safety reasons | refusal microcopy ([content/](../content/error-and-refusal-microcopy.md)) |
| **awaiting-approval** | Blocked on a human decision | `HITLGate status="pending"` |
| **error** | Terminal failure | `Message status="error"`, `Alert intent="error"` |

## Latency choreography

Don't show a blank pause. The order of reveal communicates that the system is working:

1. **< 100ms** — no indicator (feels instant).
2. **100ms–1s** — caret / typing affordance (`StreamingText`).
3. **tool call** — `ToolCallCard status="running"` with the tool name (tells the user *what* it's doing).
4. **long thinking** — `ReasoningTrace streaming` (collapsed by default).
5. **always** — a reachable **Stop** (`useInterruptible`).

## Hooks (in `@clementine-ds/ui`)

| Hook | Purpose |
|---|---|
| `useStreaming()` | Accumulate streamed text; drives `StreamingText`. |
| `useInterruptible()` | Run an abortable op; wire `interrupt` to Stop. |
| `useRetry(max)` | Bounded retry with `attempt` / `pending` / `error`. |

## Reduced motion
Every "becoming" animation (caret, shimmer, slide) must degrade under `prefers-reduced-motion: reduce` — cross-fade or go static. Built into `StreamingText`, `Skeleton`, `Drawer`.
