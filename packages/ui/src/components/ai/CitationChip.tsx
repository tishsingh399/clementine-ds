import { Tooltip } from '@mantine/core';
import { forwardRef } from 'react';

export interface CitationChipProps {
  /** The reference number shown in the chip, e.g. 1 → [1]. */
  index: number;
  /** Source title or domain, shown in the tooltip and the accessible name. */
  source: string;
  href?: string;
  snippet?: string;
}

/**
 * Clementine CitationChip — inline provenance for an AI claim. A small superscript
 * reference that links to its source and reveals source + snippet on hover/focus.
 *
 * Tokens: citation.* . Always provide a real `source`; the chip's accessible name is
 * "Source N: <source>". See specs/ai/citation-chip/index.md.
 */
export const CitationChip = forwardRef<HTMLAnchorElement, CitationChipProps>(
  ({ index, source, href, snippet }, ref) => {
    const chip = (
      <a
        ref={ref}
        href={href}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        aria-label={`Source ${index}: ${source}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 18,
          height: 18,
          padding: '0 5px',
          marginInline: 2,
          fontSize: 11,
          lineHeight: 1,
          verticalAlign: 'super',
          borderRadius: 4,
          background: 'var(--tds-surface-subtle)',
          color: 'var(--tds-text-secondary)',
          border: '1px solid var(--tds-border-default)',
          textDecoration: 'none',
        }}
      >
        {index}
      </a>
    );
    return (
      <Tooltip label={snippet ? `${source} — ${snippet}` : source} multiline w={240} withArrow openDelay={150} position="top">
        {chip}
      </Tooltip>
    );
  },
);

CitationChip.displayName = 'CitationChip';
