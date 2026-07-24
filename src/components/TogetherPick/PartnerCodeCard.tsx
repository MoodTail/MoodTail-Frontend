import { useState } from "react";
import "../../styles/PartnerCodeCard.css";

interface PartnerCodeCardProps {
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
}

function PartnerCodeCard({ value, onChange, isError }: PartnerCodeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`partner-code-card ${isError ? "partner-code-card--error" : ""}`}
      >
        <div
          className="partner-code-card__field"
          onClick={() => setIsModalOpen(true)}
        >
          <span
            className={`partner-code-card__text ${
              value ? "" : "partner-code-card__text--placeholder"
            }`}
          >
            {value || "친구 초대 코드 입력"}
          </span>
        </div>
        {isError && (
          <p className="partner-code-card__error">
            상대의 테스트 결과를 찾을 수 없어요
          </p>
        )}
      </div>
      {isModalOpen && (
        <>
          <div
            className="partner-code-overlay"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="partner-code-modal">
            <input
              type="text"
              className="partner-code-modal__input"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(false)}
              autoFocus
            />
            <button
              type="button"
              className="partner-code-modal__clear"
              onClick={() => onChange("")}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 1L11 11"
                  stroke="#AAAAAA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11 1L1 11"
                  stroke="#AAAAAA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </>
      )}{" "}
    </>
  );
}

export default PartnerCodeCard;
