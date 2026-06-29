import { forwardRef } from 'react';

export interface StreamingTextProps {
  /** The text revealed so far. */
  children: React.ReactNode;
  /** While true, shows a blinking caret and announces politely to AT. */
  streaming?: boolean;
}

/**
 * Clementine StreamingText — renders progressively-revealed model output with a caret
 * while streaming.
 *
 * `aria-live="polite"` so screen readers announce updates without interrupting; the caret
 * animation is disabled under `prefers-reduced-motion`. Caret color and blink duration come
 * from the component-tier tokens `streaming.caret` / `streaming.duration`
 * (--cds-streaming-*). See specs/streaming-text/index.md.
 */
export const StreamingText = forwardRef<HTMLSpanElement, StreamingTextProps>(
  ({ children, streaming = false }, ref) => {
    return (
      <span ref={ref} aria-busy={streaming} aria-live="polite">
        {children}
        {streaming && (
          <>
            <style>{
              '@keyframes cds-caret-blink{0%,49%{opacity:1}50%,100%{opacity:0}}' +
              '@media (prefers-reduced-motion: reduce){.cds-streaming-caret{animation:none !important;opacity:1}}'
            }</style>
            <span
              className="cds-streaming-caret"
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '0.5em',
                height: '1em',
                marginLeft: 2,
                transform: 'translateY(2px)',
                background: 'var(--cds-streaming-caret)',
                animation: 'cds-caret-blink var(--cds-streaming-duration) steps(1) infinite',
              }}
            />
          </>
        )}
      </span>
    );
  },
);

StreamingText.displayName = 'StreamingText';
