"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { marketplaceProducts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { MarketplaceProduct } from "@/lib/types";

const categories: (MarketplaceProduct["category"] | "All")[] = [
  "All",
  "Mycoremediation",
  "Phytoremediation",
  "Soil Amendments",
  "Monitoring Equipment",
  "Laboratory Services",
];

const availabilityTone: Record<MarketplaceProduct["availability"], string> = {
  Available: "bg-forest-50 text-forest-700",
  "Limited Stock": "bg-amber-50 text-amber-600",
  "Made to Order": "bg-ink-100 text-ink-500",
};

export default function MarketplacePage() {
  const [category, setCategory] = useState<
    MarketplaceProduct["category"] | "All"
  >("All");

  const filtered = useMemo(
    () =>
      marketplaceProducts.filter(
        (p) => category === "All" || p.category === category
      ),
    [category]
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900">
          Marketplace
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Source biological agents, amendments, and monitoring equipment from
          verified suppliers.
        </p>
      </div>

      <div className="scrollbar-thin flex gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
              category === c
                ? "border-forest-300 bg-forest-50 text-forest-700"
                : "border-ink-200 text-ink-500 hover:bg-ink-50"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-xl border border-ink-100 bg-canvas-surface p-4 shadow-subtle"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] font-medium text-forest-600">
                {product.category}
              </span>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[11px] font-medium",
                  availabilityTone[product.availability]
                )}
              >
                {product.availability}
              </span>
            </div>
            <h3 className="mt-2 text-[14px] font-semibold text-ink-900">
              {product.name}
            </h3>
            <p className="mt-1 flex-1 text-xs leading-relaxed text-ink-400">
              {product.description}
            </p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="tabular text-base font-semibold text-ink-900">
                {product.price}
              </span>
              <span className="text-xs text-ink-400">/ {product.unit}</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-300">
              Supplied by {product.supplier}
            </p>
            <button className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-ink-200 py-2 text-xs font-medium text-ink-700 hover:bg-ink-50">
              View supplier
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
