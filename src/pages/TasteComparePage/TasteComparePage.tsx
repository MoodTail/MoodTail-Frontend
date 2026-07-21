import { useEffect, type FC } from "react";
import TasteRadarChart from "../../components/TasteCompare/TasteRadarChart";
import "../../styles/TasteComparePage.css";
import MatchSummaryCard from "../../components/CocktailRecommendPage/MatchSummaryCard";

interface TasteComparePageProps {
  onBack?: () => void;
  onViewResult?: () => void;
  myAvatarUrl?: string;
  partnerAvatarUrl?: string;
  matchPercent: number;
  myValues: number[]; // [도수,청량,쓴맛,산도,당도] 0~100
  partnerValues: number[];
}

const AXES = ["도수", "청량", "쓴맛", "산도", "당도"];

const TasteComparePage: FC<TasteComparePageProps> = ({
  onBack,
  onViewResult,
  myAvatarUrl,
  partnerAvatarUrl,
  matchPercent,
  myValues,
  partnerValues,
}) => {
  useEffect(() => {
    document.body.classList.add("hide-bottom-nav");
    return () => {
      document.body.classList.remove("hide-bottom-nav");
    };
  }, []);
  return (
    <div className="taste-compare-page">
      <button
        type="button"
        className="taste-compare-page__back"
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
      <p className="taste-compare-page__title">취향 비교</p>
      <p className="taste-compare-page__subtitle">
        나와 상대의 맛 지표 결과가 나왔어요!
      </p>

      <div className="taste-compare-page__chart-card">
        <div className="taste-compare-page__chart-wrap">
          <TasteRadarChart
            axes={AXES}
            size={224}
            seriesA={{
              label: "나",
              color: "#1564FE",
              fillOpacity: 0.16,
              values: myValues,
            }}
            seriesB={{
              label: "친구",
              color: "#FF613D",
              fillOpacity: 0.2,
              values: partnerValues,
            }}
          />
        </div>
        <div className="taste-compare-page__legend">
          <span className="taste-compare-page__legend-item">
            <span
              className="taste-compare-page__legend-dot"
              style={{ background: "#1564FE" }}
            />
            나
          </span>
          <span className="taste-compare-page__legend-item">
            <span
              className="taste-compare-page__legend-dot"
              style={{ background: "#FF613D" }}
            />
            친구
          </span>
        </div>
      </div>

      <div className="taste-compare-page__match-wrap">
        <MatchSummaryCard
          matchPercent={matchPercent}
          myAvatarUrl={myAvatarUrl}
          partnerAvatarUrl={partnerAvatarUrl}
        />
      </div>

      <button
        type="button"
        className="taste-compare-page__cta"
        onClick={onViewResult}
      >
        추천 결과 보기
      </button>
    </div>
  );
};

export default TasteComparePage;
