import { ResourceType } from "../types/resources";

export const resources: ResourceType[] = ["water", "oxygen", "food"];

export const ResourceEmojis: Record<ResourceType, string> = {
  water: "💧",
  oxygen: "💨",
  food: "🍖",
};

export const CriticalThreshold = 0.2;
export const NeutralThreshold = 0.8;
