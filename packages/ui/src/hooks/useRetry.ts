import { useCallback, useState } from 'react';

export interface UseRetryResult {
  attempt: number;
  pending: boolean;
  error: unknown;
  /** Run fn, retrying up to maxAttempts; resolves undefined after the final failure. */
  run: <T>(fn: () => Promise<T>) => Promise<T | undefined>;
  reset: () => void;
}

/**
 * Tray 5 · Behavior — retry an async operation with a bounded attempt count.
 *
 * Surfaces `attempt`/`pending`/`error` so a surface can show "Retrying (2/3)…" and a
 * final error state. Caller adds any backoff.
 */
export function useRetry(maxAttempts = 3): UseRetryResult {
  const [attempt, setAttempt] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const reset = useCallback(() => {
    setAttempt(0);
    setError(null);
    setPending(false);
  }, []);

  const run = useCallback(<T,>(fn: () => Promise<T>): Promise<T | undefined> => {
    setPending(true);
    setError(null);
    const tryOnce = (n: number): Promise<T | undefined> => {
      setAttempt(n);
      return fn().catch((err: unknown) => {
        if (n >= maxAttempts) {
          setError(err);
          return undefined;
        }
        return tryOnce(n + 1);
      });
    };
    return tryOnce(1).finally(() => setPending(false));
  }, [maxAttempts]);

  return { attempt, pending, error, run, reset };
}
