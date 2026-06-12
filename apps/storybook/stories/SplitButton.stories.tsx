import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton, MenuItem } from '@clementine-ds/ui';
const meta: Meta<typeof SplitButton> = { title:'Components/SplitButton', component: SplitButton, render:() => (
  <SplitButton onClick={() => {}} menu={<><MenuItem>Save as…</MenuItem><MenuItem>Save and close</MenuItem></>}>Save</SplitButton>
) };
export default meta; type Story = StoryObj<typeof SplitButton>;
export const Default: Story = {};
