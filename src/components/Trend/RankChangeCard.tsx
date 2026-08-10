import RankChangeItem from "./RankChangeItem";
import "../../styles/RankChangeCard.css";
import type { RankChangeCocktail } from "../../api/cocktails/cocktails.types";

interface RankChangeCardProps {
  items: RankChangeCocktail[];
}

function RankChangeCard({ items }: RankChangeCardProps) {
  return (
    <section className="rank-change-card">
      <h2 className="rank-change-card__title">지난주 대비 순위 변화</h2>
      {items.length === 0 ? (
        <p className="rank-change-card__empty">
          아직 비교할 지난주 데이터가 없어요.
        </p>
      ) : (
        <div className="rank-change-card__list">
          {items.map((item) => (
            <RankChangeItem
              key={item.cocktailId}
              direction={item.changeDirection === "UP" ? "up" : "down"}
              name={item.nameKo}
              diff={item.rankChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RankChangeCard;
