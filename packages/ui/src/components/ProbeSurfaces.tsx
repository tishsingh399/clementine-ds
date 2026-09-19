import { Text } from '@mantine/core';
import { forwardRef } from 'react';
import './ProbeSurfaces.css';

export const ProbeSurfaces = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} role="group">
      <span
        style={{
          color: '#2563eb',
        }}
      >
        inline style object
      </span>
      <span className="bg-[#2563eb]">tailwind arbitrary class</span>
      <span className="probe-surfaces__css-file">external css file</span>
      <Text c="#2563eb">mantine color prop</Text>
      <Text p={14}>mantine spacing prop</Text>
    </div>
  );
});

ProbeSurfaces.displayName = 'ProbeSurfaces';
