import { addons } from 'storybook/internal/manager-api';
import { create } from 'storybook/internal/theming/create';

// Brand the Storybook shell as Clementine: the sidebar title and link.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Clementine Design System',
    brandUrl: 'https://clementine-ds-site.vercel.app',
    brandTarget: '_self',
  }),
});
