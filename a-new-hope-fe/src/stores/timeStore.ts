import { create } from "zustand";

type TimeRate = number

type TimeStore = {
  daysElapsed: number;
  rate: TimeRate;
  isPaused: boolean;
  goAtNextDay: () => void;
  setSpeed: (rate: TimeRate) => void;
  startStop: () => void;
};

export const useTimeStore = create<TimeStore>((set) => ({
  daysElapsed: 0,
  rate: 1,
  isPaused: false,
  goAtNextDay: () => set((state) => ({ daysElapsed: state.daysElapsed + 1 })),
  setSpeed: (rate: TimeRate) => set({ rate }),
  startStop: () => set((state) => ({ isPaused: !state.isPaused })),
}));
