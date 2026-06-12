import type { Meta, StoryObj } from '@storybook/react';
import { Divider, Stack } from '@clementine-ds/ui';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  render: () => (
    <Stack gap="md" w={320}>
      <Divider />
      <Divider label="Or" labelPosition="center" />
      <Divider label="Section" labelPosition="left" />
    </Stack>
  ),
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
