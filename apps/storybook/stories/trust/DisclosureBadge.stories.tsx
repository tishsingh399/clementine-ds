import type { Meta, StoryObj } from '@storybook/react';
import { DisclosureBadge } from '@clementine-ds/ui';

const meta: Meta<typeof DisclosureBadge> = {
  title: 'Trust/DisclosureBadge',
  component: DisclosureBadge,
};

export default meta;
type Story = StoryObj<typeof DisclosureBadge>;

export const Default: Story = {};
export const Assisted: Story = { args: { label: 'AI-assisted' } };
export const Beta: Story = { args: { label: 'AI · beta', color: 'orange' } };
