import { useState } from "react";
import type { Recipe } from "./recipeData";
import "../../styles/SavedRecipesView.css";

type CardPhase = "visible" | "exiting" | "collapsing";

interface SavedItem {
  recipe: Recipe;
  phase: CardPhase;
}

interface SavedRecipesViewProps {
  recipes: Recipe[];
  onBack: () => void;
}

function SavedRecipesView({ recipes, onBack }: SavedRecipesViewProps) {
  const [items, setItems] = useState<SavedItem[]>(
    recipes.map((recipe) => ({ recipe, phase: "visible" }))
  );

  function handleUnsave(id: string) {
    setItems((prev) => prev.map((it) => (it.recipe.id === id ? { ...it, phase: "exiting" } : it)));
    setTimeout(() => {
      setItems((prev) => prev.map((it) => (it.recipe.id === id ? { ...it, phase: "collapsing" } : it)));
    }, 200);
    setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.recipe.id !== id));
    }, 500);
  }

  return (
    <div className="saved-recipes">
      <div className="saved-recipes__header">
        <button type="button" className="saved-recipes__back" onClick={onBack} aria-label="뒤로가기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 5 L8 12 L15 19" stroke="#241c15" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span>저장된 레시피</span>
      </div>

      <div className="saved-recipes__list">
        {items.map(({ recipe, phase }) => (
          <div
            key={recipe.id}
            className={`saved-recipe-card ${phase === "collapsing" ? "saved-recipe-card--collapsing" : ""} ${
              phase === "exiting" || phase === "collapsing" ? "saved-recipe-card--leaving" : ""
            }`}
          >
            <div className="saved-recipe-card__inner">
              <div className="saved-recipe-card__thumb">
                <img src={recipe.glassImage} alt={recipe.name} />
              </div>
              <div className="saved-recipe-card__body">
                <div className="saved-recipe-card__name">{recipe.name}</div>
                <div className="saved-recipe-card__desc">{recipe.description}</div>
              </div>
              <button
                type="button"
                className="saved-recipe-card__unsave"
                onClick={() => handleUnsave(recipe.id)}
                aria-label="저장 해제"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 3.5 h12 a1 1 0 0 1 1 1 V21 l-7 -4.5 L5 21 V4.5 a1 1 0 0 1 1 -1 z"
                    fill="#ff6f4f"
                    stroke="#ff6f4f"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedRecipesView;
