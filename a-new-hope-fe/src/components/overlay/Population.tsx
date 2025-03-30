import { memo } from "react";
import { useSimulationStore } from "../../stores/simulationStore";

export const Population = memo(function Population() {
  const formatter = Intl.NumberFormat().format;

  const population = useSimulationStore((state) => state.summary.population);

  return (
    <h2 className="population">{`${formatter(population)} population`}</h2>
  );
});
