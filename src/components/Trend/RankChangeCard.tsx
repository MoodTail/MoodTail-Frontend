import RankChangeItem from "./RankChangeItem";
import "../../styles/RankChangeCard.css";

const RANK_CHANGES: { direction: "up" | "down"; name: string; diff: number }[] =
  [
    { direction: "up", name: "모히토", diff: 6 },
    { direction: "down", name: "진 토닉", diff: 4 },
  ];

function RankChangeCard() {
  return (
    <section className="rank-change-card">
      <h2 className="rank-change-card__title">지난주 대비 순위 변화</h2>
      <div className="rank-change-card__list">
        {RANK_CHANGES.map((item) => (
          <RankChangeItem key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
}

export default RankChangeCard;
