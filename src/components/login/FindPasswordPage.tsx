import { useState } from "react";
import type { FC } from "react";
import BackgroundBlur from "../../components/common/BackgroundBlur/BackgroundBlur";
import "../../styles/FindPasswordPage.css";

interface FindPasswordPageProps {
  onBack: () => void;
}

const FindPasswordPage: FC<FindPasswordPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (): void => {
    // 재설정 링크 요청 API 연동
  };

  return (
    <div className="find-password-page">
      <BackgroundBlur
        idPrefix="find-password-bg"
        width={393}
        height={824}
        circles={[{ cx: 33, cy: 676, r: 199, color: "#FEF6D9", opacity: 0.38 }]}
      />

      <button
        type="button"
        className="find-password-page__back"
        onClick={onBack}
        aria-label="뒤로가기"
      >
        <svg viewBox="0 0 27 27" width="27" height="27">
          <path
            d="M17 4L8 13.5L17 23"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>

      <h1 className="find-password-page__title">비밀번호 찾기</h1>

      <p className="find-password-page__desc">
        가입한 아이디 또는 이메일을 입력하시면 비밀번호 재설정 안내를 보내드려요
      </p>

      <div className="find-password-page__icon">
        <svg viewBox="0 0 184 184" width="184" height="184">
          <circle cx="92" cy="92" r="92" fill="#FFE0D6" />
          <path
            d="M92 60a20 20 0 00-20 20v10h-6a6 6 0 00-6 6v34a6 6 0 006 6h52a6 6 0 006-6v-34a6 6 0 00-6-6h-6V80a20 20 0 00-20-20zm0 12a8 8 0 018 8v10H84V80a8 8 0 018-8z"
            fill="#FF613D"
          />
        </svg>
      </div>

      <label
        className="find-password-page__label"
        htmlFor="find-password-email"
      >
        아이디 또는 이메일
      </label>
      <input
        id="find-password-email"
        type="email"
        className="find-password-page__input"
        placeholder="example@moodtail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="button"
        className="find-password-page__submit"
        onClick={handleSubmit}
      >
        재설정 링크 받기
      </button>
    </div>
  );
};

export default FindPasswordPage;
