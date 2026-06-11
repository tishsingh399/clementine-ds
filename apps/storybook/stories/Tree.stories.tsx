import type { Meta, StoryObj } from '@storybook/react';
import { Tree } from '@clementine-ds/ui';
const data = [{ value:'access', label:'Access', children:[{ value:'standing', label:'Standing' },{ value:'jit', label:'Just-in-time' }] },{ value:'audit', label:'Audit', children:[{ value:'logs', label:'Logs' }] }];
const meta: Meta<typeof Tree> = { title:'Components/Tree', component: Tree, args:{ data } };
export default meta; type Story = StoryObj<typeof Tree>;
export const Default: Story = {};
