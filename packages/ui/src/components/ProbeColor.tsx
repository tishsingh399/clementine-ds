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
          background: '#ffffff',
          borderStyle: 'solid',
          borderWidth: 'thin',
          borderColor: '#e5e5e0',
        }}
      >
        <h3
          style={{
            color: '#1a1a18',
          }}
        >
          Session {sessionId}
        </h3>
        <span
          style={{
            color: '#6b6b66',
          }}
        >
          {account}
        </span>
        <span
          style={{
            background: '#7f1d1d',
          }}
        >
          <em
            style={{
              color: '#fff',
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
