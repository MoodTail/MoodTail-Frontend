import CocktailRankItem from "./CocktailRankItem";
import "../../styles/PopularCocktailCard.css";

interface CocktailData {
  rank: number;
  name: string;
  description: string;
  percent: number;
  color: string;
}

const POPULAR_COCKTAILS: CocktailData[] = [
  {
    rank: 1,
    name: "피치 하이볼",
    description: "달콤하고 청량한 추천",
    percent: 21,
    color: "#FF613D",
  },
  {
    rank: 2,
    name: "선라이즈 소다",
    description: "과일향 중심의 추천",
    percent: 18,
    color: "#FFC92C",
  },
  {
    rank: 3,
    name: "모히토",
    description: "상쾌한 민트 추천",
    percent: 15,
    color: "#34DBCE",
  },
  {
    rank: 4,
    name: "진 토닉",
    description: "깔끔한 쓴맛 추천",
    percent: 12,
    color: "#1564FE",
  },
  {
    rank: 5,
    name: "위스키 사워",
    description: "산미 있는 클래식",
    percent: 9,
    color: "#35334F",
  },
];

interface PopularCocktailCardProps {
  isExpanded: boolean;
  onToggle: () => void;
}

function PopularCocktailCard({
  isExpanded,
  onToggle,
}: PopularCocktailCardProps) {
  const visibleCocktails = isExpanded
    ? POPULAR_COCKTAILS
    : POPULAR_COCKTAILS.slice(0, 1);

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
          <CocktailRankItem key={cocktail.rank} {...cocktail} />
        ))}
      </div>
      {!isExpanded && (
        <button
          type="button"
          className="popular-cocktail-card__toggle"
          onClick={onToggle}
          aria-label="더보기"
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
      )}
    </section>
  );
}

export default PopularCocktailCard;
