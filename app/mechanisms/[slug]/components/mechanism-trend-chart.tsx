
"use client";

import { formatAmount } from "@/app/lib/utils";
import { TrendItem } from "@/lib/types";
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const calculateGrowthRate = (firstValue: number, lastValue: number) =>
  ((lastValue - firstValue) / firstValue) * 100;

interface Props {
  data: TrendItem[];
}

const MechanismTrendChart: React.FC<Props> = ({ data }) => {
  const { chartData, stats } = useMemo(() => {
    const mechanismData = data.sort(
      (a, b) => new Date(a.quarter).getTime() - new Date(b.quarter).getTime()
    );

    if (mechanismData.length < 2) return { chartData: [], stats: null };

    const firstValue = mechanismData[0].value;
    const lastValue = mechanismData[mechanismData.length - 1].value;
    const avgValue =
      mechanismData.reduce((sum, item) => sum + item.value, 0) /
      mechanismData.length;
    const maxValue = Math.max(...mechanismData.map((item) => item.value));
    const minValue = Math.min(...mechanismData.map((item) => item.value));
    const growthRate = calculateGrowthRate(firstValue, lastValue);

    const quarterlyGrowth = mechanismData.map((item, index) => {
      if (index === 0) return 0;
      return calculateGrowthRate(mechanismData[index - 1].value, item.value);
    });

    return {
      chartData: mechanismData.map((item, index) => ({
        quarter: item.quarter,
        value: item.value,
        quarterlyGrowth: quarterlyGrowth[index],
      })),
      stats: {
        totalFunding: lastValue,
        avgQuarterlyFunding: avgValue,
        maxFunding: maxValue,
        minFunding: minValue,
        overallGrowth: growthRate,
        avgQuarterlyGrowth:
          quarterlyGrowth.reduce((sum, rate) => sum + rate, 0) /
          (quarterlyGrowth.length - 1),
      },
    };
  }, [data]);

  if (!stats) return <div>No data available</div>;

  const trendColor = stats.overallGrowth >= 0 ? "#15803d" : "#991b1b";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Current Funding</h3>
          <p className="text-2xl font-semibold">
            ${formatAmount(stats.totalFunding)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Overall Growth</h3>
          <p
            className={`text-2xl font-semibold ${
              stats.overallGrowth >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {stats.overallGrowth > 0 ? "+" : ""}
            {stats.overallGrowth.toFixed(1)}%
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Avg Quarterly Growth
          </h3>
          <p
            className={`text-2xl font-semibold ${
              stats.avgQuarterlyGrowth >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {stats.avgQuarterlyGrowth > 0 ? "+" : ""}
            {stats.avgQuarterlyGrowth.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-96 bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId="funding"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <YAxis
              yAxisId="growth"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "value")
                  return [`$${formatAmount(value)}`, "Funding"];
                return [`${value.toFixed(1)}%`, "Quarterly Growth"];
              }}
            />
            <Line
              yAxisId="funding"
              type="monotone"
              dataKey="value"
              stroke={trendColor}
              strokeWidth={2}
              dot={{ r: 4 }}
              name="value"
            />
            <Line
              yAxisId="growth"
              type="monotone"
              dataKey="quarterlyGrowth"
              stroke="#6b7280"
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              name="quarterlyGrowth"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Highest Funding</h3>
          <p className="text-xl font-semibold">
            ${formatAmount(stats.maxFunding)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Funding</h3>
          <p className="text-xl font-semibold">
            ${formatAmount(stats.avgQuarterlyFunding)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Lowest Funding</h3>
          <p className="text-xl font-semibold">
            ${formatAmount(stats.minFunding)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MechanismTrendChart;