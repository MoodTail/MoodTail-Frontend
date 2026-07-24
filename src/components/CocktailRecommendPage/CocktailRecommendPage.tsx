import { useEffect, useState, type FC } from "react";
import cocktail from "../../assets/images/glass/glass-1.png";
import MatchSummaryCard from "../../components/CocktailRecommendPage/MatchSummaryCard";
import ShareResultModal from "../../components/CocktailRecommendPage/ShareResultModal";
import "../../styles/CocktailRecommendPage.css";

interface RankEntry {
  rank: number;
  name: string;
  description: string;
  percent: number;
  color: string;
}

interface CocktailRecommendPageProps {
  onBack?: () => void;
  onRetry?: () => void;
  topPick: {
    tagline: string;
    name: string;
    description: string;
    myMatchPercent: number;
    partnerMatchPercent: number;
    imageUrl?: string;
  };
  tasteAttribution: {
    dominant: string;
    dominantOwner: string;
    secondary: string;
    secondaryOwner: string;
  };
  ranking: RankEntry[];
  matchPercent: number;
  myAvatarUrl?: string;
  partnerAvatarUrl?: string;
}

const CocktailRecommendPage: FC<CocktailRecommendPageProps> = ({
  onBack,
  onRetry,
  topPick,
  tasteAttribution,
  ranking,
  matchPercent,
  myAvatarUrl,
  partnerAvatarUrl,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    document.body.classList.add("hide-bottom-nav");
    return () => {
      document.body.classList.remove("hide-bottom-nav");
    };
  }, []);

  const handleShareSns = () => {
    // TODO: SNS 공유 연동
  };

  const handleSaveImage = () => {
    // TODO: 이미지 저장(캡처) 연동
  };

  return (
    <div className="cocktail-recommend-page">
      <button
        type="button"
        className="cocktail-recommend-page__back"
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
      <p className="cocktail-recommend-page__title">칵테일 추천</p>
      <p className="cocktail-recommend-page__subtitle">
        두 사람의 결과를 평균이 아닌 취향 차이까지 반영했어요.
      </p>

      <div className="cocktail-recommend-page__top-card">
        <img
          src={topPick.imageUrl || cocktail}
          alt={topPick.name}
          className="cocktail-recommend-page__top-image"
        />
        <p className="cocktail-recommend-page__top-tagline">
          {topPick.tagline}
        </p>
        <p className="cocktail-recommend-page__top-name">{topPick.name}</p>
        <p className="cocktail-recommend-page__top-desc">
          {topPick.description}
        </p>
        <span className="cocktail-recommend-page__top-badge cocktail-recommend-page__top-badge--mine">
          나와의 일치율 {topPick.myMatchPercent}%
        </span>
        <span className="cocktail-recommend-page__top-badge cocktail-recommend-page__top-badge--friend">
          친구와의 일치율 {topPick.partnerMatchPercent}%
        </span>
      </div>

      <div className="cocktail-recommend-page__taste-card">
        <div className="cocktail-recommend-page__taste-row">
          <span className="cocktail-recommend-page__taste-pill cocktail-recommend-page__taste-pill--taste">
            {tasteAttribution.dominant}
          </span>
          <span className="cocktail-recommend-page__taste-word cocktail-recommend-page__taste-word--eun">
            은
          </span>
          <span className="cocktail-recommend-page__taste-pill cocktail-recommend-page__taste-pill--owner-a">
            {tasteAttribution.dominantOwner}
          </span>
          <span className="cocktail-recommend-page__taste-word cocktail-recommend-page__taste-word--desc">
            의 취향이 반영됐어요.
          </span>
        </div>
        <div className="cocktail-recommend-page__taste-row cocktail-recommend-page__taste-row--second">
          <span className="cocktail-recommend-page__taste-pill cocktail-recommend-page__taste-pill--taste">
            {tasteAttribution.secondary}
          </span>
          <span className="cocktail-recommend-page__taste-word cocktail-recommend-page__taste-word--eun">
            은
          </span>
          <span className="cocktail-recommend-page__taste-pill cocktail-recommend-page__taste-pill--owner-b">
            {tasteAttribution.secondaryOwner}
          </span>
          <span className="cocktail-recommend-page__taste-word cocktail-recommend-page__taste-word--desc">
            의 취향이 반영됐어요.
          </span>
        </div>
      </div>

      <p className="cocktail-recommend-page__rank-title">추천 순위</p>
      <div className="cocktail-recommend-page__rank-list">
        {ranking.map((item) => (
          <div key={item.rank} className="cocktail-recommend-page__rank-item">
            <span
              className="cocktail-recommend-page__rank-badge"
              style={{ background: item.color }}
            >
              {item.rank}
            </span>
            <div className="cocktail-recommend-page__rank-info">
              <p className="cocktail-recommend-page__rank-name">{item.name}</p>
              <p className="cocktail-recommend-page__rank-desc">
                {item.description}
              </p>
            </div>
            <span className="cocktail-recommend-page__rank-percent">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>

      <div className="cocktail-recommend-page__match-wrap">
        <MatchSummaryCard
          matchPercent={matchPercent}
          myAvatarUrl={myAvatarUrl}
          partnerAvatarUrl={partnerAvatarUrl}
        />
      </div>

      <button
        type="button"
        className="cocktail-recommend-page__share"
        onClick={() => setShowShareModal(true)}
      >
        결과 공유
      </button>
      <button
        type="button"
        className="cocktail-recommend-page__retry"
        onClick={onRetry}
      >
        다시 함께 고르기
      </button>

      {showShareModal && (
        <ShareResultModal
          onClose={() => setShowShareModal(false)}
          onShareSns={handleShareSns}
          onSaveImage={handleSaveImage}
          shareUrl={window.location.href}
          topPick={topPick}
          ranking={ranking}
          matchPercent={matchPercent}
          myAvatarUrl={myAvatarUrl}
          partnerAvatarUrl={partnerAvatarUrl}
        />
      )}
    </div>
  );
};

export default CocktailRecommendPage;
