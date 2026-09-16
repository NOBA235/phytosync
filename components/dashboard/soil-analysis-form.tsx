"use client";

import { useMemo, useState } from "react";
import { Sprout, Check, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SoilType } from "@/lib/types";
import { commonContaminants } from "@/lib/mock-data";
import { generateBlueprint } from "@/lib/generate-blueprint";
import type { RemediationBlueprint } from "@/lib/types";

const soilTypes: SoilType[] = [
  "Sandy",
  "Clay",
  "Loamy",
  "Silty",
  "Peaty",
  "Mixed / Fill",
];

const analysisSteps = [
  "Contaminant classification",
  "Biological compatibility",
  "Generating remediation phases",
];

type Stage = "idle" | "analyzing" | "done";

export function SoilAnalysisForm({
  onGenerate,
}: {
  onGenerate: (blueprint: RemediationBlueprint) => void;
}) {
  const [siteName, setSiteName] = useState("");
  const [soilType, setSoilType] = useState<SoilType>("Loamy");
  const [contaminantInput, setContaminantInput] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [touched, setTouched] = useState(false);

  const contaminantList = useMemo(
    () =>
      contaminantInput
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    [contaminantInput]
  );

  const isValid = siteName.trim().length > 0 && contaminantList.length > 0;

  function toggleChip(chip: string) {
    const existing = contaminantList;
    if (existing.includes(chip)) {
      setContaminantInput(existing.filter((c) => c !== chip).join(", "));
    } else {
      setContaminantInput([...existing, chip].join(", "));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid || stage === "analyzing") return;

    setStage("analyzing");
    setStepIndex(0);

    const timers = [500, 950, 1400];
    timers.forEach((ms, i) => {
      setTimeout(() => setStepIndex(i + 1), ms);
    });

    setTimeout(() => {
      const blueprint = generateBlueprint({
        siteName: siteName.trim(),
        soilType,
        contaminants: contaminantList,
      });
      onGenerate(blueprint);
      setStage("done");
    }, 1700);
  }

  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
      <div className="mb-4">
        <h2 className="text-[15px] font-semibold text-ink-900">
          New soil analysis
        </h2>
        <p className="mt-1 text-[13px] text-ink-400">
          Generate a biological remediation blueprint from site contamination
          data.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="siteName"
            className="mb-1.5 block text-xs font-medium text-ink-600"
          >
            Site Name
          </label>
          <input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="e.g. Dimapur Industrial Estate"
            className={cn(
              "w-full rounded-lg border bg-canvas-surface px-3 py-2 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-forest-200",
              touched && !siteName.trim() ? "border-clay-400/50" : "border-ink-200"
            )}
          />
        </div>

        <div>
          <label
            htmlFor="soilType"
            className="mb-1.5 block text-xs font-medium text-ink-600"
          >
            Soil Type
          </label>
          <select
            id="soilType"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value as SoilType)}
            className="w-full rounded-lg border border-ink-200 bg-canvas-surface px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-forest-200"
          >
            {soilTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="contaminants"
            className="mb-1.5 block text-xs font-medium text-ink-600"
          >
            Detected Contaminants
          </label>
          <input
            id="contaminants"
            value={contaminantInput}
            onChange={(e) => setContaminantInput(e.target.value)}
            placeholder="Lead, Arsenic, Diesel"
            className={cn(
              "w-full rounded-lg border bg-canvas-surface px-3 py-2 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-forest-200",
              touched && contaminantList.length === 0
                ? "border-clay-400/50"
                : "border-ink-200"
            )}
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {commonContaminants.map((chip) => {
              const active = contaminantList.includes(chip);
              return (
                <button
                  type="button"
                  key={chip}
                  onClick={() => toggleChip(chip)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs transition-colors",
                    active
                      ? "border-forest-300 bg-forest-50 text-forest-700"
                      : "border-ink-200 text-ink-500 hover:bg-ink-50"
                  )}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {stage === "analyzing" && (
          <div className="rounded-lg border border-ink-100 bg-canvas px-3.5 py-3">
            <p className="mb-2 text-xs font-medium text-ink-500">
              Analyzing soil profile
            </p>
            <ul className="space-y-1.5">
              {analysisSteps.map((step, i) => {
                const complete = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <li
                    key={step}
                    className="flex items-center gap-2 text-xs"
                  >
                    {complete ? (
                      <Check className="h-3.5 w-3.5 text-forest-600" strokeWidth={2.5} />
                    ) : active ? (
                      <ArrowRight className="h-3.5 w-3.5 text-forest-500" strokeWidth={2.5} />
                    ) : (
                      <span className="h-3.5 w-3.5 rounded-full border border-ink-200" />
                    )}
                    <span
                      className={
                        complete || active ? "text-ink-700" : "text-ink-300"
                      }
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={stage === "analyzing"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {stage === "analyzing" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin-slow" />
              Generating biological blueprint...
            </>
          ) : (
            <>
              <Sprout className="h-4 w-4" strokeWidth={1.75} />
              Generate Bio-Blueprint
            </>
          )}
        </button>
      </form>
    </div>
  );
}
