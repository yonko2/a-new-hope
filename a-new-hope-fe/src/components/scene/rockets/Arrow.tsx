import * as THREE from "three";
import {sendCurvedArrow} from "../utils";
import {Scene} from "three"; // Adjust path accordingly

// Define your planet sizes (or import these constants)
const MARS_SIZE = 50;
const EARTH_SIZE = 50;

interface ArrowButtonProps {
    sceneRef?: Scene | null
}

const ArrowButton = (props: ArrowButtonProps) => {
    const {sceneRef} = props;
    if (!sceneRef) return;

    // Define centers for Earth and Mars
    const earthCenter = new THREE.Vector3(EARTH_SIZE * 4, 0, 0); // Earth is at [200, 0, 0]
    const marsCenter = new THREE.Vector3(0, 0, 0); // Mars is at the origin

    // When the button is clicked, call the function with options.
    const handleClick = () => {
        sendCurvedArrow(
            sceneRef,
            earthCenter,
            marsCenter,
            EARTH_SIZE,
            MARS_SIZE,
            {
                color: "yellow",
                duration: 3,
                delay: 1,
            }
        );
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: "absolute",
                zIndex: 10,
                top: "20px",
                left: "20px",
                padding: "10px 20px",
            }}
        >
            Send Arrow
        </button>
    );
};

export default ArrowButton;
