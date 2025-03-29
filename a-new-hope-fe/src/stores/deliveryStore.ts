import { create } from "zustand";
import { MonthsTillDeliveryEvent } from "../constants/delivery";
import { ResourceType } from "../types/resources";

export const DeliveryMonthsTotal = 7;

type DeliveryStore = {
  progress: number | undefined;
  monthsTillNextRocket: number | undefined;
  deliveryMenuShown: boolean;
  resources: Record<ResourceType, number>;
  sendRocket: () => void;
  updateProgress: () => void;
  updateMonthsTillNextRocket: () => void;
  setDeliveryMenuShown: (isShown: boolean) => void;
  setResource: (resource: ResourceType, value: number) => void;
};

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  progress: undefined,
  monthsTillNextRocket: MonthsTillDeliveryEvent,
  deliveryMenuShown: false,
  resources: { food: 0, water: 0, oxygen: 0 },
  sendRocket: () => set({ progress: 0 }),
  updateProgress: () => {
    return set((state) => {
      let newProgress: number | undefined = 0;
      if (state.progress !== undefined) {
        newProgress = state.progress + 1 / DeliveryMonthsTotal;
      }

      if (newProgress >= 1) {
        newProgress = undefined;
      }

      return { progress: newProgress };
    });
  },
  updateMonthsTillNextRocket: () =>
    set((state) => {
      const monthsTillNextRocket = (() => {
        if (state.monthsTillNextRocket === 0) {
          return undefined;
        } else if (state.monthsTillNextRocket === undefined) {
          return MonthsTillDeliveryEvent;
        } else {
          return state.monthsTillNextRocket - 1;
        }
      })();

      return {
        monthsTillNextRocket,
      };
    }),
  setDeliveryMenuShown: (isShown: boolean) =>
    set(() => ({ deliveryMenuShown: isShown })),
  setResource: (resource, value) =>
    set((state) => ({ resources: { ...state.resources, [resource]: value } })),
}));
