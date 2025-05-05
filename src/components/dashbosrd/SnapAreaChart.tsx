"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// dynamic import لحل مشكلة hydration
const Select = dynamic(() => import("react-select"), { ssr: false });

// types
type Props = {
  areaChartData: {
    name: string;
    mobile: number;
  }[];
};

type OptionType = {
  label: string;
  value: string;
};

export function SnapAreaChart({ areaChartData }: Props) {
  const [selectedDistricts, setSelectedDistricts] = React.useState<OptionType[]>([]);

  const districtOptions: OptionType[] = areaChartData
  .map((item) => ({
    label: item.name,
    value: item.name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

  // الفلترة
  const filteredData = selectedDistricts.length === 0
    ? areaChartData
    : areaChartData.filter((item) =>
        selectedDistricts.some((selected) => selected.value === item.name)
      );

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 space-y-2 sm:space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Riyadh Districts</CardTitle>
          <CardDescription>
            Visualizing the number of new Snap Map videos captured per district
          </CardDescription>
        </div>

        {/* فلتر الأحياء */}
        <div className="w-80">
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
                minHeight: '48px',
                maxHeight: '150px',
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

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={{
            mobile: {
              label: "New Media",
              color: "#facc15",
            },
          }}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 65, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={10}
              interval={0}
              angle={-30}
              height={80}
              textAnchor="end"
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}`}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="mobile"
              type="monotone"
              fill="url(#fillMobile)"
              stroke="#facc15"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
