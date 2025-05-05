import React, { RefObject, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import ScraperForm from "./ScraperForm";

interface AddScraperProps {
  setIsOpenNow: (value: string | null) => void;
  mapRef: RefObject<mapboxgl.Map>;
}

function AddScraper({ setIsOpenNow, mapRef }: AddScraperProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(true), []);

  return (
    <div
      className={`absolute  top-0 right-1 h-screen w-auto py-3 mr-7 
        flex-col items-center
    transition-transform duration-300 ease-in-out
 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <div className="  w-full h-full  bg-white rounded-3xl shadow-lg flex flex-col ">
        <div className="felx justify-start w-full mt-4 ">
          <button onClick={() => setIsOpenNow(null)} className="">
            <MdClose className="text-lg ml-3" />
          </button>
        </div>

        <div className="flex justify-center items-center mt-4">
          <p className="font-medium text-3xl mt-2">Create New Scrapers</p>
        </div>

        <div className="px-7">
          <div className="w-full h-[1px] mt-6 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-60" />
        </div>
        <ScraperForm mapRef={mapRef} setIsOpenNow={setIsOpenNow} />
      </div>
    </div>
  );
}

export default AddScraper;
