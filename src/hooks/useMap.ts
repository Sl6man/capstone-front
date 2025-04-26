// hooks/useMap.ts
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// 🗺️ Set your Mapbox access token here
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function useMap(containerRef: React.RefObject<HTMLDivElement | null>) {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef) return;
    if (!containerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // Customize the style
      center: [46.6753, 24.7136], // Riyadh [lng, lat]
      zoom: 10,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [containerRef]);

  return mapRef;
}
