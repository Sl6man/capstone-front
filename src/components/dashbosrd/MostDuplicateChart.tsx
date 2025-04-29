"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import dynamic from "next/dynamic"; // حل مشكلة hydration
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// هنا نستورد الـ Select بشكل صحيح
const Select = dynamic(() => import("react-select"), { ssr: false });

type Props = {
  chartData: {
    name: string;
    desktop: number;
  }[];
};

type OptionType = {
  label: string;
  value: string;
};

const chartConfig = {
  desktop: {
    label: "Duplicate Media",
    color: "#b3b6ba",
  },
} satisfies ChartConfig;

export default function MostDuplicateChart({ chartData }: Props) {
  const [selectedDistricts, setSelectedDistricts] = useState<OptionType[]>([]);

  const districtOptions = chartData.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const filteredData = selectedDistricts.length === 0
    ? chartData
    : chartData.filter((item) =>
        selectedDistricts.some((selected) => selected.value === item.name)
      );

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Top Districts by Duplicate Media</CardTitle>
          <CardDescription>Based on total duplicate snap count</CardDescription>
        </div>

        {/* فلتر الأحياء */}
        <div className="w-72">
          <Select<OptionType, true>
            isMulti
            options={districtOptions}
            value={selectedDistricts}
            onChange={(selected) => setSelectedDistricts([...(selected ?? [])])}
            className="text-sm"
            placeholder="Select Districts..."
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: '50px',
                maxHeight: '70px',
                overflowY: 'auto',
              }),
              menu: (provided) => ({
                ...provided,
                maxHeight: 'auto',
              }),
            }}
          />
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={filteredData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              interval={0}
              angle={-30}
              height={85}
              textAnchor="end"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#666666" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing top districts by duplicate media
        </div>
      </CardFooter>
    </Card>
  );
}
