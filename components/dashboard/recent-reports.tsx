import { StatusBadge } from "@/components/ui/status-badge";
import { ToxicityBadge } from "@/components/ui/toxicity-badge";
import { recentReports } from "@/lib/mock-data";

export function RecentReports() {
  return (
    <div className="rounded-xl border border-ink-100 bg-canvas-surface shadow-subtle">
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-ink-900">
          Recent analyses
        </h2>
      </div>
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs text-ink-400">
              <th className="px-5 py-2.5 font-medium">Site</th>
              <th className="px-3 py-2.5 font-medium">Soil Type</th>
              <th className="px-3 py-2.5 font-medium">Contaminants</th>
              <th className="px-3 py-2.5 font-medium">Toxicity</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 text-right font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-ink-50 last:border-0 hover:bg-canvas-raised"
              >
                <td className="px-5 py-3 font-medium text-ink-800">
                  {report.siteName}
                </td>
                <td className="px-3 py-3 text-ink-500">{report.soilType}</td>
                <td className="px-3 py-3 text-ink-500">
                  {report.contaminants.join(", ")}
                </td>
                <td className="px-3 py-3">
                  <ToxicityBadge level={report.toxicity} />
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-5 py-3 text-right text-ink-400">
                  {report.updatedLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
