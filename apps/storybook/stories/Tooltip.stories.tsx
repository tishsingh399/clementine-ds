import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '@clementine-ds/ui';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    label: 'Saves without leaving the page',
    position: 'top',
    withArrow: true,
  },
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    withArrow: { control: 'boolean' },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Hover or focus me</Button>
    </Tooltip>
  ),
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const Bottom: Story = { args: { position: 'bottom' } };

export const NoArrow: Story = { args: { withArrow: false } };

export const WithShortcut: Story = { args: { label: '⌘ + S' } };

export const Multiline: Story = {
  args: {
    label: 'This tip wraps onto multiple lines because the content runs longer than a short phrase.',
    multiline: true,
    w: 220,
  },
};
