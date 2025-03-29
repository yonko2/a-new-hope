import {Canvas} from "@react-three/fiber";
import {OrbitControls as DreiOrbitControls} from '@react-three/drei';
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib';
import * as THREE from 'three'
import {Suspense, useRef, useState} from "react";
import { gsap } from 'gsap';
import Earth from "./planets/Earth.tsx";
import ArrowButton from "./rockets/Arrow";
import PlanetWithDots from "./planets/PlanetWithDots.tsx";
import {usePopulationSpreadStable} from "../../hooks/usePopulationSpread.tsx";

const INITIAL_TARGET = new THREE.Vector3(0, 0, 0);
const MARS_SIZE = 100;
const EARTH_SIZE = 100;

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
                z: MARS_SIZE * 10,
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
                    z: MARS_SIZE * 3,
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

    const earthCenter = new THREE.Vector3(EARTH_SIZE * 4, 0, 0); // Earth is at [200, 0, 0]
    const marsCenter = new THREE.Vector3(0, 0, 0);

    const dots = usePopulationSpreadStable({
        initialDotsCount: 5,
        maxDots: 100_000,
        spreadDistance: 10,
        spreadRate: 1000,
        intervalMs: 50,
    });


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
            {mapMode &&
                <ArrowButton
                    scene={sceneRef}
                    earthCenter={earthCenter}
                    marsCenter={marsCenter}
                    fromPercent={0.5}
                    toPercent={1}
                    direction={'toEarth'}
                />}
            <div style={{ width: "1000px", height: "1000px" }}>
                <Canvas
                    camera={{ position: [0, 0, MARS_SIZE * 3], fov: 50, near: 0.1, far: 10000 }}
                    onCreated={({ scene }) => setSceneRef(scene)}
                >
                    <ambientLight intensity={0.3} />
                    <directionalLight intensity={0.8} position={[5, 5, 5]} />

                    <Suspense fallback={null}>
                        <Earth visible={mapMode} size={EARTH_SIZE} />
                        <PlanetWithDots mapMode={mapMode} planetSize={MARS_SIZE} dots={dots} />
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