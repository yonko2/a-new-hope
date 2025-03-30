import { create } from "zustand";
import { ResourceType } from "../types/resources";

type ResourceResponse = {
  name: string;
  daysTillDeath: number;
};

type Summary = {
  population: number;
  resources: Record<ResourceType, ResourceResponse>;
  resourceRatio: Record<ResourceType, number>;
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
        name: "Air",
        daysTillDeath: 0,
      },
      Food: {
        name: "Food",
        daysTillDeath: 0,
      },
      Water: {
        name: "Water",
        daysTillDeath: 0,
      },
    },
    resourceRatio: {
      Air: 100,
      Food: 100,
      Water: 100,
    },
    deathsFromNatural: 0,
    deathsFromStarvation: 0,
    births: 0,
  },
  setSummary: (data: Summary) => set(() => ({ summary: data })),
}));
