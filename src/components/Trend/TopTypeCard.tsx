import TopTypeItem from "./TopTypeItem";
import "../../styles/TopTypeCard.css";
import type { PopularMoodType } from "../../api/cocktails/cocktails.types";

interface TopTypeCardProps {
  items: PopularMoodType[];
}

const RANK_COLORS = ["#FF613D", "#FFC92C", "#34DBCE"];

function TopTypeCard({ items }: TopTypeCardProps) {
  return (
    <section className="top-type-card">
      <h2 className="top-type-card__title">주간 인기 타입 TOP3</h2>
      <div className="top-type-card__list">
        {items.map((item) => (
          <TopTypeItem
            key={item.moodTypeId}
            rank={item.ranking}
            label={item.name}
            percent={item.ratio}
            color={RANK_COLORS[(item.ranking - 1) % RANK_COLORS.length]}
          />
        ))}
      </div>
    </section>
  );
}

export default TopTypeCard;
