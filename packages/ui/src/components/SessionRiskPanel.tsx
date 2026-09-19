import { forwardRef } from 'react';

export type SessionRisk = 'critical' | 'high' | 'medium' | 'low';

export interface SessionRiskPanelProps {
  sessionId: string;
  account: string;
  risk?: SessionRisk;
}

/**
 * Enterprise · SessionRiskPanel — summarises the risk posture of one privileged
 * session. Risk carried by color + label, never color alone.
 */
export const SessionRiskPanel = forwardRef<HTMLDivElement, SessionRiskPanelProps>(
  ({ sessionId, account, risk = 'low' }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        style={{
          background: '#ffffff',
          border: '1px solid #e5e5e0',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          width: '420px',
          padding: '8px 16px',
        }}
      >
        <h3 style={{ color: '#1a1a18', fontSize: '14px', marginBottom: '14px' }}>
          Session {sessionId}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#6b6b66' }}>{account}</span>
          <span style={{ color: '#fff', background: '#7f1d1d' }}>{risk}</span>
        </div>
      </div>
    );
  },
);

SessionRiskPanel.displayName = 'SessionRiskPanel';
