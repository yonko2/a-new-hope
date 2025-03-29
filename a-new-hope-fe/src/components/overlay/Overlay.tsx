import { memo } from "react";
import { Allocations } from "./Allocations";
import { Resources } from "./Resources";
import { Time } from "./Time";
import "../../styles/Overlay.css";
import { Population } from "./Population";
import { DeliveryMenu } from "../delivery/DeliveryMenu";

export const Overlay = memo(function Overlay() {
  return (
    <div className="overlay">
        <DeliveryMenu />
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
      {/* TODO: Add start stop */}
      <div className="footer">{true ? "▶" : "❚❚"}</div>
    </div>
  );
});
