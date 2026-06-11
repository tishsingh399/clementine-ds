import type { Meta, StoryObj } from '@storybook/react';
import { Spoiler, Text } from '@clementine-ds/ui';
const meta: Meta<typeof Spoiler> = { title:'Components/Spoiler', component: Spoiler, args:{ maxHeight:48, showLabel:'Show more', hideLabel:'Hide' }, render:(args) => (
  <div style={{ width: 420 }}><Spoiler {...args}><Text size="sm">Standing access grants a permanent permission that remains until manually revoked. It is reviewed quarterly and logged to the regional audit store for 400 days. Just-in-time access, by contrast, expires automatically when the requested window closes.</Text></Spoiler></div>
) };
export default meta; type Story = StoryObj<typeof Spoiler>;
export const Default: Story = {};
