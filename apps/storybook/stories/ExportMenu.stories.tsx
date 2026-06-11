import type { Meta, StoryObj } from '@storybook/react';
import { ExportMenu } from '@clementine-ds/ui';
const meta: Meta<typeof ExportMenu> = { title:'Enterprise/ExportMenu', component: ExportMenu, args:{ onExport:()=>{} } };
export default meta; type Story = StoryObj<typeof ExportMenu>; export const Default: Story = {};
