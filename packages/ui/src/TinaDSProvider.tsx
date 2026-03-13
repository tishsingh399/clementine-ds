import { MantineProvider, type MantineProviderProps } from '@mantine/core';
import { tinaTheme, cssVariablesResolver } from './theme/tina-theme';
import '@mantine/core/styles.css';

export interface TinaDSProviderProps {
  children: React.ReactNode;
  colorScheme?: MantineProviderProps['defaultColorScheme'];
}

export function TinaDSProvider({
  children,
  colorScheme = 'light',
}: TinaDSProviderProps) {
  return (
    <MantineProvider
      theme={tinaTheme}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme={colorScheme}
    >
      {children}
    </MantineProvider>
  );
}
