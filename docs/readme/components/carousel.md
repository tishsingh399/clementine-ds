# Carousel

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/carousel/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Carousel.tsx) | [Storybook](https://clementine-ds-storybook.vercel.app/?path=/story/components-carousel--default) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/carousel.json)

## Overview

Horizontally swipeable slides with prev/next controls and position indicators. Embla-backed. Compose any Clementine component inside `Carousel.Slide`.

Status: `AI-Ready`. Token contract closed at 7 component-tier tokens. Dependency-gated: `@mantine/carousel` + `embla-carousel-react`.

## When to use

- Image galleries, template pickers, onboarding cards — browsable, equal-weight content in tight space

## When not to use

- Critical content the user must see — everything past slide 1 is hidden
- Long lists — a grid or Table scans better

## Accessibility

- `role="region"` + `aria-roledescription="carousel"`, labelled controls ("Next slide")
- Keyboard + drag/swipe operable; indicators when slides > 2
- **No auto-play by default.** Auto-play requires a visible pause control (WCAG 2.2.2).

## Related

- [Card](./card.md) · [Tabs](./tabs.md)
