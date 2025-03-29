import * as THREE from "three";
import {useFrame, useLoader} from "@react-three/fiber";
import marsImage from "../resources/mars.jpeg";
import {useRef} from "react";

interface IProps {
    mapMode: boolean;
    size: number;
}

const Mars = (args: IProps) => {
    const { mapMode, size } = args;

    const meshRef = useRef<THREE.Mesh>(null);

    const marsTexture = useLoader(THREE.TextureLoader, marsImage);

    useFrame((_state, delta) => {
        if (meshRef.current && mapMode) {
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[size, 264, 264]} />
            <meshStandardMaterial map={marsTexture} />
        </mesh>
    );
};

export default Mars;