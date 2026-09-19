# PhytoSync

<div align="center">

  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />

  <h3>Environmental remediation intelligence for cleaner industrial land.</h3>

  <p>
    PhytoSync is a modern dashboard for evaluating contaminated sites, generating biological remediation blueprints,
    and tracking restoration outcomes in a single operational workspace.
  </p>

</div>

## Why PhytoSync

Contaminated land is expensive to remediate, slow to assess, and hard to communicate across teams. PhytoSync brings together:

- soil contamination analysis
- biological remediation planning
- cost and impact visibility
- environmental reporting workflows

The result is a focused, decision-ready interface that helps teams move from initial site assessment to actionable restoration strategy.

## Product snapshot

PhytoSync is designed as a frontend prototype for a remediation intelligence platform. It demonstrates how environmental teams could:

- review site health and contamination KPIs
- generate remediation blueprints from soil conditions
- compare biological and conventional remediation economics
- understand treatment phases, plant and microbial agents, and projected reductions
- monitor site progress and operational activity from a central dashboard

## Core experience

### Site intelligence dashboard

The homepage gives operators a quick overview of the portfolio, including:

- soil health KPIs
- contaminated site activity
- remediation timeline and cost insights
- live-style reporting panels for recent analyses

### Remediation blueprint generation

The soil analysis workflow allows a user to define site conditions and generate a remediation strategy based on local mock data. The generated blueprint includes:

- soil type and contaminant profile
- toxicity classification
- remediation phases with biological agents and plant species
- estimated duration and cost comparison
- projected reduction trends over time

### Environmental workflow visibility

The interface packages the signal in a way that feels operational rather than academic: short-term decisions, execution phases, and outcome tracking are surfaced together to support faster stakeholder alignment.

## Tech stack

| Layer | Tooling |
| --- | --- |
| Framework | Next.js App Router |
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Data model | Type-safe local mock domain objects |

## Project structure

```text
phytosync/
├── app/                     # Route-level pages and app shell
│   ├── page.tsx            # Main remediation dashboard
│   ├── soil-reports/       # Reporting views
│   ├── remediation-plans/  # Plan management views
│   ├── marketplace/        # Remediation products and services
│   └── settings/           # Workspace settings
├── components/
│   ├── dashboard/          # KPIs, forms, blueprint, charts, timeline
│   ├── layout/            # Sidebar, header, app shell
│   └── ui/                # Shared UI primitives
├── lib/
│   ├── mock-data.ts       # Local data for demo scenarios
│   ├── generate-blueprint.ts
│   ├── types.ts           # Domain types for analyses and plans
│   └── utils.ts
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── .gitignore
```

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available scripts

```bash
npm run dev      # Start the app in development mode
npm run build    # Create a production build
npm run start    # Run the production build locally
npm run lint     # Run the Next.js lint check
```

## Data model and backend readiness

This project currently uses local mock data to simulate an operational environment, with domain types designed to map cleanly onto a real backend later. The model structure is organized around:

- site analysis records
- soil and contaminant data
- remediation blueprints
- environmental plans
- marketplace listings

That makes the app a strong foundation for integration with a real data source such as Supabase, Postgres, or a custom remediation platform API.

## Why this is valuable

PhytoSync is built around a problem that matters: contaminated land restoration needs both technical rigor and clear operational storytelling. This product prototype focuses on the intersection of:

- environmental science
- engineering decision support
- operational visibility
- sustainability and remediation ROI

It is especially relevant for consultants, remediation teams, industrial operators, and environmental stakeholders who need to communicate complex analysis in a clean, accessible way.

## Future direction

Potential next steps for the product include:

- real authentication and multi-tenant workspaces
- backend persistence for reports and plans
- AI-generated recommendations tied to real site inputs
- GIS and map-based site visualization
- regulatory compliance reporting
- procurement and field execution tracking

## License

This project is currently unlicensed. If you plan to share or extend it publicly, consider adding an open-source license that matches your intended distribution model.

---

Built for cleaner soil, smarter decisions, and more resilient industrial landscapes.
