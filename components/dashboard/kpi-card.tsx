import { Activity, Leaf, FlaskConical, Coins, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiDatum } from "@/lib/types";

const icons = {
  activity: Activity,
  leaf: Leaf,
  flask: FlaskConical,
  coins: Coins,
};

export function KpiCard({ data }: { data: KpiDatum }) {
  const Icon = icons[data.icon];
  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface p-4 shadow-subtle">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-400">{data.label}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-forest-50 text-forest-600">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="tabular text-2xl font-semibold text-ink-900">
          {data.value}
        </span>
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            data.deltaTone === "positive" ? "text-forest-600" : "text-ink-400"
          )}
        >
          {data.deltaTone === "positive" && (
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          )}
          {data.delta}
        </span>
      </div>
    </div>
  );
}
