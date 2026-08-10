import { COCKTAILS, getGlassImage } from "../../data/cocktailGlasses";
import mojitoPhoto from "../../assets/images/detail_cockTails/mojito.png";
import blackRussianPhoto from "../../assets/images/detail_cockTails/black-russian.png";

// 실제 촬영 사진이 준비된 칵테일만 상세 화면 히어로 이미지로 사용하고,
// 나머지는 기존 잔 실루엣 이미지(glassImage)로 대체합니다.
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

// refreshment는 "1" 또는 "3(32)"처럼 탄산/청량감 등급과 괄호 안 추정치가 섞인 문자열이라
// 괄호 안 숫자가 있으면 그 값을, 없으면(등급 1 = 탄산 없음) 0을 청량감 점수로 사용합니다.
function parseRefreshment(refreshment: string): number {
  const match = refreshment.match(/\(([\d.]+)\)/);
  return match ? Number(match[1]) : 0;
}

// method는 문단 하나로 되어 있어 문장 단위로 잘라 번호가 매겨진 단계 목록으로 보여줍니다.
function splitSteps(method: string): string[] {
  return method
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const DESC_LINE_LENGTH = 20;

// 맛 설명(description)을 한 줄당 공백 포함 20자 안팎으로 줄바꿈합니다.
// 단어(공백) 단위로 끊어서 단어 중간이 잘리지 않도록 합니다.
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

// cocktailGlasses.ts의 96종 칵테일 데이터를 레시피 화면용으로 변환합니다.
// 도수/단맛/산도/쓴맛/청량감 5축 맛 지표는 원본 데이터에 없어 abv, sweetness, acidity,
// bitterness, refreshment 값으로 근사 대체합니다.
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
