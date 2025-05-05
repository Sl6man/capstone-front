"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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
    label: "Total Duration",
    color: "#b3b6ba",
  },
} satisfies ChartConfig;

export default function MostDurationChart({ chartData }: Props) {
  const [selectedDistricts, setSelectedDistricts] = React.useState<OptionType[]>([]);

  const districtOptions: OptionType[] = chartData.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const filteredData = selectedDistricts.length === 0
    ? chartData
    : chartData.filter((item) =>
        selectedDistricts.some((selected) => selected.value === item.name)
      );

  return (
    <Card className="white">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <CardTitle>Top Districts by Media Duration</CardTitle>
          <CardDescription>Based on total media duration</CardDescription>
        </div>
        <div className="w-80">
          <Select<OptionType, true>
            isMulti
            options={districtOptions}
            value={selectedDistricts.length > 0 ? selectedDistricts : []} // keep select empty by default
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
              tickMargin={10}
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
            <Bar dataKey="desktop" fill="#FFBF00" radius={8}>
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
          Showing top districts by duration
        </div>
      </CardFooter>
    </Card>
  );
}