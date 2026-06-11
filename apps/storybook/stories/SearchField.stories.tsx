import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from '@clementine-ds/ui';
const meta: Meta<typeof SearchField> = { title:'Components/SearchField', component: SearchField, args:{ placeholder:'Search sessions', w:280 } };
export default meta; type Story = StoryObj<typeof SearchField>;
export const Default: Story = {};
