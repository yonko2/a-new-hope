import { memo } from "react";
import { ResourceIcon } from "../shared/ResourceIcon";
import { ResourceType } from "../../types/resources";
import { Slider } from "../overlay/Slider";
import { useDeliveryStore } from "../../stores/deliveryStore";

const steps = [...Array(11).keys()].map((x) => x * 10);

export const DeliveryItem = memo(function DeliveryItem(props: {
  type: ResourceType;
}) {
  const resoureValue = useDeliveryStore((state) => state.resources[props.type]);
  const setResourceValue = useDeliveryStore((state) => state.setResource);

  return (
    <div className="delivery-item">
      <ResourceIcon type={props.type} />
      <Slider
        steps={steps}
        currentStep={resoureValue}
        setCurrentStep={(value) => setResourceValue(props.type, value)}
      />
    </div>
  );
});
