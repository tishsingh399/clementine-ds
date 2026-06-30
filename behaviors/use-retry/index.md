---
behavior: use-retry
ds_version: clementine-ds@0.1.0 (2026-06-29 verified)
status: AI-Ready
last_verified: 2026-06-29

category: Behavior
kind: hook
source:
  path: packages/ui/src/hooks/useRetry.ts
  export: useRetry
  result_type: UseRetryResult

state_contract:
  inputs:
    - maxAttempts?: number
  outputs:
    - attempt: number
    - pending: boolean
    - error: unknown
  commands:
    - run<T>(fn: () => Promise<T>): runs fn until success or maxAttempts
    - reset(): clears attempt, error, and pending
  transitions:
    - idle -> pending via run
    - pending -> pending via failed non-final attempt
    - pending -> idle-success via fulfilled attempt
    - pending -> idle-error via final failure
    - any -> idle via reset

required_guards:
  - attempts are bounded by maxAttempts
  - final failure is stored in error and resolves undefined
  - pending clears in finally
  - caller owns backoff timing
paired_components:
  - error-state
  - inline-message
  - tool-call-card

checks:
  source_exists: true
  export_exists: true
  states_complete: true
  reset_path: true
  no_visual_tokens: true
---

# AGENTIC BEHAVIOR SPEC: USERETRY

`useRetry` owns bounded retry state for transient async failures. It exposes attempt
count, pending state, and the final error so components can say what is happening
without owning retry bookkeeping.

## State Contract

`run(fn)` sets `pending=true`, clears the previous error, and invokes `fn` until it
resolves or the current attempt reaches `maxAttempts`. On final failure, the hook
stores the error and resolves `undefined`.

`reset()` clears attempt count, error, and pending state.

## Guards

The hook does not implement backoff or jitter; callers own timing so product teams
can match retry behavior to the operation's risk and cost. `pending` must clear in
`finally` for both success and terminal failure.
