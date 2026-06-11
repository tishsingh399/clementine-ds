import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from '@clementine-ds/ui';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  args: {
    label: 'Assignee',
    placeholder: 'Type a name',
    data: ['Tina Singh', 'Jordan Lee', 'Sam Park', 'Alex Kim'],
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Pick a valid assignee' } };
export const Disabled: Story = { args: { disabled: true } };
