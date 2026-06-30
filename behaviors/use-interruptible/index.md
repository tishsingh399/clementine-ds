---
behavior: use-interruptible
ds_version: clementine-ds@0.1.0 (2026-06-29 verified)
status: AI-Ready
last_verified: 2026-06-29

category: Behavior
kind: hook
source:
  path: packages/ui/src/hooks/useInterruptible.ts
  export: useInterruptible
  result_type: UseInterruptibleResult

state_contract:
  inputs: []
  outputs:
    - running: boolean
  commands:
    - run<T>(fn: (signal: AbortSignal) => Promise<T>): starts an abortable operation
    - interrupt(): aborts the current operation and clears running
  transitions:
    - idle -> running via run
    - running -> interrupted via interrupt
    - running -> idle via fulfilled run
    - running -> idle via AbortError
    - running -> running via a new run that aborts the previous controller

required_guards:
  - starting a new run aborts the previous controller
  - AbortError resolves undefined instead of throwing
  - non-abort errors are rethrown
  - stale runs cannot clear a newer controller
paired_components:
  - composer
  - tool-call-card
  - streaming-text

checks:
  source_exists: true
  export_exists: true
  states_complete: true
  reset_path: true
  no_visual_tokens: true
---

# AGENTIC BEHAVIOR SPEC: USEINTERRUPTIBLE

`useInterruptible` owns the stop/cancel contract for AI work: generation, long tool
calls, uploads, and any async operation that accepts an `AbortSignal`.

## State Contract

`run(fn)` creates a fresh `AbortController`, aborts any previous controller, marks
the hook as running, and calls `fn(signal)`. `interrupt()` aborts the current
controller and clears `running`.

If the operation rejects with `AbortError`, the hook resolves `undefined` so UI can
treat interruption as a controlled stop. Other errors remain exceptional and are
rethrown.

## Guards

Only the active controller can clear itself in `finally`; this prevents an older
operation from setting `running=false` after a newer operation starts.
