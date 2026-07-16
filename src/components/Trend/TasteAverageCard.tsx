import TasteBar from "./TasteBar";
import "../../styles/TasteAverageCard.css";

const TASTE_STATS = [
  { label: "도수", value: 45 },
  { label: "당도", value: 62 },
  { label: "산도", value: 58 },
  { label: "쓴맛", value: 31 },
  { label: "청량감", value: 74 },
];

function TasteAverageCard() {
  return (
    <section className="taste-average-card">
      <h2 className="taste-average-card__title">전체 사용자 평균 취향</h2>
      <p className="taste-average-card__description">
        100점 기준 평균 맛 지표예요.
      </p>
      <div className="taste-average-card__list">
        {TASTE_STATS.map((stat) => (
          <TasteBar key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

export default TasteAverageCard;
