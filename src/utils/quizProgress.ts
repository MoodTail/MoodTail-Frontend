import type { QuizQuestion } from "../data/quiz";

export interface QuizProgress {
  step: number;
  answers: Record<number, string>;
  questions: QuizQuestion[];
}

export function loadQuizProgress(key: string): QuizProgress | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.questions)) return null;
    return parsed as QuizProgress;
  } catch {
    return null;
  }
}

export function saveQuizProgress(key: string, progress: QuizProgress): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(progress));
  } catch {
    // 저장 실패(프라이빗 브라우징 등)는 무시 — 진행 상황 복원만 안 될 뿐 앱 동작에는 영향 없습니다.
  }
}

export function clearQuizProgress(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}
