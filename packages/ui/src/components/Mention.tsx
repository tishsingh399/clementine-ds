import { forwardRef } from 'react';

export interface MentionProps {
  name: string;
  href?: string;
}

/**
 * Enterprise · Mention — an inline @reference to a user/entity. Tokens: mention.* .
 * Spec: specs/mention/index.md
 */
export const Mention = forwardRef<HTMLAnchorElement, MentionProps>(({ name, href }, ref) => {
  const style: React.CSSProperties = {
    color: 'var(--cds-text-link)',
    background: 'var(--cds-surface-subtle)',
    padding: '1px 5px',
    borderRadius: 4,
    fontWeight: 500,
    textDecoration: 'none',
  };
  return href
    ? <a ref={ref} href={href} style={style}>@{name}</a>
    : <span style={style}>@{name}</span>;
});

Mention.displayName = 'Mention';
