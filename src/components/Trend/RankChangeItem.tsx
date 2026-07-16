interface RankChangeItemProps {
  direction: "up" | "down";
  name: string;
  diff: number;
}

function RankChangeItem({ direction, name, diff }: RankChangeItemProps) {
  const isUp = direction === "up";

  return (
    <div className={`rank-change-item rank-change-item--${direction}`}>
      <span className="rank-change-item__badge">
        {isUp ? "▲ 상승" : "▼ 하강"}
      </span>
      <span className="rank-change-item__text">
        {name} {isUp ? "+" : "-"}
        {diff}위
      </span>
    </div>
  );
}

export default RankChangeItem;
