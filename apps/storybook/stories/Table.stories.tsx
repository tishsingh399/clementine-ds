import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Badge } from '@clementine-ds/ui';
const meta: Meta<typeof Table> = { title:'Components/Table', component: Table, args:{ striped:true, highlightOnHover:true, withTableBorder:true }, render:(args) => (
  <Table {...args} w={520}>
    <TableThead><TableTr><TableTh>User</TableTh><TableTh>Access</TableTh><TableTh>Status</TableTh></TableTr></TableThead>
    <TableTbody>
      <TableTr><TableTd>Tina Singh</TableTd><TableTd>Standing</TableTd><TableTd><Badge>Active</Badge></TableTd></TableTr>
      <TableTr><TableTd>Jordan Lee</TableTd><TableTd>Just-in-time</TableTd><TableTd><Badge color="gray">Expired</Badge></TableTd></TableTr>
      <TableTr><TableTd>Sam Park</TableTd><TableTd>Standing</TableTd><TableTd><Badge>Active</Badge></TableTd></TableTr>
    </TableTbody>
  </Table>
) };
export default meta; type Story = StoryObj<typeof Table>;
export const Default: Story = {};
export const Plain: Story = { args:{ striped:false, withTableBorder:false } };
