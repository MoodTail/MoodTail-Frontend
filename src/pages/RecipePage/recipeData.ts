import { COCKTAILS, getGlassImage } from "../../data/cocktailGlasses";
import mojitoPhoto from "../../assets/images/detail_cockTails/mojito.png";
import blackRussianPhoto from "../../assets/images/detail_cockTails/black-russian.png";

const DETAIL_PHOTOS: Record<string, string> = {
  mojito: mojitoPhoto,
  "black-russian": blackRussianPhoto,
};

export interface TasteProfile {
  도수: number;
  단맛: number;
  산도: number;
  쓴맛: number;
  청량감: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  degree: string;
  matchRate: string;
  glassImage: string;
  heroImage: string;
  hasHeroPhoto: boolean;
  taste: TasteProfile;
  ingredients: string[];
  steps: string[];
}

function parseRefreshment(refreshment: string): number {
  const match = refreshment.match(/\(([\d.]+)\)/);
  return match ? Number(match[1]) : 0;
}

function splitSteps(method: string): string[] {
  return method
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const DESC_LINE_LENGTH = 20;

export function splitDescriptionLines(text: string): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && candidate.length > DESC_LINE_LENGTH) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export const RECIPES: Recipe[] = COCKTAILS.map((cocktail) => {
  const taste: TasteProfile = {
    도수: Math.round(cocktail.abv),
    단맛: Math.round(cocktail.sweetness),
    산도: Math.round(cocktail.acidity),
    쓴맛: Math.round(cocktail.bitterness),
    청량감: Math.round(parseRefreshment(cocktail.refreshment)),
  };
  const matchRate = Math.round(
    (taste.도수 + taste.단맛 + taste.산도 + taste.쓴맛 + taste.청량감) / 5
  );
  const glassImage = getGlassImage(cocktail.glassNumber);
  return {
    id: cocktail.id,
    name: cocktail.nameKo,
    description: cocktail.description,
    degree: `${taste.도수}°`,
    matchRate: `${matchRate}%`,
    glassImage,
    heroImage: DETAIL_PHOTOS[cocktail.id] ?? glassImage,
    hasHeroPhoto: cocktail.id in DETAIL_PHOTOS,
    taste,
    ingredients: cocktail.ingredients,
    steps: splitSteps(cocktail.method),
  };
});

export function getRecipe(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}
