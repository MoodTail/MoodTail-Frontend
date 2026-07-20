import type { FC } from "react";
import "../../styles/MatchSummaryCard.css";

interface MatchSummaryCardProps {
  matchPercent: number;
  myAvatarUrl?: string;
  partnerAvatarUrl?: string;
  title?: string;
  compact?: boolean;
}

const DEFAULT_AVATAR = "/images/default-avatar.png";

const MatchSummaryCard: FC<MatchSummaryCardProps> = ({
  matchPercent,
  myAvatarUrl,
  partnerAvatarUrl,
  title,
  compact = false,
}) => {
  return (
    <div
      className={`match-summary-card${compact ? " match-summary-card--compact" : ""}`}
    >
      <p className="match-summary-card__text">
        {title ?? `나와 상대의 일치율은 ${matchPercent}%에요`}
      </p>
      <img
        src={myAvatarUrl ?? DEFAULT_AVATAR}
        alt="나"
        className="match-summary-card__avatar match-summary-card__avatar--mine"
      />
      <span className="match-summary-card__badge">{matchPercent}%</span>
      <img
        src={partnerAvatarUrl ?? DEFAULT_AVATAR}
        alt="상대"
        className="match-summary-card__avatar match-summary-card__avatar--friend"
      />
    </div>
  );
};

export default MatchSummaryCard;
