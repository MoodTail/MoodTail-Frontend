import passionateChallengerCharacter from "../assets/images/character/character-4.png";
import star21Shape from "../assets/images/result-shapes/star-21.svg";

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
  // TODO: 타입별 배경 무늬(별/구름 모양 등) SVG 에셋 받으면 채우기
  backgroundShape?: string;
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
  },
};
