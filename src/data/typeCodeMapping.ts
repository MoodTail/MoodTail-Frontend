// 로컬 캐릭터 도감 typeId(data/types.ts) ↔ 실제 백엔드 typeCode 매핑입니다.
// 색/이미지는 로컬 데이터를 그대로 쓰고, 이름/설명/맛 프로필/궁합 등 "기본 정보"는
// 이 매핑을 통해 실제 서버 값(getMoodTypeDetail)으로 대체합니다.
// 사용자가 직접 확정한 매핑이며, 로컬 12종과 실제 12종 이름이 겹치지 않는 경우가 많아
// 자동으로 추론할 수 없어 수동으로 지정되어 있습니다.
export const LOCAL_TYPE_TO_TYPECODE: Record<string, string> = {
  idealist: "passionate-challenger",
  romantic: "free-spirited-romantic",
  fantasist: "refreshing-explorer",
  straightforward: "grounded-realist",
  realist: "steadfast-principlist",
  stable: "quiet-supporter",
  analyst: "sensitive-perfectionist",
  peacemaker: "easygoing-optimist",
  critic: "meticulous-critic",
  cautious: "emotional-thinker",
  passionate: "explosive-adventurer",
  egalitarian: "balanced-mediator",
};

export const TYPECODE_TO_LOCAL_TYPE: Record<string, string> = Object.fromEntries(
  Object.entries(LOCAL_TYPE_TO_TYPECODE).map(([localId, typeCode]) => [typeCode, localId]),
);
