import type { Meta, StoryObj } from '@storybook/react';
import { SavedViews } from '@clementine-ds/ui';
const meta: Meta<typeof SavedViews> = { title:'Enterprise/SavedViews', component: SavedViews, args:{ views:[{ id:'1', name:'All access' },{ id:'2', name:'Standing only' },{ id:'3', name:'Expiring soon' }], activeId:'2', onSelect:()=>{}, onSave:()=>{} } };
export default meta; type Story = StoryObj<typeof SavedViews>; export const Default: Story = {};
