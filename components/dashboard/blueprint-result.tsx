import { ShieldCheck } from "lucide-react";
import { ToxicityBadge } from "@/components/ui/toxicity-badge";
import { BlueprintPhase } from "./blueprint-phase";
import { RemediationTimeline } from "./remediation-timeline";
import { RoiCard } from "./roi-card";
import { ContaminantChart } from "./contaminant-chart";
import type { RemediationBlueprint } from "@/lib/types";

export function BlueprintResult({
  blueprint,
}: {
  blueprint: RemediationBlueprint;
}) {
  return (
    <div className="animate-fade-in space-y-5">
      <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
        <div className="flex items-center gap-2 text-xs font-medium text-forest-600">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
          Site Analysis Complete
        </div>

        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">
              {blueprint.siteName}
            </h2>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-ink-400">
              <span>{blueprint.soilType} Soil</span>
              <span className="text-ink-200">•</span>
              <span>{blueprint.contaminants.length} contaminants detected</span>
              <span className="text-ink-200">•</span>
              <span className="font-mono">
                Analysis ID {blueprint.id.replace("bp-", "PS-").slice(0, 12)}
              </span>
            </p>
          </div>
          <ToxicityBadge level={blueprint.toxicity} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-ink-100 pt-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-ink-400">Contaminants</p>
            <p className="tabular mt-1 text-lg font-semibold text-ink-900">
              {blueprint.contaminants.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-ink-400">Recommended Phases</p>
            <p className="tabular mt-1 text-lg font-semibold text-ink-900">
              {blueprint.phases.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-ink-400">Estimated Duration</p>
            <p className="tabular mt-1 text-lg font-semibold text-ink-900">
              {blueprint.estimatedDuration}
            </p>
          </div>
          <div>
            <p className="text-xs text-ink-400">Estimated Savings</p>
            <p className="tabular mt-1 text-lg font-semibold text-forest-700">
              {blueprint.costEstimate.savingsPercent}%
            </p>
          </div>
        </div>
      </div>

      {blueprint.phases.map((phase) => (
        <BlueprintPhase key={phase.id} phase={phase} />
      ))}

      <div className="grid gap-5 lg:grid-cols-2">
        <RemediationTimeline milestones={blueprint.timeline} />
        <ContaminantChart data={blueprint.projectedReduction} />
      </div>

      <RoiCard estimate={blueprint.costEstimate} />
    </div>
  );
}
