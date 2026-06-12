import type { Meta, StoryObj } from '@storybook/react';
import { CitationChip, Text } from '@clementine-ds/ui';

const meta: Meta<typeof CitationChip> = {
  title: 'AI/CitationChip',
  component: CitationChip,
  args: { index: 1, source: 'retention-policy.md', snippet: 'Sessions retained for 400 days', href: '#' },
};

export default meta;
type Story = StoryObj<typeof CitationChip>;

export const Default: Story = {};

export const InProse: Story = {
  render: () => (
    <Text size="sm" maw={440}>
      Audit logs are retained for 400 days
      <CitationChip index={1} source="retention-policy.md" snippet="400-day retention window" href="#" /> in the regional
      store
      <CitationChip index={2} source="architecture.md" href="#" />.
    </Text>
  ),
};
