import type { Recipe } from "./recipeData";
import "../../styles/RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
  onRequireLogin: () => void;
}

function RecipeCard({ recipe, onSelect, onRequireLogin }: RecipeCardProps) {
  return (
    <div className="recipe-card" onClick={onSelect}>
      <div className="recipe-card__thumb">
        <img src={recipe.glassImage} alt={recipe.name} />
      </div>

      <div className="recipe-card__body">
        <div className="recipe-card__row">
          <span className="recipe-card__name">{recipe.name}</span>
          <span className="recipe-card__degree">{recipe.degree}</span>
        </div>
        <div className="recipe-card__row">
          <span className="recipe-card__desc">{recipe.description}</span>
          <button
            type="button"
            className="recipe-card__save"
            onClick={(e) => {
              e.stopPropagation();
              onRequireLogin();
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 3.5 h12 a1 1 0 0 1 1 1 V21 l-7 -4.5 L5 21 V4.5 a1 1 0 0 1 1 -1 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
