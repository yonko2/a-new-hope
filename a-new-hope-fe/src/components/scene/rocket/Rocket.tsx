import { memo, useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
    CatmullRomCurve3,
    Mesh,
    MeshStandardMaterial,
    TubeGeometry,
    Vector3,
    Group, Quaternion,
} from "three";
import { gsap } from "gsap";
import { DeliveryDaysTotal } from "../../../stores/deliveryStore.ts";
import { DayInMs } from "../../../hooks/useTimeUpdater.ts";
import { useTimeStore } from "../../../stores/timeStore.ts";

interface RocketProps {
    earthCenter: Vector3;
    marsCenter: Vector3;
}

const SEGMENTS = 100;
const TUBE_RADIUS = 0.2;
const COLOR = 0xff0000;
const CURVE_DRAW_DURATION = 3; // seconds

const Rocket = memo(function Rocket({ earthCenter, marsCenter }: RocketProps) {
    const rocketGroupRef = useRef<Group>(null);
    const arrowMeshRef = useRef<Mesh>(null);
    const rocketTweenRef = useRef<gsap.core.Tween | null>(null);

    const { scene } = useThree();
    const rate = useTimeStore((state) => state.rate);
    const isPaused = useTimeStore((state) => state.isPaused);

    const curve = useMemo(() => {
        const start = earthCenter.clone();
        const end = marsCenter.clone();
        const mid = start.clone().lerp(end, 0.5);
        const segmentDistance = start.distanceTo(end);
        const randomOffset = new Vector3(
            (Math.random() - 0.5) * segmentDistance * 0.5,
            (Math.random() - 0.5) * segmentDistance * 0.5,
            (Math.random() - 0.5) * segmentDistance * 0.5
        );
        mid.add(randomOffset);
        return new CatmullRomCurve3([start, mid, end]);
    }, [earthCenter, marsCenter]);

    useEffect(() => {
        if (!scene) return;

        const tubeGeometry = new TubeGeometry(curve, SEGMENTS, TUBE_RADIUS, 8, false);
        const material = new MeshStandardMaterial({
            color: COLOR,
            transparent: true,
            opacity: 1,
        });

        const arrowMesh = new Mesh(tubeGeometry, material);
        arrowMeshRef.current = arrowMesh;
        scene.add(arrowMesh);

        const fullCount = tubeGeometry.index
            ? tubeGeometry.index.count
            : tubeGeometry.attributes.position.count;

        tubeGeometry.setDrawRange(0, 0);

        gsap.to({ count: 0 }, {
            count: fullCount,
            duration: CURVE_DRAW_DURATION,
            ease: "power2.out",
            onUpdate() {
                const { count } = this.targets()[0];
                tubeGeometry.setDrawRange(0, count);
            },
            onComplete() {
                // Optionally remove the tube shortly after it finishes drawing
                gsap.delayedCall(1, () => {
                    scene.remove(arrowMesh);
                    tubeGeometry.dispose();
                    material.dispose();
                });
            },
        });

        // 2. Animate the rocket movement along the curve concurrently (longer duration)
        rocketTweenRef.current = gsap.to({ t: 0 }, {
            t: 1,
            duration: (DeliveryDaysTotal * DayInMs) / 1000 / rate,
            ease: "power1.out",
            onUpdate() {
                const t = this.targets()[0].t;
                const point = curve.getPoint(t);
                const tangent = curve.getTangent(t);
                const defaultForward = new Vector3(0, 1, 0);
                const quaternion = new Quaternion().setFromUnitVectors(defaultForward, tangent);
                rocketGroupRef.current!.quaternion.copy(quaternion);
                rocketGroupRef.current?.position.copy(point);
                rocketGroupRef.current?.lookAt(point.clone().add(tangent));
                rocketGroupRef.current?.rotateX(-Math.PI / -2);
            },
            onComplete() {
                // You can add any additional behavior after the rocket reaches its destination.
            },
        });
        return () => {
            if (arrowMesh) {
                scene.remove(arrowMesh);
                tubeGeometry.dispose();
                material.dispose();
            }
            rocketTweenRef.current?.kill();
        };
    }, [scene, curve, rate]);

    // ⏯ Reactively pause/resume the rocket animation
    useEffect(() => {
        if (isPaused) rocketTweenRef.current?.pause();
        else rocketTweenRef.current?.resume();
    }, [isPaused]);

    return (
        <group
            ref={rocketGroupRef} scale={[4, 4, 4]}
           onPointerOver={() => {
               console.log('Hovering over rocket');
           }}
        >
            <mesh>
                <cylinderGeometry args={[1, 1, 4, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0, 3, 0]}>
                <coneGeometry args={[1, 2, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </group>

    );
});

export default Rocket;
