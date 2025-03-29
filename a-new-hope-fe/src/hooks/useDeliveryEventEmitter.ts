import { useEffect } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";

export function useDeliveryEventEmitter() {
  const daysElapsed = useTimeStore((state) => state.daysElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const daysTillNextRocket = useDeliveryStore(
    (state) => state.daysTillNextRocket
  );

  const sendRocket = useDeliveryStore((state) => state.sendRocket);
  const updateDaysTillNextRocket = useDeliveryStore(
    (state) => state.updateDaysTillNextRocket
  );

  console.log('daysTillNextRocket', daysTillNextRocket)

  useEffect(() => {
    if (daysTillNextRocket === 0) {
      sendRocket();
      updateDaysTillNextRocket(); // nullify counter
    }
  }, [daysTillNextRocket, sendRocket, updateDaysTillNextRocket]);

  useEffect(() => {
    if (progress === undefined) {
      updateDaysTillNextRocket(); // start counter
    }
  }, [daysElapsed, progress, updateDaysTillNextRocket]);
}
