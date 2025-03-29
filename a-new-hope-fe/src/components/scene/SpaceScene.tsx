import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";
import * as THREE from "three";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Earth from "./planets/Earth.tsx";
import PlanetWithDots from "./planets/PlanetWithDots.tsx";
import { usePopulationSpreadStable } from "../../hooks/usePopulationSpread.tsx";
import { useSceneStore } from "../../stores/sceneStore.ts";
import StarsBackground from "./background/StarsBackground.tsx";
import PanLimit from "./background/PanLimit.tsx";
import Rocket from "./rocket/Rocket.tsx";
import {useDeliveryStore} from "../../stores/deliveryStore.ts";

const MARS_SIZE = 70;
const EARTH_SIZE = 100;
const INITIAL_TARGET = new THREE.Vector3(0, 0, 0);
const EARTH_CENTER = new THREE.Vector3(EARTH_SIZE * 4, 0, 0);
const MARS_CENTER = new THREE.Vector3(0, 0, 0);

const SpaceScene = () => {
  const controlsRef = useRef<ThreeOrbitControls>(null);

  const mapMode = useSceneStore((state) => state.mapMode);
  const toggleIsRunningAnimation = useSceneStore(
    (state) => state.toggleIsRunningAnimation
  );

  const [savedOrbitPos, setSavedOrbitPos] = useState<THREE.Vector3 | null>(
    null
  );

  const onToggleMode = useCallback(() => {
    if (!controlsRef.current) return;
    const { object, target } = controlsRef.current;

    if (mapMode === "plane") {
      // Save the current camera position.
      setSavedOrbitPos(object.position.clone());

      // Tween camera position to a new position that keeps the same distance,
      // but centers the view horizontally (x and y to 0).
      gsap.to(object.position, {
        duration: 1,
        x: EARTH_SIZE * 2,
        y: 0,
        z: MARS_SIZE * 6,
        ease: "power2.out",
        onUpdate: () => {
          object.lookAt(target);
          controlsRef.current?.update();
        },
        onStart: () => {
          toggleIsRunningAnimation(true);
        },
        onComplete: () => {
          toggleIsRunningAnimation(false);
        },
      });

      // Tween the OrbitControls target to the Mars center.
      gsap.to(target, {
        duration: 1,
        x: EARTH_SIZE * 2,
        y: 0,
        z: 0,
        ease: "power2.out",
        onUpdate: () => {
          object.lookAt(target);
          controlsRef.current?.update();
        },
        onStart: () => {
          toggleIsRunningAnimation(true);
        },
        onComplete: () => {
          toggleIsRunningAnimation(false);
        },
      });

      // Disable orbit rotation to enable panning.
      controlsRef.current.enableRotate = false;
      controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.PAN;
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
          onStart: () => {
            toggleIsRunningAnimation(true);
          },
          onComplete: () => {
            toggleIsRunningAnimation(false);
          },
        });
      }

      // Re-enable orbit rotation.
      controlsRef.current.enableRotate = true;
      controlsRef.current.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

      // Ensure the target remains at Mars' center.
      target.copy(INITIAL_TARGET);
    }
    controlsRef.current.update();
    // No deps because it's an event handler
  }, [mapMode]);

  useEffect(onToggleMode, [onToggleMode]);

  const dots = usePopulationSpreadStable({
    initialDotsCount: 5,
    maxDots: 50_000,
    spreadDistance: 15,
    spreadRate: 500,
    intervalMs: 50,
  });

  const progress = useDeliveryStore(state => state.progress);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "absolute" }}>
        <Canvas
          camera={{
            position: [0, 0, MARS_SIZE * 3.25],
            fov: 50,
            near: 0.1,
            far: 10000,
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight intensity={0.8} position={[5, 5, 5]} />

          <Suspense fallback={null}>
            <Earth visible={mapMode === "plane"} size={EARTH_SIZE} />
            <PlanetWithDots
              mapMode={mapMode}
              planetSize={MARS_SIZE}
              dots={dots}
            />
            <StarsBackground radius={2000} />
          </Suspense>

          <DreiOrbitControls
            ref={controlsRef}
            enableZoom={true}
            dampingFactor={0.1}
            minDistance={100}
            maxDistance={1400}
          />

          <PanLimit
              controlsRef={controlsRef}
              minX={-500}
              minY={-500}
              maxX={800}
              maxY={500}
          />

          { progress && <Rocket earthCenter={EARTH_CENTER} marsCenter={MARS_CENTER} /> }
        </Canvas>
      </div>
    </>
  );
};

export default SpaceScene;
