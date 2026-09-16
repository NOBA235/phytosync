import { cn } from "@/lib/utils";

export function Metric({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs text-ink-400">{label}</span>
      <span className="tabular text-lg font-semibold text-ink-900">{value}</span>
    </div>
  );
}
