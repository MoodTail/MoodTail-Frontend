import { useState } from "react";
import type { Recipe, TasteProfile } from "./recipeData";
import TwoButtonModal from "../../components/common/modal/TwoButtonModal";
import TasteProfileGrid from "../../components/TasteProfileGrid";
import "../../styles/RecipeDetailView.css";

const TASTE_LABELS: { key: keyof TasteProfile; label: string }[] = [
  { key: "도수", label: "도수" },
  { key: "단맛", label: "당도" },
  { key: "산도", label: "산도" },
  { key: "쓴맛", label: "쓴맛" },
  { key: "청량감", label: "청량감" },
];

interface RecipeDetailViewProps {
  recipe: Recipe;
  onBack: () => void;
  saved: boolean;
  isLoggedIn: boolean;
  onToggleSave: () => void;
  onGoToLogin: () => void;
}

function RecipeDetailView({
  recipe,
  onBack,
  saved,
  isLoggedIn,
  onToggleSave,
  onGoToLogin,
}: RecipeDetailViewProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="recipe-detail">
      <div className="recipe-detail__header">
        <button type="button" className="recipe-detail__back" onClick={onBack} aria-label="뒤로가기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 5 L8 12 L15 19" stroke="#241c15" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span>레시피</span>
      </div>

      <div className={`recipe-detail__hero ${recipe.hasHeroPhoto ? "recipe-detail__hero--photo" : ""}`}>
        <img src={recipe.heroImage} alt={recipe.name} />
      </div>

      <div className="recipe-detail__title-row">
        <div>
          <div className="recipe-detail__name">{recipe.name}</div>
          <div className="recipe-detail__desc">{recipe.description}</div>
        </div>
        
      </div>

      <div className="recipe-detail__badges">
      <span className="recipe-detail__badge recipe-detail__badge--primary">도수 {recipe.degree}</span>
      {isLoggedIn && (
        <span className="recipe-detail__badge recipe-detail__badge--outline">일치율 {recipe.matchRate}</span>
      )}

        <button
          type="button"
          className="recipe-detail__bookmark"
          onClick={() => (isLoggedIn ? onToggleSave() : setShowLoginModal(true))}
          aria-label={saved ? "저장 해제" : "저장"}
          style={{ marginLeft: "auto" }}
        >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 3.5 h12 a1 1 0 0 1 1 1 V21 l-7 -4.5 L5 21 V4.5 a1 1 0 0 1 1 -1 z"
            fill={saved ? "#ff6f4f" : "none"}
            stroke="#ff6f4f"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>

      <div className="recipe-detail__section-title">맛 지표</div>
      <div className="recipe-detail__taste-grid">
        <TasteProfileGrid
          variant="recipe"
          items={TASTE_LABELS.map(({ key, label }) => ({ key, label, value: recipe.taste[key] }))}
        />
      </div>

      <div className="recipe-detail__section-title">재료</div>
      <div className="recipe-detail__ingredients">
        {recipe.ingredients.map((ingredient) => (
          <div key={ingredient} className="recipe-detail__ingredient">
            {ingredient}
          </div>
        ))}
      </div>

      <div className="recipe-detail__section-title">만드는 방법</div>
      <div className="recipe-detail__steps">
        {recipe.steps.map((step, i) => (
          <div key={step} className="recipe-detail__step">
            <span className="recipe-detail__step-number">{i + 1}</span>
            {i < recipe.steps.length - 1 && <span className="recipe-detail__step-line" />}
            <span className="recipe-detail__step-text">{step}</span>
          </div>
        ))}
      </div>

      {showLoginModal && (
        <TwoButtonModal
          isOpen
          title="로그인하고 기록을 저장해요"
          description="테스트 결과, 도감, 즐겨찾기를 이어서 사용할 수 있어요."
          leftButton={{
            label: "로그인하기",
            variant: "primary",
            onClick: onGoToLogin,
          }}
          rightButton={{
            label: "닫기",
            variant: "secondary",
            onClick: () => setShowLoginModal(false),
          }}
          onOverlayClick={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default RecipeDetailView;
