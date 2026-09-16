import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ink-200 bg-canvas-raised px-6 py-12 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100 text-ink-400">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-ink-800">{title}</p>
        <p className="text-sm text-ink-400">{description}</p>
      </div>
    </div>
  );
}
