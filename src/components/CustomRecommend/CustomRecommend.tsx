import { useState, useEffect } from "react";
import type { FC } from "react";
import TasteSlider from "./TasteSlider";
import "../../styles/CustomRecommend.css";

interface TasteValues {
  strength: number;
  sweetness: number;
  acidity: number;
  bitterness: number;
  refreshing: number;
}

interface CustomRecommendProps {
  onBack?: () => void;
  onViewResult?: (values: TasteValues) => void;
}

const CustomRecommend: FC<CustomRecommendProps> = ({
  onBack,
  onViewResult,
}) => {
  const [values, setValues] = useState<TasteValues>({
    strength: 34,
    sweetness: 72,
    acidity: 48,
    bitterness: 26,
    refreshing: 80,
  });

  useEffect(() => {
    document.body.classList.add("hide-bottom-nav");
    return () => {
      document.body.classList.remove("hide-bottom-nav");
    };
  }, []);

  const updateValue = (key: keyof TasteValues) => (value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="custom-recommend-page">
      <button
        type="button"
        className="custom-recommend-page__back"
        onClick={onBack}
        aria-label="뒤로가기"
      >
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
          <path
            d="M16.6772 19.8529L10.3242 13.5L16.6772 7.14705"
            stroke="#17182F"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="custom-recommend-page__title">커스텀 추천</p>
      <p className="custom-recommend-page__subtitle">
        원하는 맛을 직접 조절해
        <br />내 취향에 가까운 칵테일을 찾아보세요
      </p>
      <div className="custom-recommend-page__card">
        <p className="custom-recommend-page__card-title">맛 수치 조절</p>
        <p className="custom-recommend-page__card-desc">
          0에 가까울수록 약하게, 100에 가까울수록 강하게 반영돼요.
        </p>
        <div className="custom-recommend-page__sliders">
          <TasteSlider
            label="도수"
            value={values.strength}
            onChange={updateValue("strength")}
          />
          <TasteSlider
            label="당도"
            value={values.sweetness}
            onChange={updateValue("sweetness")}
          />
          <TasteSlider
            label="산도"
            value={values.acidity}
            onChange={updateValue("acidity")}
          />
          <TasteSlider
            label="쓴맛"
            value={values.bitterness}
            onChange={updateValue("bitterness")}
          />
          <TasteSlider
            label="청량감"
            value={values.refreshing}
            onChange={updateValue("refreshing")}
          />
        </div>
      </div>
      <button
        type="button"
        className="custom-recommend-page__cta"
        onClick={() => onViewResult?.(values)}
      >
        추천 결과 보기
      </button>
    </div>
  );
};

export default CustomRecommend;
