import { memo } from "react";
import { Allocations } from "./Allocations";
import { Resources } from "./Resources";
import { Time } from "./Time";
import "../../styles/Overlay.css";
import { Population } from "./Population";
import { useTimeStore } from "../../stores/timeStore";

export const Overlay = memo(function Overlay() {
  const isPaused = useTimeStore((state) => state.isPaused);
  const rate = useTimeStore((state) => state.rate);
  const startStop = useTimeStore((state) => state.startStop);
  const setSpeed = useTimeStore((state) => state.setSpeed);

  return (
    <div className="overlay">
      {/* <DeliveryMenu /> */}
      <div className="header">
        <div className="spacer" />
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
        <div onClick={() => rate !== 1 && setSpeed(rate - 1)}>⏮</div>
        <div onClick={startStop}>{isPaused ? "▶" : "❚❚"}</div>
        <div onClick={() => rate !== 3 && setSpeed(rate + 1)}>⏭</div>
      </div>
    </div>
  );
});
