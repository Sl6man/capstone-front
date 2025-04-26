"use client";

import { useRef } from "react";
import mapboxgl from "mapbox-gl";

export function useDrawCircle(mapRef: React.RefObject<mapboxgl.Map>) {
  const circleId = useRef<string>("location-circle");

  const createCircleGeoJSON = (
    center: [number, number],
    radiusInMeters: number,
    points = 64
  ) => {
    const coords = {
      latitude: center[1],
      longitude: center[0],
    };

    const km = radiusInMeters / 1000;
    const ret = [];
    const distanceX =
      km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);
      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [ret],
      },
    };
  };

  const drawCircle = (center: [number, number], radiusInMeters: number) => {
    const map = mapRef.current;
    if (!map) return;

    // 🧹 Clean previous circle if exists
    if (map.getLayer(circleId.current)) {
      map.removeLayer(circleId.current);
    }
    if (map.getSource(circleId.current)) {
      map.removeSource(circleId.current);
    }

    // 🟢 Add new circle
    map.addSource(circleId.current, {
      type: "geojson",
      data: createCircleGeoJSON(center, radiusInMeters),
    });

    map.addLayer({
      id: circleId.current,
      type: "fill",
      source: circleId.current,
      layout: {},
      paint: {
        "fill-color": "#FACC14",
        "fill-opacity": 0.3,
      },
    });
  };

  const removeCircle = () => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getLayer(circleId.current)) {
      map.removeLayer(circleId.current);
    }
    if (map.getSource(circleId.current)) {
      map.removeSource(circleId.current);
    }
  };

  return {
    drawCircle,
    removeCircle,
  };
}
