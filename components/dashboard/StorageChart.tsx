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

  const chartData = [
    {
      usedSpace: percentage,
      fill: "#FFFFFF", // Ensure the bar is white
    },
  ];

  const chartConfig = {
    usedSpace: {
      label: "usedSpace",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[180px] max-w-[250px] bg-transparent aspect-[4/3]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={(percentage / 100) * 360}
        innerRadius={80}
        outerRadius={120}
        barSize={10}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke={"none"}
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="usedSpace" cornerRadius={10} />
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
                      className="text-xl text-white font-bold fill-white"
                    >
                      {chartData[0].usedSpace.toFixed(0)}%
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
