import type { Meta, StoryObj } from '@storybook/react';
import { FieldLabel, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof FieldLabel> = { title: 'States & Forms/FieldLabel', component: FieldLabel, args: { children: 'Email address' } };
export default meta; type Story = StoryObj<typeof FieldLabel>;
export const Default: Story = {};
export const All: Story = { render: () => (<Stack gap="xs"><FieldLabel>Plain</FieldLabel><FieldLabel required>Required</FieldLabel><FieldLabel optional>Optional</FieldLabel></Stack>) };
