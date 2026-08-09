import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import BackgroundBlur from "../common/BackgroundBlur";
import "../../styles/VerifyCodePage.css";

const CODE_LENGTH = 6;
const TIMER_SECONDS = 180;

interface VerifyCodePageProps {
  onBack: () => void;
  onSubmit: (code: string) => void;
  onResend: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function VerifyCodePage({
  onBack,
  onSubmit,
  onResend,
  isSubmitting = false,
  errorMessage = "",
}: VerifyCodePageProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string): void => {
    const char = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);

    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = (): void => {
    setDigits(Array(CODE_LENGTH).fill(""));
    setTimeLeft(TIMER_SECONDS);
    inputRefs.current[0]?.focus();
    onResend();
  };

  const handleVerifyClick = (): void => {
    onSubmit(digits.join(""));
  };

  return (
    <div className="verify-code-page">
      <BackgroundBlur
        idPrefix="verify-code-bg"
        width={393}
        height={824}
        circles={[
          { cx: 331, cy: 230, r: 173, color: "#FF6F4F", opacity: 0.28 },
          { cx: 33, cy: 676, r: 199, color: "#C2EDE9", opacity: 0.38 },
        ]}
      />

      <button
        type="button"
        className="verify-code-page__back"
        onClick={onBack}
        aria-label="뒤로가기"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6762 19.853L10.3232 13.5L16.6762 7.14709"
            stroke="black"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h1 className="verify-code-page__title">비밀번호 재설정</h1>
      <p className="verify-code-page__description">
        이메일로 받은 6자리 인증 코드를 입력해 주세요.
      </p>

      <div className="verify-code-page__code-header">
        <span className="verify-code-page__code-label">인증 코드</span>
        <span className="verify-code-page__timer">{formatTime(timeLeft)}</span>
      </div>

      <div className="verify-code-page__boxes">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`verify-code-page__box ${
              digit ? "verify-code-page__box--filled" : ""
            }`}
          />
        ))}
      </div>

      <p className="verify-code-page__resend">
        코드를 받지 못했나요?{" "}
        <button
          type="button"
          className="verify-code-page__resend-link"
          onClick={handleResend}
        >
          코드 재전송
        </button>
      </p>

      {errorMessage && (
        <p className="verify-code-page__error">{errorMessage}</p>
      )}

      <button
        type="button"
        className="verify-code-page__submit"
        onClick={handleVerifyClick}
        disabled={isSubmitting || digits.some((digit) => !digit)}
      >
        {isSubmitting ? "확인 중..." : "인증하기"}
      </button>
    </div>
  );
}

export default VerifyCodePage;
