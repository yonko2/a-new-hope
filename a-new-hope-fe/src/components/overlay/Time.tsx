import { memo } from "react";
import { useTimeStore } from "../../stores/timeStore";

const InitialDate = new Date("2100-1-1");

export const Time = memo(function Time() {
  const monthsElapsed = useTimeStore((state) => state.monthsElapsed);

  const startDate = new Date(InitialDate);

  startDate.setMonth(InitialDate.getMonth() + monthsElapsed);

  const startDateString = startDate.toISOString();

  return (
    <div className="container time">
      <span>
        {startDateString.substring(0, startDateString.lastIndexOf("-"))}
      </span>
    </div>
  );
});
