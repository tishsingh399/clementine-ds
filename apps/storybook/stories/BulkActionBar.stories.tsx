import type { Meta, StoryObj } from '@storybook/react';
import { BulkActionBar, Button } from '@clementine-ds/ui';
const meta: Meta<typeof BulkActionBar> = { title:'Enterprise/BulkActionBar', component: BulkActionBar, args:{ count:3, onClear:()=>{}, actions:<Button size="xs" color="red">Revoke</Button> }, render:(a)=> <div style={{width:520}}><BulkActionBar {...a} /></div> };
export default meta; type Story = StoryObj<typeof BulkActionBar>; export const Default: Story = {};
