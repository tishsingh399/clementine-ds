import { forwardRef } from 'react';

export const ProbeNearMiss = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      style={{
        color: '#2563ec',
        background: '#1a1a19',
        fontSize: '15px',
        borderRadius: '5px',
      }}
    >
      near miss
    </div>
  );
});

ProbeNearMiss.displayName = 'ProbeNearMiss';
