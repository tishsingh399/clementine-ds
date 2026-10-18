import { createTheme, type CSSVariablesResolver, type MantineColorsTuple } from '@mantine/core';
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
  // After one hop the value has left the semantic layer; resolve further hops
  // against primitives only (Figma reuses names like category/clementine in both).
  return resolveValue(node.$value, {});
}

/** Flatten the semantic layer into `--<prefix>-<path>` vars (one per prefix), e.g. --cds-text-contrast-default. */
function flattenSemanticTokens(
  tree: AnyTree,
  semantic: AnyTree,
  prefixes: string[],
  path: string[] = [],
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, node] of Object.entries(tree)) {
    if (node && typeof node === 'object' && '$value' in node) {
      const value = resolveValue((node as TokenObj).$value, semantic);
      for (const prefix of prefixes) result[`${prefix}-${[...path, key].join('-')}`] = value;
    } else if (node && typeof node === 'object') {
      Object.assign(result, flattenSemanticTokens(node as AnyTree, semantic, prefixes, [...path, key]));
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
    // Mantine's error colour is a red tuple index, which can't follow our per-mode text/error step.
    '--mantine-color-error': resolveValue('{text.error}', lightTokens as AnyTree),
    ...flattenSemanticTokens(lightTokens as AnyTree, lightTokens as AnyTree, ['--cds', '--tds']),
    ...flattenComponentTokens(componentTokens as AnyTree, lightTokens as AnyTree),
  },
  dark: {
    '--mantine-color-error': resolveValue('{text.error}', darkTokens as AnyTree),
    ...flattenSemanticTokens(darkTokens as AnyTree, darkTokens as AnyTree, ['--cds', '--tds']),
    ...flattenComponentTokens(componentTokens as AnyTree, darkTokens as AnyTree),
  },
});

// Palette steps (1-12) for each Mantine shade index 0-9.
const SOLID = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // index 6 = step 9, the solid fill
const GRAY = [2, 3, 4, 5, 6, 10, 11, 12, 12, 12]; // 0 canvas · 4 border.default · 5 placeholder · 6 dimmed
const DARK = [12, 11, 11, 11, 7, 6, 3, 1, 1, 1]; // 3 placeholder = text.tertiary · 4 border · 5 control/hover surface (Chip, hover) · 6 Paper
const pal = p as unknown as Record<string, string>;
const steps = (hue: string, idx: number[], prefix = 'palette') =>
  idx.map((n) => {
    const v = pal[`${prefix}${hue}${n}`];
    if (!v) throw new Error(`clementine-theme: missing primitive ${prefix}${hue}${n}`);
    return v;
  }) as unknown as MantineColorsTuple;

const PAGINATION_LABELS: Record<string, string> = {
  first: 'First page',
  previous: 'Previous page',
  next: 'Next page',
  last: 'Last page',
};

export const clementineTheme = createTheme({
  primaryColor: 'blue',
  // Index 6 is the solid step (palette step 9) in both schemes, so filled
  // Mantine primaries match action.primary in light and dark.
  primaryShade: { light: 6, dark: 6 },
  fontFamily: p.typographyFontFamilySans,
  fontFamilyMonospace: p.typographyFontFamilyMono,
  defaultRadius: 'md',

  // Mantine needs 10-shade tuples; Palette v2 has 12 steps. The key names stay
  // (callers pass color="blue" / "orange") but the values are Palette v2:
  // blue → ink, orange → amber (warning), gray → neutral.
  colors: {
    blue: steps('Ink', SOLID),
    red: steps('Red', SOLID),
    green: steps('Green', SOLID),
    orange: steps('Amber', SOLID),
    gray: steps('Neutral', GRAY),
    // Mantine drives ALL dark-scheme surfaces, text and borders from
    // `colors.dark`; without it, it falls back to its generic grey (#242424).
    // Index map (Mantine v7): 0-1 text · 2 dimmed · 3 placeholder · 4 border ·
    // 5 control/hover surface · 6 default surface (Paper) · 7 body · 8-9
    // deepest. Each index points at the step the matching semantic token uses.
    dark: steps('Neutral', DARK, 'paletteDark'),
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
    // Display size for state icons and stat values; the text scale stops at xl.
    '2xl': p.typographyFontSize2xl,
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
    // variant machinery is respected), and ./states.css covers the states Mantine
    // doesn't expose as a single var (active, disabled, focus ring). All values
    // resolve through the component → semantic → primitive cascade. This is the
    // pattern the other Mantine-backed components below follow. Theme `styles`
    // are inline: they cannot hold selectors, so state rules never go there.
    Button: {
      // md is the spec's default size (40px); Mantine's own default is sm.
      defaultProps: { radius: 'md', size: 'md' },
      vars: (_theme: unknown, props: { variant?: string; color?: string; size?: string }) => {
        // Height comes from button.height.{sm,md,lg} for every variant. Sizes the
        // spec doesn't define (xs, xl, compact-*) keep Mantine's own height.
        const height =
          props.size === 'sm' || props.size === 'md' || props.size === 'lg'
            ? { '--button-height': `var(--cds-button-height-${props.size})` }
            : {};
        const isOutline = props.variant === 'outline' || props.variant === 'default';
        const isSubtle =
          props.variant === 'subtle' || props.variant === 'light' || props.variant === 'transparent';
        const destructive = props.color === 'red';
        if (isOutline) {
          return {
            root: {
              ...height,
              '--button-bg': 'var(--cds-button-bg-outline-default)',
              '--button-hover': 'var(--cds-button-bg-outline-hover)',
              '--button-color': 'var(--cds-button-fg-on-outline)',
              // Mantine reads --button-bd as a whole border, not a colour: a bare
              // colour is invalid and the outline variant rendered no border.
              '--button-bd': 'calc(0.0625rem * var(--mantine-scale)) solid var(--cds-button-border-default)',
            },
          };
        }
        if (isSubtle) {
          return { root: { ...height, '--button-color': 'var(--cds-button-fg-on-subtle)' } };
        }
        // filled (default) — primary or destructive
        return {
          root: {
            ...height,
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
    },
    TextInput: {
      // md (40px) matches Button's md, so a field and a button line up in a row.
      defaultProps: { radius: 'md', size: 'md' },
      // Every state is painted through Mantine's own --input-* variables, set
      // inline, so the text-input.* tokens win over Mantine's class rules
      // without nested selectors (which need @mantine/emotion, not installed).
      vars: (_theme: unknown, props: { size?: string; error?: unknown }) => {
        const height =
          props.size === 'sm' || props.size === 'md' || props.size === 'lg'
            ? { '--input-height': `var(--cds-text-input-height-${props.size})` }
            : {};
        const hasError = Boolean(props.error);
        return {
          wrapper: {
            ...height,
            '--input-bg': 'var(--cds-text-input-bg-default)',
            '--input-color': 'var(--cds-text-input-fg-value)',
            '--input-bd': hasError
              ? 'var(--cds-text-input-border-error)'
              : 'var(--cds-text-input-border-default)',
            '--input-bd-focus': 'var(--cds-text-input-border-focus)',
            '--input-placeholder-color': 'var(--cds-text-input-fg-placeholder)',
            '--input-disabled-bg': 'var(--cds-text-input-bg-disabled)',
            '--input-disabled-color': 'var(--cds-text-input-fg-disabled)',
          },
          // Mantine re-colours an errored input on focus from its own palette;
          // pinning the border on the input element keeps the error token.
          ...(hasError ? { input: { '--input-bd': 'var(--cds-text-input-border-error)' } } : {}),
        };
      },
    },
    PasswordInput: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        wrapper: {
          '--input-bg': 'var(--cds-password-input-bg)',
          '--input-color': 'var(--cds-password-input-fg)',
          '--input-bd': 'var(--cds-password-input-border)',
          '--input-placeholder-color': 'var(--cds-password-input-placeholder)',
        },
      }),
      styles: {
        visibilityToggle: {
          color: 'var(--cds-password-input-placeholder)',
        },
      },
    },
    ColorInput: {
      defaultProps: { radius: 'md', eyeDropperButtonProps: { 'aria-label': 'Pick a colour from the screen' } },
      vars: () => ({
        wrapper: {
          '--input-bg': 'var(--cds-color-input-bg)',
          '--input-color': 'var(--cds-color-input-fg)',
          '--input-bd': 'var(--cds-color-input-border)',
        },
      }),
      styles: {
        eyeDropperButton: {
          color: 'var(--cds-color-input-fg)',
        },
      },
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
    Checkbox: {
      defaultProps: { radius: 'sm' },
      vars: () => ({
        root: {
          '--checkbox-color': 'var(--cds-checkbox-bg-checked)',
          '--checkbox-icon-color': 'var(--cds-checkbox-check)',
          '--checkbox-radius': 'var(--cds-checkbox-radius)',
        },
      }),
      styles: {
        input: {
          color: 'var(--cds-checkbox-fg-label)',
        },
        label: { color: 'var(--cds-checkbox-fg-label)' },
        description: { color: 'var(--cds-checkbox-fg-description)' },
        error: { color: 'var(--cds-checkbox-fg-error)' },
      },
    },
    Switch: {
      defaultProps: { radius: 'xl' },
      styles: {
        input: {
          color: 'var(--cds-switch-fg-label)',
          outlineColor: 'var(--cds-switch-border-focus)',
        },
        track: {
          color: 'var(--cds-switch-fg-label)',
        },
        thumb: {
          backgroundColor: 'var(--cds-switch-thumb-default)',
          color: 'var(--cds-switch-fg-label)',
        },
        trackLabel: { color: 'var(--cds-switch-fg-label)' },
        label: { color: 'var(--cds-switch-fg-label)' },
      },
    },
    Modal: {
      // The close button is icon-only; without a name a screen reader announces
      // just "button".
      defaultProps: { radius: 'lg', closeButtonProps: { 'aria-label': 'Close dialog' } },
      vars: () => ({
        root: { '--modal-radius': 'var(--cds-modal-radius)' },
      }),
      styles: {
        overlay: { backgroundColor: 'var(--cds-modal-overlay)' },
        content: {
          backgroundColor: 'var(--cds-modal-bg)',
          color: 'var(--cds-modal-fg-body)',
        },
        header: {
          backgroundColor: 'var(--cds-modal-bg)',
          borderBottom: '1px solid var(--cds-modal-border-divider)',
        },
        // A heading, not body text: lg size token; weight 600 as FieldLabel uses
        // (Clementine has no font-weight tokens yet).
        title: { color: 'var(--cds-modal-fg-title)', fontSize: 'var(--mantine-font-size-lg)', fontWeight: 600 },
        // Space below the header divider; Mantine drops the body's top padding
        // when a title is present.
        body: { color: 'var(--cds-modal-fg-body)', paddingTop: 'var(--mantine-spacing-md)' },
      },
    },
    Card: {
      defaultProps: { withBorder: true, radius: 'lg', shadow: 'sm', padding: 'lg' },
      vars: () => ({
        root: { '--card-radius': 'var(--cds-card-radius)' },
      }),
      styles: {
        root: {
          backgroundColor: 'var(--cds-card-bg)',
          borderColor: 'var(--cds-card-border)',
          boxShadow: 'var(--cds-card-shadow)',
          color: 'var(--cds-card-fg-body)',
        },
      },
    },
    Alert: {
      defaultProps: { radius: 'md', closeButtonLabel: 'Dismiss' },
      // Per-intent, mirroring the Alert wrapper's intent→color map
      // (info=gray, success=green, warning=orange, error=red). bg + border come
      // from the matching alert.bg/border.<intent> tokens; body/title text from
      // the intent-independent alert.fg tokens.
      vars: (_theme: unknown, props: { color?: string }) => {
        const intent =
          ({ gray: 'info', green: 'success', orange: 'warning', red: 'error' } as Record<string, string>)[
            props.color ?? 'gray'
          ] ?? 'info';
        return {
          root: {
            '--alert-bg': `var(--cds-alert-bg-${intent})`,
            '--alert-bd': `var(--cds-alert-border-${intent})`,
            '--alert-color': 'var(--cds-alert-fg-body)',
          },
        };
      },
    },
    Notification: {
      defaultProps: { radius: 'md', closeButtonProps: { 'aria-label': 'Dismiss notification' } },
      styles: {
        root: {
          backgroundColor: 'var(--cds-notification-bg)',
          borderColor: 'var(--cds-notification-border)',
          borderRadius: 'var(--cds-notification-radius)',
        },
        icon: { color: 'var(--cds-notification-accent)' },
        title: { color: 'var(--cds-notification-fg-title)' },
        description: { color: 'var(--cds-notification-fg-body)' },
        closeButton: { color: 'var(--cds-notification-fg-body)' },
      },
    },
    Tooltip: {
      defaultProps: {
        radius: 'sm',
        color: 'dark',
        transitionProps: { duration: 100, transition: 'fade' },
      },
      vars: () => ({
        tooltip: {
          '--tooltip-bg': 'var(--cds-tooltip-bg)',
          '--tooltip-color': 'var(--cds-tooltip-fg)',
          '--tooltip-radius': 'var(--cds-tooltip-radius)',
        },
      }),
      styles: {
        tooltip: {
          border: '1px solid var(--cds-tooltip-border)',
          boxShadow: 'var(--cds-tooltip-shadow)',
        },
        arrow: { borderColor: 'var(--cds-tooltip-border)' },
      },
    },
    Menu: {
      defaultProps: { radius: 'md', shadow: 'lg' },
      styles: {
        dropdown: {
          backgroundColor: 'var(--cds-menu-bg)',
          borderColor: 'var(--cds-menu-border)',
          boxShadow: 'var(--cds-menu-shadow)',
          borderRadius: 'var(--cds-menu-radius)',
        },
        item: {
          '--menu-item-hover': 'var(--cds-menu-item-bg-hover)',
        },
        label: { color: 'var(--cds-menu-label)' },
        divider: { borderColor: 'var(--cds-menu-divider)' },
      },
    },
    Accordion: {
      defaultProps: { radius: 'md', variant: 'separated' },
      vars: () => ({
        root: { '--accordion-radius': 'var(--cds-accordion-radius)' },
      }),
      styles: {
        item: {
          backgroundColor: 'var(--cds-accordion-bg)',
          borderColor: 'var(--cds-accordion-border)',
        },
        control: {
          color: 'var(--cds-accordion-fg-label)',
        },
        chevron: { color: 'var(--cds-accordion-fg-chevron)' },
        panel: { color: 'var(--cds-accordion-fg-content)' },
        content: { color: 'var(--cds-accordion-fg-content)' },
      },
    },
    Drawer: {
      defaultProps: { radius: 'lg', position: 'right' },
      styles: {
        overlay: { backgroundColor: 'var(--cds-drawer-overlay)' },
        content: {
          backgroundColor: 'var(--cds-drawer-bg)',
          borderColor: 'var(--cds-drawer-border)',
          color: 'var(--cds-drawer-fg-body)',
          borderRadius: 'var(--cds-drawer-radius)',
        },
        header: {
          backgroundColor: 'var(--cds-drawer-bg)',
          borderBottom: '1px solid var(--cds-drawer-border)',
        },
        title: { color: 'var(--cds-drawer-fg-title)' },
        body: { color: 'var(--cds-drawer-fg-body)' },
      },
    },
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
    Pagination: {
      defaultProps: { radius: 'md', getControlProps: (control: string) => ({ 'aria-label': PAGINATION_LABELS[control] }) },
      vars: () => ({
        root: {
          '--pagination-active-bg': 'var(--cds-pagination-item-bg-active)',
          '--pagination-active-color': 'var(--cds-pagination-item-fg-active)',
          '--pagination-control-radius': 'var(--cds-pagination-radius)',
        },
      }),
      styles: {
        control: {
          color: 'var(--cds-pagination-item-fg)',
          borderColor: 'var(--cds-pagination-border)',
        },
      },
    },
    Breadcrumbs: {
      styles: {
        separator: { color: 'var(--cds-breadcrumbs-separator)' },
      },
    },
    Stepper: {
      styles: {
        separator: { backgroundColor: 'var(--cds-stepper-separator)' },
      },
    },
    Progress: {
      defaultProps: { radius: 'xl', color: 'blue' },
      // The bar is painted from --progress-section-color, chosen here from the
      // color prop, so status colours resolve to progress.bar-* tokens.
      vars: (_theme: unknown, props: { color?: string }) => {
        const bar =
          props.color === 'green'
            ? 'var(--cds-progress-bar-success)'
            : props.color === 'orange' || props.color === 'yellow'
              ? 'var(--cds-progress-bar-warning)'
              : props.color === 'red'
                ? 'var(--cds-progress-bar-error)'
                : 'var(--cds-progress-bar)';
        return {
          root: { '--progress-radius': 'var(--cds-progress-radius)' },
          section: { '--progress-section-color': bar },
        };
      },
      styles: {
        root: { backgroundColor: 'var(--cds-progress-track)' },
      },
    },
    Skeleton: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        root: { '--skeleton-radius': 'var(--cds-skeleton-radius)' },
      }),
    },
    Chip: {
      defaultProps: { radius: 'xl' },
      vars: () => ({
        root: {
          '--chip-bg': 'var(--cds-chip-bg)',
          '--chip-color': 'var(--cds-chip-fg)',
          '--chip-bd': 'var(--cds-chip-border)',
        },
      }),
    },
    Popover: {
      defaultProps: { radius: 'md', shadow: 'lg' },
      vars: () => ({
        dropdown: {
          '--popover-radius': 'var(--cds-popover-radius)',
          '--popover-shadow': 'var(--cds-popover-shadow)',
          '--popover-border-color': 'var(--cds-popover-border)',
        },
      }),
      styles: {
        dropdown: {
          backgroundColor: 'var(--cds-popover-bg)',
          borderColor: 'var(--cds-popover-border)',
          boxShadow: 'var(--cds-popover-shadow)',
        },
        arrow: {
          backgroundColor: 'var(--cds-popover-bg)',
          borderColor: 'var(--cds-popover-border)',
        },
      },
    },
    SegmentedControl: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        root: {
          '--sc-radius': 'var(--cds-segmented-control-radius)',
          '--sc-color': 'var(--cds-segmented-control-bg-active)',
          '--sc-label-color': 'var(--cds-segmented-control-fg-active)',
        },
      }),
      styles: {
        root: { backgroundColor: 'var(--cds-segmented-control-bg)' },
        indicator: { backgroundColor: 'var(--cds-segmented-control-bg-active)' },
      },
    },
    ThemeIcon: {
      defaultProps: { radius: 'md' },
      vars: () => ({
        root: {
          '--ti-bg': 'var(--cds-theme-icon-bg)',
          '--ti-color': 'var(--cds-theme-icon-fg)',
        },
      }),
    },
    Timeline: {
      styles: {
        itemBullet: {
          backgroundColor: 'var(--cds-timeline-bullet)',
          borderColor: 'var(--cds-timeline-line)',
        },
        itemTitle: { color: 'var(--cds-timeline-fg-title)' },
        itemBody: { color: 'var(--cds-timeline-fg-body)' },
      },
    },
    Carousel: {
      defaultProps: {
        withIndicators: true,
        previousControlProps: { 'aria-label': 'Previous slide' },
        nextControlProps: { 'aria-label': 'Next slide' },
      },
      styles: {
        control: {
          backgroundColor: 'var(--cds-carousel-control-bg)',
          borderColor: 'var(--cds-carousel-control-border)',
          borderRadius: 'var(--cds-carousel-radius)',
          color: 'var(--cds-carousel-control-fg)',
        },
      },
    },
    Avatar: {
      defaultProps: { radius: 'xl' },
      styles: {
        root: {
          borderColor: 'var(--cds-avatar-border)',
          borderRadius: 'var(--cds-avatar-radius)',
        },
        placeholder: {
          backgroundColor: 'var(--cds-avatar-bg)',
          color: 'var(--cds-avatar-fg)',
        },
      },
    },
    Badge: {
      defaultProps: { radius: 'sm', variant: 'light' },
      styles: {
        root: {
          backgroundColor: 'var(--cds-badge-bg-neutral)',
          color: 'var(--cds-badge-fg-default)',
          borderRadius: 'var(--cds-badge-radius)',
        },
        section: { color: 'var(--cds-badge-fg-default)' },
      },
    },
    Kbd: {
      styles: {
        root: {
          backgroundColor: 'var(--cds-kbd-bg)',
          borderColor: 'var(--cds-kbd-border)',
          color: 'var(--cds-kbd-fg)',
        },
      },
    },
    Divider: {
      vars: () => ({ root: { '--divider-color': 'var(--cds-divider-line)' } }),
    },
    // Calendar header previous/next are icon-only buttons with no default name.
    ...Object.fromEntries(
      ['Calendar', 'DatePicker', 'DatePickerInput', 'DateInput', 'MonthPicker', 'YearPicker'].map((c) => [
        c,
        { defaultProps: { previousLabel: 'Previous', nextLabel: 'Next' } },
      ]),
    ),
    Fieldset: {
      styles: {
        root: {
          backgroundColor: 'var(--cds-fieldset-bg)',
          borderColor: 'var(--cds-fieldset-border)',
        },
        legend: { color: 'var(--cds-fieldset-legend)' },
      },
    },
  },
});
