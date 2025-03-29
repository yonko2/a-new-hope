import { create } from "zustand";
import { DaysTillDeliveryEvent } from "../constants/delivery";

export const DeliveryDaysTotal = 30;

type DeliveryStore = {
  progress: number | undefined;
  daysTillNextRocket: number | undefined;
  sendRocket: () => void;
  updateProgress: () => void;
  updateDaysTillNextRocket: () => void;
};

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  progress: undefined,
  daysTillNextRocket: DaysTillDeliveryEvent,
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
}));
