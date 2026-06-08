import React from 'react';
import type { Preview } from '@storybook/react';
import { ClementineDSProvider } from '@clementine-ds/ui';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ClementineDSProvider>
        <Story />
      </ClementineDSProvider>
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
