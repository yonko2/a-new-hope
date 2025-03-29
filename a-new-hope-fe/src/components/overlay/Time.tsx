import { memo } from "react";
import { useTimeStore } from "../../stores/timeStore";

const InitialDate = new Date("2100-1-1");

export const Time = memo(function Time() {
  const daysElapsed = useTimeStore((state) => state.daysElapsed);

  const startDate = new Date(InitialDate);

  startDate.setDate(InitialDate.getDate() + daysElapsed);

  return (
    <div className="container time">
      <span>{startDate.toDateString()}</span>
    </div>
  );
});
