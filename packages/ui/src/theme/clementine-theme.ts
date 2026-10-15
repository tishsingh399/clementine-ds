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
    // Index map (Mantine v7): 0-1 brightest text · 2 text.dimmed · 3 placeholder ·
    // 4 border.input · 5 border.input-hover/control line · 6 default surface
    // (Paper/default button) · 7 body · 8-9 deepest. Tuned so dimmed text and
    // input borders clear WCAG AA on navy.
    dark: [
      p.colorNavy0, p.colorNavy1, p.colorNavy2, p.colorNavy3, p.colorNavy4,
      p.colorNavy5, p.colorNavy6, p.colorNavy7, p.colorNavy8, p.colorNavy9,
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
      defaultProps: { radius: 'md' },
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
      defaultProps: { radius: 'md' },
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
      defaultProps: { radius: 'md' },
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
      defaultProps: { radius: 'md' },
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
      defaultProps: { withIndicators: true },
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
