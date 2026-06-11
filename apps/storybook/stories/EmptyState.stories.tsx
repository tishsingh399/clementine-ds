import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, Button } from '@clementine-ds/ui';
const meta: Meta<typeof EmptyState> = { title: 'States & Forms/EmptyState', component: EmptyState, args: { title: 'No results', description: 'Try adjusting your filters or search terms.' } };
export default meta; type Story = StoryObj<typeof EmptyState>;
export const Default: Story = {};
export const WithAction: Story = { args: { action: <Button>Clear filters</Button> } };
