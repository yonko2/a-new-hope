import { useEffect } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";

export function useDeliveryUpdater() {
  const monthsElapsed = useTimeStore((state) => state.monthsElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const updateProgress = useDeliveryStore((state) => state.updateProgress);

  useEffect(() => {
    if (progress !== undefined) {
      updateProgress();
    }
  }, [progress !== undefined, monthsElapsed, updateProgress]);
}
