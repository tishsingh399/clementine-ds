import { createTheme, type CSSVariablesResolver } from '@mantine/core';
import * as p from '@clementine-ds/tokens';
import lightTokens from '@clementine-ds/tokens/semantic-light';
import darkTokens from '@clementine-ds/tokens/semantic-dark';

// Resolve DTCG references like "{color.blue.6}" to actual hex values
const primitiveMap: Record<string, string> = {
  '{color.blue.0}': p.colorBlue0, '{color.blue.1}': p.colorBlue1,
  '{color.blue.2}': p.colorBlue2, '{color.blue.3}': p.colorBlue3,
  '{color.blue.4}': p.colorBlue4, '{color.blue.5}': p.colorBlue5,
  '{color.blue.6}': p.colorBlue6, '{color.blue.7}': p.colorBlue7,
  '{color.blue.8}': p.colorBlue8, '{color.blue.9}': p.colorBlue9,
  '{color.red.0}': p.colorRed0, '{color.red.1}': p.colorRed1,
  '{color.red.2}': p.colorRed2, '{color.red.3}': p.colorRed3,
  '{color.red.4}': p.colorRed4, '{color.red.5}': p.colorRed5,
  '{color.red.6}': p.colorRed6, '{color.red.7}': p.colorRed7,
  '{color.red.8}': p.colorRed8, '{color.red.9}': p.colorRed9,
  '{color.gray.0}': p.colorGray0, '{color.gray.1}': p.colorGray1,
  '{color.gray.2}': p.colorGray2, '{color.gray.3}': p.colorGray3,
  '{color.gray.4}': p.colorGray4, '{color.gray.5}': p.colorGray5,
  '{color.gray.6}': p.colorGray6, '{color.gray.7}': p.colorGray7,
  '{color.gray.8}': p.colorGray8, '{color.gray.9}': p.colorGray9,
  '{color.green.0}': p.colorGreen0, '{color.green.1}': p.colorGreen1,
  '{color.green.2}': p.colorGreen2, '{color.green.3}': p.colorGreen3,
  '{color.green.4}': p.colorGreen4, '{color.green.5}': p.colorGreen5,
  '{color.green.6}': p.colorGreen6, '{color.green.7}': p.colorGreen7,
  '{color.green.8}': p.colorGreen8, '{color.green.9}': p.colorGreen9,
  '{color.orange.0}': p.colorOrange0, '{color.orange.1}': p.colorOrange1,
  '{color.orange.2}': p.colorOrange2, '{color.orange.3}': p.colorOrange3,
  '{color.orange.4}': p.colorOrange4, '{color.orange.5}': p.colorOrange5,
  '{color.orange.6}': p.colorOrange6, '{color.orange.7}': p.colorOrange7,
  '{color.orange.8}': p.colorOrange8, '{color.orange.9}': p.colorOrange9,
  '{color.white}': p.colorWhite, '{color.black}': p.colorBlack,
};

type TokenObj = { $value: string; $type: string };
type TokenGroup = Record<string, TokenObj>;

function resolve(token: TokenObj): string {
  const val = token.$value;
  return primitiveMap[val] ?? val;
}

function flattenSemanticTokens(
  tokens: Record<string, TokenGroup>,
  prefix: string,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [group, entries] of Object.entries(tokens)) {
    for (const [key, token] of Object.entries(entries)) {
      result[`${prefix}-${group}-${key}`] = resolve(token);
    }
  }
  return result;
}

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--cds-focus-ring': resolve(lightTokens.focus.ring),
  },
  light: flattenSemanticTokens(lightTokens as Record<string, TokenGroup>, '--tds'),
  dark: flattenSemanticTokens(darkTokens as Record<string, TokenGroup>, '--tds'),
});

export const clementineTheme = createTheme({
  primaryColor: 'blue',
  fontFamily: p.typographyFontFamilySans,
  fontFamilyMonospace: p.typographyFontFamilyMono,
  defaultRadius: 'md',

  colors: {
    blue: [
      p.colorBlue0, p.colorBlue1, p.colorBlue2, p.colorBlue3, p.colorBlue4,
      p.colorBlue5, p.colorBlue6, p.colorBlue7, p.colorBlue8, p.colorBlue9,
    ],
    red: [
      p.colorRed0, p.colorRed1, p.colorRed2, p.colorRed3, p.colorRed4,
      p.colorRed5, p.colorRed6, p.colorRed7, p.colorRed8, p.colorRed9,
    ],
    gray: [
      p.colorGray0, p.colorGray1, p.colorGray2, p.colorGray3, p.colorGray4,
      p.colorGray5, p.colorGray6, p.colorGray7, p.colorGray8, p.colorGray9,
    ],
    green: [
      p.colorGreen0, p.colorGreen1, p.colorGreen2, p.colorGreen3, p.colorGreen4,
      p.colorGreen5, p.colorGreen6, p.colorGreen7, p.colorGreen8, p.colorGreen9,
    ],
    orange: [
      p.colorOrange0, p.colorOrange1, p.colorOrange2, p.colorOrange3, p.colorOrange4,
      p.colorOrange5, p.colorOrange6, p.colorOrange7, p.colorOrange8, p.colorOrange9,
    ],
    // Clementine's dark theme. Mantine drives ALL dark-scheme surfaces, text, and
    // borders from `colors.dark` — without this it silently falls back to its
    // generic grey dark mode (#242424) and the navy `surface.*` tokens go unused.
    // Index map (Mantine v7): 0-1 brightest text · 2 dimmed · 3 placeholder ·
    // 4-5 borders/hover · 6 default surface (Paper/default button) · 7 body ·
    // 8-9 deepest. Tuned so dimmed text and input borders clear WCAG AA on navy.
    dark: [
      '#f0f4f8', // 0  text.primary — brightest
      '#dbe3ec', // 1
      '#aab6c6', // 2  dimmed text (≥4.5:1 on navy + colored subtle panels)
      '#94a1b2', // 3  placeholder — text.tertiary (dark)
      '#69788d', // 4  default border (≥3:1 input borders, 1.4.11)
      '#3d4d61', // 5  hover border / control line
      '#243447', // 6  surface.elevated — Paper / default-variant button bg
      '#1a2735', // 7  surface.default — body background
      '#15202e', // 8  surface.subtle — deeper wells
      '#0f1722', // 9  deepest
    ],
  },

  radius: {
    xs: p.radiusXs,
    sm: p.radiusSm,
    md: p.radiusMd,
    lg: p.radiusLg,
    xl: p.radiusXl,
  },

  spacing: {
    xs: p.spacingXs,
    sm: p.spacingSm,
    md: p.spacingMd,
    lg: p.spacingLg,
    xl: p.spacingXl,
  },

  shadows: {
    xs: p.shadowXs,
    sm: p.shadowSm,
    md: p.shadowMd,
    lg: p.shadowLg,
    xl: p.shadowXl,
  },

  fontSizes: {
    xs: p.typographyFontSizeXs,
    sm: p.typographyFontSizeSm,
    md: p.typographyFontSizeMd,
    lg: p.typographyFontSizeLg,
    xl: p.typographyFontSizeXl,
  },

  lineHeights: {
    xs: p.typographyLineHeightXs,
    sm: p.typographyLineHeightSm,
    md: p.typographyLineHeightMd,
    lg: p.typographyLineHeightLg,
    xl: p.typographyLineHeightXl,
  },

  components: {
    Button: { defaultProps: { radius: 'md' } },
    TextInput: { defaultProps: { radius: 'md' } },
    Textarea: { defaultProps: { radius: 'md' } },
    Select: { defaultProps: { radius: 'md' } },
    Checkbox: { defaultProps: { radius: 'sm' } },
    Modal: { defaultProps: { radius: 'lg' } },
    Card: { defaultProps: { withBorder: true, radius: 'lg', shadow: 'sm', padding: 'lg' } },
    Alert: { defaultProps: { radius: 'md' } },
    Tooltip: { defaultProps: { radius: 'sm' } },
    Menu: { defaultProps: { radius: 'md', shadow: 'lg' } },
    Accordion: { defaultProps: { radius: 'md', variant: 'separated' } },
    Drawer: { defaultProps: { radius: 'lg', position: 'right' } },
    Autocomplete: { defaultProps: { radius: 'md' } },
    Pagination: { defaultProps: { radius: 'md' } },
    Progress: { defaultProps: { radius: 'xl' } },
    Skeleton: { defaultProps: { radius: 'md' } },
    Chip: { defaultProps: { radius: 'xl' } },
    Popover: { defaultProps: { radius: 'md', shadow: 'lg' } },
    SegmentedControl: { defaultProps: { radius: 'md' } },
    ThemeIcon: { defaultProps: { radius: 'md' } },
  },
});
