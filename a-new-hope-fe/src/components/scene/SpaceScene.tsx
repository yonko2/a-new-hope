import {Canvas} from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import * as THREE from 'three'
import {Suspense, useRef, useState} from "react";
import { gsap } from 'gsap';
import Object from "./Object.tsx";
import Earth from "./planets/Earth.tsx";
import Mars from "./planets/Mars.tsx";
import ArrowButton from "./rockets/Arrow";

const INITIAL_TARGET = new THREE.Vector3(0, 0, 0);
const MARS_SIZE = 50;
const EARTH_SIZE = 50;

const SpaceScene = () => {
    const controlsRef = useRef<ThreeOrbitControls>(null);

    const [mapMode, setMapMode] = useState(false);
    const [savedOrbitPos, setSavedOrbitPos] = useState<THREE.Vector3 | null>(null);
    const [sceneRef, setSceneRef] = useState<THREE.Scene | null>(null);

    const toggleMode = () => {
        if (!controlsRef.current) return;
        const { object, target } = controlsRef.current;

        if (!mapMode) {
            // Save the current camera position.
            setSavedOrbitPos(object.position.clone());

            // Tween camera position to a new position that keeps the same distance,
            // but centers the view horizontally (x and y to 0).
            gsap.to(object.position, {
                duration: 1,
                x: 0,
                y: 0,
                z: 500,
                ease: "power2.out",
                onUpdate: () => {
                    object.lookAt(target);
                    controlsRef.current?.update();
                },
            });

            // Tween the OrbitControls target to the Mars center.
            gsap.to(target, {
                duration: 1,
                x: 0,
                y: 0,
                z: 0,
                ease: "power2.out",
                onUpdate: () => {
                    object.lookAt(target);
                    controlsRef.current?.update();
                },
            });

            // Disable orbit rotation to enable panning.
            controlsRef.current.enableRotate = false;
            controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.PAN;
            setMapMode(true);
        } else {
            // Switch back to Orbit Mode: tween camera back to saved orbit position.
            if (savedOrbitPos) {
                gsap.to(object.position, {
                    duration: 1,
                    x: savedOrbitPos.x,
                    y: savedOrbitPos.y,
                    z: 150,
                    ease: "power2.out",
                    onUpdate: () => {
                        object.lookAt(target);
                        controlsRef.current?.update();
                    },
                });
            }

            // Re-enable orbit rotation.
            controlsRef.current.enableRotate = true;
            controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

            // Ensure the target remains at Mars' center.
            target.copy(INITIAL_TARGET);
            setMapMode(false);
        }
        controlsRef.current.update();
    };

    return (
        <>
            <button
                onClick={toggleMode}
                style={{
                    zIndex: 1,
                    top: "20px",
                    left: "20px",
                    padding: "10px 20px",
                }}
            >
                {mapMode ? "Switch to Orbit Mode" : "Switch to Map Mode"}
            </button>
            {mapMode && <ArrowButton sceneRef={sceneRef} />}
            <div style={{ width: "1000px", height: "1000px" }}>
                <Canvas
                    camera={{ position: [0, 0, 150], fov: 50, near: 0.1, far: 10000 }}
                    onCreated={({ scene }) => setSceneRef(scene)}
                >
                    <ambientLight intensity={0.3} />
                    <directionalLight intensity={0.8} position={[5, 5, 5]} />

                    <Suspense fallback={null}>
                        <Mars mapMode={mapMode} size={MARS_SIZE} />
                        <Earth visible={mapMode} size={EARTH_SIZE} />

                        <Object lat={0} lon={0} radius={MARS_SIZE} color="red" size={0.5} />
                        <Object lat={45} lon={45} radius={MARS_SIZE} color="blue" size={0.5} />
                        <Object lat={-30} lon={120} radius={MARS_SIZE} color="green" size={0.5} />
                    </Suspense>

                    <DreiOrbitControls
                        ref={controlsRef}
                        enableZoom={true}
                        dampingFactor={0.1}
                    />
                </Canvas>
            </div>
        </>
    )
}

export default SpaceScene;