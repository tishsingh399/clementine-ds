import { Text } from '@mantine/core';
import { forwardRef } from 'react';

export const ProbeMantine = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} role="group">
      <Text c="#2563eb">brand colour prop</Text>
      <Text bg="#1a1a18">ink background prop</Text>
      <Text p={16}>spacing prop</Text>
    </div>
  );
});

ProbeMantine.displayName = 'ProbeMantine';
