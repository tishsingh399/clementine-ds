import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState, Button } from '@clementine-ds/ui';
const meta: Meta<typeof ErrorState> = { title: 'States & Forms/ErrorState', component: ErrorState, args: { description: 'We couldn\u2019t load this page. Check your connection and try again.' } };
export default meta; type Story = StoryObj<typeof ErrorState>;
export const Default: Story = {};
export const WithRetry: Story = { args: { action: <Button>Retry</Button> } };
