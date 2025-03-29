import { create } from "zustand";
import { SceneMapMode } from "../types/scene";

type SceneStore = {
  mapMode: SceneMapMode;
  isRunningAnimation: boolean;
  switchMapMode: () => void;
  toggleIsRunningAnimation: (isRunning: boolean) => void;
};

export const useSceneStore = create<SceneStore>((set) => ({
  mapMode: "orbit",
  isRunningAnimation: false,
  switchMapMode: () =>
    set((state) => ({
      mapMode: state.mapMode === "plane" ? "orbit" : "plane",
    })),
  toggleIsRunningAnimation: (isRunning: boolean) =>
    set(() => ({ isRunningAnimation: isRunning })),
}));
