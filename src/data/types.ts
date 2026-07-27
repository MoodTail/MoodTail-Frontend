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
    description: "멋진 상상을 바탕으로 효과적인 결과를 내는 타입",
    agreeLine: "이 아이디어 정말 좋지 않아?!",
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
  {
    id: "fantasist",
    name: "환상가",
    color: "#FDABAA",
    tagline: "다양하고 멋진 미래를 보는 사람",
    description: "상상한 만큼 더 특별해질 수 있다고 믿는 환상가예요.",
    agreeLine: "이걸 완성하면 진짜 멋질 것 같아!",
    agreeRate: 70,
    taste: { sour: 25, sweet: 65, bitter: 20, alcohol: 30, refreshing: 75 },
    goodMatchId: "idealist",
    badMatchId: "realist",
    cocktails: buildCocktails(1, 6),
  },
  {
    id: "straightforward",
    name: "직설가",
    color: "#1564FE",
    tagline: "취향도 감정도 선명하게 표현하는 타입",
    description: "애매한 건 싫어하고 딱 맞는 걸 좋아하는 직설가예요.",
    agreeLine: "그래서 결론이 뭔데? 확실하게 말해줘.",
    agreeRate: 69,
    taste: { sour: 70, sweet: 20, bitter: 45, alcohol: 50, refreshing: 55 },
    goodMatchId: "critic",
    badMatchId: "peacemaker",
    cocktails: buildCocktails(3, 5),
  },
  {
    id: "cautious",
    name: "신중주의자",
    color: "#346A99",
    tagline: "상황을 먼저 살피고, 가장 무리 없는 선택을 찾는 타입",
    description: "잠깐 멈추고 한 번 더 생각해보는 신중주의자예요.",
    agreeLine: "조금 더 지켜보고 결정하자.",
    agreeRate: 61,
    taste: { sour: 35, sweet: 40, bitter: 30, alcohol: 20, refreshing: 50 },
    goodMatchId: "stable",
    badMatchId: "passionate",
    cocktails: buildCocktails(5, 4),
  },
  {
    id: "passionate",
    name: "열정가",
    color: "#F8490C",
    tagline: "어떤 상황에서도 넘치는 에너지를 보여주는 타입",
    description: "이것도 저것도 다 해내고 싶은 열정가예요.",
    agreeLine: "일단 해보자, 못할 거 없잖아!",
    agreeRate: 77,
    taste: { sour: 30, sweet: 35, bitter: 60, alcohol: 80, refreshing: 45 },
    goodMatchId: "fantasist",
    badMatchId: "cautious",
    cocktails: buildCocktails(7, 4),
  },
  {
    id: "analyst",
    name: "분석가",
    color: "#FB8558",
    tagline: "날카로운 직감으로 남들보다 빨리 변화를 알아차리는 타입",
    description: "작은 변화도 놓치지 않는 분석가예요.",
    agreeLine: "잠깐, 이 부분 다시 확인해볼까?",
    agreeRate: 63,
    taste: { sour: 55, sweet: 20, bitter: 65, alcohol: 40, refreshing: 50 },
    goodMatchId: "critic",
    badMatchId: "passionate",
    cocktails: buildCocktails(9, 4),
  },
  {
    id: "critic",
    name: "평론가",
    color: "#AC3E10",
    tagline: "극찬부터 독설까지, 다양한 단어와 문장을 구사하는 지식가 타입",
    description: "확실한 코멘트를 남기는 평론가예요.",
    agreeLine: "음, 나쁘진 않은데 아쉬운 점이 좀 있네.",
    agreeRate: 58,
    taste: { sour: 40, sweet: 15, bitter: 80, alcohol: 55, refreshing: 35 },
    goodMatchId: "analyst",
    badMatchId: "peacemaker",
    cocktails: buildCocktails(11, 3),
  },
  {
    id: "peacemaker",
    name: "평화주의자",
    color: "#66BC88",
    tagline: "남들보다 사랑을 많이 나눠주는 타입",
    description: "모두 다 같이 행복하기를 바라는 평화주의자예요.",
    agreeLine: "우리 다 같이 좋은 방향으로 가면 좋겠다.",
    agreeRate: 73,
    taste: { sour: 20, sweet: 70, bitter: 15, alcohol: 15, refreshing: 60 },
    goodMatchId: "egalitarian",
    badMatchId: "straightforward",
    cocktails: buildCocktails(13, 4),
  },
  {
    id: "stable",
    name: "안정가",
    color: "#21A26A",
    tagline: "차분함과 부드러움으로 이루어져 있는 타입",
    description: "잠시 심호흡하며 여유를 찾는 안정가예요.",
    agreeLine: "천천히, 무리하지 않게 가자.",
    agreeRate: 65,
    taste: { sour: 35, sweet: 45, bitter: 30, alcohol: 25, refreshing: 55 },
    goodMatchId: "cautious",
    badMatchId: "passionate",
    cocktails: buildCocktails(15, 4),
  },
  {
    id: "egalitarian",
    name: "평등주의자",
    color: "#6DCC9F",
    tagline: "다른점도 같게 보는 특별한 시각을 가진 타입",
    description: "모두를 같은 존재로 바라보는 평등주의자예요.",
    agreeLine: "다들 의견이 다 소중하지.",
    agreeRate: 67,
    taste: { sour: 40, sweet: 40, bitter: 40, alcohol: 40, refreshing: 60 },
    goodMatchId: "peacemaker",
    badMatchId: "critic",
    cocktails: buildCocktails(0, 4),
  },
];

export function getType(id: string): PersonalityType {
  const found = TYPES.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown type id: ${id}`);
  return found;
}
