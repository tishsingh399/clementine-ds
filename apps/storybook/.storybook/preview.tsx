import React from 'react';
import type { Preview } from '@storybook/react';
import { TinaDSProvider } from '@tina-ds/ui';

const preview: Preview = {
  decorators: [
    (Story) => (
      <TinaDSProvider>
        <Story />
      </TinaDSProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
