import { memo } from "react";
import { ResourceType } from "../../types/resources";
import { ResourceEmojis } from "../../constants/resources";

export const ResourceIcon = memo(function ResourceIcon(props: {
  type: ResourceType;
}) {
  return (
    <div className="container resource-icon">{ResourceEmojis[props.type]}</div>
  );
});
