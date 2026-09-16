"use client";

import { usePathname } from "next/navigation";
import { Bell, HelpCircle, Menu, ChevronDown } from "lucide-react";

const pageMeta: Record<string, { title: string; crumb: string }> = {
  "/": { title: "Dashboard", crumb: "Workspace / Overview" },
  "/soil-reports": { title: "Soil Reports", crumb: "Workspace / Soil Reports" },
  "/remediation-plans": {
    title: "Remediation Plans",
    crumb: "Workspace / Remediation Plans",
  },
  "/marketplace": { title: "Marketplace", crumb: "Workspace / Marketplace" },
  "/settings": { title: "Settings", crumb: "Workspace / Settings" },
};

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Dashboard", crumb: "Workspace" };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-ink-100 bg-canvas-surface/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-canvas-surface/80">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-ink-500 hover:bg-ink-50 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
        <div>
          <h1 className="text-[15px] font-semibold leading-tight text-ink-900">
            {meta.title}
          </h1>
          <p className="text-xs leading-tight text-ink-400">{meta.crumb}</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="hidden items-center gap-1.5 rounded-lg border border-ink-100 px-2.5 py-1.5 text-xs text-ink-500 hover:bg-ink-50 sm:flex"
          aria-label="Switch workspace"
        >
          Northstar Environmental
          <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
        </button>
        <button
          className="rounded-md p-2 text-ink-400 hover:bg-ink-50 hover:text-ink-600"
          aria-label="Help"
        >
          <HelpCircle className="h-4.5 w-4.5" strokeWidth={1.75} />
        </button>
        <button
          className="relative rounded-md p-2 text-ink-400 hover:bg-ink-50 hover:text-ink-600"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-forest-500" />
        </button>
        <div className="ml-1.5 flex items-center gap-2 border-l border-ink-100 pl-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-[11px] font-semibold text-forest-700">
            RK
          </div>
          <span className="hidden text-[13px] font-medium text-ink-700 md:inline">
            Reni Kikon
          </span>
        </div>
      </div>
    </header>
  );
}
