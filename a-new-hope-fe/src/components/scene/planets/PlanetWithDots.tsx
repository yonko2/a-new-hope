import * as THREE from 'three';
import Dots, {Dot} from "../Dots.tsx";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import Mars from "./Mars.tsx";
import { SceneMapMode } from '../../../types/scene.ts';
import { useTimeStore } from '../../../stores/timeStore.ts';

interface PlanetWithDotsProps {
    dots: Dot[];
    planetSize: number;
    mapMode: SceneMapMode;
}

const PlanetWithDots = (args: PlanetWithDotsProps) => {
    const rate = useTimeStore(state => state.rate)

    const isPaused = useTimeStore(state => state.isPaused)

    const { dots, planetSize, mapMode } = args;
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_state, delta) => {
        if (groupRef.current && mapMode && !isPaused) {
            groupRef.current.rotation.y += delta * 0.1 * rate;
        }
    });

    return (
        <group ref={groupRef}>
            <Mars size={planetSize} />
            <Dots dots={dots} radius={planetSize + 1} dotSize={0.2} />
        </group>
    );
};

export default PlanetWithDots;
