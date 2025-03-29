import { memo } from "react";

export const Time = memo(function Time() {
  return <div className="container time">
    <span>{new Date().toDateString()}</span>
  </div>
});
