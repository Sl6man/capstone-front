/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { RefObject, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import * as turf from "@turf/turf";

interface ViewScraperProps {
  scraperId: number | null;
  setIsOpenNow: (value: string | null) => void;
  mapRef: RefObject<mapboxgl.Map>;
}

function ViewScraper({ scraperId, setIsOpenNow, mapRef }: ViewScraperProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [scraper, setScraper] = useState<any>({});

  useEffect(() => {
    setIsOpen(true);

    fetch(`${apiUrl}/scraper/${scraperId}`)
      .then((response) => response.json())
      .then((data) => setScraper(data))
      .catch((e) => console.log(e));
  }, [scraperId, apiUrl]);

  useEffect(() => {
    if (!scraper.locations || !mapRef.current) return;

    const map = mapRef.current;

    if (!map.isStyleLoaded()) {
      map.once("styledata", () => {
        drawLocations(map, scraper);
      });
    } else {
      drawLocations(map, scraper);
    }

    return () => {
      // Clean up when component unmounts
      scraper.locations.forEach((_: any, idx: number) => {
        const id = `scraper-circle-${scraper.scraper_id}-${idx}`;
        if (map.getLayer(id)) map.removeLayer(id);
        if (map.getSource(id)) map.removeSource(id);
      });
    };
  }, [scraper, mapRef]);

  function drawLocations(map: mapboxgl.Map, scraper: any) {
    scraper.locations.forEach((loc: any, idx: number) => {
      const id = `scraper-circle-${scraper.scraper_id}-${idx}`;

      if (!map.getSource(id)) {
        // Create real circle with Turf.js
        const circle = turf.circle([loc.long, loc.lat], loc.radius / 1000, {
          steps: 64,
          units: "kilometers",
        });

        map.addSource(id, {
          type: "geojson",
          data: circle,
        });

        map.addLayer({
          id: id,
          type: "fill",
          source: id,
          paint: {
            "fill-color": "#007cbf",
            "fill-opacity": 0.4,
          },
        });

        // Optional: fly to the first location
        if (idx === 0) {
          map.fitBounds(turf.bbox(circle), {
            padding: 10,
          });
        }
      }
    });
  }

  return (
    <div
      className={`absolute top-0 right-1 h-auto w-[30%] py-3 mr-7 
      flex-col items-center
      transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <div className="w-full h-full bg-white rounded-2xl shadow-lg flex flex-col">
        <div className="flex justify-start w-full mt-4">
          <button onClick={() => setIsOpenNow(null)} className="">
            <MdClose className="text-lg ml-3" />
          </button>
        </div>

        <div className="flex flex-col items-center mt-2">
          <h1 className="font-medium text-3xl">{scraper.title || "-"}</h1>
        </div>

        <div className="px-7">
          <div className="w-full h-[1px] mt-4 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-60" />
        </div>

        <div className="flex flex-col gap-4 px-8 mt-6">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Status</p>
            {scraper.status ? (
              <span className="bg-green-300 text-black px-4 py-1 rounded-full ">
                Active
              </span>
            ) : (
              <span className="bg-red-400 text-black px-4 py-1 rounded-full">
                Disabled
              </span>
            )}
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-semibold">Start Date</p>
            <p className="text-lg">
              {scraper.started_date
                ? new Date(scraper.started_date).toLocaleString()
                : "-"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-semibold">End Date</p>
            <p className="text-lg">
              {scraper.end_date
                ? new Date(scraper.end_date).toLocaleString()
                : "-"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-semibold">Created At</p>
            <p className="text-lg">
              {scraper.created_at
                ? new Date(scraper.created_at).toLocaleString()
                : "-"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-semibold">Updated At</p>
            <p className="text-lg">
              {scraper.updated_at
                ? new Date(scraper.updated_at).toLocaleString()
                : "-"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-lg font-semibold">Number of Locations</p>
            <p className="text-lg">
              {scraper.locations ? scraper.locations.length : 0}
            </p>
          </div>
        </div>

        <div className="my-4 flex justify-end">
          <button
            className="bg-yellow-400 w-28 mr-3 mb-3 rounded-3xl "
            onClick={() => setIsOpenNow("EditScraper")}
          >
            <p className="text-white text-lg font-normal">Edit</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewScraper;
