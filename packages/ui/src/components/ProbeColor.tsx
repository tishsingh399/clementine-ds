import { forwardRef } from 'react';

export interface ProbeColorProps {
  sessionId: string;
  account: string;
}

export const ProbeColor = forwardRef<HTMLDivElement, ProbeColorProps>(
  ({ sessionId, account }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        style={{
          background: 'var(--cds-surface-elevated)',
          borderStyle: 'solid',
          borderWidth: 'thin',
          borderColor: 'var(--cds-border-default)',
        }}
      >
        <h3
          style={{
            color: 'var(--cds-text-primary)',
          }}
        >
          Session {sessionId}
        </h3>
        <span
          style={{
            color: 'var(--cds-text-secondary)',
          }}
        >
          {account}
        </span>
        <span
          style={{
            background: 'var(--cds-risk-critical)',
          }}
        >
          <em
            style={{
              color: 'var(--cds-text-on-action)',
            }}
          >
            critical
          </em>
        </span>
      </div>
    );
  },
);

ProbeColor.displayName = 'ProbeColor';
