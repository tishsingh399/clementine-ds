// Shared readers for the Foundations stories. Everything is read from the
// token JSON at build time, so the stories can't drift from the tokens.
import type { CSSProperties, ReactNode } from 'react';
import primitives from '@clementine-ds/tokens/primitives-source';
import semanticLight from '@clementine-ds/tokens/semantic-light';
import semanticDark from '@clementine-ds/tokens/semantic-dark';

export type Token = { $value: string | number; $type?: string; $description?: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Tree = Record<string, any>;

export const prim = primitives as Tree;
export const light = semanticLight as Tree;
export const dark = semanticDark as Tree;

const isToken = (n: unknown): n is Token => !!n && typeof n === 'object' && '$value' in (n as object);

/** Flatten a token tree into [path, token] pairs, e.g. ['text/contrast/on-bright', {...}]. */
export function flatten(tree: Tree, path: string[] = []): Array<[string, Token]> {
  return Object.entries(tree).flatMap(([k, v]) =>
    k.startsWith('$') ? [] : isToken(v) ? [[[...path, k].join('/'), v] as [string, Token]] : flatten(v, [...path, k]),
  );
}

/** Follow `{a.b.c}` references through the primitives to a literal. */
export function resolve(value: string | number): string {
  const s = String(value);
  return s.replace(/\{([^}]+)\}/g, (_, ref: string) => {
    const node = ref.split('.').reduce<Tree | undefined>((acc, key) => acc?.[key], prim);
    return isToken(node) ? resolve(node.$value) : `{${ref}}`;
  });
}

/** The runtime CSS variable the theme emits for a semantic path (see clementine-theme.ts). */
export const cssVar = (path: string) => `var(--cds-${path.replace(/\//g, '-')})`;

export const ui = {
  page: { display: 'grid', gap: 32, color: 'var(--cds-text-primary)', fontFamily: 'var(--mantine-font-family)' } as CSSProperties,
  h2: { margin: '0 0 12px', fontSize: 20, lineHeight: '28px', fontWeight: 600 } as CSSProperties,
  meta: { fontSize: 12, lineHeight: '16px', color: 'var(--cds-text-secondary)', fontFamily: 'var(--mantine-font-family-monospace)' } as CSSProperties,
};

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 style={ui.h2}>{title}</h2>
      {children}
    </section>
  );
}
