"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FlaskConical,
  Layers,
  Store,
  Settings,
  Building2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo-mark";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/soil-reports", label: "Soil Reports", icon: FlaskConical },
  { href: "/remediation-plans", label: "Remediation Plans", icon: Layers },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink-900/30 lg:hidden"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[248px] shrink-0 flex-col border-r border-ink-100 bg-canvas-surface transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 pb-5 pt-6">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight text-ink-900">
                PhytoSync
              </span>
              <span className="mt-1 text-[11px] text-ink-400">
                Environmental Intelligence
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-400 hover:bg-ink-50 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-forest-50 font-medium text-forest-700"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-800"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-forest-600" />
                )}
                <Icon
                  className={cn(
                    "h-[17px] w-[17px]",
                    active ? "text-forest-600" : "text-ink-400"
                  )}
                  strokeWidth={1.75}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-ink-100 p-3">
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-forest-700 text-canvas-surface">
              <Building2 className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 leading-none">
              <p className="truncate text-[13px] font-medium text-ink-800">
                Northstar Environmental
              </p>
              <p className="mt-1 text-[11px] text-ink-400">
                Enterprise Workspace
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
