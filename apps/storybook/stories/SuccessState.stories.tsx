import type { Meta, StoryObj } from '@storybook/react';
import { SuccessState, Button } from '@clementine-ds/ui';
const meta: Meta<typeof SuccessState> = { title: 'States & Forms/SuccessState', component: SuccessState, args: { title: 'Deployment complete', description: 'Your changes are live.' } };
export default meta; type Story = StoryObj<typeof SuccessState>;
export const Default: Story = {};
export const WithAction: Story = { args: { action: <Button>View site</Button> } };
