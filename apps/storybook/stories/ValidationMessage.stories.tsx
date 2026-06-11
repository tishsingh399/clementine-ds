import type { Meta, StoryObj } from '@storybook/react';
import { ValidationMessage, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof ValidationMessage> = { title: 'States & Forms/ValidationMessage', component: ValidationMessage, args: { status: 'error', children: 'Enter a valid email address.' } };
export default meta; type Story = StoryObj<typeof ValidationMessage>;
export const Error: Story = {};
export const All: Story = { render: () => (<Stack gap="xs"><ValidationMessage status="error">Enter a valid email.</ValidationMessage><ValidationMessage status="warning">This domain is unverified.</ValidationMessage><ValidationMessage status="success">Looks good.</ValidationMessage></Stack>) };
