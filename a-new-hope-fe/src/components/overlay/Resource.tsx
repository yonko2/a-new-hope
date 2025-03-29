import { memo } from "react";
import { ResourceSchema } from "../../types/resources";
import { ResourceEmojis } from "../../constants/resources";
import { ProgressBar } from "./ProgressBar";

export const Resource = memo(function Resource(props: ResourceSchema) {
  return (
    <div className="container resource">
      <div className="container resource-icon">
        {ResourceEmojis[props.type]}
      </div>
      <div className="resource-progress-bar">
        <ProgressBar value={props.availability} />
      </div>
    </div>
  );
});
