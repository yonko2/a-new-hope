import { useCallback, useEffect, useRef } from "react";
import { useTimeStore } from "../stores/timeStore";
import { useSimulationStore } from "../stores/simulationStore";
import { DayInMs } from "../constants/time";
import { API_URL } from "../constants/api";

export function useTimeUpdater() {
  const isPaused = useTimeStore((state) => state.isPaused);

  const rate = useTimeStore((state) => state.rate);
  const goAtNextDay = useTimeStore((state) => state.goAtNextDay);

  const setSummary = useSimulationStore((state) => state.setSummary);

  const intervalRef = useRef<number | null>(null);
  const isRequestMade = useRef<boolean>(false);

  const maybeGoAtNextDay = useCallback(() => {
    if (!isRequestMade.current) {
      isRequestMade.current = true;

      fetch(`${API_URL}/simulate`)
        .then((data) => data.json())
        .then((data) => setSummary(data))
        .then(goAtNextDay)
        .finally(() => (isRequestMade.current = false));
    }
  }, [setSummary, goAtNextDay]);

  useEffect(() => {
    if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (!isPaused) {
      intervalRef.current = setInterval(maybeGoAtNextDay, (1 / rate) * DayInMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [rate, maybeGoAtNextDay, isPaused]);
}
