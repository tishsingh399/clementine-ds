import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '@clementine-ds/ui';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { radius: 'xl', size: 'md' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = { args: { name: 'Tina Singh', color: 'blue' } };

export const Image: Story = {
  args: { src: 'https://i.pravatar.cc/120?img=47', alt: 'Tina Singh' },
};

export const Placeholder: Story = {};

export const Stacked: Story = {
  name: 'Group',
  render: () => (
    <AvatarGroup>
      <Avatar name="Tina Singh" color="blue" />
      <Avatar name="Jordan Lee" color="green" />
      <Avatar name="Sam Park" color="orange" />
      <Avatar>+5</Avatar>
    </AvatarGroup>
  ),
};
