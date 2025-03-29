import { memo } from "react";
import { resources } from "../../constants/resources";
import { Resource } from "./Resource";

export const Resources = memo(function Resources() {
  return (
    <div className="resources">
      {resources.map((resource) => (
        <Resource type={resource} availability={0.5} />
      ))}
    </div>
  );
});
