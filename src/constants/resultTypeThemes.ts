import passionateChallengerCharacter from "../assets/images/character/character-4.png";
import star21Shape from "../assets/images/result-shapes/star-21.svg";
import freeSpiritedRomanticCharacter from "../assets/images/character/character-12.png";
import refreshingExplorerCharacter from "../assets/images/character/character-11.png";
import cloud9345Shape from "../assets/images/result-shapes/cloud-9345.svg";
import explosiveAdventurerCharacter from "../assets/images/character/character-6.png";
import star22Shape from "../assets/images/result-shapes/star-22.svg";
import star23Shape from "../assets/images/result-shapes/star-23.svg";
import sensitivePerfectionistCharacter from "../assets/images/character/character-7.png";
import sensitiveShard1Shape from "../assets/images/share-card/sensitive-shard-1.svg";
import sensitiveShard2Shape from "../assets/images/share-card/sensitive-shard-2.svg";
import sensitiveShard3Shape from "../assets/images/share-card/sensitive-shard-3.svg";
import meticulousCriticCharacter from "../assets/images/character/character-5.png";
import sparkles9585MainShape from "../assets/images/result-shapes/sparkles-9585-main-base.svg";
import sparkles9585AccentShape from "../assets/images/result-shapes/sparkles-9585-accent.svg";
import sparkles9585TopLeftShape from "../assets/images/result-shapes/sparkles-9585-top-left.svg";
import sparkles9585RightShape from "../assets/images/result-shapes/sparkles-9585-right.svg";
import emotionalThinkerCharacter from "../assets/images/character/character-10.png";
import wave9586Shape from "../assets/images/result-shapes/wave-9586.svg";
import steadfastPrinciplistCharacter from "../assets/images/character/character-3.png";
import stripes9588Shape from "../assets/images/result-shapes/stripes-9588.svg";
import backdrop9588Shape from "../assets/images/result-shapes/backdrop-9588.svg";
import groundedRealistCharacter from "../assets/images/character/character-2.png";
import easygoingOptimistCharacter from "../assets/images/character/easygoing-optimist.png";
import circles9596Shape from "../assets/images/result-shapes/circles-9596.svg";
import quietSupporterCharacter from "../assets/images/character/quiet-supporter.png";
import wave9597Shape from "../assets/images/result-shapes/wave-9597.svg";
import balancedMediatorCharacter from "../assets/images/character/balanced-mediator.png";
import circles9598Shape from "../assets/images/result-shapes/circles-9598.svg";

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
  // 배경 무늬만 캐릭터랑 별개로 살짝 밀고 싶을 때 (자동 중앙정렬 위치에서 추가로 미세조정, px)
  backgroundShapeOffsetX?: number;
  backgroundShapeOffsetY?: number;
  // true면 backgroundShape가 없을 때 기본으로 뜨는 흰색 원(background-circle)도 안 띄움
  // (장식 정사각형만 쓰고 원형 배경은 필요 없는 타입용)
  hideBackgroundCircle?: boolean;
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
  // 타입명/설명 글자 크기(px) 오버라이드. 기본은 공통 CSS(32px/12px) 그대로 쓰고,
  // 이 타입만 Figma상 크기가 다를 때만 지정 (다른 타입에 영향 없음)
  typeNameFontSize?: number;
  typeNameMarginTop?: number;
  typeDescriptionFontSize?: number;
  typeDescriptionMarginTop?: number;
  // 설명 글자 색 오버라이드. 기본은 공통 CSS(#fff) 그대로 쓰고, 이 타입만 다를 때만 지정
  typeDescriptionColor?: string;
  quoteMarginTop?: number;
  // "잘 맞는/안 맞는 타입" 작은 카드에서 이 캐릭터가 유독 작게/크게 보일 때만 쓰는 예외적 확대 배율
  // (1 = 원본 그대로, 기본 규칙은 그대로 두고 이 타입만 살짝 키우고 싶을 때 지정)
  matchCardImageScale?: number;
  // 위 카드 안 캐릭터를 위/아래로 살짝 옮기고 싶을 때 (px, 음수면 위로)
  matchCardImageOffsetY?: number;
  // characterLayout: 'positioned' 전용 — 무늬 이미지의 top-left(0,0) 기준 상대 좌표/크기
  characterPositionTop?: number;
  characterPositionLeft?: number;
  characterPositionWidth?: number;
  characterPositionHeight?: number;
  // 캐릭터 그림자 (Figma의 X/Y/blur/color를 그대로 옮긴 CSS drop-shadow 값)
  characterShadow?: string;
  // true면 기본으로 붙는 캐릭터 그림자를 아예 끔 (centered/positioned 공통. Figma에서 "바깥쪽 그림자" 체크 해제된 타입용)
  characterShadowNone?: boolean;
  // 보조 장식 무늬(작은 별 등). 무늬 이미지의 top-left(0,0) 기준 상대 좌표
  accentShape?: string;
  accentShapeWidth?: number;
  accentShapeHeight?: number;
  accentShapeTop?: number;
  accentShapeLeft?: number;
  extraShapes?: {
    src: string;
    width: number;
    height: number;
    top: number;
    left: number;
  }[];
  // 헤더 전체(캐릭터 영역보다 넓은 범위)에 흩어진 흰색 둥근 정사각형 장식들.
  // 각각 독립적으로 위치/크기/회전을 조정할 수 있음. header 기준 절대좌표(px)
  decorativeSquares?: {
    top: number;
    left: number;
    size: number;
    rotation: number;
    // 모서리 반경(px). 생략하면 기본값(square-radius) 사용
    radius?: number;
  }[];
}

export const RESULT_TYPE_THEMES: Record<string, ResultTypeTheme> = {
  "passionate-challenger": {
    name: "열정적인 도전자",
    description: "달콤하고 상큼한 것에 끌리는, 언제나 먼저 달려가는 타입",
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
    name: "자유로운 낭만주의자",
    description: "탄산처럼 톡 튀고 다채로운, 어디서든 분위기를 만드는 타입",
    quote: "안 마셔본거? 그걸로!!",
    detailDescription:
      '그날의 기분에 어울리는 한 잔을 고르는 시간이 가장 설레는 타입이에요. 오늘은 상그리아, 내일은 모스코 뮬. 우산 꽂힌 트로피컬 칵테일처럼 어디서든 분위기를 만들고, 평범한 하루도 특별한 추억으로 바꾸죠. 새로운 경험을 사랑하지만, 결국 기억에 남는 건 함께한 순간이에요.',
    backgroundColor: "#FDAF7A",
    accentColor: "#FF6F4F",
    characterImage: freeSpiritedRomanticCharacter,
    typeNameFontSize: 26,
    typeNameMarginTop: 13,
    typeDescriptionMarginTop: 11,
    quoteMarginTop: 19,
  },
  "refreshing-explorer": {
    name: "청량한 탐험가",
    description: "시원한 호기심으로 새로운 즐거움을 찾아가는 타입",
    quote: "가볍게 한 잔, 가볍게 한 걸음!",
    detailDescription:
      "모히토 한 잔만 있으면 새로운 장소도, 새로운 메뉴도 망설임 없이 도전하는 타입이에요. 가벼운 발걸음으로 다양한 경험을 즐기고, 익숙한 것보다 새로운 것을 만날 때 더 설레죠. 언제나 청량한 에너지로 주변까지 활기차게 만드는 사람이에요.",
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
    description: "강렬하고 극단적인, 한 번 꽂히면 끝까지 밀어붙이는 타입",
    quote: "한 번 시작했으면 끝까지!",
    detailDescription:
      "도수가 세다는 말을 들을수록 더 궁금해지는 타입이에요. 불꽃이 머리 위에서 타오르고 있어도 본인은 그게 일상이에요. 한 번 마음먹으면 끝까지 가고, 중간에 돌아서는 법이 없어요. 강렬한 도수처럼 처음엔 압도되지만, 적응하면 이 사람 없이는 심심해지죠. 극단적이지만 그게 매력인 타입이에요.",
    backgroundColor: "#F8490C",
    accentColor: "#FF0004",
    characterImage: explosiveAdventurerCharacter,
    matchCardImageScale: 0.85,
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
    typeNameMarginTop: 3,
    typeDescriptionMarginTop: 9,
    quoteMarginTop: 19,
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
    description: "날카로운 산미처럼, 디테일 하나도 그냥 넘기지 않는 타입",
    quote: "이 한 방울까지 계산된 선택이야",
    detailDescription:
      '피스코 사워의 산미가 정확히 몇 퍼센트인지 느낄 수 있는 타입이에요. 날카롭게 뻗은 마티니 글라스처럼, 실루엣부터 취향이 분명해요. "그냥 아무거나"는 이 사람의 사전에 없는 말이에요. 디테일을 놓치지 않고, 한 번 틀어진 게 계속 신경 쓰이는 편이지만 그 섬세함 덕분에 결과물은 항상 완벽에 가까워요.',
    backgroundColor: "#FB8558",
    accentColor: "#FD9D78",
    characterImage: sensitivePerfectionistCharacter,
    matchCardImageScale: 0.7,
    backgroundShapeWidth: 600,
    backgroundShapeHeight: 490,
    hideBackgroundCircle: true,
    contentOffsetY: 65,
    characterLayout: "positioned",
    characterPositionTop: 8,
    characterPositionLeft: 185.73,
    characterPositionWidth: 228.55,
    characterPositionHeight: 334,
    typeNameMarginTop: 7,
    typeDescriptionMarginTop: 10,
    quoteMarginTop: 19,
    extraShapes: [
      {
        src: sensitiveShard1Shape,
        width: 346,
        height: 214,
        top: 70,
        left: 120,
      },
      // Vector 612: 이 값만 바꾸면 큰 대각선 세모 하나만 움직입니다.
      {
        src: sensitiveShard2Shape,
        width: 516,
        height: 320,
        top: 135,
        left: 47,
      },
      {
        src: sensitiveShard3Shape,
        width: 265,
        height: 84,
        top: 82,
        left: 105,
      },
    ],
  },
  "meticulous-critic": {
    name: "꼼꼼한 평론가",
    description: "작은 차이도 놓치지 않는, 자신만의 기준으로 맛을 살펴보는 타입",
    quote: "생각보다 재미있는 조합이네",

    detailDescription:
      "에스프레소 마티니처럼 한 모금에도 다양한 맛을 발견하는 타입이에요. 작은 차이도 그냥 지나치지 않고, 자신만의 기준으로 하나하나 살펴보죠. 디테일을 보는 눈이 뛰어나고, 좋은 건 좋다고, 아쉬운 건 아쉽다고 솔직하게 말해요. 까다로워 보일 수 있지만 그만큼 보는 눈이 정확한 타입이에요.",
    backgroundColor: "#AC3E10",
    accentColor: "#FB7915",
    characterImage: meticulousCriticCharacter,
    matchCardImageOffsetY: 4,
    characterWidth: 254,
    backgroundShape: sparkles9585MainShape,
    backgroundShapeWidth: 420,
    backgroundShapeHeight: 500,
    contentOffsetX: 35,
    contentOffsetY: 20,
    characterOffsetX: 20,
    characterOffsetY: 20,
    typeNameMarginTop: 9,
    // Figma 원본 좌표(454x543 캔버스) 기준 아래쪽 별 2개 위치를, 표시 크기(420x500)에 맞춰 환산
    accentShape: sparkles9585AccentShape,
    accentShapeWidth: 82,
    accentShapeHeight: 113,
    accentShapeTop: 301,
    accentShapeLeft: 72,
    extraShapes: [
      {
        src: sparkles9585TopLeftShape,
        width: 171,
        height: 191,
        top: 35,
        left: -8,
      },
      {
        src: sparkles9585RightShape,
        width: 240,
        height: 177,
        top: 168,
        left: 200,
      },
    ],
  },
  "emotional-thinker": {
    name: "감성적인 사색가",
    description: "복잡하고 깊은 여운처럼, 혼자만의 세계에서 사색하는 타입",
    quote: "기분을 이 잔에 담아둘래",
    detailDescription:
      "잔을 들고 조용히 생각에 잠겨 있는 모습이 가장 잘 어울리는 타입이에요. 혼자만의 시간을 즐기며 오늘의 감정과 생각을 차분히 정리하죠. 쉽게 속마음을 드러내지는 않지만, 세상을 누구보다 깊이 바라보고 오래 기억하는 사람이에요.",
    backgroundColor: "#346A99",
    accentColor: "#4E75A4",
    characterImage: emotionalThinkerCharacter,
    characterWidth: 275,
    backgroundShape: wave9586Shape,
    backgroundShapeWidth: 400,
    backgroundShapeHeight: 455,
    contentOffsetY: 80,
    characterOffsetY: 10,
  },
  "steadfast-principlist": {
    name: "진중한 원칙주의자",
    description: "쓴맛도 즐길 줄 아는, 타협 없이 자신의 기준을 지키는 타입",
    quote: "기준이 있어야 선택도 의미 있어",
    detailDescription:
      '네그로니의 쓴 맛을 즐길 줄 아는 타입이에요. 남들이 “이거 너무 쓰다”고 할 때도, 오히려 한 모금 더 음미하죠. 자신만의 기준이 분명하고 쉽게 타협하지 않아요. 차갑게 보일 때도 있지만, 믿음직스럽고 오래 알수록 의외의 따뜻함이 느껴지는 사람이에요.  ',
    backgroundColor: "#124480",
    accentColor: "#4E75A4",
    characterImage: steadfastPrinciplistCharacter,
    backgroundShape: backdrop9588Shape,
    backgroundShapeWidth: 400,
    backgroundShapeHeight: 223,
    backgroundShapeOffsetY: 10,
    // 배경판/줄무늬 폭(394)이 프레임 폭과 거의 같아서, 래퍼 폭을 그대로 맞춰
    // 가운데 정렬 계산 때 왼쪽에 여백이 남지 않도록 함
    wrapWidth: 450,
    // 캐릭터+배경판+줄무늬 전체를 한꺼번에 왼쪽으로 이동
    contentOffsetX: -49,
    // Figma 실측: 배경판 top92, 캐릭터(Group9278) top98 left45 303.81x286
    // -> 배경판 기준 상대좌표: top 98-92=6, left 45-0=45 (+20 보정 = 65)
    characterLayout: "positioned",
    characterPositionTop: 15,
    characterPositionLeft: 50,
    characterPositionWidth: 303.81,
    characterPositionHeight: 286,
    typeNameMarginTop: 5,
    typeDescriptionMarginTop: 10,
    quoteMarginTop: 19,
    characterShadow: "drop-shadow(8px 6px 4px rgba(0, 0, 0, 0.25))",
    // Figma 실측: 줄무늬 5개 top 327/379/405/418/424 -> 배경판 기준 상대좌표 327-92=235
    accentShape: stripes9588Shape,
    accentShapeWidth: 400,
    accentShapeHeight: 99,
    accentShapeTop: 243,
    accentShapeLeft: 0,
  },
  "grounded-realist": {
    name: "묵직한 현실주의자",
    description: "클래식하고 깊은 맛처럼, 말보다 무게로 말하는 타입",
    quote: "묵직한 한 잔이 오래 남는 법이지.",
    detailDescription:
      "화려한 가니쉬보다 잘 숙성된 베이스 한 모금에 더 끌리는 타입이에요. 팔짱을 끼고 조용히 앉아 있어도 존재감이 느껴지죠. 말수가 적은 편이지만, 입을 열면 핵심만 말해요. 단순해 보여도 깊이가 있고, 시간이 지날수록 진가를 알게 되는 타입이에요.",
    backgroundColor: "#1564FE",
    accentColor: "#0022FF",
    characterImage: groundedRealistCharacter,
    characterShadow: "drop-shadow(9px 1px 4px rgba(0, 0, 0, 0.25))",
    hideBackgroundCircle: true,
    typeNameFontSize: 26,
    typeDescriptionMarginTop: 11,
    quoteMarginTop: 19,
    characterWidth: 190.24,
    characterOffsetX: -1.38,
    characterOffsetY: 18.11,
    // 4개의 정사각형 전부 독립적으로 위치/크기/회전 조정 가능 (각 top/left/size/rotation/radius 직접 수정)
    // 아래 top/left는 Figma가 보여주는 값(회전된 바운딩박스 기준)을, CSS의 회전-전 박스 좌표로
    // 역산해서 변환한 값 (Figma X/Y = 회전 후 바운딩박스, CSS top/left = 회전 전 박스 기준이라 다름)
    decorativeSquares: [
      // 맨 위, 거의 잘려있는 정사각형 (Rectangle 161124700)
      { top: -188.58, left: 139.42, size: 209.67, rotation: -45, radius: 34 },
      // 캐릭터 뒤에 위치한 정사각형 2개 (Rectangle 161124701, 161124700)
      { top: 192.6, left: 130.15, size: 217.09, rotation: -12.76, radius: 34 },
      { top: 113.79, left: 58.79, size: 217.09, rotation: 23.01, radius: 34 },
      // 설명글(상세카드) 뒤에 가려져있는 정사각형 (Rectangle 161124702)
      { top: 515, left: -18.31, size: 209.67, rotation: -25, radius: 34 },
    ],
  },
  "easygoing-optimist": {
    name: "여유로운 낙관자",
    description: "달콤하고 화사한 과일향처럼, 어디서나 따뜻한 기운을 주는 타입",
    quote: "괜찮아, 결국엔 다 잘 풀릴거야!",
    detailDescription:
      "테킬라 선라이즈처럼 보기만 해도 기분이 좋아지는 타입이에요. 달콤하고 화사한 과일향처럼 주변에 따뜻한 기운을 퍼뜨리죠. 눈을 감고 힐링 중인 모습이 가장 자연스럽고, 급하지 않아요. 다 잘 될 거라는 걸 본능적으로 알고 있거든요. 이 사람 옆에 있으면 왠지 덩달아 여유로워지는 타입이에요.",
    backgroundColor: "#66BC88",
    accentColor: "#66BC88",
    characterImage: easygoingOptimistCharacter,
    typeNameMarginTop: 5,
    typeDescriptionMarginTop: 9,
    quoteMarginTop: 19,
    matchCardImageScale: 1.25,
    matchCardImageOffsetY: -7,
    backgroundShape: circles9596Shape,
    backgroundShapeWidth: 509,
    backgroundShapeHeight: 320,
    characterLayout: "positioned",
    // Figma 원본 좌표(Ellipse 958~961, Group 9377 모두 같은 프레임 기준):
    // 무늬(원 5개) 전체 bbox: top113 left-69, right440 bottom433 -> width509 height320
    // 캐릭터(Group 9377) top78 left32.89 327.54x353
    // -> 무늬 기준 상대좌표: top 78-113=-35, left 32.89-(-69)=101.89
    characterPositionTop: -35,
    characterPositionLeft: 95,
    characterPositionWidth: 327.54,
    characterPositionHeight: 353,
  },
  "quiet-supporter": {
    name: "조용한 지지자",
    description: "부드러운 온기처럼, 곁에서 조용히 힘이 되어주는 타입",
    quote: "말은 없어도 언제나 네 편이야",
    detailDescription:
      "화려하게 나서진 않지만, 필요한 순간엔 가장 먼저 손을 내미는 타입이에요. 말보다 행동으로 마음을 전하고, 언제나 묵묵하게 곁을 지켜주죠. 오래 함께할수록 든든함이 더 크게 느껴지는 사람이에요.",
    backgroundColor: "#21A26A",
    accentColor: "#21A26A",
    characterImage: quietSupporterCharacter,
    matchCardImageOffsetY: 5,
    backgroundShape: wave9597Shape,
    backgroundShapeWidth: 445,
    backgroundShapeHeight: 474,
    backgroundShapeOffsetX: 0,
    backgroundShapeOffsetY: 80,
    characterLayout: "positioned",
    // Figma: 무늬(Vector 614, 실제 경로 bbox) top142 left-42, 캐릭터(Group 209) top85 left59 275.74x329.91
    // wave-9597.svg는 원본 445x474 캔버스 그대로 써서 무늬의 실제 경로가 캔버스 안에서 y=59만큼 아래
    // 떠 있음(getBBox로 확인) -> 캔버스 원점(0,0)의 프레임좌표는 top(142-59)=83, left-42
    // -> 캐릭터 상대좌표: top 85-83=2, left 59-(-42)=101
    characterPositionTop: 85,
    characterPositionLeft: 85,
    characterPositionWidth: 275.74,
    characterPositionHeight: 329.91,
  },
  "balanced-mediator": {
    name: "균형적인 중재자",
    description: "어느 한쪽으로 치우치지 않는, 모든 자리에 자연스럽게 녹아드는 타입",
    quote: "모두가 만족하는 한 잔이면 충분해",
    detailDescription:
      "위스키 사워처럼 달고 시고 쓴 게 딱 균형 잡힌 타입이에요. 어느 한쪽으로 치우치지 않고, 모든 자리에 자연스럽게 녹아들어요. 갈등이 생기면 자연스럽게 가운데서 조율하고 있는 게 이 사람이에요. 가장 무난해 보이지만, 실은 가장 없어서는 안 될 타입이에요.",
    backgroundColor: "#6DCC9F",
    accentColor: "#21A26A",
    characterImage: balancedMediatorCharacter,
    backgroundShape: circles9598Shape,
    backgroundShapeWidth: 744,
    backgroundShapeHeight: 343,
    contentOffsetY: 20,
    characterLayout: "positioned",
    // Figma: 무늬(원 2개, 실제 경로 bbox) top98 left-177, 캐릭터(Group 211) top84 left53.38 286.92x329
    // -> 무늬 기준 상대좌표: top 84-98=-14, left 53.38-(-177)=230.38
    characterPositionTop: -14,
    characterPositionLeft: 230.38,
    characterPositionWidth: 286.92,
    characterPositionHeight: 329,
  },
};
