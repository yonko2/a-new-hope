import { memo } from "react";
import { Allocations } from "./Allocations";
import { Resources } from "./Resources";
import { Time } from "./Time";
import { Slider } from "./Slider";
import '../../styles/Overlay.css'

export const Overlay = memo(function Overlay() {
    return <div className="overlay">
        <div className="header">
            <Resources />
            <Time />
        </div>
        <div style={{ position: 'absolute', left: 0 }}><Allocations /></div>
        <div style={{ position: 'absolute', bottom: 0 }}><Slider /></div>
    </div>
})