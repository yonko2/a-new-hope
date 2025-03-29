import { useEffect, useRef } from "react";
import { useTimeStore } from "../stores/timeStore";

export const DayInMs = 1000;

export function useTimeUpdater() {
  const isPaused = useTimeStore((state) => state.isPaused);

  const rate = useTimeStore((state) => state.rate);
  const goAtNextDay = useTimeStore((state) => state.goAtNextDay);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(goAtNextDay, (1 / rate) * DayInMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [rate, goAtNextDay, isPaused]);
}
