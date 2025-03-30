import { ResourceType } from "../types/resources";

export const resources: ResourceType[] = ["Water", "Air", "Food"];

export const ResourceEmojis: Record<ResourceType, string> = {
  Water: "💧",
  Air: "💨",
  Food: "🍖",
};

export const CriticalThreshold = 0.2;
export const NeutralThreshold = 0.8;
