import { forwardRef } from 'react';

export const ProbeTailwind = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} role="group">
      <span className="bg-[#2563eb]">brand background</span>
      <span className="text-[#1a1a18]">ink text</span>
      <span className="p-[16px]">padded</span>
    </div>
  );
});

ProbeTailwind.displayName = 'ProbeTailwind';
