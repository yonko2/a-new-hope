import { memo } from "react";
import { Allocations } from "./Allocations";
import { Resources } from "./Resources";
import { Time } from "./Time";
import { Slider } from "./Slider";
import "../../styles/Overlay.css";

export const Overlay = memo(function Overlay() {
  return (
    <div className="overlay">
      <div className="header">
        <div className="spacer" />
        <Resources />
        <Time />
      </div>
      <div className="left-sidebar">
        <Allocations />
      </div>
      <div className="footer">
        <Slider />
      </div>
    </div>
  );
});
