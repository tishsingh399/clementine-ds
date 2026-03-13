import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@tina-ds/ui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'light', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['blue', 'red', 'gray', 'green', 'orange'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'md',
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Light: Story = {
  args: { variant: 'light' },
};

export const Subtle: Story = {
  args: { variant: 'subtle' },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Destructive: Story = {
  args: { color: 'red', children: 'Delete' },
};
