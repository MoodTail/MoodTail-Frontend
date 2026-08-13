import { getDailyHistory, getMonthlyHistory } from "../api/histories/histories.api";
import { getCocktailsByType } from "../data/cocktailGlasses";
import { DEX_DATA } from "../data/dexData";
import { getReceivedTestResultTypes } from "./testResultDex";

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
// 달력 조회가 전부 실패해도(네트워크/CORS, 게스트 등) 빈 집합으로 계속 진행합니다 —
// 히스토리 기반 해금은 그만큼 못 받아오지만, 테스트 결과 기반 해금(OR 조건)은
// 히스토리 API와 무관하게 계속 동작해야 하기 때문입니다.
async function fetchRecordedCocktailNames(): Promise<Set<string>> {
  const months = getRecentMonths(MONTHS_TO_SCAN);
  const calendars = await Promise.all(
    months.map((p) => getMonthlyHistory(p).catch(() => null)),
  );

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
// 해금 조건은 둘 중 하나만 만족해도 됩니다(LockedCocktailModal 안내와 동일):
// 1) 히스토리 기록 50%(4/8잔) 이상, 2) 오늘의 취향 테스트에서 그 타입을 결과로 받은 적 있음.
export async function computeCollectionProgress(): Promise<Record<string, TypeCollectionProgress>> {
  const recordedNames = await fetchRecordedCocktailNames();
  const receivedTypes = getReceivedTestResultTypes();

  const progress: Record<string, TypeCollectionProgress> = {};
  DEX_DATA.forEach((dex) => {
    const typeCocktails = getCocktailsByType(dex.typeNumber);
    const total = typeCocktails.length;
    if (total === 0) {
      progress[dex.typeId] = { unlocked: receivedTypes.has(dex.typeId), collectionRate: 0 };
      return;
    }
    const matched = typeCocktails.filter((c) => recordedNames.has(c.nameKo)).length;
    progress[dex.typeId] = {
      collectionRate: Math.round((matched / total) * 100),
      unlocked: matched / total >= UNLOCK_RATIO || receivedTypes.has(dex.typeId),
    };
  });
  return progress;
}
