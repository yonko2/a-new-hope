import { memo } from "react";
import { CriticalThreshold, NeutralThreshold } from "../../constants/resources";

function getStatusClassName(value: number): string {
    if (value <= CriticalThreshold) {
        return 'critical-fill'
    }
    if (value <= NeutralThreshold) {
        return 'neutral-fill'
    }
    return 'positive-fill'
}

export const ProgressBar = memo(function ProgressBar(props: {
    value: number
}) {
    // TODO: Add stems
    const percentage = Math.round(props.value * 100)

    return <div className="container progress-bar">
        <div
            className={`container progress-bar-value ${getStatusClassName(props.value)}`}
            style={{ width: `${percentage}%` }} />
    </div>
})