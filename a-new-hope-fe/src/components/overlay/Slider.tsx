import { memo } from "react";

export const Slider = memo(function Slider(props: {
  steps: number[];
  currentStep: number;
  setCurrentStep: (value: number) => void;
}) {
  const handleSliderChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = Number(e.target.value);

    const closestIndex = props.steps.reduce(
      (closest, step, index) =>
        Math.abs(step - value) < Math.abs(props.steps[closest] - value)
          ? index
          : closest,
      0
    );
    props.setCurrentStep(closestIndex);
  };

  const goPrevious = () => {
    if (props.currentStep > 0) {
      props.setCurrentStep(props.currentStep - 1);
    }
  };

  const goNext = () => {
    if (props.currentStep < props.steps.length - 1) {
      props.setCurrentStep(props.currentStep + 1);
    }
  };

  return (
    <div className="slider">
      <input
        type="range"
        min={props.steps[0]}
        max={props.steps[props.steps.length - 1]}
        value={props.steps[props.currentStep]}
        onChange={handleSliderChange}
        step="1"
        style={{ flexGrow: 1 }}
      />
      {/* <div className="slider-arrows">
        <button onClick={goPrevious} disabled={props.currentStep === 0}>
          &#8592;
        </button>
        <button
          onClick={goNext}
          disabled={props.currentStep === props.steps.length - 1}
        >
          &#8594;
        </button>
      </div> */}
    </div>
  );
});
