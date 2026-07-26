import { useState, useEffect } from "react";
import type { FC } from "react";
import "../../styles/OnboardingCharacterCarousel.css";

interface OnboardingCharacterCarouselProps {
  characters: string[];
  intervalMs?: number;
}

const OFFSETS = [-1, 0, 1] as const;

const OnboardingCharacterCarousel: FC<OnboardingCharacterCarouselProps> = ({
  characters,
  intervalMs = 2200,
}) => {
  const total = characters.length;
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    if (total <= 1) return;
    const timerId = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % total);
    }, intervalMs);
    return () => clearInterval(timerId);
  }, [total, intervalMs]);

  if (total === 0) return null;

  return (
    <div className="character-carousel">
      {OFFSETS.map((offset) => {
        const characterIndex = (centerIndex + offset + total) % total;
        const src = characters[characterIndex];

        const positionClass =
          offset === 0
            ? "character-carousel__item--center"
            : offset < 0
              ? "character-carousel__item--left"
              : "character-carousel__item--right";

        return (
          <img
            key={characterIndex}
            src={src}
            alt={offset === 0 ? "중앙 캐릭터" : "주변 캐릭터"}
            className={`character-carousel__item ${positionClass}`}
          />
        );
      })}
    </div>
  );
};

export default OnboardingCharacterCarousel;
