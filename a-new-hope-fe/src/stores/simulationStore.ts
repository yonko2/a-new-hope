import { create } from "zustand";

type ResourceResponse = {
  volume: number;
  name: string;
  daysTillDeath: number;
};

type Summary = {
  population: number;
  resources: {
    Air: ResourceResponse;
    Food: ResourceResponse;
    Water: ResourceResponse;
  };
  deathsFromNatural: number;
  deathsFromStarvation: number;
  births: number;
};

type SimulationStore = {
  summary: Summary;
  setSummary: (data: Summary) => void;
};

export const useSimulationStore = create<SimulationStore>((set) => ({
  summary: {
    population: 0,
    resources: {
      Air: {
        volume: 0,
        name: "Air",
        daysTillDeath: 0,
      },
      Food: {
        volume: 0,
        name: "Food",
        daysTillDeath: 0,
      },
      Water: {
        volume: 0,
        name: "Water",
        daysTillDeath: 0,
      },
    },
    deathsFromNatural: 0,
    deathsFromStarvation: 0,
    births: 0,
  },
  setSummary: (data: Summary) => set(() => ({ summary: data })),
}));
