"use client";

import { TrendItem } from "@/lib/types";
import React, { useMemo, useState } from "react";
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
import InfoTooltip from "./info-tooltip";
import { Button } from "./button";

const COLORS = {
  highPerformers: ["#15803D", "#7C3AED", "#B45309", "#1D6AA3", "#06b6d4"],
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
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");

  const { transformedData, mechanismStats, quarters } = useMemo(() => {
    const mechanisms = [...new Set(data.map((item) => item.mechanism_slug))];
    const quarters = [...new Set(data.map((item) => item.quarter))].sort();

    const currentQuarter = quarters[quarters.length - 1];
    const lastCompleteQuarter = quarters[quarters.length - 2];
    const secondLastCompleteQuarter = quarters[quarters.length - 3];

    const mechanismStats = mechanisms
      .map((mechanism) => {
        const mechanismData = data.filter(
          (item) => item.mechanism_slug === mechanism
        );

        const lastQuarterValue =
          mechanismData.find((item) => item.quarter === currentQuarter)
            ?.value || 0;

        // For growth calculation, use the last complete quarter
        const lastCompleteQuarterData = mechanismData.find(
          (item) => item.quarter === lastCompleteQuarter
        );

        const secondLastCompleteQuarterData = mechanismData.find(
          (item) => item.quarter === secondLastCompleteQuarter
        );

        const qoqGrowthRate =
          lastCompleteQuarterData && secondLastCompleteQuarterData
            ? (((lastCompleteQuarterData.value || 0) -
                secondLastCompleteQuarterData.value) /
                secondLastCompleteQuarterData.value) *
              100
            : 0;

        return {
          mechanism,
          mechanismName: mechanismData[0]?.mechanism_name || mechanism,
          lastQuarterValue,
          lastCompleteQuarterValue: lastCompleteQuarterData?.value || 0,
          qoqGrowthRate,
          isCurrentQuarter: true,
        };
      })
      .sort((a, b) => b.lastCompleteQuarterValue - a.lastCompleteQuarterValue);

    const transformedData = quarters.map((quarter) => {
      const isCurrentQuarter = quarter === currentQuarter;
      const quarterData: { [key: string]: string | number | boolean } = {
        quarter,
        isCurrentQuarter,
      };

      mechanisms.forEach((mechanism) => {
        const record = data.find(
          (item) =>
            item.quarter === quarter && item.mechanism_slug === mechanism
        );
        quarterData[mechanism] = record?.value ?? 0;
      });

      return quarterData;
    });

    return { transformedData, mechanismStats, quarters };
  }, [data]);

  const displayedMechanisms = showTopMechanisms
    ? mechanismStats.slice(0, 5)
    : mechanismStats;

  return (
    <div className="space-y-12">
      <div className="flex flex-col space-y-4">
        <div className="flex lg:items-center justify-between lg:flex-row flex-col gap-2">
          <div className="text-sm text-amber-600">
            <span className="inline-block w-3 h-3 bg-amber-600 rounded-full mr-1"></span>
            Latest data point represents current in-progress quarter
          </div>

          {!showTopMechanisms && (
            <div className="flex space-x-2 self-end">
              <Button
                type={viewMode === "chart" ? "primary" : "secondary"}
                onClick={() => setViewMode("chart")}
                className="text-sm"
              >
                Chart View
              </Button>
              <Button
                type={viewMode === "table" ? "primary" : "secondary"}
                onClick={() => setViewMode("table")}
                className="text-sm"
              >
                Table View
              </Button>
            </div>
          )}
        </div>

        {viewMode === "chart" && (
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: number, name: string, props: any) => {
                    const isCurrentQuarter = props.payload.isCurrentQuarter;
                    const label =
                      isCurrentQuarter &&
                      name !== "quarter" &&
                      name !== "isCurrentQuarter"
                        ? `${formatAmount(value)} (In Progress)`
                        : formatAmount(value);
                    return [label];
                  }}
                  labelFormatter={(label: string) => `Quarter: ${label}`}
                />

                <Legend />
                {displayedMechanisms.map((mechStat, index) => {
                  const isTopPerformer = index < 3;
                  const isLowPerformer =
                    index >= displayedMechanisms.length - 3;
                  const colorArray = showTopMechanisms
                    ? COLORS.highPerformers
                    : isTopPerformer
                    ? COLORS.highPerformers
                    : isLowPerformer
                    ? COLORS.lowPerformers
                    : COLORS.default;
                  const colorIndex = index % colorArray.length;
                  const stroke =
                    mechStat.mechanismName.toLowerCase() === "other"
                      ? "#9E9E9E"
                      : colorArray[colorIndex];
                  return (
                    <Line
                      key={mechStat.mechanism}
                      type="monotone"
                      dataKey={mechStat.mechanism}
                      stroke={stroke}
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
                              stroke={stroke}
                              strokeWidth="2"
                            />
                          </svg>
                        ) : (
                          <circle cx={cx} cy={cy} r={4} fill={stroke} />
                        );
                      }}
                      name={`${mechStat.mechanismName} (${
                        mechStat.qoqGrowthRate > 0 ? "+" : ""
                      }${mechStat.qoqGrowthRate.toFixed(
                        1
                      )}% vs previous quarter)`}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {viewMode === "table" && !showTopMechanisms && (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mechanism
                  </th>
                  {[...quarters].reverse().map((quarter) => (
                    <th
                      key={quarter}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {quarter}{" "}
                      {quarter === quarters[quarters.length - 1]
                        ? "(In Progress)"
                        : ""}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quarter-over-Quarter Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mechanismStats.map((mechStat, index) => {
                  const isTopPerformer = index < 3;
                  const isLowPerformer = index >= mechanismStats.length - 3;
                  let rowClass = "";
                  if (isTopPerformer) rowClass = "bg-green-50";
                  else if (isLowPerformer) rowClass = "bg-red-50";

                  return (
                    <tr key={mechStat.mechanism} className={rowClass}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {mechStat.mechanismName}
                      </td>
                      {[...quarters].reverse().map((quarter) => {
                        const value =
                          transformedData.find((d) => d.quarter === quarter)?.[
                            mechStat.mechanism
                          ] || 0;
                        const isCurrentQuarter =
                          quarter === quarters[quarters.length - 1];

                        return (
                          <td
                            key={`${mechStat.mechanism}-${quarter}`}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            ${formatAmount(value as number)}
                            {isCurrentQuarter && (
                              <span className="ml-1 text-amber-600">
                                (In Progress)
                              </span>
                            )}
                          </td>
                        );
                      })}
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          mechStat.qoqGrowthRate > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {mechStat.qoqGrowthRate > 0 ? "+" : ""}
                        {mechStat.qoqGrowthRate.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!showTopMechanisms && (
        <div className="gap-4 flex flex-col md:flex-row child:w-full justify-center">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Top Mechanisms by Latest Complete Quarter Volume
            </h3>
            {mechanismStats.slice(0, 3).map((mechStat) => (
              <div
                key={mechStat.mechanism}
                className="flex justify-between items-center py-2"
              >
                <span className="font-medium">{mechStat.mechanismName}</span>
                <div className="text-right">
                  <div className="text-green-600">
                    ${formatAmount(mechStat.lastCompleteQuarterValue)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <InfoTooltip tooltip="(Complete Quarters)">
                      Growth: {mechStat.qoqGrowthRate > 0 ? "+" : ""}
                      {mechStat.qoqGrowthRate.toFixed(1)}%
                    </InfoTooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {mechanismStats.length >= 6 ? (
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                Lower Volume Mechanisms in Latest Complete Quarter
              </h3>
              {mechanismStats
                .slice(-3)
                .reverse()
                .map((mechStat) => (
                  <div
                    key={mechStat.mechanism}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="font-medium">
                      {mechStat.mechanismName}
                    </span>
                    <div className="text-right">
                      <div className="text-red-600">
                        ${formatAmount(mechStat.lastCompleteQuarterValue)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <InfoTooltip tooltip="(Complete Quarters)">
                          Growth: {mechStat.qoqGrowthRate > 0 ? "+" : ""}
                          {mechStat.qoqGrowthRate.toFixed(1)}%
                        </InfoTooltip>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {!showTopMechanisms ? (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-600">
          <h4 className="font-medium mb-2">About this data</h4>
          <p>
            This data is sourced from Open Source Observer (OSO) via BigQuery.
            It represents quarterly aggregated funding flows through various
            open source funding mechanisms.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> The current quarter&apos;s data is still in
            progress and will continue to update until the quarter ends.
            Historical quarters show complete funding data.
          </p>
          <p className="mt-2">
            Found an issue with the data? Report it in our{" "}
            <a
              href="https://t.me/+fcYxMfa-JmxhOWYx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Telegram group
            </a>
            .
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FundingTrendsChart;
