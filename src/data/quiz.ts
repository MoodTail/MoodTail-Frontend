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

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    title: "지금 내 머릿속은 어떤 상태인가요?",
    subtitle: "깊게 생각하지 말고 지금 느껴지는 상태를 골라주세요",
    options: [
      { id: "q1-o1", label: "생각이 너무 많아서 멈추질 않아!" },
      { id: "q1-o2", label: "약간 복잡하기는 한데 그럴저럭" },
      { id: "q1-o3", label: "그냥저냥 별 생각 없어" },
      { id: "q1-o4", label: "좀 멍하고 의욕이 없는 상태" },
      { id: "q1-o5", label: "완전 무기력 아무 생각도 하기 싫어..." },
    ],
  },
    
  {
    id: "q2",
    title: "오늘의 기분은 어떤가요?",
    subtitle: "현재 내 감정에 가장 가까운 항목을 선택해 주세요",
    options: [
      { id: "q2-o1", label: "너무 신나!!" },
      { id: "q2-o2", label: "기분 좋은 편!" },
      { id: "q2-o3", label: "그냥저냥 평범한 하루" },
      { id: "q2-o4", label: "왠지 모르게 가라앉는 날..." },
      { id: "q2-o5", label: "말하기도 싫다" },
    ],
  },
    
  {
    id: "q3",
    title: "오늘 하루는 어떠셨나요?",
    subtitle: "오늘 하루를 가볍 돌아보며 골라보세요",
    options: [
      { id: "q3-o1", label: "갓생 그 자체 완벽한 하루" },
      { id: "q3-o2", label: "그래도 해야할 일은 다 함!!" },
      { id: "q3-o3", label: "그냥 무난하게~" },
      { id: "q3-o4", label: "생각보다 조금 피곤 ㅠㅜ" },
      { id: "q3-o5", label: "지쳐쓰러진 상태" },
    ],
  },
  {
    id: "q4",
    title: "지금 이 순간, 끌리는 맛은?",
    subtitle: "지금 딱 떠오르는 직관적인 맛을 선택해 주세요",
    options: [
      { id: "q4-o1", label: "달달하고 부드러운 맛" },
      { id: "q4-o2", label: "새콤달콤이 땡기는데?" },
      { id: "q4-o3", label: "딱히 없음 아무거나" },
      { id: "q4-o4", label: "깔끔하고 시원한거 마시고 싶어" },
      { id: "q4-o5", label: "쓰고~ 진하고~ 묵직하고~" },
    ],
  },
  {
    id: "q5",
    title: "오늘 술, 어느정도로 마실 것 같아요?",
    subtitle: "오늘 원하는 술자리의 텐션을 골라주세요",
    options: [
      { id: "q5-o1", label: "오늘 센 거 마셔도 될듯" },
      { id: "q5-o2", label: "적당히 기분 좋을 정도~" },
      { id: "q5-o3", label: "딱 중간, 무난하게" },
      { id: "q5-o4", label: "살짝만, 취하면 안돼" },
      { id: "q5-o5", label: "거의 논알콜 수준" },
    ],
  },
  {
    id: "q6",
    title: "6?",
    subtitle: ".",
    options: [
      { id: "q6-o1", label: "1" },
      { id: "q6-o2", label: "2" },
      { id: "q6-o3", label: "3" },
      { id: "q6-o4", label: "4" },
      { id: "q6-o5", label: "5" },
    ],
  },
  {
    id: "q7",
    title: "7?",
    subtitle: ".",
    options: [
      { id: "q7-o1", label: "1" },
      { id: "q7-o2", label: "2" },
      { id: "q7-o3", label: "3" },
      { id: "q7-o4", label: "4" },
      { id: "q7-o5", label: "5" },
    ],
  },
];
/*퀴즈 6,7 추후에 추가 예정*/