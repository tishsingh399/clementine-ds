import figma from '@figma/code-connect';
import { Table, TableThead, TableTbody, TableTr, TableTh, TableTd } from './Table';

// Figma → code link for the Clementine 'Table' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Table, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=16-1052', {
  example: () => (
    <Table><TableThead><TableTr><TableTh>User</TableTh></TableTr></TableThead><TableTbody><TableTr><TableTd>Tina</TableTd></TableTr></TableTbody></Table>
  ),
});
