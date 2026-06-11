import type { Meta, StoryObj } from '@storybook/react';
import { ThemeIcon, Group } from '@clementine-ds/ui';

const meta: Meta<typeof ThemeIcon> = {
  title: 'Components/ThemeIcon',
  component: ThemeIcon,
  args: { children: '★', size: 'lg' },
  argTypes: { variant: { control: 'select', options: ['filled', 'light', 'outline'] } },
};

export default meta;
type Story = StoryObj<typeof ThemeIcon>;

export const Filled: Story = {};
export const Light: Story = { args: { variant: 'light' } };

export const Sizes: Story = {
  render: () => (
    <Group>
      <ThemeIcon size="sm">★</ThemeIcon>
      <ThemeIcon size="md">★</ThemeIcon>
      <ThemeIcon size="lg">★</ThemeIcon>
    </Group>
  ),
};
