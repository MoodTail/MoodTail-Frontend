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
import SignupPage from "../SignupPage/SignupPage";
import PostLoginScreen from "../PostLoginScreen/PostLoginScreen";
import { postGuestLogin } from "../../api/auth/auth.api.ts";
import { postLoginLocal } from "../../api/auth/auth.api.ts";
import { prefetchRecipes, prefetchSavedRecipes } from "../RecipePage/RecipePage";
import { prefetchCharacterDex } from "../CharacterPage/CharacterPage";
import { prefetchQuizQuestions } from "../../data/quiz";

interface LoginPageProps {
  onLogin: () => void;
}

type LoginStep =
  | "onboarding"
  | "login"
  | "findPassword"
  | "signup"
  | "postLogin";

const LoginPage: FC<LoginPageProps> = ({ onLogin }) => {
  const [step, setStep] = useState<LoginStep>("onboarding");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  // 로그인/게스트 로그인 요청이 오래 걸려도 화면에 아무 표시가 없으면 버튼이 안 눌리는
  // 것처럼 보입니다. 어느 버튼이 요청 중인지는 보여주되, 실패 문구는 표시하지 않습니다.
  const [pendingAction, setPendingAction] = useState<"login" | "skip" | null>(null);

  const handleOnboardingFinish = (): void => setStep("login");

  if (step === "onboarding") {
    return <OnboardingPage onFinish={handleOnboardingFinish} />;
  }

  if (step === "signup") {
    return <SignupPage onSignupComplete={() => setStep("login")} />;
  }

  if (step === "findPassword") {
    return <FindPasswordPage onBack={() => setStep("login")} />;
  }

  if (step === "postLogin") {
    return <PostLoginScreen onComplete={onLogin} />;
  }

  const handleLoginClick = async (): Promise<void> => {
    if (pendingAction) return;
    setLoginError(false);
    setPendingAction("login");
    try {
      const result = await postLoginLocal({ email: userId, password });

      localStorage.removeItem("isGuest");
      localStorage.setItem("accessToken", result.accessToken);
      // "환영합니다" 애니메이션(PostLoginScreen)이 도는 몇 초 동안 캐릭터 도감/레시피 데이터를
      // 미리 받아둡니다 — isLoggedIn이 실제로 바뀌는 건 그 애니메이션이 끝난 뒤라, 그때까지
      // 기다리면 도감 탭에 처음 들어갈 때 매번 로딩이 보였습니다.
      prefetchRecipes();
      prefetchCharacterDex();
      prefetchQuizQuestions();
      prefetchSavedRecipes();
      setStep("postLogin");
    } catch (error) {
      console.error(error);
      setLoginError(true);
    } finally {
      setPendingAction(null);
    }
  };

  const handleSkipLogin = async (): Promise<void> => {
    if (pendingAction) return;
    setPendingAction("skip");
    try {
      let guestUuid = localStorage.getItem("guestUuid");
      if (!guestUuid) {
        guestUuid = crypto.randomUUID();
        localStorage.setItem("guestUuid", guestUuid);
      }

      const result = await postGuestLogin({ guestUuid });

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("isGuest", "true");
      // 게스트는 도감 탭 접근이 막혀 있고 도감 API도 인증을 요구하므로 도감은 제외합니다.
      prefetchRecipes();
      prefetchQuizQuestions();
      setStep("postLogin");
    } catch (error) {
      console.error(error);
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div className={`login-page${loginError ? " login-page--error" : ""}`}>
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
          onChange={(e) => {
            setUserId(e.target.value);
            setLoginError(false);
          }}
          className={loginError ? "custom-input--error" : undefined}
          aria-invalid={loginError}
        />
      </div>

      <div className="login-page__password-input">
        <PasswordInput
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginError(false);
          }}
          className={loginError ? "custom-input--error" : undefined}
          aria-invalid={loginError}
          aria-describedby={loginError ? "login-error-message" : undefined}
        />
      </div>

      {loginError && (
        <p id="login-error-message" className="login-page__error" role="alert">
          아이디 또는 비밀번호가 일치하지 않습니다
        </p>
      )}

      <button
        type="button"
        className="login-page__login-button"
        onClick={() => void handleLoginClick()}
        disabled={pendingAction !== null}
      >
        로그인
      </button>

      <div className="login-page__links">
        <button
          type="button"
          className="login-page__link"
          onClick={() => setStep("signup")}
        >
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

      <button
        type="button"
        className="login-page__skip-link"
        onClick={() => void handleSkipLogin()}
        disabled={pendingAction !== null}
      >
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
