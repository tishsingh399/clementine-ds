import { Paper, Group, Stack, Text, Button, Badge } from '@mantine/core';
import { forwardRef } from 'react';

export type HITLStatus = 'pending' | 'approved' | 'denied';

export interface HITLGateProps {
  title: string;
  description?: React.ReactNode;
  /** Preview of the action awaiting approval (e.g. a ToolCallCard or diff). */
  children?: React.ReactNode;
  onApprove?: () => void;
  onDeny?: () => void;
  onEdit?: () => void;
  approveLabel?: string;
  denyLabel?: string;
  /** The gated action is destructive — approve button turns danger-colored. */
  destructive?: boolean;
  status?: HITLStatus;
}

/**
 * Clementine HITLGate — a human-in-the-loop checkpoint that pauses an agent before a
 * consequential action runs (write, delete, send, spend).
 *
 * Caution-styled (feedback.warning) with Approve / Deny / Edit. Destructive actions get a
 * danger-colored Approve AND explicit wording. Tokens: hitl.* . See specs/ai/hitl-gate/index.md.
 */
export const HITLGate = forwardRef<HTMLDivElement, HITLGateProps>(
  ({ title, description, children, onApprove, onDeny, onEdit, approveLabel = 'Approve', denyLabel = 'Deny', destructive = false, status = 'pending' }, ref) => {
    const decided = status !== 'pending';
    return (
      <Paper
        ref={ref}
        withBorder
        radius="md"
        p="md"
        role="group"
        aria-label={title}
        style={{ background: 'var(--tds-feedback-warning-subtle)', borderColor: 'var(--tds-feedback-warning)' }}
      >
        <Stack gap="sm">
          <Group justify="space-between" wrap="nowrap">
            <Text fw={600} size="sm">{title}</Text>
            <Badge size="sm" variant="light" color={status === 'approved' ? 'green' : status === 'denied' ? 'red' : 'orange'}>
              {status === 'pending' ? 'Needs approval' : status === 'approved' ? 'Approved' : 'Denied'}
            </Badge>
          </Group>
          {description && <Text size="sm" c="dimmed">{description}</Text>}
          {children}
          {!decided && (
            <Group gap="xs">
              <Button size="xs" color={destructive ? 'red' : 'blue'} onClick={onApprove}>{approveLabel}</Button>
              <Button size="xs" variant="default" onClick={onDeny}>{denyLabel}</Button>
              {onEdit && <Button size="xs" variant="subtle" onClick={onEdit}>Edit</Button>}
            </Group>
          )}
        </Stack>
      </Paper>
    );
  },
);

HITLGate.displayName = 'HITLGate';
