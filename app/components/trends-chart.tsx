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
    const quarters = [...new Set(data.map((item) => item.quarter))].sort();

    const mechanismStats = mechanisms
      .map((mechanism) => {
        const mechanismData = data.filter(
          (item) => item.mechanism_slug === mechanism
        );

        const lastQuarterValue =
          mechanismData.find(
            (item) => item.quarter === quarters[quarters.length - 1]
          )?.value || 0;

        const currentQuarterData = mechanismData.find(
          (item) => item.quarter === quarters[quarters.length - 1]
        );
        const previousQuarterData = mechanismData.find(
          (item) => item.quarter === quarters[quarters.length - 2]
        );

        const qoqGrowthRate = previousQuarterData
          ? (((currentQuarterData?.value || 0) - previousQuarterData.value) /
              previousQuarterData.value) *
            100
          : 0;

        return {
          mechanism,
          mechanismName: mechanismData[0]?.mechanism_name || mechanism,
          lastQuarterValue,
          qoqGrowthRate,
        };
      })
      .sort((a, b) => b.lastQuarterValue - a.lastQuarterValue);

    const transformedData = quarters.map((quarter) => {
      const quarterData: { [key: string]: string | number } = { quarter };
      mechanisms.forEach((mechanism) => {
        const record = data.find(
          (item) =>
            item.quarter === quarter && item.mechanism_slug === mechanism
        );
        quarterData[mechanism] = record?.value ?? 0;
      });
      return quarterData;
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
            <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatAmount(value)}
            />
            <Tooltip
              formatter={(value: number) => [formatAmount(value)]}
              labelFormatter={(label: string) => `Quarter: ${label}`}
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
                    mechStat.qoqGrowthRate > 0 ? "+" : ""
                  }${mechStat.qoqGrowthRate.toFixed(1)}% vs last quarter)`}
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
              Top Mechanisms by Latest Quarter Volume
            </h3>
            {mechanismStats.slice(0, 3).map((mechStat) => (
              <div
                key={mechStat.mechanism}
                className="flex justify-between items-center py-2"
              >
                <span className="font-medium">{mechStat.mechanismName}</span>
                <span className="text-green-600">
                  ${formatAmount(mechStat.lastQuarterValue)} (+
                  {mechStat.qoqGrowthRate.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Lower Volume Mechanisms in Latest Quarter
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
                    ${formatAmount(mechStat.lastQuarterValue)} (
                    {mechStat.qoqGrowthRate.toFixed(1)}%)
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
