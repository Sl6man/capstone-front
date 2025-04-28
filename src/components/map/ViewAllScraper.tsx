import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import ScraperButton from "./ScraperButton";
import { HiMapPin } from "react-icons/hi2";
import ButtonProps from "../ButtonProps";
import { FaPlus } from "react-icons/fa6";

interface ViewAllScraperProps {
  setIsOpenNow: (value: string | null) => void;
  setSelectedScraperId: (value: number) => void;
}

function ViewAllScraper({
  setIsOpenNow,
  setSelectedScraperId,
}: ViewAllScraperProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [scrapers, setScrapers] = useState<
    {
      scraper_id: number;
      title: string;
      status: boolean;
      created_at: string;
      ubpated: string;
    }[]
  >([]);
  const [activeScraperId, setActiveScraperId] = useState<number | null>(null);
  const [OpenViewScraper, setOpenViewScraper] = useState(false);

  const handleClick = (id: number) => {
    setOpenViewScraper(true);

    setActiveScraperId(id);
    setSelectedScraperId(id);

    setIsOpenNow(null);
  };

  useEffect(() => {
    fetch(`${apiUrl}/scraper`)
      .then((response) => response.json())
      .then((data) => setScrapers(data))
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (OpenViewScraper) {
      setIsOpenNow("ViewScraper");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScraperId]);

  return (
    <div className=" absolute h-screen  w-[16.25%] top-0 z-50 py-4 ">
      <div className="bg-white w-full h-full rounded-3xl  ml-2  flex flex-col items-center py-8">
        <p className="font-medium text-3xl mt-2">Scrapers</p>

        <div className="mt-12 w-full">
          {scrapers &&
            scrapers.map((scraper) => (
              <React.Fragment key={scraper.scraper_id}>
                <ScraperButton
                  icon={<HiMapPin />}
                  className={
                    activeScraperId === scraper.scraper_id ? "bg-gray-50" : ""
                  }
                  text={scraper.title}
                  arrowIcon={<FaArrowRightLong />}
                  onClick={() => handleClick(scraper.scraper_id)}
                />

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-60" />
              </React.Fragment>
            ))}
        </div>

        <div className=" mt-auto w-full px-5">
          <ButtonProps
            className="bg-yellow-400"
            text="Create New Scraper"
            icon={<FaPlus className="text-lg " />}
            iconBG="py1 ml-2"
            textStyle="text-white"
            onClick={() => setIsOpenNow("AddScraper")}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewAllScraper;
