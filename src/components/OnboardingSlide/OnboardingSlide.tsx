import type { FC, ReactNode } from "react";
import "../../styles/OnboardingSlide.css";

interface OnboardingSlideProps {
  title: string;
  description: string;
  children: ReactNode;
}

const OnboardingSlide: FC<OnboardingSlideProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="onboarding-slide">
      <div className="onboarding-slide__visual">{children}</div>
      <h1 className="onboarding-slide__title">{title}</h1>
      <p className="onboarding-slide__description">{description}</p>
    </div>
  );
};

export default OnboardingSlide;
