import type { FC } from "react";
import "../../styles/TasteComparisonBar.css";

interface TasteComparisonBarProps {
  label: string;
  myValue: number;
  cocktailValue: number;
  maxHeight?: number;
}

const TasteComparisonBar: FC<TasteComparisonBarProps> = ({
  label,
  myValue,
  cocktailValue,
  maxHeight = 200,
}) => {
  const myHeight = (myValue / 100) * maxHeight;
  const cocktailHeight = (cocktailValue / 100) * maxHeight;

  return (
    <div className="taste-comparison-bar">
      <span className="taste-comparison-bar__value">{cocktailValue}</span>
      <div
        className="taste-comparison-bar__track"
        style={{ height: maxHeight }}
      >
        <span
          className="taste-comparison-bar__fill taste-comparison-bar__fill--cocktail"
          style={{ height: cocktailHeight }}
        />
        <span
          className="taste-comparison-bar__fill taste-comparison-bar__fill--mine"
          style={{ height: myHeight }}
        />
      </div>
      <span className="taste-comparison-bar__label">{label}</span>
    </div>
  );
};

export default TasteComparisonBar;
