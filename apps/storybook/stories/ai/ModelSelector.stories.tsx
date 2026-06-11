import type { Meta, StoryObj } from '@storybook/react';
import { ModelSelector } from '@clementine-ds/ui';
const meta: Meta<typeof ModelSelector> = { title:'AI/ModelSelector', component: ModelSelector, args:{ label:'Model', models:['claude-opus-4-8','claude-haiku-4-5','claude-sonnet-4-6'], defaultValue:'claude-opus-4-8' } };
export default meta; type Story = StoryObj<typeof ModelSelector>;
export const Default: Story = {};
