import type { Meta, StoryObj } from '@storybook/react';
import { InlineMessage, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof InlineMessage> = { title: 'States & Forms/InlineMessage', component: InlineMessage, args: { status: 'info', children: 'Changes are saved automatically.' } };
export default meta; type Story = StoryObj<typeof InlineMessage>;
export const Info: Story = {};
export const All: Story = { render: () => (<Stack gap="xs"><InlineMessage status="info">Saved automatically.</InlineMessage><InlineMessage status="success">Profile updated.</InlineMessage><InlineMessage status="warning">Session expires soon.</InlineMessage><InlineMessage status="error">Upload failed.</InlineMessage></Stack>) };
