import * as THREE from "three";
import { TubeGeometry, CatmullRomCurve3, Mesh, MeshStandardMaterial } from "three";
import { gsap } from "gsap";

const latLongToCartesian = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const x = - (radius * Math.sin(phi) * Math.cos(theta))
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)
    return [x, y, z]
}

interface SendCurvedArrowOptions {
    color?: string | number;
    duration?: number;
    delay?: number;
    segments?: number;
    tubeRadius?: number;
}

export function sendCurvedArrow(
    scene: THREE.Scene,
    earthCenter: THREE.Vector3,
    marsCenter: THREE.Vector3,
    earthRadius: number,
    marsRadius: number,
    options: SendCurvedArrowOptions = {}
) {
    const {
        color = "yellow",
        delay = 1,
        segments = 64,
        tubeRadius = 0.5,
    } = options;

    const randomEarthLat = Math.random() * 180 - 90;
    const randomEarthLon = Math.random() * 360 - 180;
    const randomMarsLat = Math.random() * 180 - 90;
    const randomMarsLon = Math.random() * 360 - 180;

    const earthOffsetArr = latLongToCartesian(randomEarthLat, randomEarthLon, earthRadius);
    const marsOffsetArr = latLongToCartesian(randomMarsLat, randomMarsLon, marsRadius);

    const earthOffset = new THREE.Vector3(...earthOffsetArr);
    const marsOffset = new THREE.Vector3(...marsOffsetArr);

    // Calculate start and end points on the surfaces.
    const start = earthCenter.clone().add(earthOffset);
    const end = marsCenter.clone().add(marsOffset);

    // Calculate a midpoint and add a random offset for a curved path.
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    const distance = start.distanceTo(end);
    const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * distance * 0.5,
        (Math.random() - 0.5) * distance * 0.5,
        (Math.random() - 0.5) * distance * 0.5
    );
    mid.add(randomOffset);

    const curve = new CatmullRomCurve3([start, mid, end]);

    const tubeGeometry = new TubeGeometry(curve, segments, tubeRadius, 8, false);

    const material = new MeshStandardMaterial({
        color,
        transparent: true,
        opacity: 1,
    });

    const arrowMesh = new Mesh(tubeGeometry, material);
    scene.add(arrowMesh);

    const fullCount = tubeGeometry.index ? tubeGeometry.index.count : tubeGeometry.attributes.position.count;
    // Start by drawing nothing.
    tubeGeometry.setDrawRange(0, 0);

    gsap.to({ count: 0 }, {
        count: fullCount,
        duration: 2,
        ease: "power1.out",
        onUpdate: function () {
            // this.targets()[0].count holds the current animated count.
            const currentCount = this.targets()[0].count;
            tubeGeometry.setDrawRange(0, currentCount);
        },
        onComplete: () => {
            // Once the arrow is fully drawn, wait for a delay then remove it.
            gsap.delayedCall(delay, () => {
                scene.remove(arrowMesh);
                tubeGeometry.dispose();
                material.dispose();
            });
        }
    });
}


export default latLongToCartesian