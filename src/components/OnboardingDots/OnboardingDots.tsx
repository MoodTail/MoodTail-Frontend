import type { FC } from "react";
import "../../styles/OnboardingDots.css";

interface OnboardingDotsProps {
  total: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
}

const OnboardingDots: FC<OnboardingDotsProps> = ({
  total,
  activeIndex,
  onDotClick,
}) => {
  return (
    <div className="onboarding-dots">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={
            index === activeIndex
              ? "onboarding-dots__dot onboarding-dots__dot--active"
              : "onboarding-dots__dot"
          }
          onClick={() => onDotClick?.(index)}
        />
      ))}
    </div>
  );
};

export default OnboardingDots;
