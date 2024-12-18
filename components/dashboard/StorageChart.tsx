"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export function StorageChart({
  usage,
  total,
}: {
  usage: number;
  total: number;
}) {
  let percentage = Number(((usage / total) * 100).toFixed(2));
  if (percentage < 1) percentage = 1;
  const chartData = [{ usedSpace: `${percentage}%`, fill: "#FFFFFF" }];
  console.log("usage: ", usage);
  console.log("total: ", total);
  const chartConfig = {
    usedSpace: {
      label: "usedSpace",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] bg-transparent aspect-[4/3]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={(percentage / 100) * 360}
        innerRadius={80}
        outerRadius={120}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="usedSpace" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className=" text-xl text-white font-bold fill-white"
                    >
                      {chartData[0].usedSpace.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="text-white fill-white"
                    >
                      Used Space
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
