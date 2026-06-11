import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from '@clementine-ds/ui';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    type: { control: 'select', options: ['oval', 'bars', 'dots'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { type: 'oval', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Oval: Story = {};
export const Bars: Story = { args: { type: 'bars' } };
export const Dots: Story = { args: { type: 'dots' } };
