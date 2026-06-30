---
behavior: use-streaming
ds_version: clementine-ds@0.1.0 (2026-06-29 verified)
status: AI-Ready
last_verified: 2026-06-29

category: Behavior
kind: hook
source:
  path: packages/ui/src/hooks/useStreaming.ts
  export: useStreaming
  result_type: UseStreamingResult

state_contract:
  inputs:
    - initial?: string
  outputs:
    - text: string
    - isStreaming: boolean
  commands:
    - start(): sets isStreaming true without mutating text
    - append(chunk: string): appends chunk to text
    - stop(): sets isStreaming false without clearing text
    - reset(): clears text and sets isStreaming false
  transitions:
    - idle -> streaming via start
    - streaming -> streaming via append
    - streaming -> idle via stop
    - any -> idle-empty via reset

required_guards:
  - reset clears accumulated text and busy state
  - append preserves prior chunks in order
  - stop does not discard partial output
paired_components:
  - streaming-text
  - message

checks:
  source_exists: true
  export_exists: true
  states_complete: true
  reset_path: true
  no_visual_tokens: true
---

# AGENTIC BEHAVIOR SPEC: USESTREAMING

`useStreaming` owns the "becoming" text state for AI output that arrives in chunks.
It is intentionally visual-free: components decide how to render the caret, message,
or trace, while the hook owns text accumulation and the streaming flag.

## State Contract

Call `start()` before chunks arrive, `append(chunk)` for each received text chunk,
and `stop()` when the stream ends. `reset()` returns the hook to an empty idle state.

Consumers must not infer stream completion from an empty chunk; only `stop()` or
`reset()` ends the streaming state.

## Guards

`append()` must preserve ordering by appending to the previous state value.
`stop()` keeps partial text visible so interrupted or failed streams can still be
shown. `reset()` is the only command that clears text.
