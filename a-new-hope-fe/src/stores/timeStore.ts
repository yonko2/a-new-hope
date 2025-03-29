import { create } from "zustand";

type TimeRate = number;

type TimeStore = {
  monthsElapsed: number;
  rate: TimeRate;
  isPaused: boolean;
  goAtNextMonth: () => void;
  setSpeed: (rate: TimeRate) => void;
  startStop: () => void;
};

export const useTimeStore = create<TimeStore>((set) => ({
  monthsElapsed: 0,
  rate: 1,
  isPaused: false,
  goAtNextMonth: () => set((state) => ({ monthsElapsed: state.monthsElapsed + 1 })),
  setSpeed: (rate: TimeRate) => set({ rate }),
  startStop: () => set((state) => ({ isPaused: !state.isPaused })),
}));
