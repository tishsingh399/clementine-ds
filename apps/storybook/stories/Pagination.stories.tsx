import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@clementine-ds/ui';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  args: { total: 10, defaultValue: 3 },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
export const WithEdges: Story = { args: { withEdges: true } };
export const Disabled: Story = { args: { disabled: true } };
