"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Props = {
  data: {
    day: string
    count: number
  }[]
}

const chartConfig = {
  count: {
    label: "count",
    color: "hsl(var(--chart-1))",
  },
}

export function WeekdaySnapsChart({ data }: Props) {
  return (
    <Card >
      <CardHeader>
        <CardTitle>Snaps by Weekday</CardTitle>
        <CardDescription>Activity from Sunday to Saturday</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className="h-[580px] w-[1000px]">
          <LineChart
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
            height={90}
           
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={25}
            interval={0}
            angle={-30}
            minTickGap={5}
            tick={{ fontSize: 12 }}
            textAnchor="middle"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="monotone"
              stroke="#facc15"
              strokeWidth={2}
              dot={{ fill: "#facc15" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
 
        <div className="leading-none text-muted-foreground">
          Showing snaps per weekday
        </div>
      </CardFooter>
    </Card>
  )
}
