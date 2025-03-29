import { memo, useState } from "react";

export const Slider = memo(function Slider() {
  const steps = [0, 25, 50, 75, 100];

  const [currentStep, setCurrentStep] = useState(0);

  const handleSliderChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = Number(e.target.value);

    const closestIndex = steps.reduce(
      (closest, step, index) =>
        Math.abs(step - value) < Math.abs(steps[closest] - value)
          ? index
          : closest,
      0
    );
    setCurrentStep(closestIndex);
  };

  const goPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="slider">
      <input
        type="range"
        min={steps[0]}
        max={steps[steps.length - 1]}
        value={steps[currentStep]}
        onChange={handleSliderChange}
        step="1"
        style={{ flexGrow: 1 }}
      />
      <div className="slider-arrows">
        <button onClick={goPrevious} disabled={currentStep === 0}>
          &#8592;
        </button>
        <button onClick={goNext} disabled={currentStep === steps.length - 1}>
          &#8594;
        </button>
      </div>
    </div>
  );
});
