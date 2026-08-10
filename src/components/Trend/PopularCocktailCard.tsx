import CocktailRankItem from "./CocktailRankItem";
import "../../styles/PopularCocktailCard.css";
import type { PopularCocktailTrend } from "../../api/cocktails/cocktails.types";

const RANK_COLORS = ["#FF613D", "#FFC92C", "#34DBCE", "#1564FE", "#35334F"];

interface PopularCocktailCardProps {
  cocktails: PopularCocktailTrend[];
  isExpanded: boolean;
  onToggle: () => void;
}

// API의 ranking은 동점이면 1,2,2,4,4처럼 다음 순위를 건너뛰는데(경쟁 순위 방식),
// 화면에는 1,2,2,3,3처럼 동점 그룹끼리만 같은 숫자를 쓰고 건너뛰지 않아야 한다(밀집 순위 방식).
// cocktails는 이미 API에서 순위대로 정렬되어 오므로, ranking 값이 바뀌는 지점마다
// 화면용 순번을 하나씩만 증가시켜서 매핑을 만든다.
function computeDenseRanks(
  cocktails: PopularCocktailTrend[],
): Map<number, number> {
  const ranks = new Map<number, number>();
  let denseRank = 0;
  let lastApiRank: number | null = null;

  cocktails.forEach((cocktail) => {
    if (cocktail.ranking !== lastApiRank) {
      denseRank += 1;
      lastApiRank = cocktail.ranking;
    }
    ranks.set(cocktail.cocktailId, denseRank);
  });

  return ranks;
}

function PopularCocktailCard({
  cocktails,
  isExpanded,
  onToggle,
}: PopularCocktailCardProps) {
  const visibleCocktails = isExpanded ? cocktails : cocktails.slice(0, 1);
  const denseRanks = computeDenseRanks(cocktails);

  return (
    <section
      className={`popular-cocktail-card ${isExpanded ? "popular-cocktail-card--expanded" : ""}`}
    >
      <h2 className="popular-cocktail-card__title">인기 칵테일 TOP5</h2>
      <p className="popular-cocktail-card__description">
        결과 1위로 추천된 칵테일 기준
      </p>
      <div className="popular-cocktail-card__list">
        {visibleCocktails.map((cocktail) => {
          const displayRank = denseRanks.get(cocktail.cocktailId) ?? 1;
          return (
            <CocktailRankItem
              key={cocktail.cocktailId}
              rank={displayRank}
              name={cocktail.nameKo}
              description={cocktail.shortDescription}
              percent={cocktail.ratio}
              color={RANK_COLORS[(displayRank - 1) % RANK_COLORS.length]}
            />
          );
        })}
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
