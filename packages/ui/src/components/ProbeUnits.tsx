import { forwardRef } from 'react';

export interface ProbeUnitsProps {
  sessionId: string;
}

export const ProbeUnits = forwardRef<HTMLDivElement, ProbeUnitsProps>(
  ({ sessionId }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        style={{
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          paddingTop: '8px',
          paddingLeft: '16px',
          width: '420px',
        }}
      >
        <h3
          style={{
            fontSize: '14px',
          }}
        >
          Session {sessionId}
        </h3>
        <p
          style={{
            marginBottom: '14px',
          }}
        >
          Elevated access pending review.
        </p>
      </div>
    );
  },
);

ProbeUnits.displayName = 'ProbeUnits';
