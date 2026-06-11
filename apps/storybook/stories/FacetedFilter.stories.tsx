import type { Meta, StoryObj } from '@storybook/react';
import { FacetedFilter } from '@clementine-ds/ui';
const groups = [{ label:'Access type', options:[{ value:'standing', label:'Standing', count:37 },{ value:'jit', label:'Just-in-time', count:112 }] },{ label:'Status', options:[{ value:'active', label:'Active', count:120 },{ value:'expired', label:'Expired', count:29 }] }];
const meta: Meta<typeof FacetedFilter> = { title:'Enterprise/FacetedFilter', component: FacetedFilter, args:{ groups, selected:['standing'] } };
export default meta; type Story = StoryObj<typeof FacetedFilter>; export const Default: Story = {};
