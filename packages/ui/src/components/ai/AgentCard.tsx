import { Paper, Stack, Group, Text, Avatar, Badge } from '@mantine/core';
import { forwardRef } from 'react';

export interface AgentCardProps {
  name: string;
  description?: string;
  capabilities?: string[];
  owner?: string;
}

/**
 * Tray 4 · AI — a profile card for an agent: identity, what it does, its capabilities, and
 * owner. Used in rosters and pickers. Tokens: agent-card.* . Spec: specs/agent-card/index.md
 */
export const AgentCard = forwardRef<HTMLDivElement, AgentCardProps>(
  ({ name, description, capabilities = [], owner }, ref) => (
    <Paper ref={ref} withBorder radius="md" p="md" style={{ background: 'var(--cds-surface-elevated)' }}>
      <Stack gap="sm">
        <Group gap="sm" wrap="nowrap">
          <Avatar name={name} color="blue" radius="md" />
          <div>
            <Text fw={600} size="sm" style={{ color: 'var(--cds-text-primary)' }}>{name}</Text>
            {owner && <Text size="xs" c="dimmed">{owner}</Text>}
          </div>
        </Group>
        {description && <Text size="sm" c="dimmed">{description}</Text>}
        {capabilities.length > 0 && (
          <Group gap={6}>
            {capabilities.map((c) => <Badge key={c} variant="light" color="gray" size="sm">{c}</Badge>)}
          </Group>
        )}
      </Stack>
    </Paper>
  ),
);

AgentCard.displayName = 'AgentCard';
