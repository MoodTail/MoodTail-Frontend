import { useState, useEffect } from "react";
import type { FC } from "react";
import "../../styles/OnboardingCharacterCarousel.css";

interface OnboardingCharacterCarouselProps {
  characters: string[];
  intervalMs?: number; // 진입(0.8s) + 유지(1.4s) 합산 값. 기본 2200ms
}

const OFFSETS = [-1, 0, 1] as const;

const ENTER_DURATION = 800; // 오른쪽 → 중앙
const EXIT_DURATION = 400; // 중앙 → 왼쪽
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

        // 중앙으로 들어올 때는 0.8s(진입), 중앙에서 벗어날 때는 1s(퇴장)
        const transitionDuration =
          offset === 0 ? `${ENTER_DURATION}ms` : `${EXIT_DURATION}ms`;

        return (
          <img
            key={characterIndex}
            src={src}
            alt={offset === 0 ? "중앙 캐릭터" : "주변 캐릭터"}
            className={`character-carousel__item ${positionClass}`}
            style={{ transitionDuration }}
          />
        );
      })}
    </div>
  );
};

export default OnboardingCharacterCarousel;
