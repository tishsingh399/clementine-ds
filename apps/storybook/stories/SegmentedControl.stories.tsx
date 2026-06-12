import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from '@clementine-ds/ui';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: { data: ['Day', 'Week', 'Month'], defaultValue: 'Week' },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {};
export const FullWidth: Story = { args: { fullWidth: true } };
export const Disabled: Story = { args: { disabled: true } };
