import { useCallback, useState } from 'react';

export interface UseStreamingResult {
  /** Accumulated text revealed so far. */
  text: string;
  /** Whether tokens are still arriving. */
  isStreaming: boolean;
  start: () => void;
  append: (chunk: string) => void;
  stop: () => void;
  reset: () => void;
}

/**
 * Tray 5 · Behavior — manages progressively-streamed text ("becoming").
 *
 * Pair with <StreamingText> for the visual. Call start(), append(chunk) as tokens arrive,
 * then stop(). The component reads `text` + `isStreaming`.
 */
export function useStreaming(initial = ''): UseStreamingResult {
  const [text, setText] = useState(initial);
  const [isStreaming, setIsStreaming] = useState(false);

  const start = useCallback(() => setIsStreaming(true), []);
  const append = useCallback((chunk: string) => setText((t) => t + chunk), []);
  const stop = useCallback(() => setIsStreaming(false), []);
  const reset = useCallback(() => {
    setText('');
    setIsStreaming(false);
  }, []);

  return { text, isStreaming, start, append, stop, reset };
}
