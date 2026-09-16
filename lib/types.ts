export type SoilType =
  | "Sandy"
  | "Clay"
  | "Loamy"
  | "Silty"
  | "Peaty"
  | "Mixed / Fill";

export type ToxicityLevel = "Low" | "Moderate" | "Critical";

export type ReportStatus =
  | "Blueprint Ready"
  | "Needs Review"
  | "Monitoring"
  | "Draft";

export type Compatibility = "High" | "Moderate" | "Low";

export interface Contaminant {
  id: string;
  name: string;
  category: "Heavy Metal" | "Petroleum Hydrocarbon" | "Aromatic Compound" | "Other";
}

export interface BiologicalAgent {
  id: string;
  species: string;
  commonName: string;
  target: string;
  role: string;
  compatibility: Compatibility;
}

export interface PlantSpecies {
  id: string;
  species: string;
  commonName: string;
  target: string;
  harvestCycle: string;
  uptake: Compatibility;
}

export interface RemediationPhase {
  id: string;
  order: number;
  name: string;
  type: "Mycoremediation" | "Phytomining" | "Bioaugmentation" | "Monitoring";
  subtitle: string;
  durationLabel: string;
  agents?: BiologicalAgent[];
  plants?: PlantSpecies[];
}

export interface CostEstimate {
  conventionalCost: number;
  biologicalCost: number;
  currency: "INR";
  savingsPercent: number;
}

export interface TimelineMilestone {
  id: string;
  label: string;
  window: string;
  description: string;
}

export interface ContaminantReductionPoint {
  month: number;
  hydrocarbons: number;
  lead: number;
  arsenic: number;
}

export interface RemediationBlueprint {
  id: string;
  siteName: string;
  soilType: SoilType;
  contaminants: Contaminant[];
  toxicity: ToxicityLevel;
  phases: RemediationPhase[];
  estimatedDuration: string;
  costEstimate: CostEstimate;
  timeline: TimelineMilestone[];
  projectedReduction: ContaminantReductionPoint[];
  generatedAt: string;
}

export interface SoilAnalysis {
  id: string;
  siteName: string;
  soilType: SoilType;
  contaminants: string[];
  toxicity: ToxicityLevel;
  status: ReportStatus;
  updatedLabel: string;
  location?: string;
}

export interface SoilReport extends SoilAnalysis {
  analysisId: string;
  consultant?: string;
}

export interface RemediationPlan {
  id: string;
  siteName: string;
  status: "Active" | "Completed" | "On Hold";
  currentPhase: string;
  estimatedCompletion: string;
  consultant: string;
  progress: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  site: string;
  timeLabel: string;
  icon: "blueprint" | "upload" | "update" | "review";
}

export interface KpiDatum {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "neutral";
  icon: "activity" | "leaf" | "flask" | "coins";
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  category:
    | "Mycoremediation"
    | "Phytoremediation"
    | "Soil Amendments"
    | "Monitoring Equipment"
    | "Laboratory Services";
  description: string;
  price: string;
  unit: string;
  availability: "Available" | "Limited Stock" | "Made to Order";
  supplier: string;
}
