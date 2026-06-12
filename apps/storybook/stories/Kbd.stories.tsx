import type { Meta, StoryObj } from '@storybook/react';
import { Kbd, Group, Text } from '@clementine-ds/ui';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Shortcut: Story = {
  render: () => (
    <Group gap={4} align="center">
      <Kbd>⌘</Kbd>
      <Text size="sm">+</Text>
      <Kbd>K</Kbd>
    </Group>
  ),
};
