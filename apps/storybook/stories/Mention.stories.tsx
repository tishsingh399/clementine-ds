import type { Meta, StoryObj } from '@storybook/react';
import { Mention, Text } from '@clementine-ds/ui';
const meta: Meta<typeof Mention> = { title:'Enterprise/Mention', component: Mention, render:() => (<Text size="sm">Assigned to <Mention name="Tina Singh" href="#" /> for review, cc <Mention name="Jordan Lee" href="#" />.</Text>) };
export default meta; type Story = StoryObj<typeof Mention>; export const Default: Story = {};
