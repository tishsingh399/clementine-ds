import type { Meta, StoryObj } from '@storybook/react';
import { Indicator, Avatar } from '@clementine-ds/ui';

const meta: Meta<typeof Indicator> = {
  title: 'Components/Indicator',
  component: Indicator,
  render: (args) => (
    <Indicator {...args}>
      <Avatar name="Tina Singh" color="blue" radius="xl" />
    </Indicator>
  ),
  args: { label: '3', size: 18 },
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const WithCount: Story = {};
export const Dot: Story = { args: { label: undefined, size: 10 } };
export const Processing: Story = { args: { label: undefined, size: 10, processing: true, color: 'green' } };
