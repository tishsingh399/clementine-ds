---
component: carousel
ds_version: clementine-ds@0.1.0 (2026-06-11 verified)
status: AI-Ready
last_verified: 2026-06-11

category: Component
required_aria: [role region, aria-roledescription carousel, controls labelled]

semantic_parts:
  viewport: the clipping window
  slide: a single panel
  control: prev/next buttons
  indicator: position dots

token_contract:
  - carousel.control-bg
  - carousel.control-fg
  - carousel.control-border
  - carousel.indicator
  - carousel.indicator-active
  - carousel.ring
  - carousel.radius

interaction_states: [default, hover, focus, dragging]

checks:
  aria_correct: true
  structure_correct: true
  states_complete: true
  tokens_valid: true
  no_invented_styles: true

sources:
  react:
    path: packages/ui/src/components/Carousel.tsx
    underlying_library: mantine-carousel (embla)
    exports: [Carousel, CarouselProps]
  storybook:
    path: apps/storybook/stories/Carousel.stories.tsx
  tokens:
    component: packages/tokens/src/components/carousel.json
    semantic_light: packages/tokens/src/semantic-light.json
    semantic_dark: packages/tokens/src/semantic-dark.json

patterns_used_in: []
pages_used_in: []
---

# AGENTIC DOCUMENTATION: CAROUSEL

> **Implementation:** [`packages/ui/src/components/Carousel.tsx`](../../packages/ui/src/components/Carousel.tsx) — `@mantine/carousel` (embla-backed). Compose slides with `Carousel.Slide`.

## 1. Purpose & Intent

Horizontally swipeable panels where space is tight and content is browsable: image galleries, template pickers, onboarding cards.

**Carousel must:**
- expose `role="region"` + `aria-roledescription="carousel"`; controls carry explicit labels ("Next slide")
- be fully operable by keyboard (controls focusable, arrows scroll) and by drag/swipe
- show position via indicators when slides > 2
- NEVER auto-advance by default — auto-play requires a visible pause control (WCAG 2.2.2)

## 2. When not to use

- Critical content the user must see — carousels hide everything past slide 1
- Long equal-weight lists → a grid or [Table](../table/index.md) scans better

## 3. Agent notes

1. Slides are composition: `<Carousel><Carousel.Slide>…</Carousel.Slide></Carousel>` — any Clementine component can live inside.
2. `slideSize`/`slideGap` control density; gaps use spacing primitives via props, not custom CSS.
3. If a PM asks for auto-play, wire `embla` autoplay plugin AND a pause button, or push back.
