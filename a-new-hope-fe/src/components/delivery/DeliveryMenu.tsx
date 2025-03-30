import { memo } from "react";
import { resources } from "../../constants/resources";
import { DeliveryItem } from "./DeliveryItem";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { useTimeStore } from "../../stores/timeStore";
import { useSceneStore } from "../../stores/sceneStore";

export const DeliveryMenu = memo(function DeliveryMenu() {
  const resourcesState = useDeliveryStore((state) => state.resources);

  const isPaused = useTimeStore((state) => state.isPaused);
  const startStop = useTimeStore((state) => state.startStop);
  const setDeliveryMenuShown = useDeliveryStore(
    (state) => state.setDeliveryMenuShown
  );
  const switchMapMode = useSceneStore((state) => state.switchMapMode);

  const total = Object.values(resourcesState).reduce(
    (acc, item) => acc + item,
    0
  );

  return (
    <div className="container delivery-menu">
      <h3 className="delivery-menu-title">Allocate the space of the cargo</h3>
      <p>
        Total:&nbsp;
        <span
          className={`${total === 100 ? "positive-color" : "negative-color"}`}
        >{`${total}%`}</span>
      </p>

      {resources.map((resource) => (
        <DeliveryItem type={resource} />
      ))}

      <button
        disabled={total !== 100}
        className="container delivery-menu-confirm"
        onClick={() => {
          if (isPaused) {
            startStop();
          }
          setDeliveryMenuShown(false);
          switchMapMode();
        }}
      >
        Confirm
      </button>
    </div>
  );
});
