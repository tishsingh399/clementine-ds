import { DEFAULT_THEME, defaultCssVariablesResolver, mergeMantineTheme, type MantineColorsTuple } from '@mantine/core';
import primitives from '@clementine-ds/tokens/primitives-source';
import contrast from '@clementine-ds/tokens/contrast-pairs';
import { clementineTheme, SOLID, tokenVariables } from './clementine-theme';

// Brand remix: swap Clementine's primary scale (palette.ink, light and dark) for one
// generated from a single brand colour, then re-run the normal token cascade. Every
// semantic and component token that points at ink follows; nothing else changes.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTree = Record<string, any>;
type Oklch = [l: number, c: number, h: number];

// --- sRGB <-> OKLCH (Björn Ottosson's OKLab) ------------------------------
const toLin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function hexToOklch(hex: string): Oklch {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => toLin(v / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
}

function oklchToRgb([L, C, H]: Oklch): number[] {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(toGam);
}

/** OKLCH to hex, lowering chroma until the colour fits in sRGB. */
export function oklchToHex([L, C, H]: Oklch): string {
  const fits = (c: number) => oklchToRgb([L, c, H]).every((v) => v >= -1e-4 && v <= 1 + 1e-4);
  let c = C;
  if (!fits(c)) {
    let lo = 0;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + c) / 2;
      if (fits(mid)) lo = mid;
      else c = mid;
    }
    c = lo;
  }
  return (
    '#' +
    oklchToRgb([L, c, H])
      .map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0'))
      .join('')
  );
}

// --- Scale generation -------------------------------------------------------
const prims = primitives as AnyTree;
const template = (group: 'palette' | 'palette-dark') =>
  Array.from({ length: 12 }, (_, i) => hexToOklch(prims[group].ink[i + 1].$value as string));

/**
 * A 12-step scale with Clementine's own lightness curve and the brand's hue.
 * Step 9 is the brand colour exactly; step 10 keeps ink's hover offset from it.
 * Every other step keeps ink's lightness, so text and surface steps keep their contrast
 * job. Chroma scales with the brand's, so a grey brand gives a grey scale.
 */
function scaleFrom(brand: string, tpl: Oklch[]): string[] {
  const [bl, bc, bh] = hexToOklch(brand);
  const [l9, c9] = tpl[8];
  const k = c9 > 0 ? bc / c9 : 0;
  return tpl.map(([l, c], i) => {
    if (i === 8) return brand.toLowerCase();
    const L = i === 9 ? bl + (l - l9) : l;
    return oklchToHex([L, c * k, bh]);
  });
}

export function brandScales(brand: string): { light: string[]; dark: string[] } {
  return { light: scaleFrom(brand, template('palette')), dark: scaleFrom(brand, template('palette-dark')) };
}

/**
 * CSS variables that re-theme Clementine to one brand colour, per colour scheme.
 * Apply them to a wrapper element (or `:root`) to scope the remix. Covers the
 * `--cds-*` cascade and Mantine's primary/blue variables, which Clementine maps to ink.
 */
export function brandVariables(brand: string): { light: Record<string, string>; dark: Record<string, string> } {
  const { light, dark } = brandScales(brand);
  const remixed: AnyTree = structuredClone(prims);
  light.forEach((hex, i) => (remixed.palette.ink[i + 1].$value = hex));
  dark.forEach((hex, i) => (remixed['palette-dark'].ink[i + 1].$value = hex));

  const theme = mergeMantineTheme(DEFAULT_THEME, {
    ...clementineTheme,
    colors: { ...clementineTheme.colors, blue: SOLID.map((n) => light[n - 1]) as unknown as MantineColorsTuple },
  });
  const mantine = defaultCssVariablesResolver(theme);
  const pick = (vars: Record<string, string>) =>
    Object.fromEntries(Object.entries(vars).filter(([k]) => /^--mantine-(color-blue|primary-color)/.test(k)));

  return {
    light: { ...pick(mantine.variables), ...pick(mantine.light), ...tokenVariables('light', remixed) },
    dark: { ...pick(mantine.variables), ...pick(mantine.dark), ...tokenVariables('dark', remixed) },
  };
}

// --- Contrast against the pairs Clementine actually renders ------------------

export interface ContrastRow {
  mode: 'light' | 'dark';
  fg: string;
  bg: string;
  kind: string;
  ratio: number | null;
  need: number;
  pass: boolean;
  exempt: boolean;
}

const lum = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => toLin(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export function contrastRatio(fg: string, bg: string): number | null {
  if (!/^#[0-9a-f]{6}$/i.test(fg) || !/^#[0-9a-f]{6}$/i.test(bg)) return null; // rgba overlays: not measured here
  const [hi, lo] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Every declared pair (packages/tokens/contrast-pairs.json), both schemes, for a set of brand variables. */
export function contrastReport(vars: ReturnType<typeof brandVariables>): ContrastRow[] {
  const thresholds = contrast.thresholds as Record<string, number>;
  const exempt = contrast.exempt as Record<string, string>;
  return (['light', 'dark'] as const).flatMap((mode) =>
    contrast.pairs.map(({ fg, bg, kind }) => {
      const v = (path: string) => vars[mode][`--cds-${path.replace(/\./g, '-')}`] ?? '';
      const ratio = contrastRatio(v(fg), v(bg));
      const need = thresholds[kind] ?? 4.5;
      return { mode, fg, bg, kind, ratio, need, pass: ratio != null && ratio >= need, exempt: `${fg}|${bg}` in exempt };
    }),
  );
}
