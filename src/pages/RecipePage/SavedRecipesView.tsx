import { useState } from "react";
import type { Recipe } from "./recipeData";
import RecipeCard from "./RecipeCard";
import "../../styles/SavedRecipesView.css";

type CardPhase = "visible" | "exiting" | "collapsing";

interface SavedItem {
  recipe: Recipe;
  phase: CardPhase;
}

interface SavedRecipesViewProps {
  recipes: Recipe[];
  selectingId: string | null;
  onBack: () => void;
  onUnsave: (id: string) => void;
  onSelectRecipe: (id: string) => void;
}

function SavedRecipesView({ recipes, selectingId, onBack, onUnsave, onSelectRecipe }: SavedRecipesViewProps) {
  const [items, setItems] = useState<SavedItem[]>(
    recipes.map((recipe) => ({ recipe, phase: "visible" }))
  );

  function handleUnsave(id: string) {
    onUnsave(id);
    setItems((prev) => prev.map((it) => (it.recipe.id === id ? { ...it, phase: "exiting" } : it)));
    setTimeout(() => {
      setItems((prev) => prev.map((it) => (it.recipe.id === id ? { ...it, phase: "collapsing" } : it)));
    }, 200);
    setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.recipe.id !== id));
    }, 500);
  }

  const isEmpty = recipes.length === 0;

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

      {isEmpty && (
        <p style={{ color: "#9b9088", fontSize: 13, textAlign: "center", margin: "40px 0 0" }}>
          아직 저장한 칵테일이 없어요
        </p>
      )}

      <div className="saved-recipes__list">
        {items.map(({ recipe, phase }) => (
          <div
            key={recipe.id}
            className={`saved-recipe-card ${phase === "collapsing" ? "saved-recipe-card--collapsing" : ""} ${
              phase === "exiting" || phase === "collapsing" ? "saved-recipe-card--leaving" : ""
            }`}
          >
            <RecipeCard
              recipe={recipe}
              selecting={selectingId === recipe.id}
              saved
              onSelect={() => onSelectRecipe(recipe.id)}
              onToggleSave={() => handleUnsave(recipe.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedRecipesView;
