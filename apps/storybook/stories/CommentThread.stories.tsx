import type { Meta, StoryObj } from '@storybook/react';
import { CommentThread } from '@clementine-ds/ui';
const meta: Meta<typeof CommentThread> = { title:'Enterprise/CommentThread', component: CommentThread, args:{ onSubmit:()=>{}, comments:[{ id:'1', author:'Jordan Lee', body:'Approved — scope looks right.', when:'1h ago' },{ id:'2', author:'Tina Singh', body:'Thanks, revoking the extras now.', when:'12m ago' }] } };
export default meta; type Story = StoryObj<typeof CommentThread>; export const Default: Story = {};
