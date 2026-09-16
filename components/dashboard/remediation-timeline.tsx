import type { TimelineMilestone } from "@/lib/types";

export function RemediationTimeline({
  milestones,
}: {
  milestones: TimelineMilestone[];
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
      <h3 className="mb-5 text-[15px] font-semibold text-ink-900">
        Remediation timeline
      </h3>
      <ol className="relative space-y-0">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1;
          return (
            <li key={m.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span className="absolute left-[7px] top-4 h-[calc(100%-8px)] w-px bg-ink-100" />
              )}
              <div className="z-10 mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-forest-500 bg-canvas-surface" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <p className="text-[13px] font-medium text-ink-800">
                    {m.label}
                  </p>
                  <span className="text-xs font-medium text-forest-600">
                    {m.window}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-400">
                  {m.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
