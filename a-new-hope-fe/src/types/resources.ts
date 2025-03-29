export type ResourceType = "water" | "oxygen" | "food";

export type ResourceSchema = {
  type: ResourceType;
  availability: number;
  // quantity: number
};
