import Button from "../Button/Button";
import "../../styles/InviteCodeCard.css";

interface InviteCodeCardProps {
  code: string;
  onCopy: () => void;
}

function InviteCodeCard({ code, onCopy }: InviteCodeCardProps) {
  return (
    <div className="invite-code-card">
      <div className="invite-code-card__text">
        <p className="invite-code-card__label">내 초대 코드</p>
        <p className="invite-code-card__code">{code}</p>
      </div>
      <Button
        variant="copy"
        className="invite-code-card__copy-btn"
        onClick={onCopy}
      >
        복사
      </Button>
    </div>
  );
}

export default InviteCodeCard;
