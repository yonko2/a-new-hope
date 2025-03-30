import { memo } from "react";
import { Resource } from "./Resource";
import { useSimulationStore } from "../../stores/simulationStore";
import { ResourceType } from "../../types/resources";

export const Resources = memo(function Resources() {
  const resources = useSimulationStore((state) => state.summary.resourceRatio);

  return (
    <div className="resources">
      {Object.entries(resources).map(([type, availability]) => (
        <Resource type={type as ResourceType} availability={availability} />
      ))}
    </div>
  );
});
