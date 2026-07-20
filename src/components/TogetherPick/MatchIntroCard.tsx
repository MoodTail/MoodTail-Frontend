import defaultAvatar from "../../assets/images/character/default-avatar.png";
import "../../styles/MatchIntroCard.css";

function MatchIntroCard() {
  return (
    <div className="match-intro-card">
      <img
        src={defaultAvatar}
        alt="나와 상대"
        className="match-intro-card__image"
      />
      <p className="match-intro-card__description">
        초대 코드나 링크를 보내면
        <br />
        상대방의 최신 테스트 결과를 불러와요.
      </p>
    </div>
  );
}

export default MatchIntroCard;
