import { useRef, useEffect } from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import earthImage from "../resources/earth.jpeg";
import { useTimeStore } from "../../../stores/timeStore";

interface IProps {
    visible: boolean;
    size: number;
}

const Earth = (args: IProps) => {
    const { visible, size } = args;

    const rate = useTimeStore(state => state.rate)

    const meshRef = useRef<THREE.Mesh>(null);
    const earthTexture = useLoader(THREE.TextureLoader, earthImage);

    useEffect(() => {
        if (meshRef.current) {
            gsap.to(meshRef.current.material, {
                duration: 1,
                opacity: visible ? 1 : 0,
                ease: "power1.out",
            });
        }
    }, [visible]);

    useFrame((_state, delta) => {
        if (meshRef.current) {
            // Rotate the Earth slowly around the y-axis.
            meshRef.current.rotation.y += delta * 0.3 * rate; // Adjust speed as needed
        }
    });

    return (
        <mesh ref={meshRef} position={[size * 4, 0, 0]}>
            <sphereGeometry args={[size, 264, 264]} />
            <meshStandardMaterial
                map={earthTexture}
                transparent
                opacity={0}
            />
        </mesh>
    );
};

export default Earth;
