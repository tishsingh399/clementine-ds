import { Fragment, forwardRef } from 'react';

export interface DescriptionItem {
  term: string;
  detail: React.ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
}

/**
 * Clementine DescriptionList — term/detail pairs (record metadata, key-value summaries).
 * Renders semantic `<dl>`/`<dt>`/`<dd>`. Tokens: description-list.* . Spec: specs/description-list/index.md
 */
export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(({ items }, ref) => (
  <dl ref={ref} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', margin: 0 }}>
    {items.map((it, i) => (
      <Fragment key={i}>
        <dt style={{ color: 'var(--tds-text-secondary)', fontSize: 13 }}>{it.term}</dt>
        <dd style={{ margin: 0, color: 'var(--tds-text-primary)', fontSize: 13 }}>{it.detail}</dd>
      </Fragment>
    ))}
  </dl>
));

DescriptionList.displayName = 'DescriptionList';
