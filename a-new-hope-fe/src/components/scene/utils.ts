import * as THREE from "three";
import { TubeGeometry, CatmullRomCurve3, Mesh, MeshStandardMaterial } from "three";
import { gsap } from "gsap";

export function latLongToCartesian(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const x = - (radius * Math.sin(phi) * Math.cos(theta))
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)
    return [x, y, z]
}

const COLOR = "yellow";
const DURATION = 2;
const DELAY = 3;
const SEGMENTS = 64;
const TUBE_RADIUS = 0.5;

export function sendCurvedArrow(
    scene: THREE.Scene | null,
    earthCenter: THREE.Vector3,
    marsCenter: THREE.Vector3,
    fromPercent: number,
    toPercent: number,
) {

    if (!scene) return;

    const start = earthCenter.clone().lerp(marsCenter, fromPercent);
    const end = earthCenter.clone().lerp(marsCenter, toPercent);

    const mid = start.clone().lerp(end, 0.5);
    const segmentDistance = start.distanceTo(end);
    const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * segmentDistance * 0.5,
        (Math.random() - 0.5) * segmentDistance * 0.5,
        (Math.random() - 0.5) * segmentDistance * 0.5
    );
    mid.add(randomOffset);

    const curve = new CatmullRomCurve3([start, mid, end]);

    // Create a tube geometry along the curve.
    const tubeGeometry = new TubeGeometry(curve, SEGMENTS, TUBE_RADIUS, 8, false);

    // Create a standard material (fully opaque).
    const material = new MeshStandardMaterial({
        color: COLOR,
        transparent: true,
        opacity: 1,
    });

    // Create the mesh for the arrow and add it to the scene.
    const arrowMesh = new Mesh(tubeGeometry, material);
    scene.add(arrowMesh);

    // Animate the arrow drawing by animating the draw range of the geometry.
    const fullCount = tubeGeometry.index
        ? tubeGeometry.index.count
        : tubeGeometry.attributes.position.count;

    // Start by drawing nothing.
    tubeGeometry.setDrawRange(0, 0);

    gsap.to({ count: 0 }, {
        count: fullCount,
        duration: DURATION,
        ease: "power1.out",
        onUpdate: function () {
            const currentCount = this.targets()[0].count;
            tubeGeometry.setDrawRange(0, currentCount);
        },
        onComplete: () => {
            // Once the arrow is fully drawn, wait for a delay then remove it.
            gsap.delayedCall(DELAY, () => {
                scene.remove(arrowMesh);
                tubeGeometry.dispose();
                material.dispose();
            });
        }
    });
}
