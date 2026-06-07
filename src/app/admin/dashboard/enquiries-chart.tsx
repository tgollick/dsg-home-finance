"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Enquiries",
    color: "hsl(343 79% 65%)",
  },
} satisfies ChartConfig;

export type EnquiryPoint = {
  month: string;
  count: number;
};

export function EnquiriesChart({ data }: { data: EnquiryPoint[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <AreaChart accessibilityLayer data={data} margin={{ left: -16, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillEnquiries" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/60" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value: string) => value.slice(0, 3)}
          className="text-xs"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={32}
          allowDecimals={false}
          className="text-xs"
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="count"
          type="monotone"
          fill="url(#fillEnquiries)"
          stroke="var(--color-count)"
          strokeWidth={2.5}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
