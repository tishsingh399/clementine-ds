import type { Meta, StoryObj } from '@storybook/react';
import { PromptSuggestions } from '@clementine-ds/ui';
const meta: Meta<typeof PromptSuggestions> = { title:'AI/PromptSuggestions', component: PromptSuggestions, args:{ suggestions:['Show standing access','Summarize the audit log','Who can reach prod?'] } };
export default meta; type Story = StoryObj<typeof PromptSuggestions>;
export const Default: Story = {};
