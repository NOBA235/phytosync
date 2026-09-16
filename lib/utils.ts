import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatINR(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

export function toxicityTone(level: "Low" | "Moderate" | "Critical") {
  switch (level) {
    case "Low":
      return {
        bg: "bg-forest-50",
        text: "text-forest-700",
        border: "border-forest-200",
        dot: "bg-forest-500",
      };
    case "Moderate":
      return {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-400/30",
        dot: "bg-amber-400",
      };
    case "Critical":
      return {
        bg: "bg-clay-50",
        text: "text-clay-600",
        border: "border-clay-400/30",
        dot: "bg-clay-400",
      };
  }
}

export function statusTone(status: string) {
  switch (status) {
    case "Blueprint Ready":
    case "Active":
    case "Completed":
      return { bg: "bg-forest-50", text: "text-forest-700" };
    case "Needs Review":
      return { bg: "bg-clay-50", text: "text-clay-600" };
    case "Monitoring":
    case "On Hold":
      return { bg: "bg-amber-50", text: "text-amber-600" };
    default:
      return { bg: "bg-ink-100", text: "text-ink-600" };
  }
}
