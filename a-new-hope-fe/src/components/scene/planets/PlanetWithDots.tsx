import * as THREE from 'three';
import Dots, {Dot} from "../Dots.tsx";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import Mars from "./Mars.tsx";

interface PlanetWithDotsProps {
    dots: Dot[];
    planetSize: number;
    mapMode: boolean;
}

const PlanetWithDots = (args: PlanetWithDotsProps) => {
    const { dots, planetSize, mapMode } = args;
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_state, delta) => {
        if (groupRef.current && mapMode) {
            groupRef.current.rotation.y += delta * 0.1;
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
