import {useFrame, useThree} from "@react-three/fiber";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";
import { RefObject } from "react";
import * as THREE from 'three';

interface IProps {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    controlsRef: RefObject<ThreeOrbitControls | null>;
}

const PanLimit = ({ minX, maxX, minY, maxY, controlsRef }: IProps) => {
    const { camera } = useThree();

    useFrame(() => {
        if (!controlsRef.current) return;

        const target = controlsRef.current.target;
        const offset = new THREE.Vector3().subVectors(camera.position, target);

        const clampedX = THREE.MathUtils.clamp(target.x, minX, maxX);
        const clampedY = THREE.MathUtils.clamp(target.y, minY, maxY);

        if (target.x !== clampedX || target.y !== clampedY) {
            target.set(clampedX, clampedY, target.z);
            camera.position.copy(target).add(offset);
            controlsRef.current.update();
        }
    });

    return null;
};

export default PanLimit;
