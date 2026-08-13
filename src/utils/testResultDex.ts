const STORAGE_KEY = "moodtail_test_result_types";

function readReceivedTypes(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

// 오늘의 취향 테스트에서 해당 타입을 결과로 받은 적이 있으면 기록해둡니다.
// (LockedCocktailModal의 "테스트에서 결과 받기" 해금 조건에 쓰입니다 — 히스토리 기록과
// 별개로, 테스트 결과를 받는 것만으로도 해금되는 조건이라 서버 히스토리로는 알 수 없습니다.)
export function markTypeReceivedAsTestResult(typeId: string): void {
  const types = readReceivedTypes();
  if (types.has(typeId)) return;
  types.add(typeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(types)));
}

export function getReceivedTestResultTypes(): Set<string> {
  return readReceivedTypes();
}
