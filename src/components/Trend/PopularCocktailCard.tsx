import CocktailRankItem from "./CocktailRankItem";
import "../../styles/PopularCocktailCard.css";
import type { PopularCocktailTrend } from "../../api/cocktails/cocktails.types";

const RANK_COLORS = ["#FF613D", "#FFC92C", "#34DBCE", "#1564FE", "#35334F"];

interface PopularCocktailCardProps {
  cocktails: PopularCocktailTrend[];
  isExpanded: boolean;
  onToggle: () => void;
}

function PopularCocktailCard({
  cocktails,
  isExpanded,
  onToggle,
}: PopularCocktailCardProps) {
  const visibleCocktails = isExpanded ? cocktails : cocktails.slice(0, 1);

  return (
    <section
      className={`popular-cocktail-card ${isExpanded ? "popular-cocktail-card--expanded" : ""}`}
    >
      <h2 className="popular-cocktail-card__title">인기 칵테일 TOP5</h2>
      <p className="popular-cocktail-card__description">
        결과 1위로 추천된 칵테일 기준
      </p>
      <div className="popular-cocktail-card__list">
        {visibleCocktails.map((cocktail) => (
          <CocktailRankItem
            key={cocktail.cocktailId}
            rank={cocktail.ranking}
            name={cocktail.nameKo}
            description={cocktail.shortDescription}
            percent={cocktail.ratio}
            color={RANK_COLORS[(cocktail.ranking - 1) % RANK_COLORS.length]}
          />
        ))}
      </div>
      <button
        type="button"
        className={`popular-cocktail-card__toggle ${isExpanded ? "popular-cocktail-card__toggle--expanded" : ""}`}
        onClick={onToggle}
        aria-label={isExpanded ? "접기" : "더보기"}
      >
        <svg
          width="28"
          height="15"
          viewBox="0 0 28 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8564 14.25L0 0L27.7129 0L13.8564 14.25Z"
            fill="#FF613D"
            fillOpacity="0.74"
          />
        </svg>
      </button>
    </section>
  );
}

export default PopularCocktailCard;
