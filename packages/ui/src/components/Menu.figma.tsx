import figma from '@figma/code-connect';
import { Menu, MenuTarget, MenuDropdown, MenuItem, MenuLabel, MenuDivider } from './Menu';

// Figma → code link for the Clementine 'Menu' component.
// Publish with: npx figma connect publish  (requires FIGMA_ACCESS_TOKEN)
figma.connect(Menu, 'https://www.figma.com/design/w4JB0MOEIzOtSKx5Y3YSQR/Clementine-DS?node-id=6-614', {
  example: () => (
    <Menu>
          <MenuTarget><button>Actions</button></MenuTarget>
          <MenuDropdown>
            <MenuLabel>Session</MenuLabel>
            <MenuItem>View details</MenuItem>
            <MenuDivider />
            <MenuItem color="red">Revoke access</MenuItem>
          </MenuDropdown>
        </Menu>
  ),
});
