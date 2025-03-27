"use client";

import InfoTooltip from "@/app/components/info-tooltip";
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
    const lastCompleteValue =
      mechanismData[mechanismData.length - 2]?.value || firstValue;
    const lastValue = mechanismData[mechanismData.length - 1].value;

    const avgValue =
      mechanismData.reduce((sum, item) => sum + item.value, 0) /
      mechanismData.length;

    const maxValue = Math.max(...mechanismData.map((item) => item.value));
    const minValue = Math.min(...mechanismData.map((item) => item.value));

    // Calculate growth based on last complete quarter 
    const overallGrowth = calculateGrowthRate(firstValue, lastCompleteValue);

    const quarterlyGrowth = mechanismData.map((item, index) => {
      if (index === 0) return 0;
      return calculateGrowthRate(mechanismData[index - 1].value, item.value);
    });

    return {
      chartData: mechanismData.map((item, index) => ({
        quarter: item.quarter,
        value: item.value,
        quarterlyGrowth: quarterlyGrowth[index],
        isCurrentQuarter: index === mechanismData.length - 1,
      })),
      stats: {
        totalFunding: lastValue,
        lastCompleteQuarterFunding: lastCompleteValue,
        avgQuarterlyFunding: avgValue,
        maxFunding: maxValue,
        minFunding: minValue,
        overallGrowth: overallGrowth,
        avgQuarterlyGrowth:
          quarterlyGrowth.slice(0, -1).reduce((sum, rate) => sum + rate, 0) /
          (quarterlyGrowth.length - 2 || 1),
      },
    };
  }, [data]);

  if (!stats) return <div>No data available</div>;

  const trendColor = stats.overallGrowth >= 0 ? "#15803d" : "#991b1b";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Current Funding</h3>
          <p className="text-2xl font-semibold">
            ${formatAmount(stats.totalFunding)}
            <span className="text-xs text-amber-600 ml-2">(In Progress)</span>
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">
            <InfoTooltip tooltip="Overall growth for the complete quarters">
              <span className="text-sm text-gray-400 ml-1">Overall Growth</span>
            </InfoTooltip>
          </h3>
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
            <InfoTooltip tooltip="Avg quarterly growth for the complete quarters">
              <span className="text-sm text-gray-400 ml-1">
                Avg Quarterly Growth
              </span>
            </InfoTooltip>
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
        <div className="text-sm text-amber-600 mb-2">
          <span className="inline-block w-3 h-3 bg-amber-600 rounded-full mr-1"></span>
          Last data point represents current in-progress quarter
        </div>
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: number, name: string, props: any) => {
                if (name === "value") {
                  const label = props.payload.isCurrentQuarter
                    ? "Current Funding (In Progress)"
                    : "Funding";
                  return [`$${formatAmount(value)}`, label];
                }
                return [`${value.toFixed(1)}%`, "Quarterly Growth"];
              }}
            />
            <Line
              yAxisId="funding"
              type="monotone"
              dataKey="value"
              stroke={trendColor}
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return payload.isCurrentQuarter ? (
                  <svg x={cx - 10} y={cy - 10} width={20} height={20}>
                    <circle
                      cx="10"
                      cy="10"
                      r="6"
                      fill="#FCD34D"
                      stroke={trendColor}
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <circle cx={cx} cy={cy} r={4} fill={trendColor} />
                );
              }}
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
