import type { Meta, StoryObj } from '@storybook/react';
import { CharacterCounter, Stack } from '@clementine-ds/ui';
const meta: Meta<typeof CharacterCounter> = { title: 'States & Forms/CharacterCounter', component: CharacterCounter, args: { value: 12, max: 280 } };
export default meta; type Story = StoryObj<typeof CharacterCounter>;
export const Default: Story = {};
export const States: Story = { render: () => (<Stack gap="xs"><CharacterCounter value={12} max={280} /><CharacterCounter value={268} max={280} /><CharacterCounter value={291} max={280} /></Stack>) };
