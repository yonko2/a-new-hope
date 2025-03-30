import { memo } from "react";
import { ResourceType } from "../../types/resources";
import { ProgressBar } from "./ProgressBar";
import { ResourceIcon } from "../shared/ResourceIcon";

export const Resource = memo(function Resource(props: {
  type: ResourceType;
  availability: number;
}) {
  return (
    <div className="container resource">
      <ResourceIcon type={props.type} />
      <div className="resource-progress-bar">
        <ProgressBar value={props.availability} />
      </div>
    </div>
  );
});
