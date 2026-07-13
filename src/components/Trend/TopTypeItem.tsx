interface TopTypeItemProps {
  rank: number;
  label: string;
  percent: number;
  color: string;
}

function TopTypeItem({ rank, label, percent, color }: TopTypeItemProps) {
  return (
    <div className="top-type-item">
      <div
        className="top-type-item__badge"
        style={{ backgroundColor: `${color}29` }}
      >
        <span className="top-type-item__rank" style={{ color }}>
          {rank}
        </span>
      </div>
      <p className="top-type-item__label">{label}</p>
      <p className="top-type-item__percent" style={{ color }}>
        {percent}%
      </p>
    </div>
  );
}

export default TopTypeItem;
