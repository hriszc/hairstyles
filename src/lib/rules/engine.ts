export type Scenario = "job" | "id" | "commute" | "campus" | string;

export interface Features {
  faceShape: "oval" | "round" | "square" | "heart" | "diamond" | string;
  hairline?: string;
  hairVolume?: string;
  hairTexture?: string;
  skinTone?: string;
  scenario?: Scenario;
}

export interface BarberCard {
  clipperGuard?: string;
  topLengthCm?: number;
  fringe?: string;
  parting?: string;
  texture?: string;
  thinning?: string;
}

export interface OutfitItem {
  category: "top" | "bottom" | "shoes" | "accessory" | string;
  name: string;
  notes?: string;
}

export interface Recommendation {
  hairstyleName: string;
  barberCard: BarberCard;
  outfits: OutfitItem[];
  colors?: { palette?: string[]; avoid?: string[] };
  scenarioTag?: string;
}

export function generateRecommendation(features: Features): Recommendation {
  // TDD: implement later
  throw new Error("Not implemented: generateRecommendation");
}

