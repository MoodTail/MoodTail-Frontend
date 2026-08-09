import { useState } from "react";
import type { FC } from "react";
import BackgroundBlur from "../common/BackgroundBlur";
import "../../styles/ResetPasswordPage.css";

interface ResetPasswordPageProps {
  onBack: () => void;
  onSubmit: (newPassword: string) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const EyeIcon: FC = () => (
  <svg
    width="24"
    height="17"
    viewBox="0 0 24 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.94 14.0688C16.2306 15.2903 14.1491 15.9671 12 16C5 16 1 8.50001 1 8.50001C2.24389 6.32679 3.96914 4.42809 6.06 2.93127M9.9 1.22502C10.5883 1.07397 11.2931 0.998466 12 1.00002C19 1.00002 23 8.50001 23 8.50001C22.393 9.56464 21.6691 10.5669 20.84 11.4906M14.12 10.4875C13.8454 10.7638 13.5141 10.9855 13.1462 11.1392C12.7782 11.2929 12.3809 11.3756 11.9781 11.3822C11.5753 11.3889 11.1752 11.3194 10.8016 11.178C10.4281 11.0365 10.0887 10.826 9.80385 10.5589C9.51897 10.2918 9.29439 9.97371 9.14351 9.6235C8.99262 9.2733 8.91853 8.89819 8.92563 8.52055C8.93274 8.14292 9.02091 7.77049 9.18488 7.4255C9.34884 7.0805 9.58525 6.77 9.88 6.51252"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeOffIcon: FC = () => (
  <span className="reset-password-page__eye-off">
    <EyeIcon />
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="reset-password-page__eye-slash"
    >
      <path
        d="M1 1L21.5 21.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

function ResetPasswordPage({
  onBack,
  onSubmit,
  isSubmitting = false,
  submitError = "",
}: ResetPasswordPageProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const validate = (): boolean => {
    let isValid = true;

    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError("사용할 수 없는 비밀번호입니다");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword || password !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다");
      isValid = false;
    } else {
      setConfirmError("");
    }

    return isValid;
  };

  const handleSubmit = (): void => {
    if (!validate()) return;
    onSubmit(password);
  };

  return (
    <div className="reset-password-page">
      <BackgroundBlur
        idPrefix="reset-password-bg"
        width={393}
        height={824}
        circles={[
          { cx: 331, cy: 230, r: 173, color: "#FF6F4F", opacity: 0.28 },
          { cx: 33, cy: 676, r: 199, color: "#C2EDE9", opacity: 0.38 },
        ]}
      />

      <button
        type="button"
        className="reset-password-page__back"
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

      <h1 className="reset-password-page__title">비밀번호 재설정</h1>
      <p className="reset-password-page__description">
        새로운 비밀번호를 입력해주세요
      </p>

      <div className="reset-password-page__field">
        <span
          className={`reset-password-page__label ${passwordError ? "reset-password-page__label--error" : ""}`}
        >
          {passwordError || "비밀번호"}
        </span>
        <div
          className={`reset-password-page__input-wrap ${passwordError ? "reset-password-page__input-wrap--error" : ""}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            className="reset-password-page__input"
            placeholder="영문, 숫자를 포함하여 8자 이상 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="reset-password-page__toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
      </div>

      <div className="reset-password-page__field">
        <span
          className={`reset-password-page__label ${confirmError ? "reset-password-page__label--error" : ""}`}
        >
          {confirmError || "비밀번호 확인"}
        </span>
        <div
          className={`reset-password-page__input-wrap ${confirmError ? "reset-password-page__input-wrap--error" : ""}`}
        >
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="reset-password-page__input"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="reset-password-page__toggle"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={
              showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"
            }
          >
            {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
      </div>

      {submitError && (
        <p className="reset-password-page__submit-error">{submitError}</p>
      )}

      <button
        type="button"
        className="reset-password-page__submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "변경 중..." : "비밀번호 변경 완료"}
      </button>
    </div>
  );
}

export default ResetPasswordPage;
