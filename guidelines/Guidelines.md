# Clementine DS — Design System Guidelines for Figma Make

## Package

Install `@clementine-ds/ui` from npm. All components must be wrapped in `<ClementineDSProvider>`.

## Import pattern

```tsx
import { Button, TextInput, Select, Badge, Modal, Stack, Group, Text } from '@clementine-ds/ui';
```

## Provider setup

```tsx
import { ClementineDSProvider } from '@clementine-ds/ui';

function App() {
  return (
    <ClementineDSProvider>
      {/* All content here */}
    </ClementineDSProvider>
  );
}
```

## Component rules

### Button
- Always use the `variant` prop: `filled`, `outline`, `light`, or `subtle`
- Use `color="red"` for destructive actions (delete, revoke, terminate)
- Use `color="blue"` (default) for primary actions
- Never create custom button styles

### Badge for risk levels
- `<Badge risk="critical">Critical</Badge>` — red filled
- `<Badge risk="high">High</Badge>` — orange light
- `<Badge risk="medium">Medium</Badge>` — orange light
- `<Badge risk="low">Low</Badge>` — green light
- Use the `risk` prop instead of manually setting `color` and `variant`

### TextInput / Select / Textarea
- Always include the `label` prop
- Use the `error` prop for validation messages
- Use `withAsterisk` for required fields
- Use `description` for helper text

### Modal
- Always include `title` and `withCloseButton`
- Use `centered` for confirmation dialogs
- Use `size="lg"` for forms with multiple fields

### Tabs
- Use `variant="default"` for page-level navigation
- Use `variant="pills"` for section filters

## Layout

- Use `<Stack gap="md">` for vertical layouts
- Use `<Group gap="sm">` for horizontal layouts
- Use `<Container>` for max-width content areas

## Typography

- Use `<Text>` for body text
- Use `<Title order={1-6}>` for headings
- Machine data (IPs, session IDs, timestamps, hashes): `<Text ff="monospace">{value}</Text>`

## Theming

- Never hardcode colors — all colors come from the theme
- Use Mantine's `color` prop for semantic meaning
- Use CSS variables `--cds-*` for semantic tokens in custom styles
- Available semantic vars: `--cds-action-primary`, `--cds-surface-default`, `--cds-text-primary`, `--cds-border-default`, `--cds-risk-critical`, etc.

## Never

- Never use raw HTML elements when a Clementine DS component exists
- Never hardcode colors — use theme tokens
- Never create new button variants — use the existing `variant` prop
- Never skip labels on form inputs
- Never use inline styles for spacing — use Stack/Group `gap` prop
