import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '@clementine-ds/ui';
const meta: Meta<typeof MultiSelect> = { title:'Components/MultiSelect', component: MultiSelect, args:{ label:'Roles', placeholder:'Pick roles', data:['Admin','Auditor','Viewer','Operator'], defaultValue:['Auditor'] } };
export default meta; type Story = StoryObj<typeof MultiSelect>;
export const Default: Story = {};
export const Searchable: Story = { args:{ searchable:true } };
export const WithError: Story = { args:{ error:'Pick at least one role' } };
