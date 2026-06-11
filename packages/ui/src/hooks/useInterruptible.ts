import { useCallback, useRef, useState } from 'react';

export interface UseInterruptibleResult {
  running: boolean;
  /** Run an async op that receives an AbortSignal; returns undefined if interrupted. */
  run: <T>(fn: (signal: AbortSignal) => Promise<T>) => Promise<T | undefined>;
  /** Abort the in-flight op (the Stop button). */
  interrupt: () => void;
}

/**
 * Tray 5 · Behavior — runs an interruptible async operation (generation, tool call).
 *
 * Wire `interrupt` to a Composer's Stop button. Starting a new run aborts the previous one.
 */
export function useInterruptible(): UseInterruptibleResult {
  const controllerRef = useRef<AbortController | null>(null);
  const [running, setRunning] = useState(false);

  const interrupt = useCallback(() => {
    controllerRef.current?.abort();
    setRunning(false);
  }, []);

  const run = useCallback(<T,>(fn: (signal: AbortSignal) => Promise<T>): Promise<T | undefined> => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setRunning(true);
    return fn(controller.signal)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return undefined;
        throw err;
      })
      .finally(() => {
        if (controllerRef.current === controller) {
          controllerRef.current = null;
          setRunning(false);
        }
      });
  }, []);

  return { running, run, interrupt };
}
