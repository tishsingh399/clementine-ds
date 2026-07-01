# Motion Lens

Use when transitions, animations, streaming reveal, loading feedback, or realtime visuals change.

## Motion Levels

| Level | Name | Clementine use |
|---|---|---|
| 0 | None | Default for docs, forms, dense enterprise screens, and static specs. |
| 1 | Micro-motion | Hover, press, focus, disclosure open/close, and lightweight state confirmation. |
| 2 | State choreography | Loading, streaming, retry, interrupt, and tool-running feedback. |
| 3 | Product demonstration | Observatory and marketing surfaces only; one authored moment per page. |
| 4 | Realtime/3D | Only when user control is the value, never as decoration. |

## Check

| Area | Clementine expectation |
|---|---|
| Purpose | Motion explains state, hierarchy, progress, or control. |
| Restraint | Enterprise components stay at levels 0-2. |
| Duration | Micro-motion is short; long loops need a state reason. |
| Reduced motion | Every animation-heavy surface has a reduced-motion fallback. |
| Token fit | Motion choices should eventually map to motion tokens or behavior specs. |

## Flag Immediately

- scroll-triggered animation on functional UI
- hover scale above 1.02
- bouncy/elastic easing on enterprise controls
- looping motion without a live state
- motion that hides state changes from reduced-motion users

## PR Note Format

```md
Motion lens:
- Motion level:
- State explained:
- Reduced-motion behavior:
- Remaining risk:
```
