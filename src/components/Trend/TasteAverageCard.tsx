import TasteBar from "./TasteBar";
import "../../styles/TasteAverageCard.css";
import type { TrendTasteProfile } from "../../api/cocktails/cocktails.types";

interface TasteAverageCardProps {
  scores: TrendTasteProfile;
}

function TasteAverageCard({ scores }: TasteAverageCardProps) {
  const tasteStats = [
    { label: "도수", value: scores.alcoholIntensity },
    { label: "당도", value: scores.sweetness },
    { label: "산도", value: scores.sourness },
    { label: "쓴맛", value: scores.bitterness },
    { label: "청량감", value: scores.refreshing },
  ];

  return (
    <section className="taste-average-card">
      <h2 className="taste-average-card__title">전체 사용자 평균 취향</h2>
      <p className="taste-average-card__description">
        100점 기준 평균 맛 지표예요.
      </p>
      <div className="taste-average-card__list">
        {tasteStats.map((stat) => (
          <TasteBar key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

export default TasteAverageCard;
