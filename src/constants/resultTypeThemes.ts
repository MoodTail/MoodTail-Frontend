import passionateChallengerCharacter from "../assets/images/character/character-4.png";
import star21Shape from "../assets/images/result-shapes/star-21.svg";
import freeSpiritedRomanticCharacter from "../assets/images/character/character-12.png";
import refreshingExplorerCharacter from "../assets/images/character/character-11.png";
import cloud9345Shape from "../assets/images/result-shapes/cloud-9345.svg";

// 백엔드 실제 typeCode(GET /api/v1/mood-types) 기준 키.
// 캐릭터 이미지/이름/설명/문구는 원래 API가 내려주지만, 결과화면 배경색·포인트컬러·배경 무늬는
// API에 없는 디자인 전용 값이라 Figma에서 타입별로 전달받는 대로 여기에 하나씩 채워나감 (12종 중 일부만 완료)
export interface ResultTypeTheme {
  name: string;
  description: string;
  quote: string;
  detailDescription: string;
  backgroundColor: string;
  accentColor: string;
  characterImage: string;
  // 무늬 이미지 없이 원형 배경만 쓰는 타입은 생략 가능 (기본 190.7px)
  characterWidth?: number;
  // TODO: 타입별 배경 무늬(별/구름 모양 등) SVG 에셋 받으면 채우기
  backgroundShape?: string;
  // 무늬 크기가 기본(355x355)과 다를 때만 지정 (예: 정사각형이 아닌 무늬)
  backgroundShapeWidth?: number;
  backgroundShapeHeight?: number;
  // 가운데 정렬된 위치에서 캐릭터를 살짝 옮길 때 (예: 캐릭터 장식이 무늬의 특정 굴곡에 맞물리도록)
  characterOffsetX?: number;
  characterOffsetY?: number;
  // 'positioned': Figma 절대좌표로 캐릭터 배치 (별처럼 무늬가 비대칭이라 정확한 정렬이 필요할 때).
  // 기본값(미지정 시) 'centered': 무늬/원 위에 캐릭터를 가운데 정렬
  characterLayout?: "centered" | "positioned";
}

export const RESULT_TYPE_THEMES: Record<string, ResultTypeTheme> = {
  "passionate-challenger": {
    name: "열정적인 도전자",
    description: "좋은 가능성을 제일 먼저 발견하는 타입",
    quote: "망설일 시간에 한 잔 더!",
    detailDescription:
      '달콤하고 상큼한 맛에 거침없이 손을 뻗는 타입이에요. 새로운 칵테일 앞에서도 망설임 없이 "이거 마셔볼게요"를 외치죠. 오늘도 전속력으로 달리는 중이지만, 표정은 언제나 해맑아요. 에너지가 넘쳐서 가끔 주변 사람들이 지칠 때도 있지만 그 열기에 결국 모두가 같이 달리게 되는 타입이에요.',
    backgroundColor: "#FECE3F",
    accentColor: "#FEBC39",
    characterImage: passionateChallengerCharacter,
    backgroundShape: star21Shape,
    characterLayout: "positioned",
  },
  "free-spirited-romantic": {
    name: "자유로운 탐험가",
    description: "작은 순간도 특별한 추억으로 만드는 타입",
    quote: "안 마셔본거? 그걸로!!",
    detailDescription:
      '자유로운 탐험가 오늘은 상그리아, 내일은 모스코 뮬. 탄산처럼 톡 튀는 취향이라 메뉴판을 다 읽어봐야 직성이 풀려요. 우산 꽂힌 트로피컬 잔처럼 어디서든 분위기를 만들어내고, 정해진 루트 없이 흘러가는 게 오히려 제일 자연스러운 타입이에요. 예측이 안 되는 게 매력이라는 걸 본인도 알고 있어요.',
    backgroundColor: "#FDAF7A",
    accentColor: "#FF6F4F",
    characterImage: freeSpiritedRomanticCharacter,
  },
  "refreshing-explorer": {
    name: "청량한 탐험가",
    description: "다양하고 멋진 미래를 보는 사람",
    quote: "가볍게 한 잔, 가볍게 한 걸음!",
    detailDescription:
      "청량한 탐험가 탄산이 입 안에서 퍼지는 그 순간처럼, 가볍고 상쾌하게 살아가는 타입이에요. 모히토 한 잔 들고 어디든 떠날 수 있을 것 같은 사람이죠. 팔을 활짝 벌린 채 바람을 맞는 게 제일 잘 어울려요. 무겁게 생각하기보다 지금 이 순간을 즐기는 편이고, 그래서 항상 옆에 있으면 왠지 시원해지는 타입이에요.",
    backgroundColor: "#FDABAA",
    accentColor: "#FDA8A8",
    characterImage: refreshingExplorerCharacter,
    characterWidth: 220,
    backgroundShape: cloud9345Shape,
    backgroundShapeWidth: 428,
    backgroundShapeHeight: 345,
    characterOffsetX: 3,
    characterOffsetY: 5,
  },
};
