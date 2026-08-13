const STORAGE_KEY = "moodtail_test_result_types";

function readReceivedTypes(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function markTypeReceivedAsTestResult(typeId: string): void {
  const types = readReceivedTypes();
  if (types.has(typeId)) return;
  types.add(typeId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(types)));
}

export function getReceivedTestResultTypes(): Set<string> {
  return readReceivedTypes();
}
