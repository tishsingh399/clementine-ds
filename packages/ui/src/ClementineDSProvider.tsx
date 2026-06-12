import { MantineProvider, type MantineProviderProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { clementineTheme, cssVariablesResolver } from './theme/clementine-theme';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/carousel/styles.css';

export interface ClementineDSProviderProps {
  children: React.ReactNode;
  colorScheme?: MantineProviderProps['defaultColorScheme'];
}

export function ClementineDSProvider({
  children,
  colorScheme = 'light',
}: ClementineDSProviderProps) {
  return (
    <MantineProvider
      theme={clementineTheme}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme={colorScheme}
    >
      {/* Toast outlet — components fire via the `toast` helpers (see components/Toast.tsx) */}
      <Notifications position="bottom-right" limit={5} />
      {children}
    </MantineProvider>
  );
}
