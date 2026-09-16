"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { ContaminantReductionPoint } from "@/lib/types";

export function ContaminantChart({
  data,
}: {
  data: ContaminantReductionPoint[];
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink-900">
          Projected contaminant reduction
        </h3>
      </div>
      <p className="mb-4 text-xs text-ink-400">
        Relative concentration over time, indexed to baseline (100)
      </p>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid
              stroke="#E7E9E5"
              strokeDasharray="0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickFormatter={(m) => `Month ${m}`}
              tick={{ fontSize: 11, fill: "#818A7C" }}
              axisLine={{ stroke: "#E7E9E5" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#818A7C" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                borderColor: "#E7E9E5",
                fontSize: 12,
                boxShadow: "0 1px 3px 0 rgba(19, 36, 25, 0.08)",
              }}
              labelFormatter={(m) => `Month ${m}`}
            />
            <Line
              type="monotone"
              dataKey="hydrocarbons"
              name="Hydrocarbons"
              stroke="#2D5432"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lead"
              name="Lead"
              stroke="#8FB090"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="arsenic"
              name="Arsenic"
              stroke="#C9963C"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-forest-700" /> Hydrocarbons
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-forest-300" /> Lead
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-amber-400" /> Arsenic
        </span>
      </div>
    </div>
  );
}
