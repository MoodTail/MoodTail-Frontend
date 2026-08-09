import { useEffect, useState, type FC } from "react";
import cocktail from "../../assets/images/glass/glass-1.png";
import { getSharedPairRecommendation } from "../../api/cocktails/cocktails.api";
import type { SharedPairRecommendationResult } from "../../api/cocktails/cocktails.types";
import "../../styles/SharedPairResultPage.css";

interface SharedPairResultPageProps {
  shareToken: string;
  onExit?: () => void;
}

const RANKING_COLORS = ["#FF613D", "#34DBCE", "#1564FE", "#FFC107"];

const SharedPairResultPage: FC<SharedPairResultPageProps> = ({
  shareToken,
  onExit,
}) => {
  const [result, setResult] = useState<SharedPairRecommendationResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getSharedPairRecommendation(shareToken)
      .then(setResult)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [shareToken]);

  if (isLoading) {
    return (
      <div className="shared-pair-result-page">
        <p className="shared-pair-result-page__status">불러오는 중...</p>
      </div>
    );
  }

  if (isError || !result) {
    return (
      <div className="shared-pair-result-page">
        <p className="shared-pair-result-page__status">
          공유된 결과를 찾을 수 없어요.
        </p>
        <button
          type="button"
          className="shared-pair-result-page__cta"
          onClick={onExit}
        >
          MoodTail 시작하기
        </button>
      </div>
    );
  }

  const first =
    result.recommendations.find((item) => item.ranking === 1) ??
    result.recommendations[0];

  return (
    <div className="shared-pair-result-page">
      <p className="shared-pair-result-page__brand">MoodTail</p>

      <div className="shared-pair-result-page__top-card">
        <img
          src={result.thumbnailImageUrl || cocktail}
          alt={first?.nameKo ?? ""}
          className="shared-pair-result-page__top-image"
        />
        <p className="shared-pair-result-page__top-name">{first?.nameKo}</p>
        <span className="shared-pair-result-page__badge">
          나와의 일치율 {result.myMatchScore}%
        </span>
        <span className="shared-pair-result-page__badge">
          친구와의 일치율 {result.partnerMatchScore}%
        </span>
      </div>

      <p className="shared-pair-result-page__rank-title">추천 순위</p>
      <div className="shared-pair-result-page__rank-list">
        {result.recommendations.map((item) => (
          <div
            key={item.ranking}
            className="shared-pair-result-page__rank-item"
          >
            <span
              className="shared-pair-result-page__rank-badge"
              style={{
                background:
                  RANKING_COLORS[(item.ranking - 1) % RANKING_COLORS.length],
              }}
            >
              {item.ranking}
            </span>
            <p className="shared-pair-result-page__rank-name">{item.nameKo}</p>
            <span className="shared-pair-result-page__rank-percent">
              {item.matchScore}%
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="shared-pair-result-page__cta"
        onClick={onExit}
      >
        나도 MoodTail에서 테스트하기
      </button>
    </div>
  );
};

export default SharedPairResultPage;
