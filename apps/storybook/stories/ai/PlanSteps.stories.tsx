import type { Meta, StoryObj } from '@storybook/react';
import { PlanSteps } from '@clementine-ds/ui';
const meta: Meta<typeof PlanSteps> = { title:'AI/PlanSteps', component: PlanSteps, args:{ steps:[{ label:'Query active sessions', status:'done' },{ label:'Filter by standing access', status:'done' },{ label:'Summarize the count', status:'active' },{ label:'Offer to revoke', status:'pending' }] } };
export default meta; type Story = StoryObj<typeof PlanSteps>;
export const Default: Story = {};
