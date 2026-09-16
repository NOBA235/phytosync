# PhytoSync

Environmental remediation intelligence platform — soil contamination analysis
and biological remediation blueprint generation.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Recharts · Lucide

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — routes: dashboard (`/`), `/soil-reports`, `/remediation-plans`,
  `/marketplace`, `/settings`
- `components/layout/` — sidebar, header, app shell
- `components/dashboard/` — KPI cards, soil analysis form, blueprint
  result and its phase/timeline/ROI/chart sub-components, activity feed,
  recent reports table
- `components/ui/` — shared primitives (badges, metric, empty state)
- `lib/types.ts` — domain types (SoilAnalysis, RemediationBlueprint, etc.)
- `lib/mock-data.ts` — realistic local data standing in for a backend
- `lib/generate-blueprint.ts` — deterministic mock "blueprint generation"
  logic used by the New Soil Analysis form

## Connecting a real backend

All data currently comes from `lib/mock-data.ts` and
`lib/generate-blueprint.ts`. The types in `lib/types.ts` are written to map
cleanly onto Supabase tables for auth, organizations/workspaces, soil
analysis records, remediation plans, and marketplace listings — swap the
mock data calls for Supabase queries when ready.
