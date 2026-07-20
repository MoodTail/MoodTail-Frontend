import type { FC } from "react";
import cocktail from "../../assets/images/glass/glass-1.png";
import MatchSummaryCard from "./MatchSummaryCard";
import "../../styles/ShareResultModal.css";

interface RankEntry {
  rank: number;
  name: string;
  description: string;
  percent: number;
  color: string;
}

interface ShareResultModalProps {
  onClose: () => void;
  onShareSns: () => void;
  onSaveImage: () => void;
  topPick: {
    tagline: string;
    name: string;
    description: string;
    myMatchPercent: number;
    partnerMatchPercent: number;
    imageUrl?: string;
  };
  ranking: RankEntry[];
  matchPercent: number;
  myAvatarUrl?: string;
  partnerAvatarUrl?: string;
}

const ShareResultModal: FC<ShareResultModalProps> = ({
  onClose,
  onShareSns,
  onSaveImage,
  topPick,
  ranking,
  matchPercent,
  myAvatarUrl,
  partnerAvatarUrl,
}) => {
  return (
    <div className="share-result-modal__overlay">
      <div className="share-result-modal">
        <button
          type="button"
          className="share-result-modal__close"
          onClick={onClose}
          aria-label="닫기"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15"
              stroke="#FF866A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 1L1 15"
              stroke="#FF866A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className="share-result-modal__brand">MoodTail</p>

        <div className="share-result-modal__top-card">
          <img
            src={topPick.imageUrl || cocktail}
            alt={topPick.name}
            className="share-result-modal__top-image"
          />
          <p className="share-result-modal__top-tagline">{topPick.tagline}</p>
          <p className="share-result-modal__top-name">{topPick.name}</p>
          <p className="share-result-modal__top-desc">{topPick.description}</p>
          <span className="share-result-modal__top-badge share-result-modal__top-badge--mine">
            나와의 일치율 {topPick.myMatchPercent}%
          </span>
          <span className="share-result-modal__top-badge share-result-modal__top-badge--friend">
            친구와의 일치율 {topPick.partnerMatchPercent}%
          </span>
        </div>

        <p className="share-result-modal__rank-title">추천 순위</p>
        <div className="share-result-modal__rank-list">
          {ranking.map((item) => (
            <div key={item.rank} className="share-result-modal__rank-item">
              <span
                className="share-result-modal__rank-badge"
                style={{ background: item.color }}
              >
                {item.rank}
              </span>
              <div className="share-result-modal__rank-info">
                <p className="share-result-modal__rank-name">{item.name}</p>
                <p className="share-result-modal__rank-desc">
                  {item.description}
                </p>
              </div>
              <span className="share-result-modal__rank-percent">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>

        <div className="share-result-modal__match-wrap">
          <MatchSummaryCard
            matchPercent={matchPercent}
            myAvatarUrl={myAvatarUrl}
            partnerAvatarUrl={partnerAvatarUrl}
            compact
          />
        </div>

        <div className="share-result-modal__actions">
          <button
            type="button"
            className="share-result-modal__sns"
            onClick={onShareSns}
          >
            SNS 공유하기
          </button>
          <button
            type="button"
            className="share-result-modal__save"
            onClick={onSaveImage}
          >
            이미지 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareResultModal;
