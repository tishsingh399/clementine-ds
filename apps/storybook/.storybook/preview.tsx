import React from 'react';
import type { Preview } from '@storybook/react';
import { ClementineDSProvider } from '@clementine-ds/ui';

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Clementine color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const colorScheme = (context.globals.colorScheme as 'light' | 'dark') ?? 'light';
      return (
        // `key` forces a remount so Mantine's defaultColorScheme re-applies on toggle.
        <ClementineDSProvider key={colorScheme} colorScheme={colorScheme}>
          <div style={{ padding: 24, background: 'var(--mantine-color-body)', minHeight: '100vh' }}>
            <Story />
          </div>
        </ClementineDSProvider>
      );
    },
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
