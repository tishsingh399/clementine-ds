import { Paper, Stack, Group, Text, Button, Code } from '@mantine/core';
import { forwardRef } from 'react';

export interface PermissionRequestProps {
  /** What the agent wants to do, e.g. "Read your session list". */
  action: string;
  /** The specific scope/resource requested. */
  scope?: string;
  onAllow?: () => void;
  onDeny?: () => void;
}

/**
 * Tray 4 · AI — a least-privilege access request: "Agent wants to do X (scope Y)" → Allow /
 * Deny. Central to privileged-access contexts. Tokens: permission.* .
 * Spec: specs/ai/permission-request/index.md
 */
export const PermissionRequest = forwardRef<HTMLDivElement, PermissionRequestProps>(
  ({ action, scope, onAllow, onDeny }, ref) => (
    <Paper ref={ref} withBorder radius="md" p="md" role="group" aria-label="Permission request"
      style={{ background: 'var(--tds-feedback-warning-subtle)', borderColor: 'var(--tds-feedback-warning)' }}>
      <Stack gap="sm">
        <Text fw={600} size="sm">Agent requests permission</Text>
        <Text size="sm" c="dimmed">{action}</Text>
        {scope && <Code style={{ fontSize: 12 }}>{scope}</Code>}
        <Group gap="xs">
          <Button size="xs" onClick={onAllow}>Allow</Button>
          <Button size="xs" variant="default" onClick={onDeny}>Deny</Button>
        </Group>
      </Stack>
    </Paper>
  ),
);

PermissionRequest.displayName = 'PermissionRequest';
