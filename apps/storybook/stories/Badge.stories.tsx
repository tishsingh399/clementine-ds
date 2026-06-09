import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@clementine-ds/ui';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'light', 'outline', 'dot'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['blue', 'red', 'gray', 'green', 'orange'],
    },
    risk: {
      control: 'select',
      options: ['critical', 'high', 'medium', 'low'],
    },
  },
  args: {
    children: 'Badge',
    variant: 'light',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Filled: Story = {
  args: { variant: 'filled' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Dot: Story = {
  args: { variant: 'dot' },
};

// Risk-level badges (4 severity tiers)
export const RiskCritical: Story = {
  args: { risk: 'critical', children: 'Critical' },
};

export const RiskHigh: Story = {
  args: { risk: 'high', children: 'High' },
};

export const RiskMedium: Story = {
  args: { risk: 'medium', children: 'Medium' },
};

export const RiskLow: Story = {
  args: { risk: 'low', children: 'Low' },
};
