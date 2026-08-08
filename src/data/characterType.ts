export interface CharacterType {
  id: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
  number?: number;
}

export const CHARACTER_TYPES: CharacterType[] = [
  { 
    number: 0,
    id: "fantasist",
    name: "환상가",
    color: "#FDABAA",
    tagline: "다양하고 멋진 미래를 보는 사람",
    description: '"상상한 만큼 더 특별해질 수 있어!"',
  },
  { 
    number: 1,
    id: "idealist",
    name: "이상주의자",
    color: "#FECE3F",
    tagline: "좋은 가능성을 제일 먼저 발견하는 타입",
    description: '"괜찮아, 생각보다 잘 풀릴지도 몰라!"',
  },
  {
    number: 2,
    id: "romantic",
    name: "낭만주의자",
    color: "#FDAF7A",
    tagline: "분위기와 즐거움을 가장 먼저 챙기는 타입",
    description: '"재밌으면 그걸로 충분한거 아닐까?"',
  },
  {
    number: 3,
    id: "passionate",
    name: "열정가",
    color: "#F8490C",
    tagline: "어떤 상황에서도 넘치는 에너지를 보여주는 타입",
    description: '"이것도 저것도 전부 다 할 수 있어!!"',
  },
  {
    number: 4,
    id: "analyst",
    name: "분석가",
    color: "#FB8558",
    tagline: "날카로운 직감으로 남들보다 빨리 변화를 알아차리는 타입",
    description: '"잠깐만!! 저거 조금 이상한데?"',
  },
  {
    number: 5,
    id: "critic",
    name: "평론가",
    color: "#AC3E10",
    tagline: "극찬부터 독설까지, 다양한 단어와 문장을 구사하는 지식가 타입",
    description: '"음... 이 부분은 확실히 코멘트가 필요하네"',
  },
  {
    number: 6,    
    id: "cautious",
    name: "신중주의자",
    color: "#346A99",
    tagline: "상황을 먼저 살피고, 가장 무리 없는 선택을 찾는 타입",
    description: '"잠깐만, 한번 더 생각해보고 정하자"',
  },
  {
    number: 7,
    id: "realist",
    name: "현실주의자",
    color: "#124480",
    tagline: "취향도 감정도 선명하게 표현하는 타입",
    description: '"우리 차근히 지금 이 상황을 정리해볼까?"',
  },
  {
    number: 8,
    id: "straightforward",
    name: "직설가",
    color: "#1564FE",
    tagline: "취향도 감정도 선명하게 표현하는 타입",
    description: '"애매한 건 싫어, 딱 맞는거로 가자"',
  },
  {
    number: 9,
    id: "peacemaker",
    name: "평화주의자",
    color: "#66BC88",
    tagline: "남들보다 사랑을 많이 나눠주는 타입",
    description: '"모두 다같이 행복했으면 좋겠다"',
  },
  {
    number: 10,
    id: "stable",
    name: "안정가",
    color: "#21A26A",
    tagline: "차분함과 부드러움으로 이루어져 있는 타입",
    description: '"우리 모두 잠시 심호흡해볼까요?"',
  },
  {
    number: 11,
    id: "egalitarian",
    name: "평등주의자",
    color: "#6DCC9F",
    tagline: "다른점도 같게 보는 특별한 시각을 가진 타입",
    description: '"저희는 모두 같은 존재예요!"',
  },
];

export function getCharacterType(id: string): CharacterType {
  const found = CHARACTER_TYPES.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown character type id: ${id}`);
  return found;
}

function getCharacterTypeByNumber(number: number): CharacterType {
  const found = CHARACTER_TYPES.find((t) => t.number === number);
  if (!found) throw new Error(`Unknown character number: ${number}`);
  return found;
}

// 타입 간 특성 벡터 거리 기반 궁합 매핑입니다 (number 기준, 거리가 가까울수록 잘 맞음).
const MATCH_TABLE: {
  number: number;
  goodMatchNumber: number;
  goodMatchDistance: number;
  badMatchNumber: number;
  badMatchDistance: number;
}[] = [
  { number: 0, goodMatchNumber: 9, goodMatchDistance: 0.873, badMatchNumber: 4, badMatchDistance: 3.092 },
  { number: 1, goodMatchNumber: 7, goodMatchDistance: 1.398, badMatchNumber: 5, badMatchDistance: 3.421 },
  { number: 2, goodMatchNumber: 8, goodMatchDistance: 0.562, badMatchNumber: 3, badMatchDistance: 2.338 },
  { number: 3, goodMatchNumber: 5, goodMatchDistance: 1.312, badMatchNumber: 2, badMatchDistance: 2.338 },
  { number: 4, goodMatchNumber: 7, goodMatchDistance: 1.156, badMatchNumber: 0, badMatchDistance: 3.092 },
  { number: 5, goodMatchNumber: 3, goodMatchDistance: 1.312, badMatchNumber: 1, badMatchDistance: 3.421 },
  { number: 6, goodMatchNumber: 11, goodMatchDistance: 0.882, badMatchNumber: 10, badMatchDistance: 1.507 },
  { number: 7, goodMatchNumber: 4, goodMatchDistance: 1.156, badMatchNumber: 11, badMatchDistance: 2.328 },
  { number: 8, goodMatchNumber: 2, goodMatchDistance: 0.562, badMatchNumber: 9, badMatchDistance: 1.976 },
  { number: 9, goodMatchNumber: 0, goodMatchDistance: 0.873, badMatchNumber: 8, badMatchDistance: 1.976 },
  { number: 10, goodMatchNumber: 8, goodMatchDistance: 1.055, badMatchNumber: 6, badMatchDistance: 1.507 },
  { number: 11, goodMatchNumber: 6, goodMatchDistance: 0.882, badMatchNumber: 7, badMatchDistance: 2.328 },
];

export interface CharacterMatch {
  good: CharacterType;
  goodDistance: number;
  bad: CharacterType;
  badDistance: number;
}

export function getCharacterMatch(id: string): CharacterMatch {
  const type = getCharacterType(id);
  const entry = MATCH_TABLE.find((m) => m.number === type.number);
  if (!entry) throw new Error(`No match data for character id: ${id}`);
  return {
    good: getCharacterTypeByNumber(entry.goodMatchNumber),
    goodDistance: entry.goodMatchDistance,
    bad: getCharacterTypeByNumber(entry.badMatchNumber),
    badDistance: entry.badMatchDistance,
  };
}
