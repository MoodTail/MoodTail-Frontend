export interface TasteProfile {
  도수: number;
  단맛: number;
  산도: number;
  쓴맛: number;
  청량감: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  degree: string;
  sweetness: string;
  taste: TasteProfile;
  ingredients: string[];
  steps: string[];
}

// 실제 데이터는 API 연동 후 교체됩니다. 지금은 화면 구성 확인용 데모 데이터입니다.
export const RECIPES: Recipe[] = [
  {
    id: "gin-tonic",
    name: "진토닉",
    description: "청량하고 쌉쌀한 클래식 칵테일",
    degree: "10°",
    sweetness: "20%",
    taste: { 도수: 40, 단맛: 20, 산도: 30, 쓴맛: 55, 청량감: 90 },
    ingredients: ["진 45mL", "토닉워터 120mL", "라임 1조각"],
    steps: [
      "유리잔에 얼음을 가득 채워주세요",
      "진 45mL를 부어주세요",
      "토닉워터 120mL를 채워주세요",
      "라임을 짜서 올려 완성해주세요",
    ],
  },
  {
    id: "mojito",
    name: "모히토",
    description: "민트와 라임의 청량한 만남",
    degree: "20°",
    sweetness: "35%",
    taste: { 도수: 45, 단맛: 40, 산도: 60, 쓴맛: 15, 청량감: 95 },
    ingredients: ["화이트럼 45mL", "라임 1/2개", "민트잎 10장", "설탕시럽 15mL", "소다수 60mL"],
    steps: [
      "잔에 민트잎과 라임, 설탕시럽을 넣고 살짝 으깨주세요",
      "화이트럼 45mL를 부어주세요",
      "얼음을 가득 채워주세요",
      "소다수로 잔을 채우고 가볍게 저어주세요",
    ],
  },
  {
    id: "cosmopolitan",
    name: "코스모폴리탄",
    description: "크랜베리와 오렌지의 하모니",
    degree: "24°",
    sweetness: "40%",
    taste: { 도수: 55, 단맛: 45, 산도: 55, 쓴맛: 10, 청량감: 50 },
    ingredients: ["보드카 40mL", "트리플섹 15mL", "크랜베리주스 30mL", "라임즙 15mL"],
    steps: [
      "쉐이커에 얼음을 채워주세요",
      "보드카, 트리플섹, 크랜베리주스, 라임즙을 넣어주세요",
      "충분히 흔들어 섞어주세요",
      "차가운 잔에 걸러 따라주세요",
    ],
  },
  {
    id: "negroni",
    name: "네그로니",
    description: "쌉쌀하고 깊은 클래식",
    degree: "24°",
    sweetness: "25%",
    taste: { 도수: 60, 단맛: 25, 산도: 20, 쓴맛: 80, 청량감: 30 },
    ingredients: ["진 30mL", "캄파리 30mL", "스위트베르무트 30mL"],
    steps: [
      "믹싱글라스에 얼음을 채워주세요",
      "진, 캄파리, 베르무트를 넣어주세요",
      "가볍게 저어 섞어주세요",
      "잔에 얼음과 함께 따르고 오렌지필을 올려주세요",
    ],
  },
  {
    id: "gin-fizz",
    name: "진피즈",
    description: "상큼하고 청량한 클래식",
    degree: "10°",
    sweetness: "30%",
    taste: { 도수: 40, 단맛: 35, 산도: 55, 쓴맛: 15, 청량감: 80 },
    ingredients: ["진 45mL", "레몬즙 20mL", "설탕시럽 15mL", "소다수 60mL"],
    steps: [
      "쉐이커에 진, 레몬즙, 설탕시럽과 얼음을 넣어주세요",
      "충분히 흔들어주세요",
      "잔에 얼음 없이 걸러 따라주세요",
      "소다수로 채우고 가볍게 저어 완성해주세요",
    ],
  },
  {
    id: "jack-coke",
    name: "잭콕",
    description: "콜라 베이스의 달달함",
    degree: "12°",
    sweetness: "60%",
    taste: { 도수: 45, 단맛: 65, 산도: 10, 쓴맛: 20, 청량감: 55 },
    ingredients: ["잭다니엘 45mL", "콜라 120mL", "라임 1조각 (선택)"],
    steps: [
      "유리잔에 얼음을 가득 채워주세요",
      "잭다니엘 45mL를 부어주세요",
      "콜라로 잔을 채워주세요",
      "가볍게 저어 완성해주세요",
    ],
  },
  {
    id: "black-russian",
    name: "블랙 러시안",
    description: "진한 커피 향과 부드러운 보드카",
    degree: "30°",
    sweetness: "60%",
    taste: { 도수: 75, 단맛: 55, 산도: 0, 쓴맛: 60, 청량감: 10 },
    ingredients: ["보드카 50mL", "칼루아 20mL", "얼음"],
    steps: [
      "유리잔에 얼음을 가득 채워주세요",
      "보드카 50mL을 부어주세요",
      "칼루아를 20mL 넣어주세요",
      "10~15초 정도 부드럽게 저어 완성해주세요",
    ],
  },
];

export function getRecipe(id: string): Recipe {
  const found = RECIPES.find((r) => r.id === id);
  if (!found) throw new Error(`Unknown recipe id: ${id}`);
  return found;
}
