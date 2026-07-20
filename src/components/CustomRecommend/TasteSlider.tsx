import type { FC } from "react";
import "../../styles/TasteSlider.css";

interface TasteSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const TasteSlider: FC<TasteSliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="taste-slider">
      <span className="taste-slider__label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="taste-slider__input"
        style={{
          background: `linear-gradient(to right, #FF613D 0%, #FF613D ${percent}%, rgba(245,193,182,0.7) ${percent}%, rgba(245,193,182,0.7) 100%)`,
        }}
      />
      <span className="taste-slider__value">{value}</span>
    </div>
  );
};

export default TasteSlider;
