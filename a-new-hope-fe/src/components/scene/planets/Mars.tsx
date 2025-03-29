import * as THREE from "three";
import {useLoader} from "@react-three/fiber";
import marsImage from "../resources/mars.jpeg";
import {useRef} from "react";

interface IProps {
    size: number;
}

const Mars = (args: IProps) => {
    const { size } = args;

    const meshRef = useRef<THREE.Mesh>(null);

    const marsTexture = useLoader(THREE.TextureLoader, marsImage);

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[size, 264, 264]} />
            <meshStandardMaterial map={marsTexture} />
        </mesh>
    );
};

export default Mars;