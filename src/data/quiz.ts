export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}


export const QUIZ_QUESTIONS: QuizQuestion[] = Array.from({ length: 7 }, (_, i) => ({
  id: `q${i + 1}`,
  title: `질문 ${i + 1} 제목`,
  subtitle: "질문에 대한 보조 설명",
  options: Array.from({ length: 5 }, (_, j) => ({
    id: `q${i + 1}-o${j + 1}`,
    label: `선택지 ${j + 1}`,
  })),
}));
/*퀴즈 6,7 추후에 추가 예정*/