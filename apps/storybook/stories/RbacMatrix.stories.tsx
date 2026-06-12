import type { Meta, StoryObj } from '@storybook/react';
import { RbacMatrix } from '@clementine-ds/ui';
const meta: Meta<typeof RbacMatrix> = { title:'Enterprise/RbacMatrix', component: RbacMatrix, args:{ roles:['Admin','Auditor','Viewer'], permissions:['Read sessions','Revoke access','Export audit'], grants:new Set(['Admin Read sessions','Admin Revoke access','Admin Export audit','Auditor Read sessions','Auditor Export audit','Viewer Read sessions']), onToggle:()=>{} } };
export default meta; type Story = StoryObj<typeof RbacMatrix>; export const Default: Story = {};
