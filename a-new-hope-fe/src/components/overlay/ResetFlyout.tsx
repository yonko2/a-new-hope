import { memo } from "react";
import { API_URL } from "../../constants/api";
import { useSimulationStore } from "../../stores/simulationStore";
import { useTimeStore } from "../../stores/timeStore";

export const ResetFlyout = memo(function ResetFlyout() {
  const setIsResetShown = useSimulationStore((state) => state.setIsResetShown);

  const resetDays = useTimeStore((state) => state.resetDays);

  return (
    <div className="container reset-flyout">
      <h2 className="reset-flyout-title">Population is zero</h2>
      <button
        className="reset-flyout-button container"
        onClick={() => {
          fetch(`${API_URL}/reset`, {
            body: null,
            method: "POST",
          });

          setIsResetShown(false);
          resetDays();
        }}
      >
        Reset
      </button>
    </div>
  );
});
