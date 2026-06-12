import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@clementine-ds/ui';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: { color: { control: 'select', options: ['blue', 'green', 'orange', 'red'] } },
  args: { value: 60 },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};
export const Success: Story = { args: { value: 100, color: 'green' } };
export const Warning: Story = { args: { value: 85, color: 'orange' } };
