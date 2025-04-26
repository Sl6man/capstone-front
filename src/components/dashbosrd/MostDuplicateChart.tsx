"use client";

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

type Props = {
  chartData: {
    name: string;
    desktop: number;
  }[];
};

const chartConfig = {
  desktop: {
    label: "Duplicate Media",
    color: "#b3b6ba",
  },
} satisfies ChartConfig;

export default function MostDuplicateChart({ chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Districts by Duplicate Media</CardTitle>
        <CardDescription>Based on total duplicate snap count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20 }}>
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
