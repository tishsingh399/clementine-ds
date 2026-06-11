import type { Meta, StoryObj } from '@storybook/react';
import { RolePicker } from '@clementine-ds/ui';
const meta: Meta<typeof RolePicker> = { title:'Enterprise/RolePicker', component: RolePicker, args:{ label:'Roles', roles:['Admin','Auditor','Viewer','Operator','Approver'], defaultValue:['Auditor'] } };
export default meta; type Story = StoryObj<typeof RolePicker>; export const Default: Story = {};
