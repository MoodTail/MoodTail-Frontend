import type { Recipe, TasteProfile } from "./recipeData";
import "../../styles/RecipeDetailView.css";

const TASTE_LABELS: { key: keyof TasteProfile; label: string }[] = [
  { key: "도수", label: "도수" },
  { key: "단맛", label: "단맛" },
  { key: "산도", label: "산도" },
  { key: "쓴맛", label: "쓴맛" },
  { key: "청량감", label: "청량감" },
];

interface RecipeDetailViewProps {
  recipe: Recipe;
  onBack: () => void;
  onRequireLogin: () => void;
}

function RecipeDetailView({ recipe, onBack, onRequireLogin }: RecipeDetailViewProps) {
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

      <div className="recipe-detail__hero">
        <img src={recipe.glassImage} alt={recipe.name} />
      </div>

      <div className="recipe-detail__title-row">
        <div>
          <div className="recipe-detail__name">{recipe.name}</div>
          <div className="recipe-detail__desc">{recipe.description}</div>
        </div>
        <button type="button" className="recipe-detail__bookmark" onClick={onRequireLogin} aria-label="저장">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 3.5 h12 a1 1 0 0 1 1 1 V21 l-7 -4.5 L5 21 V4.5 a1 1 0 0 1 1 -1 z"
              fill="none"
              stroke="#ff6f4f"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="recipe-detail__badges">
        <span className="recipe-detail__badge recipe-detail__badge--primary">도수 {recipe.degree}</span>
        <span className="recipe-detail__badge recipe-detail__badge--outline">일치율 {recipe.matchRate}</span>
      </div>

      <div className="recipe-detail__section-title">맛 지표</div>
      <div className="recipe-detail__taste-grid">
        {TASTE_LABELS.map(({ key, label }, i) => {
          const isOrange = i % 2 === 0;
          return (
            <div
              key={key}
              className={`recipe-detail__taste-chip ${isOrange ? "recipe-detail__taste-chip--orange" : "recipe-detail__taste-chip--gray"}`}
            >
              <span className="recipe-detail__taste-label">{label}</span>
              <span className="recipe-detail__taste-value">{recipe.taste[key]}</span>
            </div>
          );
        })}
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
    </div>
  );
}

export default RecipeDetailView;
