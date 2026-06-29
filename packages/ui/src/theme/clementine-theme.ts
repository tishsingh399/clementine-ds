import { createTheme, type CSSVariablesResolver } from '@mantine/core';
import * as p from '@clementine-ds/tokens';
import lightTokens from '@clementine-ds/tokens/semantic-light';
import darkTokens from '@clementine-ds/tokens/semantic-dark';
import primitives from '@clementine-ds/tokens/primitives-source';
import componentTokens from '@clementine-ds/tokens/components';

// --- Token resolution (the 3-tier cascade, made real at runtime) ----------
//
// A component-tier token references a semantic token (`{action.primary}`);
// a semantic token references a primitive (`{color.blue.6}`); a primitive is
// a literal (`#2563eb`). `resolveValue` walks that chain to a concrete value.
// Non-color primitives (radius, motion durations) are referenced directly
// because they have no semantic layer — the cascade lint (F2) allows that.
//
// `primitives.json` is the single source of truth for the primitive layer:
// the old hand-maintained `primitiveMap` is gone (F11). Add a primitive there
// and it flows through automatically — no theme edit required.

type TokenObj = { $value: string; $type: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTree = Record<string, any>;

const primitivesTree = primitives as AnyTree;

function lookup(tree: AnyTree, path: string): TokenObj | undefined {
  return path
    .split('.')
    .reduce<AnyTree | undefined>((acc, key) => (acc == null ? acc : acc[key]), tree) as
    | TokenObj
    | undefined;
}

/** Resolve a DTCG value/reference to a concrete value through the given semantic layer. */
function resolveValue(value: string, semantic: AnyTree): string {
  const match = /^\{(.+)\}$/.exec(value);
  if (!match) return value; // literal (hex, rgba, ms, dimension)
  const node = lookup(semantic, match[1]) ?? lookup(primitivesTree, match[1]);
  if (!node || typeof node.$value !== 'string') return value; // unresolved — keep the ref
  return resolveValue(node.$value, semantic);
}

/** Flatten the semantic layer into `--<prefix>-<group>-<key>` vars (one per prefix). */
function flattenSemanticTokens(semantic: AnyTree, prefixes: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [group, entries] of Object.entries(semantic)) {
    for (const [key, token] of Object.entries(entries as AnyTree)) {
      const value = resolveValue((token as TokenObj).$value, semantic);
      for (const prefix of prefixes) result[`${prefix}-${group}-${key}`] = value;
    }
  }
  return result;
}

/** Flatten the component-tier layer into `--cds-<dotted-path>` vars (e.g. button.bg.default). */
function flattenComponentTokens(
  tree: AnyTree,
  semantic: AnyTree,
  path: string[] = [],
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(tree)) {
    if (value && typeof value === 'object' && '$value' in value) {
      result[`--cds-${[...path, key].join('-')}`] = resolveValue(
        (value as TokenObj).$value,
        semantic,
      );
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenComponentTokens(value as AnyTree, semantic, [...path, key]));
    }
  }
  return result;
}

// `--cds-*` is the canonical prefix (matches the package name). `--tds-*` is
// emitted alongside it as a one-release backward-compat shim (F12) so any
// remaining `var(--tds-*)` references keep resolving after the migration.
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    ...flattenSemanticTokens(lightTokens as AnyTree, ['--cds', '--tds']),
    ...flattenComponentTokens(componentTokens as AnyTree, lightTokens as AnyTree),
  },
  dark: {
    ...flattenSemanticTokens(darkTokens as AnyTree, ['--cds', '--tds']),
    ...flattenComponentTokens(componentTokens as AnyTree, darkTokens as AnyTree),
  },
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
    // Button is the gold-standard proof that Tier 3 is consumed at runtime.
    // Every declared button.* token has a paint path here: the `vars` callback
    // remaps Mantine's internal --button-* vars per variant/color (so the
    // variant machinery is respected), and `styles` covers the states Mantine
    // doesn't expose as a single var (active, disabled, focus ring). All values
    // resolve through the component → semantic → primitive cascade. This is the
    // pattern the other Mantine-backed components below follow.
    Button: {
      defaultProps: { radius: 'md' },
      vars: (_theme: unknown, props: { variant?: string; color?: string }) => {
        const isOutline = props.variant === 'outline' || props.variant === 'default';
        const isSubtle =
          props.variant === 'subtle' || props.variant === 'light' || props.variant === 'transparent';
        const destructive = props.color === 'red';
        if (isOutline) {
          return {
            root: {
              '--button-bg': 'var(--cds-button-bg-outline-default)',
              '--button-hover': 'var(--cds-button-bg-outline-hover)',
              '--button-color': 'var(--cds-button-fg-on-outline)',
              '--button-bd': 'var(--cds-button-border-default)',
            },
          };
        }
        if (isSubtle) {
          return { root: { '--button-color': 'var(--cds-button-fg-on-subtle)' } };
        }
        // filled (default) — primary or destructive
        return {
          root: {
            '--button-bg': destructive
              ? 'var(--cds-button-bg-destructive-default)'
              : 'var(--cds-button-bg-default)',
            '--button-hover': destructive
              ? 'var(--cds-button-bg-destructive-hover)'
              : 'var(--cds-button-bg-hover)',
            '--button-color': 'var(--cds-button-fg-on-filled)',
            '--button-bd': 'var(--cds-button-border-default)',
          },
        };
      },
      styles: {
        root: {
          // States Mantine doesn't drive off a single --button-* var: set the
          // painted property directly so the Tier-3 token wins.
          '&:active:not([data-disabled])': { backgroundColor: 'var(--cds-button-bg-active)' },
          // border.hover is only visible on bordered variants
          '&[data-variant="outline"]:hover, &[data-variant="default"]:hover': {
            borderColor: 'var(--cds-button-border-hover)',
          },
          '&:focus-visible': {
            outline: '2px solid var(--cds-button-border-focus)',
            outlineOffset: '2px',
          },
          // Disabled fg/border bind to Tier-3. The disabled *background* is owned
          // by Mantine's @layer mantine rule (gray.2), which a theme-level rule
          // can't override without leaving the layer; it's one ramp-step off the
          // spec's gray.1 and visually identical. Tracked for the DOM-parity pass.
          '&[data-disabled]:not([data-loading])': {
            color: 'var(--cds-button-fg-disabled)',
            borderColor: 'var(--cds-button-fg-disabled)',
          },
        },
      },
    },
    TextInput: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        wrapper: {
          '--input-bg': 'var(--cds-text-input-bg-default)',
          '--input-color': 'var(--cds-text-input-fg-value)',
          '--input-bd': 'var(--cds-text-input-border-default)',
          '--input-placeholder-color': 'var(--cds-text-input-fg-placeholder)',
        },
      }),
    },
    Textarea: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        wrapper: {
          '--input-bg': 'var(--cds-textarea-bg-default)',
          '--input-color': 'var(--cds-textarea-fg-value)',
          '--input-bd': 'var(--cds-textarea-border-default)',
          '--input-placeholder-color': 'var(--cds-textarea-fg-placeholder)',
        },
      }),
    },
    Select: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        wrapper: {
          '--input-bg': 'var(--cds-select-bg-trigger)',
          '--input-color': 'var(--cds-select-fg-value)',
          '--input-bd': 'var(--cds-select-border-default)',
          '--input-placeholder-color': 'var(--cds-select-fg-placeholder)',
        },
      }),
    },
    Checkbox: { defaultProps: { radius: 'sm' } },
    Modal: { defaultProps: { radius: 'lg' } },
    Card: { defaultProps: { withBorder: true, radius: 'lg', shadow: 'sm', padding: 'lg' } },
    Alert: { defaultProps: { radius: 'md' } },
    Tooltip: { defaultProps: { radius: 'sm' } },
    Menu: { defaultProps: { radius: 'md', shadow: 'lg' } },
    Accordion: { defaultProps: { radius: 'md', variant: 'separated' } },
    Drawer: { defaultProps: { radius: 'lg', position: 'right' } },
    Autocomplete: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        wrapper: {
          '--input-bg': 'var(--cds-autocomplete-bg)',
          '--input-color': 'var(--cds-autocomplete-fg)',
          '--input-bd': 'var(--cds-autocomplete-border)',
          '--input-placeholder-color': 'var(--cds-autocomplete-placeholder)',
        },
      }),
    },
    Pagination: { defaultProps: { radius: 'md' } },
    Progress: { defaultProps: { radius: 'xl' } },
    Skeleton: { defaultProps: { radius: 'md' } },
    Chip: { defaultProps: { radius: 'xl' } },
    Popover: { defaultProps: { radius: 'md', shadow: 'lg' } },
    SegmentedControl: { defaultProps: { radius: 'md' } },
    ThemeIcon: { defaultProps: { radius: 'md' } },
  },
});
