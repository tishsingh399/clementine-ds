import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, Anchor } from '@clementine-ds/ui';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  render: () => (
    <Breadcrumbs>
      <Anchor href="#">Dashboard</Anchor>
      <Anchor href="#">Access</Anchor>
      <span>Sessions</span>
    </Breadcrumbs>
  ),
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {};
