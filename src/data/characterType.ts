export interface CharacterType {
  id: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
  detailDescription: string;
  number?: number;
}

export const CHARACTER_TYPES: CharacterType[] = [
  {
    number: 7,
    id: "fantasist",
    name: "청량한 탐험가",
    color: "#FDABAA",
    tagline: "시원한 호기심으로 새로운 즐거움을 찾아가는 타입",
    description: '"상상한 만큼 더 특별해질 수 있어!"',
    detailDescription:
      "청량한 탐험가는 탄산이 입 안에서 퍼지는 그 순간처럼, 가볍고 상쾌하게 살아가는 타입이에요. 모히토 한 잔 들고 어디든 떠날 수 있을 것 같은 사람이죠. 팔을 활짝 벌린 채 바람을 맞는 게 제일 잘 어울려요. 무겁게 생각하기보다 지금 이 순간을 즐기는 편이고, 그래서 항상 옆에 있으면 왠지 시원해지는 타입이에요.",
  },
  {
    number: 1,
    id: "idealist",
    name: "열정적인 도전가",
    color: "#FECE3F",
    tagline: "달콤하고 상큼한 것에 끌리는, 언제나 먼저 달려가는 타입",
    description: '"괜찮아, 생각보다 잘 풀릴지도 몰라!"',
    detailDescription:
      '열정적인 도전가는 달콤하고 상큼한 맛에 거침없이 손을 뻗는 타입이에요. 새로운 칵테일 앞에서도 망설임 없이 "이거 마셔볼게요"를 외치죠. 오늘도 전속력으로 달리는 중이지만, 표정은 언제나 해맑아요. 에너지가 넘쳐서 가끔 주변 사람들이 지칠 때도 있지만 그 열기에 결국 모두가 같이 달리게 되는 타입이에요.',
  },
  {
    number: 4,
    id: "romantic",
    name: "자유로운 낭만주의자",
    color: "#FDAF7A",
    tagline: "시원한 호기심으로 새로운 즐거움을 찾아가는 타입",
    description: '"재밌으면 그걸로 충분한거 아닐까?"',
    detailDescription:
      "자유로운 낭만주의자는 오늘은 샹그리아, 내일은 모스코 뮬. 탄산처럼 톡 튀는 취향이라 메뉴판을 다 읽어봐야 직성이 풀려요. 우산 꽂힌 트로피컬 잔처럼 어디서든 분위기를 만들어내고, 정해진 루트 없이 흘러가는 게 오히려 제일 자연스러운 타입이에요. 예측이 안 되는 게 매력이라는 걸 본인도 알고 있어요.",
  },
  {
    number: 5,
    id: "passionate",
    name: "폭발적인 모험가",
    color: "#F8490C",
    tagline: "강렬하고 극단적인, 한 번 꽂히면 끝까지 밀어붙이는 타입",
    description: '"이것도 저것도 전부 다 할 수 있어!!"',
    detailDescription:
      "폭발적인 모험가는 드라이 마티니를 니트로 주문하고 눈 하나 깜짝 안 하는 타입이에요. 불꽃이 머리 위에서 타오르고 있어도 본인은 그게 일상이에요. 한 번 마음먹으면 끝까지 가고, 중간에 돌아서는 법이 없어요. 강렬한 도수처럼 처음엔 압도되지만, 적응하면 이 사람 없이는 심심해지죠. 극단적이지만 그게 매력인 타입이에요.",
  },
  {
    number: 2,
    id: "analyst",
    name: "예민한 완벽주의자",
    color: "#FB8558",
    tagline: "날카로운 산미처럼, 디테일 하나도 그냥 넘기지 않는 타입",
    description: '"잠깐만!! 저거 조금 이상한데?"',
    detailDescription:
      '예민한 완벽주의자는 피스코 사워의 산미가 정확히 몇 퍼센트인지 느낄 수 있는 타입이에요. 날카롭게 뻗은 마티니 글라스처럼, 실루엣부터 취향이 분명해요. "그냥 아무거나"는 이 사람의 사전에 없는 말이에요. 디테일을 놓치지 않고, 한 번 틀어진 게 계속 신경 쓰이는 편이지만 그 섬세함 덕분에 결과물은 항상 완벽에 가까워요.',
  },
  {
    number: 6,
    id: "critic",
    name: "꼼꼼한 평론가",
    color: "#AC3E10",
    tagline: "작은 차이도 놓치지 않는, 자신만의 기준으로 맛을 살펴보는 타입",
    description: '"음... 이 부분은 확실히 코멘트가 필요하네"',
    detailDescription:
      "꼼꼼한 평론가는 에스프레소 마티니처럼 복잡한데 어딘가 중독되는 타입이에요. 말이 없어 보여도 머릿속엔 항상 많은 생각이 흘러가고 있어요. 개성 있는 조합을 즐기고, 남들이 고개를 갸웃할 때 혼자 끄덕이죠. 조용히 앉아서 잔을 들고 있는 모습이 가장 자연스럽고, 알면 알수록 예상을 빗나가는 매력이 있는 타입이에요.",
  },
  {
    number: 0,
    id: "cautious",
    name: "감성적인 사색가",
    color: "#346A99",
    tagline: "클래식하고 깊은 맛처럼, 말보다 무게로 말하는 타입",
    description: '"잠깐만, 한번 더 생각해보고 정하자"',
    detailDescription:
      "감성적인 사색가는 아이리시 커피처럼 따뜻한데 씁쓸한, 복잡한 맛이 오히려 편한 타입이에요. 혼자 브라운 쿠페를 들고 턱을 괴고 생각에 잠기는 게 가장 자연스러운 모습이죠. 말은 아껴도 감정은 깊고, 분위기를 읽는 능력이 탁월해요. 가끔 너무 많이 생각해서 스스로 지치기도 하지만, 그 깊이가 결국 이 사람의 가장 큰 매력이에요.",
  },
  {
    number: 3,
    id: "realist",
    name: "진중한 원칙주의자",
    color: "#124480",
    tagline: "쓴맛도 즐길 줄 아는, 타협 없이 자신의 기준을 지키는 타입",
    description: '"우리 차근히 지금 이 상황을 정리해볼까?"',
    detailDescription:
      '진중한 원칙주의자는 네그로니의 쓴맛을 처음부터 좋아했다고 말하는 타입이에요. 남들이 "이거 써서 못 마시겠다"고 할 때, 오히려 한 모금 더 마시죠. 타협이나 예외는 없어요. 기준이 분명하고 그걸 지키는 게 당연하다고 생각해요. 차갑게 벼린 칼을 쥐고 있어도 든든하기만 한 이 사람의 진심은 오래 볼수록 의외의 따뜻함에 놀라게 되는 타입이에요.',
  },
  {
    number: 11,
    id: "straightforward",
    name: "묵직한 현실주의자",
    color: "#1564FE",
    tagline: "취향도 감정도 선명하게 표현하는 타입",
    description: '"애매한 건 싫어, 딱 맞는거로 가자"',
    detailDescription:
      "묵직한 현실주의자는 화려한 가니쉬보다 잘 숙성된 베이스 한 모금을 더 즐기는 타입이에요. 팔짱을 끼고 조용히 앉아 있어도 존재감이 느껴지죠. 말수가 적은 편이지만, 입을 열면 핵심만 말해요. 다이키리처럼 단순해 보여도 깊이가 있고, 시간이 지날수록 진가를 알게 되는 타입이에요.",
  },
  {
    number: 8,
    id: "peacemaker",
    name: "여유로운 낙관자",
    color: "#66BC88",
    tagline: "달콤하고 화사한 과일향처럼, 어디서나 따뜻한 기운을 주는 타입",
    description: '"모두 다같이 행복했으면 좋겠다"',
    detailDescription:
      "여유로운 낙관자는 데킬라 선라이즈처럼 보기만 해도 기분이 좋아지는 타입이에요. 정량대로 레시피 과정을 지키기보단 주변의 분위기와 기분에 따르죠. 눈을 감고 몸을 흐름에 맡긴 모습이 가장 자연스럽고, 급하지 않아요. 다 잘 될 거라는 걸 본능적으로 믿고 있거든요. 이 사람 옆에 있으면 왠지 덩달아 여유로워지는 타입이에요.",
  },
  {
    number: 9,
    id: "stable",
    name: "조용한 지지자",
    color: "#21A26A",
    tagline: "부드러운 온기처럼, 곁에서 조용히 힘이 되어주는 타입",
    description: '"우리 모두 잠시 심호흡해볼까요?"',
    detailDescription:
      "조용한 지지자는 은은하지만 존재감이 확실한 타입이에요. 화려하게 나서진 않지만, 항상 가장 필요한 자리에 있어요. 부드럽고 균형 잡힌 맛처럼 누구와도 자연스럽게 어울리고, 말 대신 행동으로 곁에 있다는 걸 보여주는 사람이에요. 오래될수록 없으면 안 된다는 걸 알게 되는 타입이에요.",
  },
  {
    number: 10,
    id: "egalitarian",
    name: "균형적인 중재자",
    color: "#6DCC9F",
    tagline: "어느 한쪽으로 치우치지 않는, 모든 자리에 자연스럽게 녹아드는 타입",
    description: '"저희는 모두 같은 존재예요!"',
    detailDescription:
      "균형적인 중재자는 위스키 사워처럼 달고 시고 쓴 게 다 균형 잡힌 타입이에요. 어느 한쪽으로 치우치지 않고, 모든 자리에 자연스럽게 녹아들어요. 뾰족뾰족한 관계를 원만히 이끌고, 분위기를 망치는 법이 없어요. 갈등이 생기면 자연스럽게 가운데서 조율하고 있는 게 이 사람이에요. 가장 무난해 보이지만, 없으면 안 될 타입이에요.",
  },
];

export function getCharacterType(id: string): CharacterType {
  const found = CHARACTER_TYPES.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown character type id: ${id}`);
  return found;
}

function getCharacterTypeByNumber(number: number): CharacterType | undefined {
  return CHARACTER_TYPES.find((t) => t.number === number);
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
  good?: CharacterType;
  goodDistance?: number;
  bad?: CharacterType;
  badDistance?: number;
}

// number가 characterType.ts 안에서 중복되거나(realist/straightforward가 둘 다 3) 비어있는
// 경우(11번 없음)가 있어서, 매칭 상대를 못 찾을 수 있습니다. 그럴 땐 던지지 않고 undefined로
// 돌려주고, 호출하는 쪽(TypeDetailPage)에서 "-"로 안전하게 표시합니다.
export function getCharacterMatch(id: string): CharacterMatch {
  const type = getCharacterType(id);
  const entry = MATCH_TABLE.find((m) => m.number === type.number);
  if (!entry) return {};
  return {
    good: getCharacterTypeByNumber(entry.goodMatchNumber),
    goodDistance: entry.goodMatchDistance,
    bad: getCharacterTypeByNumber(entry.badMatchNumber),
    badDistance: entry.badMatchDistance,
  };
}
