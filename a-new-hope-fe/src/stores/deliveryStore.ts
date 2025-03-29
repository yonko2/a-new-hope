import { create } from "zustand";
import { DaysTillDeliveryEvent } from "../constants/delivery";
import { ResourceType } from "../types/resources";

export const DeliveryDaysTotal = 20;

type DeliveryStore = {
  progress: number | undefined;
  daysTillNextRocket: number | undefined;
  deliveryMenuShown: boolean;
  resources: Record<ResourceType, number>;
  sendRocket: () => void;
  updateProgress: () => void;
  updateDaysTillNextRocket: () => void;
  setDeliveryMenuShown: (isShown: boolean) => void;
  setResource: (resource: ResourceType, value: number) => void;
};

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  progress: undefined,
  daysTillNextRocket: DaysTillDeliveryEvent,
  deliveryMenuShown: false,
  resources: { food: 0, water: 0, oxygen: 0 },
  sendRocket: () => set({ progress: 0 }),
  updateProgress: () => {
    return set((state) => {
      let newProgress: number | undefined = 0;
      if (state.progress !== undefined) {
        newProgress = state.progress + 1 / DeliveryDaysTotal;
      }

      if (newProgress >= 1) {
        newProgress = undefined;
      }

      return { progress: newProgress };
    });
  },
  updateDaysTillNextRocket: () =>
    set((state) => {
      const daysTillNextRocket = (() => {
        if (state.daysTillNextRocket === 0) {
          return undefined;
        } else if (state.daysTillNextRocket === undefined) {
          return DaysTillDeliveryEvent;
        } else {
          return state.daysTillNextRocket - 1;
        }
      })();

      return {
        daysTillNextRocket,
      };
    }),
  setDeliveryMenuShown: (isShown: boolean) =>
    set(() => ({ deliveryMenuShown: isShown })),
  setResource: (resource, value) =>
    set((state) => ({ resources: { ...state.resources, [resource]: value } })),
}));
