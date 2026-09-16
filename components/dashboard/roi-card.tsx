import { formatINR } from "@/lib/utils";
import type { CostEstimate } from "@/lib/types";

export function RoiCard({ estimate }: { estimate: CostEstimate }) {
  const savings = estimate.conventionalCost - estimate.biologicalCost;
  const conventionalWidth = 100;
  const biologicalWidth = Math.round(
    (estimate.biologicalCost / estimate.conventionalCost) * 100
  );

  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
      <h3 className="mb-4 text-[15px] font-semibold text-ink-900">
        Biological remediation economics
      </h3>

      <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="space-y-4">
          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-xs text-ink-400">
                Conventional excavation
              </span>
              <span className="tabular text-base font-semibold text-ink-700">
                {formatINR(estimate.conventionalCost)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-ink-300"
                style={{ width: `${conventionalWidth}%` }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-xs text-ink-400">
                PhytoSync biological remediation
              </span>
              <span className="tabular text-base font-semibold text-forest-700">
                {formatINR(estimate.biologicalCost)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-forest-600"
                style={{ width: `${biologicalWidth}%` }}
              />
            </div>
          </div>
        </div>

        <div className="hidden h-16 w-px bg-ink-100 sm:block" />

        <div className="flex flex-col items-start gap-0.5 sm:items-center">
          <span className="text-xs text-ink-400">Estimated savings</span>
          <span className="tabular text-3xl font-semibold text-forest-700">
            {estimate.savingsPercent}%
          </span>
          <span className="tabular text-xs text-ink-500">
            {formatINR(savings)} saved vs. conventional excavation
          </span>
        </div>
      </div>

      <p className="mt-5 border-t border-ink-100 pt-3 text-[11px] leading-relaxed text-ink-300">
        Estimated figures based on modeled site characteristics and benchmark
        remediation costs. Final costs require field validation.
      </p>
    </div>
  );
}
