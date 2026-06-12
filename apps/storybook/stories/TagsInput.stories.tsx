import type { Meta, StoryObj } from '@storybook/react';
import { TagsInput } from '@clementine-ds/ui';
const meta: Meta<typeof TagsInput> = { title:'Components/TagsInput', component: TagsInput, args:{ label:'Labels', placeholder:'Add a label', defaultValue:['prod','read-only'] } };
export default meta; type Story = StoryObj<typeof TagsInput>;
export const Default: Story = {};
export const WithSuggestions: Story = { args:{ data:['prod','staging','read-only','admin'] } };
export const Disabled: Story = { args:{ disabled:true } };
