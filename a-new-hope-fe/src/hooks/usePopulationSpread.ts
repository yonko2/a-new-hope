import { useEffect, useRef, useState } from "react";

export interface Dot {
    lat: number;
    lon: number;
}

const MIN_LATITUDE = -80;
const MAX_LATITUDE = 80;

const randomLatitude = () => {
    return Math.random() * (MAX_LATITUDE - MIN_LATITUDE) + MIN_LATITUDE;
};

const randomDotNear = (dot: Dot, spreadDistance: number): Dot => {
    let newLat = dot.lat + (Math.random() - 0.5) * spreadDistance;
    newLat = Math.min(Math.max(newLat, MIN_LATITUDE), MAX_LATITUDE);

    const newLon = dot.lon + (Math.random() - 0.5) * spreadDistance;

    return {
        lat: newLat,
        lon: ((newLon + 180) % 360) - 180, // wrap lon within [-180,180]
    };
};

interface IProps {
    initialDotsCount: number;
    maxDots: number;
    spreadDistance: number;
    spreadRate: number;
    intervalMs: number;
}

export const usePopulationSpreadStable = (args: IProps) => {
    const { initialDotsCount, maxDots, spreadDistance , spreadRate, intervalMs} = args;

    const [dots, setDots] = useState<Dot[]>([]);
    const dotsRef = useRef<Dot[]>([]);

    useEffect(() => {
        const initialDots = Array.from({ length: initialDotsCount }, () => ({
            lat: randomLatitude(),
            lon: Math.random() * 360 - 180,
        }));
        dotsRef.current = initialDots;
        setDots(initialDots);
    }, [initialDotsCount, maxDots === 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentCount = dotsRef.current.length;

            if (currentCount <= maxDots) {
                const dotsToAddCount = Math.min(spreadRate, maxDots - currentCount);
                const newDots: Dot[] = [];

                for (let i = 0; i < dotsToAddCount; i++) {
                    const parentDot = dotsRef.current[Math.floor(Math.random() * dotsRef.current.length)];
                    if (!parentDot) break;
                    newDots.push(randomDotNear(parentDot, spreadDistance));
                }

                dotsRef.current = [...dotsRef.current, ...newDots];
                setDots([...dotsRef.current]);
            }
            else if (currentCount > maxDots) {
                const dotsToRemoveCount = Math.min(spreadRate, currentCount - maxDots);
                const indicesToRemove = new Set<number>();

                while (indicesToRemove.size < dotsToRemoveCount) {
                    indicesToRemove.add(Math.floor(Math.random() * dotsRef.current.length));
                }

                dotsRef.current = dotsRef.current.filter((_, idx) => !indicesToRemove.has(idx));
                setDots([...dotsRef.current]);
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [maxDots, spreadDistance, spreadRate, intervalMs]);

    return dots;
};
