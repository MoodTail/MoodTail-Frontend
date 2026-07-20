import defaultAvatar from "../../assets/images/character/default.png";
import "../../styles/MatchIntroCard.css";

interface MatchIntroCardProps {
  myAvatarUrl?: string;
  partnerAvatarUrl?: string;
  partnerLabel?: string;
}

function MatchIntroCard({
  myAvatarUrl,
  partnerAvatarUrl,
  partnerLabel = "상대",
}: MatchIntroCardProps) {
  return (
    <div className="match-intro-card">
      <div className="match-intro-card__avatars">
        <div className="match-intro-card__avatar-group">
          <img
            src={myAvatarUrl ?? defaultAvatar}
            alt="나"
            className="match-intro-card__avatar"
          />
          <span className="match-intro-card__label">나</span>
        </div>

        <div className="match-intro-card__swap-icon">↔</div>

        <div className="match-intro-card__avatar-group">
          <img
            src={partnerAvatarUrl ?? defaultAvatar}
            alt={partnerLabel}
            className="match-intro-card__avatar"
          />
          <span className="match-intro-card__label">{partnerLabel}</span>
        </div>
      </div>

      <p className="match-intro-card__description">
        상대방의 코드를 입력하면
        <br />
        최신 테스트 결과를 불러와요.
      </p>
    </div>
  );
}

export default MatchIntroCard;
