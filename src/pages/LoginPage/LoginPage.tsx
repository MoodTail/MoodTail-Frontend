import { useState } from "react";
import type { FC } from "react";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/login/PasswordInput";
import SnsLoginButtons from "../../components/login/SnsLoginButtons";
import BackgroundBlur from "../../components/common/BackgroundBlur";
import "../../styles/LoginPage.css";
import "../../styles/SnsLoginButtons.css";
import OnboardingPage from "../OnboardingPage/OnboardingPage";
import FindPasswordPage from "../../components/login/FindPasswordPage";

interface LoginPageProps {
  onLogin: () => void;
}

type LoginStep = "onboarding" | "login" | "findPassword";

const LoginPage: FC<LoginPageProps> = ({ onLogin }) => {
  const [step, setStep] = useState<LoginStep>("onboarding");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleOnboardingFinish = (): void => setStep("login");

  if (step === "onboarding") {
    return <OnboardingPage onFinish={handleOnboardingFinish} />;
  }

  if (step === "findPassword") {
    return <FindPasswordPage onBack={() => setStep("login")} />;
  }

  const handleLoginClick = (): void => {
    onLogin();
  };

  return (
    <div className="login-page">
      <BackgroundBlur
        idPrefix="login-bg"
        width={393}
        height={824}
        circles={[
          { cx: 331, cy: 230, r: 173, color: "#FF6F4F", opacity: 0.28 },
          { cx: 33, cy: 676, r: 199, color: "#FEF6D9", opacity: 0.38 },
        ]}
      />

      <h1 className="login-page__title">MoodTail</h1>
      <p className="login-page__subtitle">오늘의 기분을, 한잔의 칵테일로</p>

      <div className="login-page__id-input">
        <Input
          type="text"
          placeholder="아이디 입력"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div className="login-page__password-input">
        <PasswordInput
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="login-page__login-button"
        onClick={handleLoginClick}
      >
        로그인
      </button>

      <div className="login-page__links">
        <button type="button" className="login-page__link">
          회원가입
        </button>
        <span className="login-page__link-divider" />
        <button
          type="button"
          className="login-page__link"
          onClick={() => setStep("findPassword")}
        >
          비밀번호 찾기
        </button>
      </div>

      <button type="button" className="login-page__skip-link" onClick={onLogin}>
        로그인 없이 이용하기
      </button>

      <div className="login-page__divider">
        <span className="login-page__divider-line" />
        <span className="login-page__divider-text">또는</span>
        <span className="login-page__divider-line" />
      </div>

      <div className="login-page__sns">
        <SnsLoginButtons />
      </div>
    </div>
  );
};

export default LoginPage;
