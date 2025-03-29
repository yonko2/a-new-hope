import { memo } from "react";

export const Population = memo(function Population() {
  const formatter = Intl.NumberFormat().format;

  return <h2 className="population">{`${formatter(2123456)} population`}</h2>;
});
