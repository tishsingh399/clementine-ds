import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardSection, Text, Title, Button, Badge, Group, Stack } from '@clementine-ds/ui';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    shadow: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    padding: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    withBorder: { control: 'boolean' },
  },
  render: (args) => (
    <Card {...args} w={320}>
      <Stack gap="xs">
        <Group justify="space-between">
          <Title order={4}>Production access</Title>
          <Badge>Active</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          Standing access to the production cluster, scoped to read-only.
        </Text>
        <Button mt="sm">Manage</Button>
      </Stack>
    </Card>
  ),
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Elevated: Story = { args: { shadow: 'lg' } };

export const Flat: Story = { args: { shadow: undefined, withBorder: true } };

export const WithMediaSection: Story = {
  render: (args) => (
    <Card {...args} w={320}>
      <CardSection>
        <div style={{ height: 120, background: 'var(--tds-surface-subtle)' }} />
      </CardSection>
      <Stack gap="xs" mt="md">
        <Title order={4}>Session recording</Title>
        <Text size="sm" c="dimmed">12 min · captured 2 hours ago</Text>
      </Stack>
    </Card>
  ),
};
