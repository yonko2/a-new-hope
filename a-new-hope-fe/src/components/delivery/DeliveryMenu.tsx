import { memo } from "react";
import { resources } from "../../constants/resources";
import { DeliveryItem } from "./DeliveryItem";

export const DeliveryMenu = memo(function DeliveryMenu() {
  return (
    <div className="container delivery-menu">
      <p>{`Total: ${100}%`}</p>

      {resources.map((resource) => (
        <DeliveryItem type={resource} />
      ))}
    </div>
  );
});
