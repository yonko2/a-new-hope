import { useEffect, useRef } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";

export function useDeliveryUpdater() {
  const monthsElapsed = useTimeStore((state) => state.monthsElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const updateProgress = useDeliveryStore((state) => state.updateProgress);

  const isAfterInitialRender = useRef<boolean>(false);

  const resources = useDeliveryStore((state) => state.resources);

  useEffect(() => {
    if (progress !== undefined) {
      updateProgress();
    }
  }, [progress !== undefined, monthsElapsed, updateProgress]);

  useEffect(() => {
    if (isAfterInitialRender.current && progress === undefined) {
      fetch("/delivery", { method: "POST", body: JSON.stringify(resources) });
    }

    isAfterInitialRender.current = true;
  }, [progress === undefined]);
}
