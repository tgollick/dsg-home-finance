"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

const chartConfig = {
  Count: {
    label: "Count",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type DataPoint = {
  month: string;
  count: number;
};

// In your chart component, specify that it accepts a data prop
interface ChartProps {
  data: DataPoint[];
}

export function Chart({ data }: ChartProps) {
  return (
    <Card className="w-full h-fit p-6 mb-10">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="count"
            fill="var(--pink-accent)"
            radius={4}
            baseLine={2}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}
