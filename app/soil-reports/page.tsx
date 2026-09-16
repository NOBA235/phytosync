"use client";

import { useMemo, useState } from "react";
import { Search, Plus, X, User, Layers } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { ToxicityBadge } from "@/components/ui/toxicity-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { allSoilReports } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { ReportStatus, SoilReport } from "@/lib/types";

const statusFilters: (ReportStatus | "All")[] = [
  "All",
  "Blueprint Ready",
  "Needs Review",
  "Monitoring",
  "Draft",
];

export default function SoilReportsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ReportStatus | "All">("All");
  const [selected, setSelected] = useState<SoilReport | null>(
    allSoilReports[0]
  );

  const filtered = useMemo(() => {
    return allSoilReports.filter((r) => {
      const matchesQuery =
        r.siteName.toLowerCase().includes(query.toLowerCase()) ||
        r.analysisId.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || r.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-900">
            Soil Reports
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Every analysis submitted across active and archived sites.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus className="h-4 w-4" strokeWidth={1.75} />
          New Analysis
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by site name or analysis ID"
            className="w-full rounded-lg border border-ink-200 bg-canvas-surface py-2 pl-9 pr-3 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-forest-200"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
                status === s
                  ? "border-forest-300 bg-forest-50 text-forest-700"
                  : "border-ink-200 text-ink-500 hover:bg-ink-50"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-ink-100 bg-canvas-surface shadow-subtle">
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs text-ink-400">
                  <th className="px-5 py-2.5 font-medium">Site</th>
                  <th className="px-3 py-2.5 font-medium">Soil Type</th>
                  <th className="px-3 py-2.5 font-medium">Contaminants</th>
                  <th className="px-3 py-2.5 font-medium">Toxicity</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 text-right font-medium">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((report) => (
                  <tr
                    key={report.id}
                    onClick={() => setSelected(report)}
                    className={cn(
                      "cursor-pointer border-b border-ink-50 last:border-0 hover:bg-canvas-raised",
                      selected?.id === report.id && "bg-forest-50/60"
                    )}
                  >
                    <td className="px-5 py-3 font-medium text-ink-800">
                      {report.siteName}
                      <p className="font-mono text-[11px] font-normal text-ink-300">
                        {report.analysisId}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-ink-500">
                      {report.soilType}
                    </td>
                    <td className="px-3 py-3 text-ink-500">
                      {report.contaminants.join(", ")}
                    </td>
                    <td className="px-3 py-3">
                      <ToxicityBadge level={report.toxicity} />
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-5 py-3 text-right text-ink-400">
                      {report.updatedLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-4">
              <EmptyState
                icon={Search}
                title="No matching reports"
                description="Try a different search term or clear your filters."
              />
            </div>
          )}
        </div>

        <div className="h-fit rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle lg:sticky lg:top-20">
          {selected ? (
            <div className="animate-fade-in">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="text-xs text-ink-400">Report preview</p>
                  <h3 className="mt-0.5 text-[15px] font-semibold text-ink-900">
                    {selected.siteName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-md p-1 text-ink-300 hover:bg-ink-50"
                  aria-label="Close preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 border-t border-ink-100 pt-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-400">Analysis ID</span>
                  <span className="font-mono text-xs text-ink-700">
                    {selected.analysisId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-400">Soil Type</span>
                  <span className="text-ink-700">{selected.soilType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-400">Contaminants</span>
                  <span className="text-right text-ink-700">
                    {selected.contaminants.join(", ")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-400">Toxicity</span>
                  <ToxicityBadge level={selected.toxicity} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink-400">Status</span>
                  <StatusBadge status={selected.status} />
                </div>
                {selected.consultant && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-400">Consultant</span>
                    <span className="flex items-center gap-1.5 text-ink-700">
                      <User className="h-3.5 w-3.5 text-ink-300" />
                      {selected.consultant}
                    </span>
                  </div>
                )}
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-forest-200 bg-forest-50 px-3.5 py-2 text-sm font-medium text-forest-700 hover:bg-forest-100">
                <Layers className="h-4 w-4" strokeWidth={1.75} />
                Open full blueprint
              </button>
            </div>
          ) : (
            <EmptyState
              icon={Layers}
              title="No report selected"
              description="Choose a report from the table to preview its details."
            />
          )}
        </div>
      </div>
    </div>
  );
}
