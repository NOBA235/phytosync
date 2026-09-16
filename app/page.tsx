"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SoilAnalysisForm } from "@/components/dashboard/soil-analysis-form";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { BlueprintResult } from "@/components/dashboard/blueprint-result";
import { RecentReports } from "@/components/dashboard/recent-reports";
import { kpiData } from "@/lib/mock-data";
import { generateBlueprint } from "@/lib/generate-blueprint";
import type { RemediationBlueprint } from "@/lib/types";

const defaultBlueprint: RemediationBlueprint = generateBlueprint({
  siteName: "Dimapur Industrial Estate",
  soilType: "Loamy",
  contaminants: ["Lead", "Diesel"],
});

export default function DashboardPage() {
  const [blueprint, setBlueprint] = useState<RemediationBlueprint>(
    defaultBlueprint
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-forest-600">
            Environmental Intelligence
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink-900">
            Remediation overview
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-ink-500">
            Monitor contaminated sites, generate biological remediation
            plans, and track environmental impact from one workspace.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-ink-200 bg-canvas-surface px-3 py-2 text-xs font-medium text-ink-600 hover:bg-ink-50">
          <Calendar className="h-3.5 w-3.5 text-ink-400" strokeWidth={1.75} />
          Last 30 days
          <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_1fr]">
        <SoilAnalysisForm onGenerate={setBlueprint} />
        <ActivityFeed />
      </div>

      <BlueprintResult blueprint={blueprint} />

      <RecentReports />
    </div>
  );
}
