# Toast

[Spec](https://github.com/tishsingh399/clementine-ds/blob/main/specs/toast/index.md) | [Code](https://github.com/tishsingh399/clementine-ds/blob/main/packages/ui/src/components/Toast.tsx) | [Storybook](https://clementine-ds-storybook.vercel.app/?path=/story/components-toast--playground) | [Tokens](https://github.com/tishsingh399/clementine-ds/blob/main/packages/tokens/src/components/toast.json)

## Overview

Transient, non-blocking status messages fired imperatively: `toast.success('Saved')`. The `<Notifications />` outlet mounts once inside ClementineDSProvider — never mount a second one.

Status: `AI-Ready`. Token contract closed at 9 component-tier tokens. Dependency-gated: `@mantine/notifications`.

## API

```tsx
import { toast } from '@clementine-ds/ui';

toast.success('Changes saved');
toast.error('Could not connect — retrying');          // 8s, role=alert
toast.undo('Deleted 3 items', { title: 'Undo available' }); // 10s, reversibility pattern
```

## Toast vs Alert

| | Toast | Alert |
|---|---|---|
| Position | overlay stack (bottom-right) | inline in layout |
| Lifetime | seconds, self-dismissing | until resolved |
| Use for | action feedback | persistent state |

## Don't

- Put a required decision in a toast — it disappears. Use ConfirmDialog.
- Color the toast background per intent — intent lives in the icon tokens; backgrounds stay neutral so stacks don't become a rainbow.

## Related

- [Alert](./alert.md) · [ConfirmDialog pattern](https://github.com/tishsingh399/clementine-ds/blob/main/patterns/confirm-dialog/index.md)
