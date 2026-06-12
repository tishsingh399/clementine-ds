import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from '@clementine-ds/ui';

const meta: Meta<typeof Anchor> = {
  title: 'Components/Anchor',
  component: Anchor,
  args: { href: '#', children: 'Read the access policy' },
  argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Underline: Story = { args: { underline: 'always' } };
