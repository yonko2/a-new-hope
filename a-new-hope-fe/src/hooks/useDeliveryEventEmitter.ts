import { useCallback, useEffect } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";

export function useDeliveryEventEmitter() {
  const daysElapsed = useTimeStore((state) => state.daysElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const daysTillNextRocket = useDeliveryStore(
    (state) => state.daysTillNextRocket
  );

  const updateDaysTillNextRocket = useDeliveryStore(
    (state) => state.updateDaysTillNextRocket
  );

  const emitEvent = useEmitEvent();

  useEffect(() => {
    if (daysTillNextRocket === 0) {
      emitEvent();
      updateDaysTillNextRocket(); // nullify counter
    }
  }, [daysTillNextRocket, emitEvent, updateDaysTillNextRocket]);

  useEffect(() => {
    if (progress === undefined) {
      updateDaysTillNextRocket(); // start counter
    }
  }, [daysElapsed, progress, updateDaysTillNextRocket]);
}

function useEmitEvent() {
  const isPaused = useTimeStore((state) => state.isPaused);
  const startStop = useTimeStore((state) => state.startStop);

  const sendRocket = useDeliveryStore((state) => state.sendRocket);
  const setDeliveryMenuShown = useDeliveryStore(
    (state) => state.setDeliveryMenuShown
  );

  return useCallback(() => {
    if (!isPaused) {
      startStop();
    }

    setDeliveryMenuShown(true);
    sendRocket();
  }, [isPaused, startStop, sendRocket]);
}
