import { useState } from "react";
import type { FC } from "react";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/login/PasswordInput";
import Button from "../../components/Button/Button";
import SnsLoginButtons from "../../components/login/SnsLoginButtons";
import "../../styles/LoginPage.css";
import OnboardingPage from "../OnboardingPage/OnboardingPage";

interface LoginPageProps {
  onLogin: () => void;
}

type LoginStep = "onboarding" | "login";

const LoginPage: FC<LoginPageProps> = ({ onLogin }) => {
  const [step, setStep] = useState<LoginStep>("onboarding");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleOnboardingFinish = (): void => {
    setStep("login");
  };

  if (step === "onboarding") {
    return <OnboardingPage onFinish={handleOnboardingFinish} />;
  }

  const handleLoginClick = (): void => {
    // 로그인 API 연동 시 여기에 유효성 검사 추가
    onLogin();
  };

  const handleSkipClick = (): void => {
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-page__logo">
        <h1 className="login-page__logo-title">MoodTail</h1>
        <p className="login-page__logo-subtitle">
          오늘의 기분을, 한잔의 칵테일로
        </p>
      </div>

      <div className="login-page__form">
        <Input
          type="text"
          placeholder="아이디 입력"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <PasswordInput
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="primary"
          className="login-page__login-button"
          onClick={handleLoginClick}
        >
          로그인
        </Button>

        <button
          type="button"
          className="login-page__skip-link"
          onClick={handleSkipClick}
        >
          로그인 없이 이용하기
        </button>
      </div>

      <SnsLoginButtons />
    </div>
  );
};

export default LoginPage;
