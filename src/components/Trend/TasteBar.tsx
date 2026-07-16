interface TasteBarProps {
  label: string;
  value: number;
  max?: number;
}

function TasteBar({ label, value, max = 100 }: TasteBarProps) {
  const percent = Math.min(100, (value / max) * 100);

  return (
    <div className="taste-bar">
      <span className="taste-bar__label">{label}</span>
      <div className="taste-bar__track">
        <div className="taste-bar__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="taste-bar__value">{value}</span>
    </div>
  );
}

export default TasteBar;
