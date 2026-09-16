"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  Bell,
  CreditCard,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "users", label: "Users & permissions", icon: Users },
  { id: "notifications", label: "Notification preferences", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "data", label: "Data & integrations", icon: Database },
] as const;

type SectionId = (typeof sections)[number]["id"];

function Field({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-600">
        {label}
      </label>
      <input
        defaultValue={value}
        className="w-full rounded-lg border border-ink-200 bg-canvas-surface px-3 py-2 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-forest-200"
      />
      {helper && <p className="mt-1 text-[11px] text-ink-400">{helper}</p>}
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between border-b border-ink-50 py-3 last:border-0">
      <span className="text-sm text-ink-700">{label}</span>
      <button
        onClick={() => setOn((v) => !v)}
        className={cn(
          "h-5 w-9 rounded-full transition-colors",
          on ? "bg-forest-600" : "bg-ink-200"
        )}
        aria-pressed={on}
        aria-label={label}
      >
        <span
          className={cn(
            "block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform",
            on && "translate-x-[18px]"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState<SectionId>("organization");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Manage your organization, team, and workspace preferences.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  active === s.id
                    ? "bg-forest-50 font-medium text-forest-700"
                    : "text-ink-500 hover:bg-ink-50"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                <span className="whitespace-nowrap lg:whitespace-normal">
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="rounded-xl border border-ink-100 bg-canvas-surface p-5 shadow-subtle">
          {active === "organization" && (
            <div className="space-y-4">
              <h2 className="text-[15px] font-semibold text-ink-900">
                Organization
              </h2>
              <Field label="Organization name" value="Northstar Environmental" />
              <Field label="Workspace type" value="Enterprise Workspace" />
              <Field
                label="Registered address"
                value="Circular Road, Dimapur, Nagaland 797112"
              />
              <button className="rounded-lg bg-forest-700 px-4 py-2 text-sm font-medium text-white hover:bg-forest-800">
                Save changes
              </button>
            </div>
          )}

          {active === "users" && (
            <div className="space-y-4">
              <h2 className="text-[15px] font-semibold text-ink-900">
                Users & permissions
              </h2>
              <div className="divide-y divide-ink-50">
                {[
                  { name: "Reni Kikon", role: "Owner", email: "reni@northstar.env" },
                  { name: "T. Zhimomi", role: "Consultant", email: "t.zhimomi@northstar.env" },
                  { name: "A. Longkumer", role: "Consultant", email: "a.longkumer@northstar.env" },
                ].map((u) => (
                  <div
                    key={u.email}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink-800">
                        {u.name}
                      </p>
                      <p className="text-xs text-ink-400">{u.email}</p>
                    </div>
                    <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
              <button className="rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50">
                Invite user
              </button>
            </div>
          )}

          {active === "notifications" && (
            <div>
              <h2 className="mb-2 text-[15px] font-semibold text-ink-900">
                Notification preferences
              </h2>
              <Toggle label="Blueprint generation complete" defaultOn />
              <Toggle label="Site flagged for review" defaultOn />
              <Toggle label="Weekly remediation summary" />
              <Toggle label="Marketplace order updates" defaultOn />
            </div>
          )}

          {active === "billing" && (
            <div className="space-y-4">
              <h2 className="text-[15px] font-semibold text-ink-900">
                Billing
              </h2>
              <div className="rounded-lg border border-ink-100 bg-canvas-raised p-4">
                <p className="text-xs text-ink-400">Current plan</p>
                <p className="mt-1 text-sm font-semibold text-ink-800">
                  Enterprise — billed annually
                </p>
              </div>
              <Field label="Billing contact" value="accounts@northstar.env" />
              <Field
                label="GSTIN"
                value="37AACFN1234A1Z5"
                helper="Used for Indian tax invoicing."
              />
            </div>
          )}

          {active === "data" && (
            <div className="space-y-4">
              <h2 className="text-[15px] font-semibold text-ink-900">
                Data & integrations
              </h2>
              <div className="rounded-lg border border-dashed border-ink-200 bg-canvas-raised p-4 text-sm text-ink-500">
                Supabase connection not configured. Authentication,
                workspace records, and soil analysis data currently run on
                local mock data.
              </div>
              <Toggle label="Allow export of soil reports as CSV" defaultOn />
              <Toggle label="Share anonymized data for benchmark averages" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
