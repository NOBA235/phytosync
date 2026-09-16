"use client";

import { useMemo, useState } from "react";
import { User, Calendar, Layers } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { BlueprintPhase } from "@/components/dashboard/blueprint-phase";
import { RemediationTimeline } from "@/components/dashboard/remediation-timeline";
import { RoiCard } from "@/components/dashboard/roi-card";
import { remediationPlans, allSoilReports } from "@/lib/mock-data";
import { generateBlueprint } from "@/lib/generate-blueprint";
import { cn } from "@/lib/utils";
import type { RemediationPlan } from "@/lib/types";

const filters: (RemediationPlan["status"] | "All")[] = [
  "All",
  "Active",
  "Completed",
  "On Hold",
];

export default function RemediationPlansPage() {
  const [filter, setFilter] = useState<RemediationPlan["status"] | "All">(
    "All"
  );
  const [selected, setSelected] = useState<RemediationPlan | null>(
    remediationPlans[0]
  );

  const filtered = useMemo(
    () =>
      remediationPlans.filter((p) => filter === "All" || p.status === filter),
    [filter]
  );

  const detailBlueprint = useMemo(() => {
    if (!selected) return null;
    const matchedReport = allSoilReports.find(
      (r) => r.siteName === selected.siteName
    );
    return generateBlueprint({
      siteName: selected.siteName,
      soilType: matchedReport?.soilType ?? "Loamy",
      contaminants: matchedReport?.contaminants ?? ["Lead", "Diesel"],
    });
  }, [selected]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900">
          Remediation Plans
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Track biological remediation phases across every active and
          completed site.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
              filter === f
                ? "border-forest-300 bg-forest-50 text-forest-700"
                : "border-ink-200 text-ink-500 hover:bg-ink-50"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan)}
            className={cn(
              "rounded-xl border bg-canvas-surface p-4 text-left shadow-subtle transition-colors",
              selected?.id === plan.id
                ? "border-forest-300 ring-1 ring-forest-200"
                : "border-ink-100 hover:border-ink-200"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-medium leading-snug text-ink-800">
                {plan.siteName}
              </p>
              <StatusBadge status={plan.status} />
            </div>
            <p className="mt-2 text-xs text-ink-400">{plan.currentPhase}</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-forest-600"
                style={{ width: `${plan.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-ink-400">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {plan.consultant}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {plan.estimatedCompletion}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selected && detailBlueprint && (
        <div className="animate-fade-in space-y-5 border-t border-ink-100 pt-5">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-forest-600" strokeWidth={1.75} />
            <h2 className="text-[15px] font-semibold text-ink-900">
              {selected.siteName} — plan detail
            </h2>
          </div>

          {detailBlueprint.phases.map((phase) => (
            <BlueprintPhase key={phase.id} phase={phase} />
          ))}

          <div className="grid gap-5 lg:grid-cols-2">
            <RemediationTimeline milestones={detailBlueprint.timeline} />
            <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
              <h3 className="mb-4 text-[15px] font-semibold text-ink-900">
                Monitoring metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-ink-400">Progress</p>
                  <p className="tabular mt-1 text-lg font-semibold text-ink-900">
                    {selected.progress}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-400">Current Phase</p>
                  <p className="mt-1 text-sm font-medium text-ink-800">
                    {selected.currentPhase}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-400">Consultant</p>
                  <p className="mt-1 text-sm font-medium text-ink-800">
                    {selected.consultant}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-ink-400">Est. Completion</p>
                  <p className="mt-1 text-sm font-medium text-ink-800">
                    {selected.estimatedCompletion}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <RoiCard estimate={detailBlueprint.costEstimate} />
        </div>
      )}
    </div>
  );
}
