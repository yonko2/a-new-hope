import { memo } from "react";
import { Allocations } from "./Allocations";
import { Resources } from "./Resources";
import { Time } from "./Time";
import "../../styles/Overlay.css";
import { Population } from "./Population";
import { useTimeStore } from "../../stores/timeStore";
import { useSceneStore } from "../../stores/sceneStore";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { DeliveryMenu } from "../delivery/DeliveryMenu";
import { useSimulationStore } from "../../stores/simulationStore";
import { ResetFlyout } from "./ResetFlyout";

export const Overlay = memo(function Overlay() {
  const isPaused = useTimeStore((state) => state.isPaused);
  const rate = useTimeStore((state) => state.rate);
  const startStop = useTimeStore((state) => state.startStop);
  const setSpeed = useTimeStore((state) => state.setSpeed);

  const mapMode = useSceneStore((state) => state.mapMode);
  const switchMapMode = useSceneStore((state) => state.switchMapMode);
  const isRunningAnimation = useSceneStore((state) => state.isRunningAnimation);

  const isDeliveryMenuShown = useDeliveryStore(
    (state) => state.deliveryMenuShown
  );

  const isResetShown = useSimulationStore(state => state.isResetShown)

  const hasProgress = useDeliveryStore((state) => state.progress !== undefined);

  const speedButtonsStyle = { display: hasProgress ? "none" : undefined };

  return (
    <div className="overlay">
      {isDeliveryMenuShown ? <DeliveryMenu /> : null}
      {isResetShown ? <ResetFlyout /> : null}

      <div className="header">
        <div className="map-mode-button-container">
          <button
            disabled={isRunningAnimation || isDeliveryMenuShown}
            className="switch-map-mode-button container"
            onClick={switchMapMode}
          >
            {mapMode === "plane"
              ? "Switch to Orbit Mode"
              : "Switch to Map Mode"}
          </button>
        </div>
        <div className="header-center">
          <Resources />
          <Population />
        </div>
        <Time />
      </div>
      <div className="left-sidebar">
        <Allocations />
      </div>
      <div className="footer">
        <div
          style={speedButtonsStyle}
          onClick={() => rate !== 1 && setSpeed(rate - 1)}
        >
          ⏮
        </div>

        <div className="pause-container">
          <div className="pause-button" onClick={startStop}>
            {isPaused ? "▶" : "❚❚"}
          </div>
          <div className="speed-rate">{`${rate}x`}</div>
        </div>

        <div
          style={speedButtonsStyle}
          onClick={() => rate !== 3 && setSpeed(rate + 1)}
        >
          ⏭
        </div>
      </div>
    </div>
  );
});
