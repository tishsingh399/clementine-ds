import { MantineProvider, type MantineProviderProps } from '@mantine/core';
import { clementineTheme, cssVariablesResolver } from './theme/clementine-theme';
import '@mantine/core/styles.css';

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
      {children}
    </MantineProvider>
  );
}
