import { memo } from "react";
import { ResourceIcon } from "../shared/ResourceIcon";
import { ResourceType } from "../../types/resources";
import { Slider } from "../overlay/Slider";

export const DeliveryItem = memo(function DeliveryItem(props: {
  type: ResourceType;
}) {
  return (
    <div className="delivery-item">
      <ResourceIcon type={props.type} />
      <Slider steps={[0,20,40,60,80,100]} currentStep={20} setCurrentStep={() => undefined}/>
    </div>
  );
});
