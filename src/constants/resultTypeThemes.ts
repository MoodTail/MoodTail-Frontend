import passionateChallengerCharacter from "../assets/images/character/character-4.png";
import star21Shape from "../assets/images/result-shapes/star-21.svg";
import freeSpiritedRomanticCharacter from "../assets/images/character/character-12.png";
import refreshingExplorerCharacter from "../assets/images/character/character-11.png";
import cloud9345Shape from "../assets/images/result-shapes/cloud-9345.svg";
import explosiveAdventurerCharacter from "../assets/images/character/character-6.png";
import star22Shape from "../assets/images/result-shapes/star-22.svg";
import star23Shape from "../assets/images/result-shapes/star-23.svg";
import sensitivePerfectionistCharacter from "../assets/images/character/character-7.png";
import shard9584Shape from "../assets/images/result-shapes/shard-9584.svg";
import meticulousCriticCharacter from "../assets/images/character/character-5.png";
import sparkles9585MainShape from "../assets/images/result-shapes/sparkles-9585-main.svg";
import sparkles9585AccentShape from "../assets/images/result-shapes/sparkles-9585-accent.svg";

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
  // 타입별 배경 무늬(별/구름 모양 등) SVG 에셋. 무늬는 래퍼 안에서 항상 가운데 정렬됨
  backgroundShape?: string;
  backgroundShapeWidth?: number;
  backgroundShapeHeight?: number;
  // 래퍼(무늬+캐릭터+보조무늬를 담는 영역) 크기. 보조 무늬가 무늬 밖으로 많이 삐져나가는 등
  // 기본값(355x355)보다 여유 공간이 더 필요할 때만 지정
  wrapWidth?: number;
  wrapHeight?: number;
  // characterLayout: 'positioned' 전용 — 자동 계산된 가운데 정렬 위치에서 무늬+캐릭터+보조무늬
  // 전체를 한번 더 미세 조정할 때 (예: 디자인상 완전 중앙이 아니라 살짝 왼쪽으로 치우친 구성일 때)
  contentOffsetX?: number;
  contentOffsetY?: number;
  // 'centered'(기본값): 무늬/원 위에 캐릭터를 가운데 정렬, 필요하면 offset으로 미세조정
  // 'positioned': Figma 절대좌표(무늬 기준 상대좌표)로 캐릭터를 정확히 배치
  characterLayout?: "centered" | "positioned";
  characterOffsetX?: number;
  characterOffsetY?: number;
  // characterLayout: 'positioned' 전용 — 무늬 이미지의 top-left(0,0) 기준 상대 좌표/크기
  characterPositionTop?: number;
  characterPositionLeft?: number;
  characterPositionWidth?: number;
  characterPositionHeight?: number;
  // 캐릭터 그림자 (Figma의 X/Y/blur/color를 그대로 옮긴 CSS drop-shadow 값)
  characterShadow?: string;
  // 보조 장식 무늬(작은 별 등). 무늬 이미지의 top-left(0,0) 기준 상대 좌표
  accentShape?: string;
  accentShapeWidth?: number;
  accentShapeHeight?: number;
  accentShapeTop?: number;
  accentShapeLeft?: number;
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
    backgroundShapeWidth: 338,
    backgroundShapeHeight: 355,
    characterLayout: "positioned",
    characterPositionTop: 40,
    characterPositionLeft: 41,
    characterPositionWidth: 288,
    characterPositionHeight: 302,
    characterShadow: "drop-shadow(9px 6px 6.5px rgba(0, 0, 0, 0.25))",
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
  "explosive-adventurer": {
    name: "폭발적인 모험가",
    description: "어떤 상황에서도 넘치는 에너지를 보여주는 타입",
    quote: "한 번 시작했으면 끝까지!",
    detailDescription:
      "폭발적인 모험가 드라이 마티니를 니트로 주문하고 눈 하나 깜짝 안 하는 타입이에요. 불꽃이 머리 위에서 타오르고 있어도 본인은 그게 일상이에요. 한 번 마음먹으면 끝까지 가고, 중간에 돌아서는 법이 없어요. 강렬한 도수처럼 처음엔 압도되지만, 적응하면 이 사람 없이는 심심해지죠. 극단적이지만 그게 매력인 타입이에요.",
    backgroundColor: "#F8490C",
    accentColor: "#FF0004",
    characterImage: explosiveAdventurerCharacter,
    backgroundShape: star22Shape,
    backgroundShapeWidth: 257,
    backgroundShapeHeight: 257,
    wrapWidth: 355,
    wrapHeight: 355,
    contentOffsetX: -10,
    characterLayout: "positioned",
    // Figma: 무늬(Star22) top108 left18, 캐릭터(Group213) top93 left74 244.81x315
    // -> 무늬 기준 상대좌표: top 93-108=-15, left 74-18=56
    characterPositionTop: -15,
    characterPositionLeft: 56,
    characterPositionWidth: 244.81,
    characterPositionHeight: 315,
    characterShadow: "drop-shadow(13px 6px 4px rgba(0, 0, 0, 0.25))",
    // Figma: 작은 별(Star23) top331 left245 104x104
    // -> 무늬 기준 상대좌표: top 331-108=223, left 245-18=227
    accentShape: star23Shape,
    accentShapeWidth: 104,
    accentShapeHeight: 104,
    accentShapeTop: 223,
    accentShapeLeft: 227,
  },
  "sensitive-perfectionist": {
    name: "예민한 완벽주의자",
    description: "날카로운 직감으로 남들보다 빨리 변화를 알아차리는 타입",
    quote: "이 한 방울까지 모두 계획대로야!",
    detailDescription:
      '예민한 완벽주의자 피스코 사워의 산미가 정확히 몇 퍼센트인지 느낄 수 있는 타입이에요. 날카롭게 뻗은 마티니 글라스처럼, 실루엣부터 취향이 분명해요. "그냥 아무거나"는 이 사람의 사전에 없는 말이에요. 디테일을 놓치지 않고, 한 번 틀어진 게 계속 신경 쓰이는 편이지만 그 섬세함 덕분에 결과물은 항상 완벽에 가까워요.',
    backgroundColor: "#FB8558",
    accentColor: "#FD9D78",
    characterImage: sensitivePerfectionistCharacter,
    characterWidth: 229,
    backgroundShape: shard9584Shape,
    backgroundShapeWidth: 600,
    backgroundShapeHeight: 490,
    contentOffsetY: 65,
    characterOffsetY: 0,
  },
  "meticulous-critic": {
    name: "꼼꼼한 평론가",
    description: "극찬부터 독설까지, 다양한 단어와 문장을 구사하는 지식가 타입",
    quote: "생각보다 재미있는 조합이네?",
    detailDescription:
      "꼼꼼한 평론가 에스프레소 마티니처럼 복잡한데 어딘가 중독되는 타입이에요. 말이 없어 보여도 머릿속엔 항상 많은 생각이 흘러가고 있어요. 개성 있는 조합을 즐기고, 남들이 고개를 갸웃할 때 혼자 끄덕이죠. 조용히 앉아서 잔을 들고 있는 모습이 가장 자연스럽고, 알면 알수록 예상을 빗나가는 매력이 있는 타입이에요.",
    backgroundColor: "#AC3E10",
    accentColor: "#FB7915",
    characterImage: meticulousCriticCharacter,
    characterWidth: 254,
    backgroundShape: sparkles9585MainShape,
    backgroundShapeWidth: 420,
    backgroundShapeHeight: 500,
    contentOffsetX: 35,
    contentOffsetY: 20,
    characterOffsetX: 20,
    characterOffsetY: 20,
    // Figma 원본 좌표(454x543 캔버스) 기준 아래쪽 별 2개 위치를, 표시 크기(420x500)에 맞춰 환산
    accentShape: sparkles9585AccentShape,
    accentShapeWidth: 82,
    accentShapeHeight: 113,
    accentShapeTop: 301,
    accentShapeLeft: 72,
  },
};
