import { useState, useRef, useEffect } from "react";
import type { FC, TouchEvent } from "react";
import Button from "../../components/Button/Button";
import OnboardingSlide from "../../components/OnboardingSlide/OnboardingSlide";
import OnboardingImageGroup from "../../components/OnboardingImageGroup/OnboardingImageGroup";
import OnboardingMarquee from "../../components/OnboardingMarquee/OnboardingMarquee";
import OnboardingCharacterCarousel from "../../components/OnboardingCharacterCarousel/OnboardingCharacterCarousel";
import OnboardingDots from "../../components/OnboardingDots/OnboardingDots";
import "../../styles/OnboardingPage.css";

// 온보딩 7 이미지
import image8 from "../../assets/images/image 8.png";
import image4 from "../../assets/images/image 4.png";
import image10 from "../../assets/images/image 10.png";
import image6 from "../../assets/images/image 6.png";
import image3 from "../../assets/images/image 3.png";

// 온보딩 9 컵 이미지 20개
import glass1 from "../../assets/images/glass/glass-1.png";
import glass2 from "../../assets/images/glass/glass-2.png";
import glass3 from "../../assets/images/glass/glass-3.png";
import glass4 from "../../assets/images/glass/glass-4.png";
import glass5 from "../../assets/images/glass/glass-5.png";
import glass6 from "../../assets/images/glass/glass-6.png";
import glass7 from "../../assets/images/glass/glass-7.png";
import glass8 from "../../assets/images/glass/glass-8.png";
import glass9 from "../../assets/images/glass/glass-9.png";
import glass10 from "../../assets/images/glass/glass-10.png";
import glass11 from "../../assets/images/glass/glass-11.png";
import glass12 from "../../assets/images/glass/glass-12.png";
import glass13 from "../../assets/images/glass/glass-13.png";
import glass14 from "../../assets/images/glass/glass-14.png";
import glass15 from "../../assets/images/glass/glass-15.png";
import glass16 from "../../assets/images/glass/glass-16.png";
import glass17 from "../../assets/images/glass/glass-17.png";
import glass18 from "../../assets/images/glass/glass-18.png";
import glass19 from "../../assets/images/glass/glass-19.png";
import glass20 from "../../assets/images/glass/glass-20.png";

// 온보딩 8 캐릭터 12개
import ch1 from "../../assets/images/character/character-1.png";
import ch2 from "../../assets/images/character/character-2.png";
import ch3 from "../../assets/images/character/character-3.png";
import ch4 from "../../assets/images/character/character-4.png";
import ch5 from "../../assets/images/character/character-5.png";
import ch6 from "../../assets/images/character/character-6.png";
import ch7 from "../../assets/images/character/character-7.png";
import ch8 from "../../assets/images/character/character-8.png";
import ch9 from "../../assets/images/character/character-9.png";
import ch10 from "../../assets/images/character/character-10.png";
import ch11 from "../../assets/images/character/character-11.png";
import ch12 from "../../assets/images/character/character-12.png";

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

const SLIDE_1_IMAGES: SlideImage[] = [
  {
    src: image8,
    width: 145.44,
    height: 189,
    left: 43,
    top: 214,
    motion: "landing",
    durationSeconds: 2.5,
    delaySeconds: 0,
  },

  {
    src: image4,
    width: 97.6,
    height: 121.88,
    left: 121.74,
    top: 302.01,
    motion: "bounce",
    durationSeconds: 1.6,
    delaySeconds: 0.2,
  },

  {
    src: image10,
    width: 79.36,
    height: 74.4,
    left: 185.67,
    top: 319.61,
    motion: "landing",
    durationSeconds: 2.5,
    delaySeconds: 0.4,
  },

  {
    src: image6,
    width: 114.11,
    height: 123.96,
    left: 225.34,
    top: 269.58,
    motion: "sway",
    durationSeconds: 2.2,
    delaySeconds: 0.75,
  },

  {
    src: image3,
    width: 77.02,
    height: 96.18,
    left: 230.93,
    top: 331.82,
    motion: "landing",
    durationSeconds: 2.5,
    delaySeconds: 0.8,
  },
];

const SLIDE_2_MARQUEE_IMAGES: string[] = [
  glass1,
  glass2,
  glass3,
  glass4,
  glass5,
  glass6,
  glass7,
  glass8,
  glass9,
  glass10,
  glass11,
  glass12,
  glass13,
  glass14,
  glass15,
  glass16,
  glass17,
  glass18,
  glass19,
  glass20,
];

const CHARACTER_LIST: string[] = [
  ch1,
  ch2,
  ch3,
  ch4,
  ch5,
  ch6,
  ch7,
  ch8,
  ch9,
  ch10,
  ch11,
  ch12,
];

const TOTAL_SLIDES = 3;
const AUTO_SLIDE_INTERVAL_MS = 3000;
const SWIPE_THRESHOLD_PX = 50;

interface OnboardingPageProps {
  onFinish: () => void;
}

const OnboardingPage: FC<OnboardingPageProps> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TOTAL_SLIDES);
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => clearInterval(timerId);
  }, [currentIndex]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>): void => {
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>): void => {
    if (touchStartXRef.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (diffX > SWIPE_THRESHOLD_PX) {
      setCurrentIndex((prev) => (prev + 1) % TOTAL_SLIDES);
    } else if (diffX < -SWIPE_THRESHOLD_PX) {
      setCurrentIndex((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
    }

    touchStartXRef.current = null;
  };

  const handleDotClick = (index: number): void => {
    setCurrentIndex(index);
  };

  const handleStartClick = (): void => {
    onFinish();
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-page__blob onboarding-page__blob--orange" />
      <div className="onboarding-page__blob onboarding-page__blob--yellow" />

      <div
        className="onboarding-page__track-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="onboarding-page__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* 온보딩 7 */}
          <div className="onboarding-page__track-item">
            <OnboardingSlide
              title={"오늘의 기분에 맞는\n단 한 잔을 찾아보세요"}
              description={
                "감정을 5가지 맛으로 번역하고\n96가지 칵테일 중 가장 가까운 한 잔을 추천해요."
              }
            >
              <OnboardingImageGroup images={SLIDE_1_IMAGES} />
            </OnboardingSlide>
          </div>

          {/* 온보딩 9 */}
          <div className="onboarding-page__track-item">
            <OnboardingSlide
              title={"나만의 칵테일 취향을\n기록해보세요"}
              description={
                "기분과 함께 마신 칵테일을 기록하고\n나만의 취향을 하나씩 완성해보세요."
              }
            >
              <OnboardingMarquee
                images={SLIDE_2_MARQUEE_IMAGES}
                durationSeconds={28}
              />
            </OnboardingSlide>
          </div>

          {/* 온보딩 8 */}
          <div className="onboarding-page__track-item">
            <OnboardingSlide
              title={"오늘의 캐릭터와 칵테일은\n어떤 맛일까요?"}
              description={
                "결과와 맞는 캐릭터와 어울리는 칵테일,\n칵테일의 레시피까지 알 수 있어요."
              }
            >
              <OnboardingCharacterCarousel
                characters={CHARACTER_LIST}
                intervalMs={1300}
              />
            </OnboardingSlide>
          </div>
        </div>
      </div>

      <OnboardingDots
        total={TOTAL_SLIDES}
        activeIndex={currentIndex}
        onDotClick={handleDotClick}
      />

      <Button
        variant="primary"
        className="onboarding-page__start-button"
        onClick={handleStartClick}
      >
        시작하기
      </Button>
    </div>
  );
};

export default OnboardingPage;
