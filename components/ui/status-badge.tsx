import { cn, statusTone } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const tone = statusTone(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        tone.bg,
        tone.text
      )}
    >
      {status}
    </span>
  );
}
