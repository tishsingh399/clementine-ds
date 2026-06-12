import type { Meta, StoryObj } from '@storybook/react';
import { Code, Text } from '@clementine-ds/ui';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Inline: Story = {
  render: () => (
    <Text size="sm">
      Run <Code>pnpm install</Code> then <Code>npx figma connect publish</Code>.
    </Text>
  ),
};

export const Block: Story = {
  render: () => <Code block>{`await revokeSessions(ids);\nlog('revoked', ids.length);`}</Code>,
};
