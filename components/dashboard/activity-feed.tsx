import { FileCheck2, UploadCloud, RefreshCw, CircleAlert } from "lucide-react";
import { activityFeed } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap = {
  blueprint: { icon: FileCheck2, tone: "bg-forest-50 text-forest-600" },
  upload: { icon: UploadCloud, tone: "bg-ink-100 text-ink-500" },
  update: { icon: RefreshCw, tone: "bg-ink-100 text-ink-500" },
  review: { icon: CircleAlert, tone: "bg-clay-50 text-clay-600" },
};

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
      <h2 className="mb-4 text-[15px] font-semibold text-ink-900">
        Remediation Activity
      </h2>
      <ul className="space-y-4">
        {activityFeed.map((item, i) => {
          const { icon: Icon, tone } = iconMap[item.icon];
          const isLast = i === activityFeed.length - 1;
          return (
            <li key={item.id} className="relative flex gap-3">
              {!isLast && (
                <span className="absolute left-[13px] top-7 h-[calc(100%-4px)] w-px bg-ink-100" />
              )}
              <div
                className={cn(
                  "z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full",
                  tone
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 pb-1">
                <p className="text-[13px] font-medium text-ink-800">
                  {item.title}
                </p>
                <p className="truncate text-xs text-ink-400">{item.site}</p>
                <p className="mt-0.5 text-[11px] text-ink-300">
                  {item.timeLabel}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
