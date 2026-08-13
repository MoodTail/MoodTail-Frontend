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
    // eslint-disable-next-line no-empty
  } catch {}
}

export function clearQuizProgress(key: string): void {
  try {
    sessionStorage.removeItem(key);
    // eslint-disable-next-line no-empty
  } catch {}
}
