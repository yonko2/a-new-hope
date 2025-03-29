import * as THREE from "three";
import {sendCurvedArrow} from "../utils";

interface IProps {
    scene: THREE.Scene | null;
    earthCenter: THREE.Vector3;
    marsCenter: THREE.Vector3;
    fromPercent: number;
    toPercent: number;
    direction: 'toMars' | 'toEarth';
}

const ArrowButton = (props: IProps) => {
    const {scene, earthCenter, marsCenter, fromPercent, toPercent} = props;
    if (!scene) return;

    const handleClick = () => {
        sendCurvedArrow(
            scene,
            earthCenter,
            marsCenter,
            fromPercent,
            toPercent,
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
