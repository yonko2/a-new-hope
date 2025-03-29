import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import starTexture from '../resources/stars.jpeg';

const StarsBackground = ({ radius = 1000 }) => {
    const texture = useLoader(THREE.TextureLoader, starTexture);

    return (
        <mesh>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
            />
        </mesh>
    );
};

export default StarsBackground;
