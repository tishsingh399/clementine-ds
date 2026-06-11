import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@clementine-ds/ui';
const meta: Meta<typeof IconButton> = { title:'Components/IconButton', component: IconButton, args:{ 'aria-label':'Edit', variant:'subtle', children:'✎' }, argTypes:{ variant:{ control:'select', options:['filled','light','subtle','outline','default'] } } };
export default meta; type Story = StoryObj<typeof IconButton>;
export const Default: Story = {};
export const Filled: Story = { args:{ variant:'filled' } };
export const Disabled: Story = { args:{ disabled:true } };
