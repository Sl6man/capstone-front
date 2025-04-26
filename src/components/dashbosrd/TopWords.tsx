"use client"

import { LabelList, Pie, PieChart } from "recharts"

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

type WordData = {
  word: string
  count: number
}

type Props = {
  wordsData: WordData[]
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chart1: {
    color: "hsl(var(--chart-1))",
  },
  chart2: {
    color: "hsl(var(--chart-2))",
  },
  chart3: {
    color: "hsl(var(--chart-3))",
  },
  chart4: {
    color: "hsl(var(--chart-4))",
  },
  chart5: {
    color: "#deddd9",
  },
} as const

export function TopWords({ wordsData }: Props) {

  const pieData = wordsData.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${index + 1}))`,
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Words</CardTitle>
        <CardDescription>Most frequent words in snaps</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="count"
              nameKey="word"
              outerRadius="80%"
            >
              <LabelList
                dataKey="word"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
       
        <div className="leading-none text-muted-foreground">
          Showing most frequent words
        </div>
      </CardFooter>
    </Card>
  )
}
