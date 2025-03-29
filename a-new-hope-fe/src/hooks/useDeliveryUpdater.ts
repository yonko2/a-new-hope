import { useEffect } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";

export function useDeliveryUpdater() {
  const daysElapsed = useTimeStore((state) => state.daysElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const updateProgress = useDeliveryStore((state) => state.updateProgress);

  useEffect(() => {
    if (progress !== undefined) {
      updateProgress();
    }
  }, [progress !== undefined, daysElapsed, updateProgress]);
}
