import { useEffect } from "react";
import { useDeliveryStore } from "../stores/deliveryStore";
import { useTimeStore } from "../stores/timeStore";

export function useDeliveryEventEmitter() {
  const monthsElapsed = useTimeStore((state) => state.monthsElapsed);

  const progress = useDeliveryStore((state) => state.progress);
  const monthsTillNextRocket = useDeliveryStore(
    (state) => state.monthsTillNextRocket
  );

  const sendRocket = useDeliveryStore((state) => state.sendRocket);
  const updateMonthsTillNextRocket = useDeliveryStore(
    (state) => state.updateMonthsTillNextRocket
  );

  useEffect(() => {
    if (monthsTillNextRocket === 0) {
      sendRocket();
      updateMonthsTillNextRocket(); // nullify counter
    }
  }, [monthsTillNextRocket, sendRocket, updateMonthsTillNextRocket]);

  useEffect(() => {
    if (progress === undefined) {
      updateMonthsTillNextRocket(); // start counter
    }
  }, [monthsElapsed, progress, updateMonthsTillNextRocket]);
}
