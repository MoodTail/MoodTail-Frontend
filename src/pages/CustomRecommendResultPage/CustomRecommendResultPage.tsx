import { useEffect } from "react";
import type { FC } from "react";
import cocktail from "../../assets/images/glass/glass-1.png";
import TasteComparisonBar from "../../components/CustomRecommend/TasteComparisonBar";
import "../../styles/CustomRecommendResultPage.css";

interface TasteValues {
  strength: number;
  sweetness: number;
  acidity: number;
  bitterness: number;
  refreshing: number;
}

interface CustomRecommendResultPageProps {
  onBack?: () => void;
  onRetry?: () => void;
  cocktailName: string;
  description: string;
  matchPercent: number;
  imageUrl?: string;
  myValues: TasteValues;
  cocktailValues: TasteValues;
}

const CustomRecommendResultPage: FC<CustomRecommendResultPageProps> = ({
  onBack,
  onRetry,
  cocktailName,
  description,
  matchPercent,
  imageUrl,
  myValues,
  cocktailValues,
}) => {
  useEffect(() => {
    document.body.classList.add("hide-bottom-nav");
    return () => {
      document.body.classList.remove("hide-bottom-nav");
    };
  }, []);

  const bars: { key: keyof TasteValues; label: string }[] = [
    { key: "strength", label: "도수" },
    { key: "sweetness", label: "당도" },
    { key: "acidity", label: "산도" },
    { key: "bitterness", label: "쓴맛" },
    { key: "refreshing", label: "청량" },
  ];

  return (
    <div className="custom-recommend-result-page">
      <button
        type="button"
        className="custom-recommend-result-page__back"
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
      <p className="custom-recommend-result-page__title">커스텀 추천 결과</p>
      <p className="custom-recommend-result-page__subtitle">
        내가 조절한 맛과 가장 가까운 칵테일이에요
      </p>

      <div className="custom-recommend-result-page__top-card">
        <div className="custom-recommend-result-page__image-bg" />
        <img
          src={imageUrl || cocktail}
          alt={cocktailName}
          className="custom-recommend-result-page__image"
        />
        <p className="custom-recommend-result-page__name">{cocktailName}</p>
        <p className="custom-recommend-result-page__desc">{description}</p>
        <span className="custom-recommend-result-page__badge">
          취향 일치율 {matchPercent}%
        </span>
      </div>

      <div className="custom-recommend-result-page__chart-card">
        <p className="custom-recommend-result-page__chart-title">
          추천 칵테일 맛 강도
        </p>
        <p className="custom-recommend-result-page__chart-desc">
          연한색은 내 입력값, 진한색은 추천 칵테일 값이에요
        </p>

        <div className="custom-recommend-result-page__legend">
          <span className="custom-recommend-result-page__legend-item">
            <span
              className="custom-recommend-result-page__legend-dot"
              style={{ background: "#90b4f9" }}
            />
            내 입력
          </span>
          <span className="custom-recommend-result-page__legend-item">
            <span
              className="custom-recommend-result-page__legend-dot"
              style={{ background: "#ff9279" }}
            />
            칵테일
          </span>
        </div>

        <div className="custom-recommend-result-page__bars">
          {bars.map((bar) => (
            <TasteComparisonBar
              key={bar.key}
              label={bar.label}
              myValue={myValues[bar.key]}
              cocktailValue={cocktailValues[bar.key]}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="custom-recommend-result-page__retry"
        onClick={onRetry}
      >
        다시하기
      </button>
    </div>
  );
};

export default CustomRecommendResultPage;
