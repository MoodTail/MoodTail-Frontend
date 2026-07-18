import TopTypeItem from "./TopTypeItem";
import "../../styles/TopTypeCard.css";

const TOP_TYPES = [
  { rank: 1, label: "현실주의자", percent: 34, color: "#FF613D" },
  { rank: 2, label: "이상주의자", percent: 27, color: "#FFC92C" },
  { rank: 3, label: "낭만주의자", percent: 18, color: "#34DBCE" },
];

function TopTypeCard() {
  return (
    <section className="top-type-card">
      <h2 className="top-type-card__title">주간 인기 타입 TOP3</h2>
      <div className="top-type-card__list">
        {TOP_TYPES.map((item) => (
          <TopTypeItem key={item.rank} {...item} />
        ))}
      </div>
    </section>
  );
}

export default TopTypeCard;
