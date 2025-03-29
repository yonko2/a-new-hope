import { useCallback, useEffect } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";

export function useDeliveryEventEmitter() {
  const monthsElapsed = useTimeStore((state) => state.monthsElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const monthsTillNextRocket = useDeliveryStore(
    (state) => state.monthsTillNextRocket
  );

  const updateMonthsTillNextRocket = useDeliveryStore(
    (state) => state.updateMonthsTillNextRocket
  );

  const emitEvent = useEmitEvent();

  useEffect(() => {
    if (monthsTillNextRocket === 0) {
      emitEvent();
      updateMonthsTillNextRocket(); // nullify counter
    }
  }, [monthsTillNextRocket, emitEvent, updateMonthsTillNextRocket]);

  useEffect(() => {
    if (progress === undefined) {
      updateMonthsTillNextRocket(); // start counter
    }
  }, [monthsElapsed, progress, updateMonthsTillNextRocket]);
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
