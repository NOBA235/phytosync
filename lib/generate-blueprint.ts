import type {
  BiologicalAgent,
  Contaminant,
  ContaminantReductionPoint,
  PlantSpecies,
  RemediationBlueprint,
  RemediationPhase,
  SoilType,
  TimelineMilestone,
  ToxicityLevel,
} from "./types";

const fungalAgents: BiologicalAgent[] = [
  {
    id: "fa1",
    species: "Pleurotus ostreatus",
    commonName: "Oyster mushroom",
    target: "Petroleum hydrocarbons",
    role: "Ligninolytic fungal degradation",
    compatibility: "High",
  },
  {
    id: "fa2",
    species: "Phanerochaete chrysosporium",
    commonName: "White rot fungus",
    target: "Diesel / aromatic hydrocarbons",
    role: "Enzymatic degradation",
    compatibility: "High",
  },
  {
    id: "fa3",
    species: "Trametes versicolor",
    commonName: "Turkey tail fungus",
    target: "Benzene derivatives",
    role: "Laccase-mediated oxidation",
    compatibility: "Moderate",
  },
];

const plantAgents: PlantSpecies[] = [
  {
    id: "pa1",
    species: "Brassica juncea",
    commonName: "Indian mustard",
    target: "Lead",
    harvestCycle: "3–4 months",
    uptake: "High",
  },
  {
    id: "pa2",
    species: "Pteris vittata",
    commonName: "Chinese brake fern",
    target: "Arsenic",
    harvestCycle: "4–6 months",
    uptake: "High",
  },
  {
    id: "pa3",
    species: "Helianthus annuus",
    commonName: "Sunflower",
    target: "Cadmium",
    harvestCycle: "3 months",
    uptake: "Moderate",
  },
  {
    id: "pa4",
    species: "Thlaspi caerulescens",
    commonName: "Alpine pennycress",
    target: "Chromium",
    harvestCycle: "5–6 months",
    uptake: "Moderate",
  },
];

function classifyToxicity(contaminants: string[]): ToxicityLevel {
  const critical = ["arsenic", "chromium", "benzene"];
  const lower = contaminants.map((c) => c.toLowerCase());
  if (lower.some((c) => critical.includes(c)) || contaminants.length >= 4) {
    return "Critical";
  }
  if (contaminants.length >= 1) return "Moderate";
  return "Low";
}

function matchFungalAgents(contaminants: string[]): BiologicalAgent[] {
  const lower = contaminants.map((c) => c.toLowerCase());
  const hydrocarbonLike = ["diesel", "petroleum hydrocarbons", "benzene", "petroleum"];
  const hasHydrocarbon = lower.some((c) =>
    hydrocarbonLike.some((h) => c.includes(h))
  );
  return hasHydrocarbon ? fungalAgents.slice(0, 2) : [fungalAgents[0]];
}

function matchPlantAgents(contaminants: string[]): PlantSpecies[] {
  const lower = contaminants.map((c) => c.toLowerCase());
  const matched = plantAgents.filter((p) =>
    lower.some((c) => p.target.toLowerCase().includes(c) || c.includes(p.target.toLowerCase()))
  );
  return matched.length > 0 ? matched : [plantAgents[0]];
}

function buildCategory(name: string): Contaminant["category"] {
  const heavy = ["lead", "arsenic", "cadmium", "chromium"];
  const petro = ["diesel", "petroleum hydrocarbons", "petroleum"];
  const aromatic = ["benzene"];
  const lower = name.toLowerCase();
  if (heavy.includes(lower)) return "Heavy Metal";
  if (petro.some((p) => lower.includes(p))) return "Petroleum Hydrocarbon";
  if (aromatic.includes(lower)) return "Aromatic Compound";
  return "Other";
}

function buildProjectedReduction(): ContaminantReductionPoint[] {
  return [
    { month: 0, hydrocarbons: 100, lead: 100, arsenic: 100 },
    { month: 2, hydrocarbons: 78, lead: 92, arsenic: 95 },
    { month: 4, hydrocarbons: 52, lead: 74, arsenic: 81 },
    { month: 6, hydrocarbons: 31, lead: 55, arsenic: 63 },
    { month: 8, hydrocarbons: 16, lead: 34, arsenic: 42 },
    { month: 10, hydrocarbons: 8, lead: 19, arsenic: 24 },
  ];
}

export function generateBlueprint(input: {
  siteName: string;
  soilType: SoilType;
  contaminants: string[];
}): RemediationBlueprint {
  const contaminants: Contaminant[] = input.contaminants.map((name, i) => ({
    id: `c${i}`,
    name,
    category: buildCategory(name),
  }));

  const toxicity = classifyToxicity(input.contaminants);
  const fungi = matchFungalAgents(input.contaminants);
  const plants = matchPlantAgents(input.contaminants);

  const phases: RemediationPhase[] = [
    {
      id: "phase-1",
      order: 1,
      name: "Mycoremediation",
      type: "Mycoremediation",
      subtitle: "Biological degradation of petroleum hydrocarbons.",
      durationLabel: "Month 1–3",
      agents: fungi,
    },
    {
      id: "phase-2",
      order: 2,
      name: "Phytomining",
      type: "Phytomining",
      subtitle: "Heavy-metal uptake and controlled biomass harvesting.",
      durationLabel: "Month 3–6",
      plants,
    },
  ];

  const timeline: TimelineMilestone[] = [
    {
      id: "t0",
      label: "Baseline assessment",
      window: "Month 0",
      description: "Site sampling, contaminant profiling, and soil chemistry baseline.",
    },
    {
      id: "t1",
      label: "Mycoremediation",
      window: "Month 1–3",
      description: "Fungal inoculation targets petroleum-based contaminants.",
    },
    {
      id: "t2",
      label: "Phytomining cycle",
      window: "Month 3–6",
      description: "Hyperaccumulator planting begins heavy-metal uptake.",
    },
    {
      id: "t3",
      label: "Harvest + soil reassessment",
      window: "Month 6–9",
      description: "Biomass harvested and processed; soil resampled for verification.",
    },
    {
      id: "t4",
      label: "Monitoring",
      window: "Month 9+",
      description: "Quarterly monitoring confirms contaminant levels hold below threshold.",
    },
  ];

  const conventionalCost = 1_840_000;
  const biologicalCost = toxicity === "Critical" ? 720_000 : 590_000;
  const savingsPercent = Math.round(
    ((conventionalCost - biologicalCost) / conventionalCost) * 100
  );

  return {
    id: `bp-${Date.now()}`,
    siteName: input.siteName,
    soilType: input.soilType,
    contaminants,
    toxicity,
    phases,
    estimatedDuration: toxicity === "Critical" ? "10–16 months" : "8–14 months",
    costEstimate: {
      conventionalCost,
      biologicalCost,
      currency: "INR",
      savingsPercent,
    },
    timeline,
    projectedReduction: buildProjectedReduction(),
    generatedAt: "Just now",
  };
}
