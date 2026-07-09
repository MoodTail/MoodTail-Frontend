import type { FC } from "react";
import "../../styles/OnboardingImageGroup.css";

type ImageMotion = "sway" | "sway-small" | "bounce" | "landing";

interface SlideImage {
  src: string;
  width: number;
  height: number;
  left: number;
  top: number;
  motion: ImageMotion;
  durationSeconds: number;
  delaySeconds: number;
}

interface OnboardingImageGroupProps {
  images: SlideImage[];
}

const OnboardingImageGroup: FC<OnboardingImageGroupProps> = ({ images }) => {
  return (
    <div className="onboarding-image-group">
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={`온보딩 이미지 ${index + 1}`}
          className={`onboarding-image-group__image onboarding-image-group__image--${image.motion}`}
          style={{
            width: image.width,
            height: image.height,
            left: image.left,
            top: image.top,
            animationDuration: `${image.durationSeconds}s`,
            animationDelay: `${image.delaySeconds}s`,
          }}
        />
      ))}
    </div>
  );
};

export default OnboardingImageGroup;
