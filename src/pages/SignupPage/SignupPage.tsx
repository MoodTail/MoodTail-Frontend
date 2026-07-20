import { useState } from "react";
import type { FC, ChangeEvent } from "react";
import "../../styles/SignupPage.css";

function PasswordToggleIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.94 14.0688C16.2306 15.2903 14.1491 15.9671 12 16C5 16 1 8.50001 1 8.50001C2.24389 6.32679 3.96914 4.42809 6.06 2.93127M9.9 1.22502C10.5883 1.07397 11.2931 0.998466 12 1.00002C19 1.00002 23 8.50001 23 8.50001C22.393 9.56464 21.6691 10.5669 20.84 11.4906M14.12 10.4875C13.8454 10.7638 13.5141 10.9855 13.1462 11.1392C12.7782 11.2929 12.3809 11.3756 11.9781 11.3822C11.5753 11.3889 11.1752 11.3194 10.8016 11.178C10.4281 11.0365 10.0887 10.826 9.80385 10.5589C9.51897 10.2918 9.29439 9.97371 9.14351 9.6235C8.99262 9.2733 8.91853 8.89819 8.92563 8.52055C8.93274 8.14292 9.02091 7.77049 9.18488 7.4255C9.34884 7.0805 9.58525 6.77 9.88 6.51252"
        stroke="#FF6F4F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!visible && (
        <path
          d="M2 2L22.5 22.5"
          stroke="#FF6F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

interface SignupPageProps {
  onBack?: () => void;
  onSignupComplete?: () => void;
}

const SignupPage: FC<SignupPageProps> = ({ onSignupComplete }) => {
  const [email, setEmail] = useState("");
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const agreeAll = agreeService && agreePrivacy;
  const passwordMismatch =
    passwordConfirm.length > 0 && password !== passwordConfirm;

  const isFormValid =
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    passwordConfirm.trim().length > 0 &&
    nickname.trim().length > 0 &&
    !isEmailDuplicate &&
    !passwordMismatch &&
    agreeService &&
    agreePrivacy;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isEmailDuplicate) setIsEmailDuplicate(false);
  };

  const handleCheckEmailDuplicate = () => {
    // TODO: API 연동
    setIsEmailDuplicate(true);
  };

  const handleToggleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeService(next);
    setAgreePrivacy(next);
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSignupComplete?.();
  };

  return (
    <div className="signup-page">
      <p className="signup-page__title">MoodTail</p>
      <p className="signup-page__subtitle">오늘의 기분을, 한잔의 칵테일로</p>

      {/* 이메일 */}
      {isEmailDuplicate ? (
        <p className="signup-page__label signup-page__label--error signup-page__label--email">
          다른 이메일을 입력해주세요
        </p>
      ) : (
        <p className="signup-page__label signup-page__label--email">이메일</p>
      )}
      <input
        type="email"
        className={`signup-page__email-input ${isEmailDuplicate ? "signup-page__email-input--error" : ""}`}
        placeholder="이메일 주소를 입력해주세요"
        value={email}
        onChange={handleEmailChange}
      />
      <button
        type="button"
        className="signup-page__duplicate-check"
        onClick={handleCheckEmailDuplicate}
      >
        중복확인
      </button>

      {/* 비밀번호 */}
      <p className="signup-page__label signup-page__label--password">
        비밀번호
      </p>
      <div className="signup-page__password-box">
        <input
          type={showPassword ? "text" : "password"}
          className="signup-page__password-input"
          placeholder="영문, 숫자를 포함하여 8자 이상 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="signup-page__eye-toggle"
          onClick={() => setShowPassword((v) => !v)}
          aria-label="비밀번호 표시 전환"
        >
          <PasswordToggleIcon visible={showPassword} />
        </button>
      </div>

      {/* 비밀번호 확인 */}
      {passwordMismatch ? (
        <p className="signup-page__label signup-page__label--error signup-page__label--password-confirm">
          비밀번호가 일치하지 않습니다
        </p>
      ) : (
        <p className="signup-page__label signup-page__label--password-confirm">
          비밀번호 확인
        </p>
      )}
      <div
        className={`signup-page__password-box signup-page__password-box--confirm ${passwordMismatch ? "signup-page__password-box--error" : ""}`}
      >
        <input
          type={showPasswordConfirm ? "text" : "password"}
          className="signup-page__password-input"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button
          type="button"
          className="signup-page__eye-toggle"
          onClick={() => setShowPasswordConfirm((v) => !v)}
          aria-label="비밀번호 확인 표시 전환"
        >
          <PasswordToggleIcon visible={showPasswordConfirm} />
        </button>
      </div>

      {/* 닉네임 */}
      <p className="signup-page__label signup-page__label--nickname">닉네임</p>
      <input
        type="text"
        className="signup-page__nickname-input"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      {/* 이용약관 동의 */}
      <p className="signup-page__terms-title">이용약관 동의</p>
      <div className="signup-page__terms-card">
        <button
          type="button"
          className={`signup-page__checkbox signup-page__checkbox--all ${agreeAll ? "signup-page__checkbox--checked" : ""}`}
          onClick={handleToggleAgreeAll}
          aria-label="전체 동의하기"
        >
          {agreeAll && "✓"}
        </button>
        <p className="signup-page__terms-all-label">전체 동의하기</p>
        <span className="signup-page__terms-divider" />

        <button
          type="button"
          className={`signup-page__checkbox signup-page__checkbox--service ${agreeService ? "signup-page__checkbox--checked" : ""}`}
          onClick={() => setAgreeService((v) => !v)}
          aria-label="서비스 이용약관 동의"
        >
          {agreeService && "✓"}
        </button>
        <p className="signup-page__terms-label signup-page__terms-label--service">
          [필수] 서비스 이용약관 동의
        </p>
        <button
          type="button"
          className="signup-page__terms-view signup-page__terms-view--service"
        >
          보기
        </button>

        <button
          type="button"
          className={`signup-page__checkbox signup-page__checkbox--privacy ${agreePrivacy ? "signup-page__checkbox--checked" : ""}`}
          onClick={() => setAgreePrivacy((v) => !v)}
          aria-label="개인정보 수집 및 이용 동의"
        >
          {agreePrivacy && "✓"}
        </button>
        <p className="signup-page__terms-label signup-page__terms-label--privacy">
          [필수] 개인정보 수집 및 이용 동의
        </p>
        <button
          type="button"
          className="signup-page__terms-view signup-page__terms-view--privacy"
        >
          보기
        </button>
      </div>

      <button
        type="button"
        className="signup-page__submit"
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        회원가입 완료
      </button>
    </div>
  );
};

export default SignupPage;
