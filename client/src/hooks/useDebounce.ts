"use client";
import { useCallback, useState } from "react";

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          callback(...args);
        }, delay),
      );
    },
    [callback, delay, timer],
  );
};
