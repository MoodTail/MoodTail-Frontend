import type { FC } from "react";
import "../../styles/OnboardingMarquee.css";

interface OnboardingMarqueeProps {
  images: string[];
  durationSeconds?: number;
}

const BOUNCE_DELAY_STEP_SECONDS = 0.2;

const OnboardingMarquee: FC<OnboardingMarqueeProps> = ({
  images,
  durationSeconds = 9,
}) => {
  const loopedImages = [...images, ...images];
  return (
    <div className="onboarding-marquee">
      <div
        className="onboarding-marquee__track"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {loopedImages.map((src, index) => {
          const originalIndex = index % images.length;

          return (
            <div
              key={`${src}-${index}`}
              className="onboarding-marquee__item"
              style={{
                animationDelay: `${originalIndex * BOUNCE_DELAY_STEP_SECONDS}s`,
              }}
            >
              <img
                src={src}
                alt="온보딩 칵테일 잔"
                className="onboarding-marquee__image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingMarquee;
