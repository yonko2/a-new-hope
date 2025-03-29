import { useEffect, useRef, useState } from "react";

export interface Dot {
  lat: number;
  lon: number;
}

const MIN_LATITUDE = -70;
const MAX_LATITUDE = 70;

const randomLatitude = () => {
  return Math.random() * (MAX_LATITUDE - MIN_LATITUDE) + MIN_LATITUDE;
};

const randomDotNear = (dot: Dot, spreadDistance: number): Dot => {
  let newLat = dot.lat + (Math.random() - 0.5) * spreadDistance;
  // Clamp strictly within ±70°
  newLat = Math.min(Math.max(newLat, MIN_LATITUDE), MAX_LATITUDE);

  const newLon = dot.lon + (Math.random() - 0.5) * spreadDistance;

  return {
    lat: newLat,
    lon: ((newLon + 180) % 360) - 180, // wrap lon within [-180,180]
  };
};

export const usePopulationSpreadStable = ({
  initialDotsCount = 5,
  maxDots = 50000,
  spreadDistance = 2,
  spreadRate = 100,
  intervalMs = 200,
}) => {
  const [dots, setDots] = useState<Dot[]>([]);
  const dotsRef = useRef<Dot[]>([]); // Stable reference to dots array

  useEffect(() => {
    const initialDots = Array.from({ length: initialDotsCount }, () => ({
      lat: randomLatitude(),
      lon: Math.random() * 360 - 180,
    }));
    dotsRef.current = initialDots;
    setDots(initialDots);
  }, [initialDotsCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dotsRef.current.length >= maxDots) {
        clearInterval(interval);
        return;
      }

      const newDots: Dot[] = [];
      for (
        let i = 0;
        i < spreadRate && dotsRef.current.length + newDots.length < maxDots;
        i++
      ) {
        const parentDot =
          dotsRef.current[Math.floor(Math.random() * dotsRef.current.length)];
        newDots.push(randomDotNear(parentDot, spreadDistance));
      }

      // Append new dots without recreating the old ones
      dotsRef.current = [...dotsRef.current, ...newDots];
      setDots(dotsRef.current);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [maxDots, spreadDistance, spreadRate, intervalMs]);

  return dots;
};
