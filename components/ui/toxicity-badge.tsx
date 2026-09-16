import { cn, toxicityTone } from "@/lib/utils";
import type { ToxicityLevel } from "@/lib/types";

export function ToxicityBadge({ level }: { level: ToxicityLevel }) {
  const tone = toxicityTone(level);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold tracking-wide",
        tone.bg,
        tone.text,
        tone.border
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
      {level.toUpperCase()}
    </span>
  );
}
