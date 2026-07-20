import "../../styles/PartnerCodeCard.css";

interface PartnerCodeCardProps {
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
}

function PartnerCodeCard({ value, onChange, isError }: PartnerCodeCardProps) {
  return (
    <div
      className={`partner-code-card ${isError ? "partner-code-card--error" : ""}`}
    >
      <input
        type="text"
        className="partner-code-card__input"
        placeholder="상대 초드 코드 입력"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {isError && (
        <p className="partner-code-card__error">
          상대의 테스트 결과를 찾을 수 없어요
        </p>
      )}
    </div>
  );
}

export default PartnerCodeCard;
