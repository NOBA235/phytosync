import { FlaskConical, Sprout, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RemediationPhase } from "@/lib/types";

const compatTone: Record<string, string> = {
  High: "text-forest-600 bg-forest-50",
  Moderate: "text-amber-600 bg-amber-50",
  Low: "text-clay-600 bg-clay-50",
};

export function BlueprintPhase({ phase }: { phase: RemediationPhase }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
      <div className="mb-1 flex items-baseline gap-2">
        <span className="font-mono text-xs text-ink-300">
          {String(phase.order).padStart(2, "0")}
        </span>
        <h3 className="text-[15px] font-semibold text-ink-900">
          {phase.name}
        </h3>
        <span className="ml-auto text-xs font-medium text-ink-400">
          {phase.durationLabel}
        </span>
      </div>
      <p className="mb-4 text-[13px] text-ink-400">{phase.subtitle}</p>

      {phase.agents && (
        <div className="space-y-2.5">
          {phase.agents.map((agent) => (
            <div
              key={agent.id}
              className="flex flex-col gap-2 rounded-lg border border-ink-100 bg-canvas-raised p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-forest-50 text-forest-600">
                  <FlaskConical className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[13px] font-medium italic text-ink-800">
                    {agent.species}
                  </p>
                  <p className="text-xs text-ink-400">{agent.commonName}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pl-9 text-xs sm:pl-0">
                <div>
                  <p className="text-ink-300">Target</p>
                  <p className="text-ink-600">{agent.target}</p>
                </div>
                <div>
                  <p className="text-ink-300">Role</p>
                  <p className="text-ink-600">{agent.role}</p>
                </div>
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[11px] font-medium",
                    compatTone[agent.compatibility]
                  )}
                >
                  {agent.compatibility} compatibility
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {phase.plants && (
        <div className="space-y-2.5">
          {phase.plants.map((plant) => (
            <div
              key={plant.id}
              className="rounded-lg border border-ink-100 bg-canvas-raised p-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-forest-50 text-forest-600">
                    <Sprout className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium italic text-ink-800">
                      {plant.species}
                    </p>
                    <p className="text-xs text-ink-400">{plant.commonName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pl-9 text-xs sm:pl-0">
                  <div>
                    <p className="text-ink-300">Target</p>
                    <p className="text-ink-600">{plant.target}</p>
                  </div>
                  <div>
                    <p className="text-ink-300">Harvest Cycle</p>
                    <p className="text-ink-600">{plant.harvestCycle}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[11px] font-medium",
                      compatTone[plant.uptake]
                    )}
                  >
                    {plant.uptake} uptake
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 pl-9 text-[11px] text-ink-400 sm:pl-9">
                {["Plant", "Grow", "Accumulate", "Harvest"].map((stage, i) => (
                  <div key={stage} className="flex items-center gap-1.5">
                    <span className="rounded-full bg-ink-100 px-2 py-0.5 text-ink-500">
                      {stage}
                    </span>
                    {i < 3 && <ArrowRight className="h-3 w-3 text-ink-200" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
