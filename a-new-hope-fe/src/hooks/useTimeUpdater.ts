import { useCallback, useEffect, useRef } from "react";
import { useTimeStore } from "../stores/timeStore";
import { useSimulationStore } from "../stores/simulationStore";

const MonthInMs = 5000;

export function useTimeUpdater() {
  const isPaused = useTimeStore((state) => state.isPaused);

  const rate = useTimeStore((state) => state.rate);
  const goAtNextMonth = useTimeStore((state) => state.goAtNextMonth);

  const setSummary = useSimulationStore((state) => state.setSummary);

  const intervalRef = useRef<number | null>(null);
  const isRequestMade = useRef<boolean>(false);

  const maybeGoAtNextMonth = useCallback(() => {
    if (!isRequestMade.current) {
      isRequestMade.current = true;

      fetch("/simulation")
        // .then((data) => data.json())
        // .then((data) => setSummary(data))
        .then(goAtNextMonth)
        .finally(() => (isRequestMade.current = false));
    }
  }, [setSummary, goAtNextMonth, setSummary]);

  useEffect(() => {
    if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(
        maybeGoAtNextMonth,
        (1 / rate) * MonthInMs
      );
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [rate, maybeGoAtNextMonth, isPaused]);
}
