export type GlassShape = "martini" | "rocks" | "highball" | "coupe";

export interface Cocktail {
  id: string;
  name: string;
  shape: GlassShape;
  unlocked: boolean;
  hint: string;
}

export interface TasteProfile {
  sour: number;
  sweet: number;
  bitter: number;
  alcohol: number;
  refreshing: number;
}

export interface PersonalityType {
  id: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
  agreeLine: string;
  agreeRate: number;
  taste: TasteProfile;
  goodMatchId: string;
  badMatchId: string;
  cocktails: Cocktail[];
}

const COCKTAIL_POOL: { name: string; shape: GlassShape }[] = [
  { name: "진토닉", shape: "highball" },
  { name: "모히토", shape: "highball" },
  { name: "마가리타", shape: "coupe" },
  { name: "피나콜라다", shape: "rocks" },
  { name: "다이커리", shape: "coupe" },
  { name: "깁슨", shape: "martini" },
  { name: "사이드카", shape: "coupe" },
  { name: "마티니", shape: "martini" },
  { name: "니그로니", shape: "rocks" },
  { name: "올드패션드", shape: "rocks" },
  { name: "맨해튼", shape: "martini" },
  { name: "콜린스", shape: "highball" },
  { name: "스크류드라이버", shape: "highball" },
  { name: "블러디메리", shape: "highball" },
  { name: "위스키사워", shape: "rocks" },
  { name: "코스모폴리탄", shape: "martini" },
];

function buildCocktails(offset: number, unlockedCount: number): Cocktail[] {
  return Array.from({ length: 8 }, (_, i) => {
    const item = COCKTAIL_POOL[(offset + i) % COCKTAIL_POOL.length];
    return {
      id: `c-${offset}-${i}`,
      name: item.name,
      shape: item.shape,
      unlocked: i < unlockedCount,
      hint: `"${item.name}" 취향 테스트 결과가 이 타입으로 나오면 해금돼요.`,
    };
  });
}

export const TYPES: PersonalityType[] = [
  {
    id: "idealist",
    name: "이상주의자",
    color: "#FF9448",
    tagline: "새로운 조합을 찾는 실험가",
    description: "작은 실험을 즐기는 당신은 늘 새로운 조합을 찾는 이상주의자예요.",
    agreeLine: "이 아이디어 정말 좋지 않아?",
    agreeRate: 68,
    taste: { sour: 45, sweet: 30, bitter: 70, alcohol: 20, refreshing: 90 },
    goodMatchId: "adventurer",
    badMatchId: "realist",
    cocktails: buildCocktails(0, 6),
  },
  {
    id: "romantic",
    name: "낭만주의자",
    color: "#D77CC0",
    tagline: "분위기를 먼저 즐기는 사람",
    description: "은은한 조명 아래 한 잔을 오래 음미하는 낭만주의자예요.",
    agreeLine: "분위기가 반이지 않아?",
    agreeRate: 74,
    taste: { sour: 30, sweet: 60, bitter: 25, alcohol: 35, refreshing: 40 },
    goodMatchId: "emotional",
    badMatchId: "adventurer",
    cocktails: buildCocktails(2, 0),
  },
  {
    id: "adventurer",
    name: "모험가",
    color: "#5CA6D9",
    tagline: "도수 높은 한 방을 찾는 타입",
    description: "강렬한 한 잔에서 짜릿함을 느끼는 모험가예요.",
    agreeLine: "이 정도는 마셔줘야지!",
    agreeRate: 55,
    taste: { sour: 20, sweet: 15, bitter: 55, alcohol: 85, refreshing: 50 },
    goodMatchId: "idealist",
    badMatchId: "romantic",
    cocktails: buildCocktails(4, 3),
  },
  {
    id: "realist",
    name: "현실주의자",
    color: "#7FB88A",
    tagline: "익숙하고 확실한 걸 선호",
    description: "검증된 클래식만 믿고 마시는 현실주의자예요.",
    agreeLine: "그냥 늘 마시던 걸로 줘.",
    agreeRate: 62,
    taste: { sour: 35, sweet: 25, bitter: 40, alcohol: 45, refreshing: 55 },
    goodMatchId: "balanced",
    badMatchId: "idealist",
    cocktails: buildCocktails(6, 8),
  },
  {
    id: "emotional",
    name: "감성주의자",
    color: "#E8794F",
    tagline: "그날 기분 따라 고르는 타입",
    description: "그날의 감정에 어울리는 한 잔을 고르는 감성주의자예요.",
    agreeLine: "오늘 기분엔 이게 딱이야.",
    agreeRate: 71,
    taste: { sour: 50, sweet: 55, bitter: 20, alcohol: 25, refreshing: 60 },
    goodMatchId: "romantic",
    badMatchId: "balanced",
    cocktails: buildCocktails(8, 4),
  },
  {
    id: "balanced",
    name: "균형주의자",
    color: "#FFB25E",
    tagline: "밸런스를 가장 중요하게 생각",
    description: "무엇 하나 과하지 않은 균형을 추구하는 균형주의자예요.",
    agreeLine: "적당한 게 제일 좋더라.",
    agreeRate: 66,
    taste: { sour: 40, sweet: 40, bitter: 40, alcohol: 40, refreshing: 65 },
    goodMatchId: "realist",
    badMatchId: "emotional",
    cocktails: buildCocktails(10, 5),
  },
];

export function getType(id: string): PersonalityType {
  const found = TYPES.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown type id: ${id}`);
  return found;
}
