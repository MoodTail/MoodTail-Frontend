import { Fragment } from "react";
import { splitDescriptionLines, type Recipe } from "./recipeData";
import "../../styles/RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
  selecting?: boolean;
  saved: boolean;
  onSelect: () => void;
  onToggleSave: () => void;
}

function RecipeCard({ recipe, selecting, saved, onSelect, onToggleSave }: RecipeCardProps) {
  const descLines = splitDescriptionLines(recipe.description);

  return (
    <div
      className={`recipe-card ${selecting ? "recipe-card--selecting" : ""}`}
      onClick={onSelect}
    >
      <div className="recipe-card__thumb">
        <img
          src={recipe.glassImage}
          alt={recipe.name}
          className={selecting ? "recipe-card__thumb-img--pop" : ""}
        />
      </div>

      <div className="recipe-card__body">
        <div className="recipe-card__row">
          <span className="recipe-card__name">{recipe.name}</span>
          <span className="recipe-card__degree">{recipe.degree}</span>
        </div>
        <div className="recipe-card__row recipe-card__row--desc">
          <span className="recipe-card__desc">
            {descLines.map((line, i) => (
              <Fragment key={i}>
                {line}
                {i < descLines.length - 1 && <br />}
              </Fragment>
            ))}
          </span>
          <button
            type="button"
            className="recipe-card__save"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 3.5 h12 a1 1 0 0 1 1 1 V21 l-7 -4.5 L5 21 V4.5 a1 1 0 0 1 1 -1 z"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {saved ? "저장됨" : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
