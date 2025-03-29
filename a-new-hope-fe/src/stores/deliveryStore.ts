import { create } from "zustand";
import { MonthsTillDeliveryEvent } from "../constants/delivery";

export const DeliveryMonthsTotal = 7;

type DeliveryStore = {
  progress: number | undefined;
  monthsTillNextRocket: number | undefined;
  sendRocket: () => void;
  updateProgress: () => void;
  updateMonthsTillNextRocket: () => void;
};

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  progress: undefined,
  monthsTillNextRocket: MonthsTillDeliveryEvent,
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
}));
