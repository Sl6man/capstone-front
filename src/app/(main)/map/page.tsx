"use client";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"; // ✅ important

import React, { useRef, useState } from "react";
import ViewAllScraper from "@/components/map/ViewAllScraper";
import AddScraper from "@/components/map/AddScraper/AddScraper";
import ViewScraper from "@/components/map/ViewScraper";
import EditScraper from "@/components/map/EditScraper";
import { useMap } from "@/hooks/useMap";

function Page() {
  const [isOpenNow, setIsOpenNow] = useState<string | null>(null);
  const [selectedScraperId, setSelectedScraperId] = useState<number | null>(
    null
  );
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // Initialize the map using the custom hook
  const mapRef = useMap(mapContainerRef);

  return (
    <div className="w-full h-screen bg-gray-200 overflow-hidden  overflow-x-hidden relative ">
      {/* map container */}
      <div className="w-full h-screen absolute top-0 left-0">
        <div ref={mapContainerRef} className="w-full h-full " />
      </div>

      <ViewAllScraper
        setIsOpenNow={setIsOpenNow}
        setSelectedScraperId={setSelectedScraperId}
      ></ViewAllScraper>
      {isOpenNow === "AddScraper" && (
        <AddScraper setIsOpenNow={setIsOpenNow} mapRef={mapRef} />
      )}
      {isOpenNow === "ViewScraper" && (
        <ViewScraper
          scraperId={selectedScraperId}
          setIsOpenNow={setIsOpenNow}
          mapRef={mapRef}
        />
      )}
      {isOpenNow === "EditScraper" && (
        <EditScraper
          scraperId={selectedScraperId}
          setIsOpenNow={setIsOpenNow}
        />
      )}
    </div>
  );
}

export default Page;
