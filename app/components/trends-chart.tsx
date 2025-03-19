"use client";

import { TrendItem } from "@/lib/types";
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatAmount } from "../lib/utils";

const COLORS = {
  highPerformers: ["#14532d", "#33a65f", "#4abe7b", "#7ddca0", "#aff0c8"],
  default: [
    "#14b8a6", // teal
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#2563eb", // deep blue
    "#9333ea", // bright purple
  ],
  lowPerformers: ["#991b1b", "#dc2626", "#ef4444"],
};

interface Props {
  data: TrendItem[];
  showTopMechanisms?: boolean;
}

const FundingTrendsChart: React.FC<Props> = ({
  data,
  showTopMechanisms = false,
}) => {
  const { transformedData, mechanismStats } = useMemo(() => {
    const mechanisms = [...new Set(data.map((item) => item.mechanism_slug))];
    const months = [...new Set(data.map((item) => item.month))].sort();

    const mechanismStats = mechanisms
      .map((mechanism) => {
        const mechanismData = data.filter(
          (item) => item.mechanism_slug === mechanism
        );

        const lastMonthValue =
          mechanismData.find((item) => item.month === months[months.length - 1])
            ?.value || 0;

        const currentMonthData = mechanismData.find(
          (item) => item.month === months[months.length - 1]
        );
        const previousMonthData = mechanismData.find(
          (item) => item.month === months[months.length - 2]
        );

        const momGrowthRate = previousMonthData
          ? (((currentMonthData?.value || 0) - previousMonthData.value) /
              previousMonthData.value) *
            100
          : 0;

        return {
          mechanism,
          mechanismName: mechanismData[0]?.mechanism_name || mechanism,
          lastMonthValue,
          momGrowthRate,
        };
      })
      .sort((a, b) => b.lastMonthValue - a.lastMonthValue);

    const transformedData = months.map((month) => {
      const monthData: { [key: string]: string | number } = { month };
      mechanisms.forEach((mechanism) => {
        const record = data.find(
          (item) => item.month === month && item.mechanism_slug === mechanism
        );
        monthData[mechanism] = record?.value ?? 0;
      });
      return monthData;
    });

    return { transformedData, mechanismStats };
  }, [data]);



  const displayedMechanisms = showTopMechanisms
    ? mechanismStats.slice(0, 5)
    : mechanismStats;

  return (
    <div className="space-y-6">
      <div className="w-full h-96">
        <ResponsiveContainer>
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatAmount(value)}
            />
            <Tooltip
              formatter={(value: number) => [formatAmount(value)]}
              labelFormatter={(label: string) => `Month: ${label}`}
            />
            <Legend />
            {displayedMechanisms.map((mechStat, index) => {
              const isTopPerformer = index < 3;
              const isLowPerformer = index >= displayedMechanisms.length - 3;
              const colorArray = showTopMechanisms
                ? COLORS.highPerformers
                : isTopPerformer
                ? COLORS.highPerformers
                : isLowPerformer
                ? COLORS.lowPerformers
                : COLORS.default;
              const colorIndex = index % colorArray.length;

              return (
                <Line
                  key={mechStat.mechanism}
                  type="monotone"
                  dataKey={mechStat.mechanism}
                  stroke={colorArray[colorIndex]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={`${mechStat.mechanismName} (${
                    mechStat.momGrowthRate > 0 ? "+" : ""
                  }${mechStat.momGrowthRate.toFixed(1)}% vs last month)`}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {!showTopMechanisms && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Top Mechanisms by Latest Month Volume
            </h3>
            {mechanismStats.slice(0, 3).map((mechStat) => (
              <div
                key={mechStat.mechanism}
                className="flex justify-between items-center py-2"
              >
                <span className="font-medium">{mechStat.mechanismName}</span>
                <span className="text-green-600">
                  ${formatAmount(mechStat.lastMonthValue)} (+
                  {mechStat.momGrowthRate.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Lower Volume Mechanisms in Latest Month
            </h3>
            {mechanismStats
              .slice(-3)
              .reverse()
              .map((mechStat) => (
                <div
                  key={mechStat.mechanism}
                  className="flex justify-between items-center py-2"
                >
                  <span className="font-medium">{mechStat.mechanismName}</span>
                  <span className="text-red-600">
                    ${formatAmount(mechStat.lastMonthValue)} (
                    {mechStat.momGrowthRate.toFixed(1)}%)
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingTrendsChart;
