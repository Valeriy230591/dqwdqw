import { useRef, useCallback } from "react";

const useThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const lastCallRef = useRef<number | null>(null);
  const lastFuncRef = useRef<T | null>(null);

  lastFuncRef.current = func;

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (lastCallRef.current === null || now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        lastFuncRef.current?.(...args);
      }
    },
    [delay]
  );
};

export default useThrottle;
