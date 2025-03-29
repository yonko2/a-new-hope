import {useEffect, useMemo, useRef} from "react";
import * as THREE from "three";
import latLongToCartesian from "./utils.ts";

export interface Dot {
    lat: number;
    lon: number;
}

interface IProps {
    dots: Dot[];
    radius: number;
    dotSize: number;
}

const Dots = (args: IProps) => {
    const { dots, radius, dotSize } = args;

    const meshRef = useRef<THREE.InstancedMesh>(null);

    const [geometry, material] = useMemo(() => {
        return [
            new THREE.SphereGeometry(dotSize, 8, 8),
            new THREE.MeshStandardMaterial(),
        ];
    }, [dotSize]);

    useEffect(() => {
        if (!meshRef.current) return;

        const tempMatrix = new THREE.Matrix4();
        dots.forEach((dot, index) => {
            const [x, y, z] = latLongToCartesian(dot.lat, dot.lon, radius);
            tempMatrix.setPosition(x, y, z);
            meshRef.current!.setMatrixAt(index, tempMatrix);
            meshRef.current!.setColorAt(index, new THREE.Color('#E5E9EC'));
        });

        meshRef.current.count = dots.length;
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor)
            meshRef.current.instanceColor.needsUpdate = true;

    }, [dots, radius]);

    return (
        <instancedMesh
            ref={meshRef}
            args={[geometry, material, dots.length]}
            position={[0, 0, 0]}
        />
    );
}

export default Dots;