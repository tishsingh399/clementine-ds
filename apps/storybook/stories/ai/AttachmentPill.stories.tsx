import type { Meta, StoryObj } from '@storybook/react';
import { AttachmentPill, Group } from '@clementine-ds/ui';
const meta: Meta<typeof AttachmentPill> = { title:'AI/AttachmentPill', component: AttachmentPill, args:{ name:'access-review-q3.pdf', size:'240 KB' } };
export default meta; type Story = StoryObj<typeof AttachmentPill>;
export const Default: Story = { render:(args) => <AttachmentPill {...args} onRemove={() => {}} /> };
export const Multiple: Story = { render:() => (
  <Group gap={8}><AttachmentPill name="policy.pdf" size="120 KB" onRemove={() => {}} /><AttachmentPill name="logs.csv" size="2.1 MB" onRemove={() => {}} /></Group>
) };
