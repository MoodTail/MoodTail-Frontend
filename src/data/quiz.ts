export type TasteStat = "당도" | "산도" | "쓴맛" | "청량감" | "도수";

export interface QuizStatAdjustment {
  stat: TasteStat;
  value: number;
}

export interface QuizOption {
  id: string;
  label: string;
  statAdjustments?: QuizStatAdjustment[];
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

const BASE_QUESTIONS: QuizQuestion[] = [
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
];

// 6, 7번 문항은 매 테스트마다 아래 문항 풀에서 무작위로 2개를 뽑아 사용합니다.
export const QUIZ_QUESTION_POOL: QuizQuestion[] = [
  {
    id: "pool1",
    title: "친구가 '오늘 한잔?'이라고 하면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool1-o1", label: "달달한게 좋아", statAdjustments: [{ stat: "당도", value: 0.6 }] },
      { id: "pool1-o2", label: "상큼한 거 좋지", statAdjustments: [{ stat: "산도", value: 0.6 }] },
      { id: "pool1-o3", label: "분위기 좋은 바 가자", statAdjustments: [{ stat: "쓴맛", value: 0.4 }, { stat: "도수", value: 0.2 }] },
      { id: "pool1-o4", label: "시원한 하이볼!", statAdjustments: [{ stat: "청량감", value: 0.7 }] },
      { id: "pool1-o5", label: "독한 걸로 가자", statAdjustments: [{ stat: "도수", value: 0.8 }, { stat: "청량감", value: -0.2 }] },
    ],
  },
  {
    id: "pool2",
    title: "새로운 사람을 만나면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool2-o1", label: "먼저 말을 건다", statAdjustments: [{ stat: "청량감", value: 0.5 }] },
      { id: "pool2-o2", label: "웃으며 분위기를 푼다", statAdjustments: [{ stat: "당도", value: 0.5 }] },
      { id: "pool2-o3", label: "천천히 관찰한다", statAdjustments: [{ stat: "쓴맛", value: 0.6 }] },
      { id: "pool2-o4", label: "공통점을 찾는다", statAdjustments: [{ stat: "산도", value: 0.5 }] },
      { id: "pool2-o5", label: "강한 인상을 남긴다", statAdjustments: [{ stat: "도수", value: 0.7 }] },
    ],
  },
  {
    id: "pool3",
    title: "여행에서 가장 기대되는 것은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool3-o1", label: "현지 디저트", statAdjustments: [{ stat: "당도", value: 0.6 }] },
      { id: "pool3-o2", label: "새로운 음식", statAdjustments: [{ stat: "산도", value: 0.6 }] },
      { id: "pool3-o3", label: "분위기 좋은 카페", statAdjustments: [{ stat: "쓴맛", value: 0.5 }] },
      { id: "pool3-o4", label: "액티비티", statAdjustments: [{ stat: "청량감", value: 0.7 }] },
      { id: "pool3-o5", label: "로컬 펍", statAdjustments: [{ stat: "도수", value: 0.8 }] },
    ],
  },
  {
    id: "pool4",
    title: "스트레스를 받으면 가장 먼저 하는 행동은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool4-o1", label: "단 걸 먹는다", statAdjustments: [{ stat: "당도", value: 0.8 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool4-o2", label: "밖으로 나간다", statAdjustments: [{ stat: "산도", value: 0.5 }] },
      { id: "pool4-o3", label: "혼자 생각한다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }] },
      { id: "pool4-o4", label: "찬물로 씻는다", statAdjustments: [{ stat: "청량감", value: 0.7 }] },
      { id: "pool4-o5", label: "술 한잔한다", statAdjustments: [{ stat: "도수", value: 0.8 }] },
    ],
  },
  {
    id: "pool5",
    title: "새로운 취미를 시작한다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool5-o1", label: "베이킹", statAdjustments: [{ stat: "당도", value: 0.6 }] },
      { id: "pool5-o2", label: "사진 찍기", statAdjustments: [{ stat: "산도", value: 0.6 }] },
      { id: "pool5-o3", label: "독서", statAdjustments: [{ stat: "쓴맛", value: 0.7 }] },
      { id: "pool5-o4", label: "서핑", statAdjustments: [{ stat: "청량감", value: 0.8 }] },
      { id: "pool5-o5", label: "칵테일 만들기", statAdjustments: [{ stat: "도수", value: 0.6 }] },
    ],
  },
  {
    id: "pool6",
    title: "여행 중 길을 잃었다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool6-o1", label: "목적지를 바꾼다", statAdjustments: [{ stat: "당도", value: 0.5 }] },
      { id: "pool6-o2", label: "일단 걸어본다", statAdjustments: [{ stat: "산도", value: 0.6 }] },
      { id: "pool6-o3", label: "지도를 본다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }] },
      { id: "pool6-o4", label: "재밌다며 즐긴다", statAdjustments: [{ stat: "청량감", value: 0.8 }] },
      { id: "pool6-o5", label: "인터넷 검색한다", statAdjustments: [{ stat: "도수", value: 0.7 }] },
    ],
  },
  {
    id: "pool7",
    title: "친구가 새로운 메뉴를 추천하면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool7-o1", label: "달달하면 먹는다", statAdjustments: [{ stat: "당도", value: 0.6 }] },
      { id: "pool7-o2", label: "일단 먹어본다", statAdjustments: [{ stat: "산도", value: 0.6 }] },
      { id: "pool7-o3", label: "후기를 찾아본다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }] },
      { id: "pool7-o4", label: "괜찮아 보이면 먹는다", statAdjustments: [{ stat: "청량감", value: 0.7 }] },
      { id: "pool7-o5", label: "독하면 더 좋다", statAdjustments: [{ stat: "도수", value: 0.8 }] },
    ],
  },
  {
    id: "pool8",
    title: "친구와 카페에 갔는데 사람이 많다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool8-o1", label: "디저트를 먹으며 기다린다", statAdjustments: [{ stat: "당도", value: 0.5 }] },
      { id: "pool8-o2", label: "다른 카페를 찾아본다", statAdjustments: [{ stat: "산도", value: 0.6 }] },
      { id: "pool8-o3", label: "조용히 기다린다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }] },
      { id: "pool8-o4", label: "테이크아웃해서 밖으로 간다", statAdjustments: [{ stat: "청량감", value: 0.8 }] },
      { id: "pool8-o5", label: "디저트는 패스하고 술집으로 간다", statAdjustments: [{ stat: "도수", value: 0.7 }] },
    ],
  },
  {
    id: "pool9",
    title: "친구가 갑자기 여행을 가자고 한다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool9-o1", label: "맛집이 많으면 간다", statAdjustments: [{ stat: "당도", value: 0.5 }] },
      { id: "pool9-o2", label: "재밌을 것 같으면 간다", statAdjustments: [{ stat: "산도", value: 0.5 }] },
      { id: "pool9-o3", label: "계획부터 세운다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }] },
      { id: "pool9-o4", label: "당장 떠난다", statAdjustments: [{ stat: "청량감", value: 0.8 }] },
      { id: "pool9-o5", label: "주류가 유명하면 간다", statAdjustments: [{ stat: "도수", value: 0.7 }] },
    ],
  },
  {
    id: "pool10",
    title: "가장 마음이 편해지는 순간은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool10-o1", label: "달콤한 간식을 먹을 때", statAdjustments: [{ stat: "당도", value: 0.7 }] },
      { id: "pool10-o2", label: "햇살 아래 산책할 때", statAdjustments: [{ stat: "산도", value: 0.5 }] },
      { id: "pool10-o3", label: "혼자 조용히 있을 때", statAdjustments: [{ stat: "쓴맛", value: 0.7 }] },
      { id: "pool10-o4", label: "시원한 바람을 맞을 때", statAdjustments: [{ stat: "청량감", value: 0.8 }] },
      { id: "pool10-o5", label: "늦은 밤 한잔할 때", statAdjustments: [{ stat: "도수", value: 0.7 }] },
    ],
  },
  {
    id: "pool11",
    title: "피곤한 날 가장 필요한 것은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool11-o1", label: "달콤한 간식", statAdjustments: [{ stat: "당도", value: 0.7 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool11-o2", label: "상큼한 과일", statAdjustments: [{ stat: "산도", value: 0.7 }, { stat: "도수", value: -0.2 }] },
      { id: "pool11-o3", label: "조용한 휴식", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool11-o4", label: "시원한 바람", statAdjustments: [{ stat: "청량감", value: 0.8 }, { stat: "도수", value: -0.2 }] },
      { id: "pool11-o5", label: "강한 한잔", statAdjustments: [{ stat: "도수", value: 0.8 }, { stat: "당도", value: -0.3 }] },
    ],
  },
  {
    id: "pool12",
    title: "여행지에서 가장 오래 머무를 곳은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool12-o1", label: "디저트 맛집", statAdjustments: [{ stat: "당도", value: 0.6 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool12-o2", label: "과일시장", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "당도", value: -0.2 }] },
      { id: "pool12-o3", label: "로컬 카페", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "산도", value: -0.2 }] },
      { id: "pool12-o4", label: "해변", statAdjustments: [{ stat: "청량감", value: 0.8 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool12-o5", label: "펍", statAdjustments: [{ stat: "도수", value: 0.8 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool13",
    title: "친구들이 나를 데려갈 것 같은 곳은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool13-o1", label: "베이커리", statAdjustments: [{ stat: "당도", value: 0.7 }, { stat: "도수", value: -0.2 }] },
      { id: "pool13-o2", label: "브런치 카페", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool13-o3", label: "조용한 카페", statAdjustments: [{ stat: "쓴맛", value: 0.8 }, { stat: "당도", value: -0.2 }] },
      { id: "pool13-o4", label: "계곡", statAdjustments: [{ stat: "청량감", value: 0.8 }, { stat: "도수", value: -0.2 }] },
      { id: "pool13-o5", label: "칵테일 바", statAdjustments: [{ stat: "도수", value: 0.8 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool14",
    title: "비 오는 날 가장 하고 싶은 것은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool14-o1", label: "케이크 먹기", statAdjustments: [{ stat: "당도", value: 0.7 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool14-o2", label: "과일주스 마시기", statAdjustments: [{ stat: "산도", value: 0.7 }, { stat: "도수", value: -0.2 }] },
      { id: "pool14-o3", label: "책 읽기", statAdjustments: [{ stat: "쓴맛", value: 0.8 }, { stat: "당도", value: -0.2 }] },
      { id: "pool14-o4", label: "드라이브", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool14-o5", label: "위스키 마시기", statAdjustments: [{ stat: "도수", value: 0.8 }, { stat: "당도", value: -0.3 }] },
    ],
  },
  {
    id: "pool15",
    title: "처음 보는 음료를 고른다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool15-o1", label: "달달해 보이는 음료", statAdjustments: [{ stat: "당도", value: 0.7 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool15-o2", label: "색이 예쁜 음료", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool15-o3", label: "제일 익숙한 음료", statAdjustments: [{ stat: "쓴맛", value: 0.8 }, { stat: "산도", value: -0.2 }] },
      { id: "pool15-o4", label: "가장 시원해보이는 음료", statAdjustments: [{ stat: "청량감", value: 0.8 }, { stat: "당도", value: -0.2 }] },
      { id: "pool15-o5", label: "가장 강렬한 음료", statAdjustments: [{ stat: "도수", value: 0.8 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool16",
    title: "오늘 가장 듣고 싶은 말은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool16-o1", label: "푹 쉬어", statAdjustments: [{ stat: "당도", value: 0.6 }, { stat: "도수", value: -0.2 }] },
      { id: "pool16-o2", label: "기분 전환하자", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool16-o3", label: "천천히 생각해", statAdjustments: [{ stat: "쓴맛", value: 0.8 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool16-o4", label: "밖으로 나가자", statAdjustments: [{ stat: "청량감", value: 0.8 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool16-o5", label: "오늘 한 잔 하자", statAdjustments: [{ stat: "도수", value: 0.8 }, { stat: "당도", value: -0.3 }] },
    ],
  },
  {
    id: "pool17",
    title: "새로운 메뉴를 주문할 때 나는?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool17-o1", label: "익숙해 보여도 맛있으면 된다", statAdjustments: [{ stat: "당도", value: 0.4 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool17-o2", label: "설명이 가장 흥미로운 걸 고른다", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.3 }] },
      { id: "pool17-o3", label: "후기를 꼼꼼히 읽는다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.3 }] },
      { id: "pool17-o4", label: "처음 보는 조합을 고른다", statAdjustments: [{ stat: "청량감", value: 0.6 }, { stat: "산도", value: 0.3 }] },
      { id: "pool17-o5", label: "가장 자극적으로 보이는 걸 고른다", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool18",
    title: "친구들이 나를 가장 잘 표현한다고 생각하는 말은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool18-o1", label: "편안하다", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "도수", value: -0.2 }] },
      { id: "pool18-o2", label: "호기심이 많다", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool18-o3", label: "신중하다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.3 }] },
      { id: "pool18-o4", label: "에너지가 넘친다", statAdjustments: [{ stat: "청량감", value: 0.6 }, { stat: "산도", value: 0.2 }] },
      { id: "pool18-o5", label: "카리스마 있다", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool19",
    title: "주말이 갑자기 비게 된다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool19-o1", label: "맛있는 걸 먹으러 간다", statAdjustments: [{ stat: "당도", value: 0.6 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool19-o2", label: "새로운 장소를 찾아간다", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.3 }] },
      { id: "pool19-o3", label: "집에서 책이나 영화를 본다", statAdjustments: [{ stat: "쓴맛", value: 0.6 }, { stat: "당도", value: -0.2 }] },
      { id: "pool19-o4", label: "드라이브나 산책을 간다", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "도수", value: -0.2 }] },
      { id: "pool19-o5", label: "술 한잔하며 하루를 보낸다", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool20",
    title: "친구와 의견이 다를 때 나는?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool20-o1", label: "분위기를 좋게 만든다", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool20-o2", label: "새로운 방법을 제안한다", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool20-o3", label: "논리적으로 설명한다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.3 }] },
      { id: "pool20-o4", label: "일단 해보자고 한다", statAdjustments: [{ stat: "청량감", value: 0.6 }, { stat: "산도", value: 0.3 }] },
      { id: "pool20-o5", label: "강하게 밀어붙인다", statAdjustments: [{ stat: "도수", value: 0.6 }, { stat: "청량감", value: -0.2 }] },
    ],
  },
  {
    id: "pool21",
    title: "예상보다 일이 빨리 끝났다. 가장 먼저 드는 생각은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool21-o1", label: "맛있는 거 먹자", statAdjustments: [{ stat: "당도", value: 0.6 }, { stat: "도수", value: -0.2 }] },
      { id: "pool21-o2", label: "어디 놀러 갈까?", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.3 }] },
      { id: "pool21-o3", label: "여유롭게 쉬자", statAdjustments: [{ stat: "쓴맛", value: 0.6 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool21-o4", label: "몸을 움직이고 싶다", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "산도", value: 0.2 }] },
      { id: "pool21-o5", label: "오늘 한잔해야겠다", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "당도", value: -0.2 }] },
    ],
  },
  {
    id: "pool22",
    title: "친구가 선물을 고르기 어렵다고 하면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool22-o1", label: "무난하게 좋아할 걸 추천한다", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool22-o2", label: "새로운 걸 추천한다", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool22-o3", label: "오래 쓸 수 있는 걸 추천한다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.2 }] },
      { id: "pool22-o4", label: "재밌는 걸 추천한다", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "산도", value: 0.2 }] },
      { id: "pool22-o5", label: "인상적인 걸 추천한다", statAdjustments: [{ stat: "도수", value: 0.6 }, { stat: "쓴맛", value: 0.2 }] },
    ],
  },
  {
    id: "pool23",
    title: "술 한 잔 하러 왔어요. 가장 먼저 눈이 가는 자리는?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool23-o1", label: "디저트가 보이는 창가", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool23-o2", label: "창문 앞 테이블", statAdjustments: [{ stat: "산도", value: 0.4 }, { stat: "청량감", value: 0.3 }] },
      { id: "pool23-o3", label: "바텐더 앞", statAdjustments: [{ stat: "쓴맛", value: 0.6 }, { stat: "당도", value: -0.2 }] },
      { id: "pool23-o4", label: "야외 테라스", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "도수", value: -0.2 }] },
      { id: "pool23-o5", label: "조명이 어두운 바 자리", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool24",
    title: "바텐더가 \"오늘은 어떤 기분이세요?\"라고 묻는다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool24-o1", label: "기분 좋아지는 한 잔이요", statAdjustments: [{ stat: "당도", value: 0.6 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool24-o2", label: "새로운 걸 마셔보고 싶어요", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.3 }] },
      { id: "pool24-o3", label: "조용히 즐길게요", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.3 }] },
      { id: "pool24-o4", label: "시원하게 마시고 싶어요", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "도수", value: -0.2 }] },
      { id: "pool24-o5", label: "강렬한 걸로 주세요", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool25",
    title: "칵테일이 나오기까지 시간이 남았어요. 무엇을 할까요?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool25-o1", label: "사진부터 찍는다", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "산도", value: 0.2 }] },
      { id: "pool25-o2", label: "메뉴판을 다시 읽는다", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool25-o3", label: "가게 분위기를 둘러본다", statAdjustments: [{ stat: "쓴맛", value: 0.6 }, { stat: "당도", value: -0.2 }] },
      { id: "pool25-o4", label: "친구와 이야기한다", statAdjustments: [{ stat: "청량감", value: 0.6 }, { stat: "산도", value: 0.2 }] },
      { id: "pool25-o5", label: "다음 잔을 고른다", statAdjustments: [{ stat: "도수", value: 0.6 }, { stat: "쓴맛", value: 0.2 }] },
    ],
  },
  {
    id: "pool26",
    title: "새로운 칵테일 이름을 발견했어요. 어떻게 할까요?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool26-o1", label: "이름이 귀여우면 주문", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "청량감", value: -0.2 }] },
      { id: "pool26-o2", label: "재료부터 본다", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "쓴맛", value: 0.2 }] },
      { id: "pool26-o3", label: "익숙한 메뉴를 고른다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.2 }] },
      { id: "pool26-o4", label: "일단 도전한다", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "산도", value: 0.2 }] },
      { id: "pool26-o5", label: "도수가 높은지부터 본다", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool27",
    title: "친구가 내 잔을 한입 달라고 한다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool27-o1", label: "기꺼이 준다", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool27-o2", label: "대신 한입 바꿔 마신다", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.3 }] },
      { id: "pool27-o3", label: "조금만 준다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.2 }] },
      { id: "pool27-o4", label: "재밌겠다며 바꿔 마신다", statAdjustments: [{ stat: "청량감", value: 0.6 }, { stat: "산도", value: 0.2 }] },
      { id: "pool27-o5", label: "내 건 안 뺏긴다", statAdjustments: [{ stat: "도수", value: 0.6 }, { stat: "쓴맛", value: 0.2 }] },
    ],
  },
  {
    id: "pool28",
    title: "칵테일을 다 마신 후 가장 먼저 드는 생각은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool28-o1", label: "디저트 먹고 싶다", statAdjustments: [{ stat: "당도", value: 0.6 }, { stat: "쓴맛", value: -0.2 }] },
      { id: "pool28-o2", label: "다른 메뉴도 궁금하다", statAdjustments: [{ stat: "산도", value: 0.6 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool28-o3", label: "여운을 즐긴다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.2 }] },
      { id: "pool28-o4", label: "한 잔 더 가볍게 마실까?", statAdjustments: [{ stat: "청량감", value: 0.6 }, { stat: "도수", value: -0.2 }] },
      { id: "pool28-o5", label: "다음 잔은 더 강하게", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool29",
    title: "친구가 갑자기 건배사를 하자고 한다면?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool29-o1", label: "웃으면서 맞장구친다", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool29-o2", label: "재밌는 건배사를 한다", statAdjustments: [{ stat: "산도", value: 0.5 }, { stat: "청량감", value: 0.3 }] },
      { id: "pool29-o3", label: "조용히 잔을 든다", statAdjustments: [{ stat: "쓴맛", value: 0.6 }, { stat: "당도", value: -0.2 }] },
      { id: "pool29-o4", label: "크게 외친다", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "산도", value: 0.2 }] },
      { id: "pool29-o5", label: "원샷부터 한다", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
  {
    id: "pool30",
    title: "주문한 칵테일 색상이 예상과 완전히 다르게 나왔때 반응은?",
    subtitle: "지금 가장 끌리는 선택지를 골라주세요",
    options: [
      { id: "pool30-o1", label: "오히려 예쁘다고 생각한다", statAdjustments: [{ stat: "당도", value: 0.5 }, { stat: "청량감", value: 0.2 }] },
      { id: "pool30-o2", label: "한 모금 마셔보고 어떤 재료인지 맞혀본다", statAdjustments: [{ stat: "산도", value: 0.5 }] },
      { id: "pool30-o3", label: "조용히 색을 감상하며 마신다", statAdjustments: [{ stat: "쓴맛", value: 0.7 }, { stat: "당도", value: -0.2 }] },
      { id: "pool30-o4", label: "신기해하며 친구들한테 보여준다", statAdjustments: [{ stat: "청량감", value: 0.7 }, { stat: "산도", value: 0.2 }] },
      { id: "pool30-o5", label: "색은 상관없고 도수가 맞게 나왔는지 확인한다", statAdjustments: [{ stat: "도수", value: 0.7 }, { stat: "청량감", value: -0.3 }] },
    ],
  },
];

function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 1~5번은 고정 문항, 6~7번은 QUIZ_QUESTION_POOL에서 매번 무작위로 2개를 뽑아 채웁니다.
export function buildQuizQuestions(): QuizQuestion[] {
  return [...BASE_QUESTIONS, ...pickRandom(QUIZ_QUESTION_POOL, 2)];
}
