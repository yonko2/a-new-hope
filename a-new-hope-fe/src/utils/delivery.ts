import { DeliveryDaysTotal } from "../stores/deliveryStore";

export function getDaysOfMission(day: number) {
  const daysOfMission = day % DeliveryDaysTotal;

  return daysOfMission === 0
    ? DeliveryDaysTotal
    : daysOfMission;
}
