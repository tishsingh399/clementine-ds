import type { Meta, StoryObj } from '@storybook/react';
import { HelperText } from '@clementine-ds/ui';
const meta: Meta<typeof HelperText> = { title: 'States & Forms/HelperText', component: HelperText, args: { children: 'Use 8\u201332 characters, including a number.' } };
export default meta; type Story = StoryObj<typeof HelperText>;
export const Default: Story = {};
