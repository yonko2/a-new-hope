import { useEffect, useRef } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";
import { useSceneStore } from "../stores/sceneStore";

export function useDeliveryUpdater() {
  const daysElapsed = useTimeStore((state) => state.daysElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const updateProgress = useDeliveryStore((state) => state.updateProgress);

  const mapMode = useSceneStore((state) => state.mapMode);
  const switchMapMode = useSceneStore((state) => state.switchMapMode);

  const isAfterInitialRender = useRef<boolean>(false);

  const resources = useDeliveryStore((state) => state.resources);

  useEffect(() => {
    if (progress !== undefined) {
      updateProgress();
    }
  }, [progress !== undefined, daysElapsed, updateProgress]);

  useEffect(() => {
    if (isAfterInitialRender.current && progress === undefined) {
      if (mapMode === "plane") {
        switchMapMode();
      }

      fetch(`${import.meta.env["VITE_API_URL"]}/delivery`, {
        method: "POST",
        body: JSON.stringify(resources),
      });
    }

    isAfterInitialRender.current = true;
  }, [progress === undefined]);
}
