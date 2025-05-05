"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, RefObject, useRef, useState } from "react";
import { Location } from "@/types/scraprs";
import { TerraDraw, TerraDrawCircleMode } from "terra-draw";
import { TerraDrawMapboxGLAdapter } from "terra-draw-mapbox-gl-adapter";

export default function AddLocations({
  locations,
  setLocations,
  mapRef,
}: {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  mapRef: RefObject<mapboxgl.Map>;
}) {
  const [drawMode, setDrawMode] = useState(false);
  // const [currentCord, setCurrentCord] = useState<[number, number] | null>(null);
  const drawRef = useRef<TerraDraw | null>(null);

  useEffect(() => {
    return () => {
      if (mapRef.current && drawRef.current) {
        drawRef.current.stop();
        drawRef.current = null;
      }
    };
  }, [mapRef]);

  const handleAddNewScraper = () => {
    if (!mapRef.current) return;
    setDrawMode(true);

    if (drawRef.current) {
      // Already initialized
      drawRef.current.setMode("circle");
      return;
    }

    const draw = new TerraDraw({
      adapter: new TerraDrawMapboxGLAdapter({
        map: mapRef.current,
      }),
      modes: [new TerraDrawCircleMode()],
    });

    draw.start();
    drawRef.current = draw;

    // Immediately enter "circle" mode
    draw.setMode("circle");
  };

  function calculatePolygonCenter(coordinates: number[][]): [number, number] {
    let sumLng = 0;
    let sumLat = 0;

    coordinates.forEach(([lng, lat]) => {
      sumLng += lng;
      sumLat += lat;
    });

    const centerLng = sumLng / coordinates.length;
    const centerLat = sumLat / coordinates.length;

    return [centerLng, centerLat];
  }

  const confirmLocation = () => {
    if (!drawRef.current) return;

    const features = drawRef.current.getSnapshot();

    if (!features.length) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newLocations: Location[] = features.map((feature: any) => {
      const coordinates = feature.geometry.coordinates[0];
      const center = calculatePolygonCenter(coordinates);
      const radius = feature.properties.radiusKilometers * 1000; // convert km -> meters

      return {
        neighborhood_name: "",
        radius,
        lat: center[1], // latitude
        long: center[0], // longitude
        scraper_id: Math.floor(Math.random() * 1000000), // random ID
      };
    });

    // 🟢 Save all circles
    setLocations(newLocations);
    setDrawMode(false);
  };

  return (
    <>
      <div className="space-y-3">
        {!drawMode && (
          <Button type="button" variant="outline" onClick={handleAddNewScraper}>
            Add Location
          </Button>
        )}
        {drawMode ? (
          <div className="flex flex-col gap-3">
            {/* <div className="flex flex-col gap-2">
              <Label htmlFor="radius">Radius</Label>
              <Input
                id="radius"
                name="radius"
                value={currentRadius}
                onChange={(e) => setCurrentRadius(parseInt(e.target.value))}
                placeholder="Enter radius"
                type="number"
                required
              />
            </div> */}

            <Button
              type="button"
              onClick={confirmLocation}
              className="bg-primary-yellow"
            >
              Confirm Location
            </Button>
          </div>
        ) : (
          <div className="border border-gray-400/30 rounded-md flex">
            <div className="w-full text-center py-5">
              {locations.length > 0 ? (
                locations.map((location, index) => (
                  <div className="flex justify-between px-3" key={index}>
                    <p className="text-sm">
                      {Math.round(location.lat * 1000) / 1000},{" "}
                      {Math.round(location.long * 1000) / 1000}
                    </p>
                    <p>{Math.round(location.radius * 1000) / 1000}m</p>
                  </div>
                ))
              ) : (
                <p className="font-bold text-sm">
                  No locations have been added yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
