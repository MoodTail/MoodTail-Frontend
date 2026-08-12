import { getDailyHistory, getMonthlyHistory } from "../api/histories/histories.api";
import { getCocktailsByType } from "../data/cocktailGlasses";
import { DEX_DATA } from "../data/dexData";

// 서버 /api/v1/collections의 unlocked/collectionRate가 정상 동작하지 않아서, 히스토리에
// 실제 기록된 칵테일을 직접 집계해 프론트에서 계산합니다. "전체 기간 음주 기록 조회" API가
// 없어서 최근 N개월의 달력(기록 있는 날)을 먼저 불러온 뒤, 그 날짜들의 하루 상세를 다시
// 불러와 실제 칵테일 이름을 모읍니다 — 개월 수가 늘어날수록 API 호출도 늘어나므로 범위를
// 최근 12개월로 제한합니다.
const MONTHS_TO_SCAN = 12;
// 8종 중 4종(50%) 이상 기록하면 해금 — LockedCocktailModal에 안내된 조건과 동일합니다.
const UNLOCK_RATIO = 0.5;

export interface TypeCollectionProgress {
  unlocked: boolean;
  collectionRate: number;
}

function getRecentMonths(count: number): { year: number; month: number }[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  });
}

// 최근 MONTHS_TO_SCAN개월 동안 실제로 기록된 칵테일 이름 집합을 모읍니다.
async function fetchRecordedCocktailNames(): Promise<Set<string>> {
  const months = getRecentMonths(MONTHS_TO_SCAN);
  const calendars = await Promise.all(
    months.map((p) => getMonthlyHistory(p).catch(() => null)),
  );

  // 달력 조회가 전부 실패했다면(네트워크/CORS 등) "기록이 0개"가 아니라 "데이터를 못
  // 받아온 것"이므로, 잘못된 전체 잠김 상태로 화면에 반영되지 않도록 에러를 던집니다.
  if (calendars.every((c) => c === null)) {
    throw new Error("히스토리 달력을 하나도 불러오지 못했습니다");
  }

  const recordedDates = new Set<string>();
  calendars.forEach((calendar) => {
    calendar?.days.forEach((day) => {
      if (day.hasDrinkingRecord) recordedDates.add(day.date);
    });
  });

  const dailyResults = await Promise.all(
    Array.from(recordedDates).map((date) => getDailyHistory(date).catch(() => null)),
  );

  const names = new Set<string>();
  dailyResults.forEach((day) => {
    day?.drinkingRecords.forEach((record) => names.add(record.cocktailName));
  });
  return names;
}

// 로컬 typeId(예: "critic") 기준으로, 그 타입에 배정된 8종 칵테일 중 히스토리에 기록된
// 이름이 몇 종인지 세어 수집률/해금 여부를 계산합니다.
export async function computeCollectionProgress(): Promise<Record<string, TypeCollectionProgress>> {
  const recordedNames = await fetchRecordedCocktailNames();

  const progress: Record<string, TypeCollectionProgress> = {};
  DEX_DATA.forEach((dex) => {
    const typeCocktails = getCocktailsByType(dex.typeNumber);
    const total = typeCocktails.length;
    if (total === 0) {
      progress[dex.typeId] = { unlocked: false, collectionRate: 0 };
      return;
    }
    const matched = typeCocktails.filter((c) => recordedNames.has(c.nameKo)).length;
    progress[dex.typeId] = {
      collectionRate: Math.round((matched / total) * 100),
      unlocked: matched / total >= UNLOCK_RATIO,
    };
  });
  return progress;
}
