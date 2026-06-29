---
component: skeleton
ds_version: clementine-ds@0.1.0 (2026-06-10 verified)
status: AI-Ready
last_verified: 2026-06-10

category: Component
required_aria: [aria-busy, aria-hidden]

semantic_parts:
  block: A single placeholder shape (line, circle, rect)

token_contract:
  - skeleton.base
  - skeleton.highlight
  - skeleton.duration
  - skeleton.radius

interaction_states: [loading, loaded]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Skeleton.tsx
    underlying_library: mantine
    exports: [Skeleton, SkeletonProps]
  storybook:
    path: apps/storybook/stories/Skeleton.stories.tsx
  tokens:
    primitives: packages/tokens/src/primitives.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json
    component: packages/tokens/src/components/skeleton.json

patterns_used_in: [loading, data-display, dashboard]
pages_used_in: [dashboard, list-view, profile]
---

# AGENTIC DOCUMENTATION: SKELETON

> **Implementation:** [`packages/ui/src/components/Skeleton.tsx`](../../packages/ui/src/components/Skeleton.tsx) — wraps Mantine `Skeleton`. Shimmer cycle binds to `motion.duration-stream`.

## 1. Purpose & Intent

A placeholder that mimics the shape of content while it loads — reduces layout shift and perceived wait. Use for first-load of *known* layouts (cards, rows, avatars), not for every async state.

**Skeleton must:** mark the loading container `aria-busy="true"` and the skeletons themselves `aria-hidden="true"` · match the real content's footprint so nothing jumps on swap · respect `prefers-reduced-motion` (drop the shimmer to a static tint).

## 2. Token bindings

| Part | Token | Resolves (light) |
|---|---|---|
| base fill | `skeleton.base` → `{surface.subtle}` | `#f3f3f0` |
| shimmer highlight | `skeleton.highlight` → `{surface.default}` | `#fafaf8` |
| shimmer cycle | `skeleton.duration` → `{motion.duration-stream}` | `1200ms` |
| corners | `skeleton.radius` → `{radius.md}` | `6px` |

## 3. States
`loading` (animated placeholder) → `loaded` (swap to real content; never leave a skeleton up after data arrives).

## 4. Do / Don't
**Do** mirror the real layout's shape and count. **Don't** keep skeletons up on error (show an error state), and don't animate when the user prefers reduced motion.
