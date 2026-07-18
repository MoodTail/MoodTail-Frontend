import { useState } from "react";
import { COLORS } from "../theme/colors";
import { ChevronLeftIcon } from "../components/icons";
import PhoneFrame from "../components/PhoneFrame";
import SavedRecipeCard, { type SavedCardPhase } from "../components/SavedRecipeCard";

interface SavedItem {
  id: string;
  name: string;
  description: string;
  phase: SavedCardPhase;
}

// 실제로는 사용자가 저장한 칵테일을 API에서 받아와야 합니다. 지금은 데모용 임시 데이터입니다.
const INITIAL_SAVED: Omit<SavedItem, "phase">[] = [
  { id: "1", name: "모히토", description: "민트와 라임의 청량한 만남" },
  { id: "2", name: "진 피즈", description: "부드러운 칵테일" },
  { id: "3", name: "블랙 러시안", description: "진한 커피 향과 부드러운 보드카" },
  { id: "4", name: "코스모폴리탄", description: "상큼한 과일의 맛" },
];

export default function SavedRecipesPage({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<SavedItem[]>(
    INITIAL_SAVED.map((item) => ({ ...item, phase: "visible" }))
  );

  function handleUnsave(id: string) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, phase: "exiting" } : it)));
    setTimeout(() => {
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, phase: "collapsing" } : it)));
    }, 200);
    setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }, 500);
  }

  return (
    <PhoneFrame>
      <div style={{ padding: "18px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <button
            onClick={onBack}
            style={{ display: "flex", background: "none", border: "none", cursor: "pointer", padding: 2 }}
          >
            <ChevronLeftIcon />
          </button>
          <span style={{ 
            fontSize: 17, 
            fontWeight: 700, 
            color: COLORS.ink,
            top:"62px"}}>저장된 레시피</span>
        </div>

        <div>
          {items.map((item) => (
            <SavedRecipeCard
              key={item.id}
              name={item.name}
              description={item.description}
              phase={item.phase}
              onUnsave={() => handleUnsave(item.id)}
            />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
