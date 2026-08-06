import {
  CHARACTER_GRADIENTS,
  CHARACTER_IMAGES,
  CHARACTER_LABELS,
  CHARACTER_ORDER,
  type CharacterType,
} from "../constants/characters";

// 실제 백엔드 typeCode(12종) 기준 도감 화면 전용 로컬 정보입니다.
// 이름/이미지/그라디언트는 constants/characters.ts를 그대로 따르고, 포인트 컬러만 여기서
// 각 타입 그라디언트의 주조색으로 골라 추가했습니다.
// 설명/맛 프로필/궁합/보유 칵테일 등 실제 콘텐츠는 항상 API(getCollection, getMoodTypeDetail)에서
// 가져오며, 이 파일은 API 응답이 오기 전 잠깐 보여줄 이름·이미지·색만 담당하는 뼈대입니다.
const ACCENTS: Record<CharacterType, string> = {
  "easygoing-optimist": "#FD7A15",
  "free-spirited-romantic": "#FF9458",
  "refreshing-explorer": "#FD8A8A",
  "passionate-challenger": "#1564FE",
  "grounded-realist": "#508AF7",
  "emotional-thinker": "#457EAB",
  "explosive-adventurer": "#FB3F11",
  "meticulous-critic": "#FF682C",
  "sensitive-perfectionist": "#9F2B03",
  "steadfast-principlist": "#3FAE87",
  "quiet-supporter": "#21A26A",
  "balanced-mediator": "#9CC94C",
};

export interface MoodTypeStatic {
  typeCode: CharacterType;
  order: number;
  name: string;
  image: string;
  gradient: string;
  accent: string;
}

export const MOOD_TYPES: MoodTypeStatic[] = CHARACTER_ORDER.map((typeCode, index) => ({
  typeCode,
  order: index,
  name: CHARACTER_LABELS[typeCode],
  image: CHARACTER_IMAGES[typeCode],
  gradient: CHARACTER_GRADIENTS[typeCode],
  accent: ACCENTS[typeCode],
}));

export function getMoodTypeStatic(typeCode: string): MoodTypeStatic {
  return MOOD_TYPES.find((t) => t.typeCode === typeCode) ?? MOOD_TYPES[0];
}

// 도감 그리드/공유 모달 등에서 공통으로 쓰는, 로컬 뼈대 + 실제 수집 현황을 합친 항목입니다.
export interface DexGridEntry {
  typeCode: string;
  name: string;
  image: string;
  accent: string;
  unlocked: boolean;
  collectionRate: number;
}

export function buildDexGridEntries(
  moodTypes?: { typeCode: string; name: string; unlocked: boolean; collectionRate: number }[],
): DexGridEntry[] {
  return MOOD_TYPES.map((mt) => {
    const live = moodTypes?.find((m) => m.typeCode === mt.typeCode);
    return {
      typeCode: mt.typeCode,
      name: live?.name || mt.name,
      image: mt.image,
      accent: mt.accent,
      unlocked: live?.unlocked ?? false,
      collectionRate: live?.collectionRate ?? 0,
    };
  });
}
