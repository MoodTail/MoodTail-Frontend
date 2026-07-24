export interface CharacterType {
  id: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
}

export const CHARACTER_TYPES: CharacterType[] = [
  {
    id: "fantasist",
    name: "환상가",
    color: "#FDABAA",
    tagline: "다양하고 멋진 미래를 보는 사람",
    description: '"상상한 만큼 더 특별해질 수 있어!"',
  },
  {
    id: "idealist",
    name: "이상주의자",
    color: "#FECE3F",
    tagline: "좋은 가능성을 제일 먼저 발견하는 타입",
    description: '"괜찮아, 생각보다 잘 풀릴지도 몰라!"',
  },
  {
    id: "romantic",
    name: "낭만주의자",
    color: "#FDAF7A",
    tagline: "분위기와 즐거움을 가장 먼저 챙기는 타입",
    description: '"재밌으면 그걸로 충분한거 아닐까?"',
  },
  {
    id: "passionate",
    name: "열정가",
    color: "#F8490C",
    tagline: "어떤 상황에서도 넘치는 에너지를 보여주는 타입",
    description: '"이것도 저것도 전부 다 할 수 있어!!"',
  },
  {
    id: "analyst",
    name: "분석가",
    color: "#FB8558",
    tagline: "날카로운 직감으로 남들보다 빨리 변화를 알아차리는 타입",
    description: '"잠깐만!! 저거 조금 이상한데?"',
  },
  {
    id: "critic",
    name: "평론가",
    color: "#AC3E10",
    tagline: "극찬부터 독설까지, 다양한 단어와 문장을 구사하는 지식가 타입",
    description: '"음... 이 부분은 확실히 코멘트가 필요하네"',
  },
  {
    id: "cautious",
    name: "신중주의자",
    color: "#346A99",
    tagline: "상황을 먼저 살피고, 가장 무리 없는 선택을 찾는 타입",
    description: '"잠깐만, 한번 더 생각해보고 정하자"',
  },
  {
    id: "realist",
    name: "현실주의자",
    color: "#124480",
    tagline: "취향도 감정도 선명하게 표현하는 타입",
    description: '"우리 차근히 지금 이 상황을 정리해볼까?"',
  },
  {
    id: "straightforward",
    name: "직설가",
    color: "#1564FE",
    tagline: "취향도 감정도 선명하게 표현하는 타입",
    description: '"애매한 건 싫어, 딱 맞는거로 가자"',
  },
  {
    id: "peacemaker",
    name: "평화주의자",
    color: "#66BC88",
    tagline: "남들보다 사랑을 많이 나눠주는 타입",
    description: '"모두 다같이 행복했으면 좋겠다"',
  },
  {
    id: "stable",
    name: "안정가",
    color: "#21A26A",
    tagline: "차분함과 부드러움으로 이루어져 있는 타입",
    description: '"우리 모두 잠시 심호흡해볼까요?"',
  },
  {
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
