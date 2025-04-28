import React from "react";
import SnapClient from "@/components/dashbosrd/SnapClient";
import MostDurationChart from "@/components/dashbosrd/MostDurationChart";
import MostDuplicateChart from "@/components/dashbosrd/MostDuplicateChart";
import KpiCard from "@/components/dashbosrd/KpiCard";
import { IoMdPhotos } from "react-icons/io";
import { GrLocationPin } from "react-icons/gr";
import { MdLocationDisabled } from "react-icons/md";
import { WeekdaySnapsChart } from "@/components/dashbosrd/WeekDaysActivtyChart";
import { TypeOfMedia } from "@/components/dashbosrd/TypeOfMedia";
import { TopWords } from "@/components/dashbosrd/TopWords";

type DurationData = {
  name: string;
  total_new_media_duration: number;
};
type DuplicateData = {
  name: string;
  duplicate_media: number;
};
type Kpis = {
  total_snaps: number;
  top_neighborhood: string;
  lowest_neighborhood: string;
  total_photo: number;
  total_video: number;
};

type WeekdaySnap = {
  day: string;
  count: number;
};

async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/neighborhood`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    // throw new Error("Failed to fetch media data");
  }

  const data: { name: string; total_new_media: number }[] = await res.json();

  const areaChartData = data.map((item) => ({
    name: item.name,
    mobile: item.total_new_media,
  }));

  //--------------------------------------------------------
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/neighborhood/duration`,
    {
      cache: "no-store",
    }
  );

  if (!res1.ok) {
    // throw new Error("Failed to fetch duration data2");
  }

  const rawData: DurationData[] = await res1.json();

  const chartData = rawData.map((item) => ({
    name: item.name,
    desktop: item.total_new_media_duration,
  }));

  //--------------------------------------------------------
  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/neighborhood/duplicates`,
    {
      cache: "no-store",
    }
  );

  if (!res2.ok) {
    // throw new Error("Failed to fetch duplicate data");
  }

  const rawData2: DuplicateData[] = await res2.json();

  const chartData2 = rawData2.map((item) => ({
    name: item.name,
    desktop: item.duplicate_media,
  }));

  //--------------------------------------------------------

  const res3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/kpis`, {
    cache: "no-store",
  });
  if (!res3.ok) {
    // throw new Error("Failed to fetch KPIs");
  }

  const kpiData: Kpis = await res3.json();

  const total_snaps = kpiData.total_snaps;
  const top_neighborhood = kpiData.top_neighborhood;
  const lowest_neighborhood = kpiData.lowest_neighborhood;
  const total_photo = kpiData.total_photo;
  const total_video = kpiData.total_video;

  //--------------------------------------------------------

  const res4 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/snaps/weekdays`,
    {
      cache: "no-store",
    }
  );
  if (!res4.ok) {
    // throw new Error("Failed to fetch weekday snaps");
  }

  const weekDaysData: WeekdaySnap[] = await res4.json();
  //--------------------------------------------------------

  const res5 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/words`, {
    cache: "no-store",
  });

  if (!res5.ok) {
    // throw new Error("Failed to fetch words");
  }

  const wordsData = await res5.json();

  if (
    !total_snaps &&
    !top_neighborhood &&
    !lowest_neighborhood &&
    !total_photo &&
    !total_video
  )
    return "";

  return (
    <div className="flex-col items-center m-6 overflow-auto overflow-x-hidden">
      <div className="flex justify-start gap-10 my-4 mx-10">
        <KpiCard
          background={"white"}
          label="Media Collected"
          icon={<IoMdPhotos />}
          value={total_snaps}
          textStyle="gray-400"
        />
        <KpiCard
          background={"white"}
          label="Top Neighborhood"
          icon={<GrLocationPin />}
          value={top_neighborhood}
          textStyle="gray-400"
        />
        <KpiCard
          background={"white"}
          label="Silent Neighborhood"
          icon={<MdLocationDisabled />}
          value={lowest_neighborhood}
          textStyle="gray-400"
        />
      </div>

      <div className="flex-col items-center mb-5 mx-10  ">
        <SnapClient areaChartData={areaChartData} />
      </div>

      <div className="flex justify-center gap-4 mx-10">
        <div className="flex-1">
          <MostDurationChart chartData={chartData} />
        </div>

        <div className="flex-1">
          <MostDuplicateChart chartData={chartData2} />
        </div>
      </div>

      <div className="flex justify-start  my-6 w-full mx-10 gap-6 ">
        <div className=" flex-1">
          <WeekdaySnapsChart data={weekDaysData} />
        </div>

        <div className="flex-1 flex-col items-start ">
          <div className="mb-5">
            <TypeOfMedia video={total_video} photo={total_photo} />
          </div>

          <div>
            <TopWords wordsData={wordsData} />
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Page;
