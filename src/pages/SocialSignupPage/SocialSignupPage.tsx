import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import "../../styles/SocialSignupPage.css";
import { getTerms } from "../../api/terms/terms.api";
import type { Term } from "../../api/terms/terms.types";
import {
  postKakaoLogin,
  postGoogleLogin,
  postSignupSocial,
} from "../../api/auth/auth.api";
import TermViewModal from "../../components/Modal/TermViewModal";

interface SocialSignupPageProps {
  provider: "kakao" | "google";
  authorizationCode: string;
  stateValue: string;
  redirectUri: string;
  onSignupComplete?: () => void;
}

type Phase = "checking" | "signup-required" | "error";

const SocialSignupPage: FC<SocialSignupPageProps> = ({
  provider,
  authorizationCode,
  stateValue,
  redirectUri,
  onSignupComplete,
}) => {
  const [phase, setPhase] = useState<Phase>("checking");
  const [signupToken, setSignupToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [agreeTerms1, setAgreeTerms1] = useState(false);
  const [agreeTerms2, setAgreeTerms2] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [terms, setTerms] = useState<Term[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingTerm, setViewingTerm] = useState<Term | null>(null);
  const hasCheckedOauth = useRef(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const result = await getTerms();
        setTerms(result);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchTerms();
  }, []);

  useEffect(() => {
    // React StrictMode(개발 모드)에서 이 effect가 두 번 실행되는데,
    // 구글/카카오 인가 코드는 1회용이라 두 번째 호출은 반드시 실패한다.
    // ref 플래그로 실제 API 호출은 최초 1회만 나가도록 막는다.
    if (hasCheckedOauth.current) return;
    hasCheckedOauth.current = true;

    const checkOauth = async () => {
      try {
        const oauthFn = provider === "kakao" ? postKakaoLogin : postGoogleLogin;
        const result = await oauthFn({
          authorizationCode,
          redirectUri,
          state: stateValue,
        });

        if (result.status === "LOGIN_COMPLETED" && result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          onSignupComplete?.();
          return;
        }

        if (result.status === "SIGNUP_REQUIRED" && result.signupToken) {
          setSignupToken(result.signupToken);
          setPhase("signup-required");
          return;
        }

        setPhase("error");
      } catch (error) {
        console.error(error);
        setPhase("error");
      }
    };

    void checkOauth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const agreeAll = agreeTerms1 && agreeTerms2 && agreePrivacy;

  const isFormValid =
    nickname.trim().length > 0 && agreeTerms1 && agreeTerms2 && agreePrivacy;

  const handleToggleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeTerms1(next);
    setAgreeTerms2(next);
    setAgreePrivacy(next);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isFormValid || !signupToken) return;

    setIsSubmitting(true);
    try {
      const serviceTermId = terms.find((t) => t.termType === "SERVICE")?.termId;
      const privacyTermId = terms.find((t) => t.termType === "PRIVACY")?.termId;

      if (!serviceTermId || !privacyTermId) {
        console.error("약관 정보를 불러오지 못했습니다.");
        return;
      }

      const agreements = [
        { termId: serviceTermId, agreed: agreeTerms2 },
        { termId: privacyTermId, agreed: agreePrivacy },
      ];

      const result = await postSignupSocial({
        signupToken,
        nickname,
        agreements,
      });

      // accessToken이 없으면 로그인 상태로 넘어가면 안 된다.
      // 여기서 그냥 onSignupComplete를 불러버리면 App.tsx가 토큰 유무와
      // 상관없이 isLoggedIn(true)로 바꿔버려서, 화면은 로그인된 것처럼
      // 홈으로 넘어가지만 실제로는 토큰이 없어 API 호출마다 401이 나는
      // "로그인 풀린 상태"가 된다.
      if (!result.accessToken) {
        console.error("회원가입 응답에 accessToken이 없습니다.", result);
        setPhase("error");
        return;
      }

      localStorage.setItem("accessToken", result.accessToken);
      onSignupComplete?.();
    } catch (error) {
      console.error(error);
      setPhase("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (phase === "checking") {
    return (
      <div className="social-signup-page">
        <p className="social-signup-page__title">MoodTail</p>
        <p className="social-signup-page__subtitle">로그인 확인 중...</p>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="social-signup-page">
        <p className="social-signup-page__title">MoodTail</p>
        <p className="social-signup-page__subtitle">
          로그인에 실패했어요. 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="social-signup-page">
      <svg
        className="social-signup-page__bg-decoration"
        viewBox="0 0 393 824"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <circle
          cx="331"
          cy="230"
          r="173"
          fill="url(#moodtail-blob-1)"
          fillOpacity="0.28"
        />
        <circle
          cx="33"
          cy="676"
          r="199"
          fill="url(#moodtail-blob-2)"
          fillOpacity="0.38"
        />
        <defs>
          <radialGradient
            id="moodtail-blob-1"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(331 230) rotate(90) scale(173)"
          >
            <stop stopColor="#FF6F4F" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="moodtail-blob-2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(33 676) rotate(90) scale(199)"
          >
            <stop stopColor="#FEF6D9" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <p className="social-signup-page__title">MoodTail</p>
      <p className="social-signup-page__subtitle">
        오늘의 기분을, 한잔의 칵테일로
      </p>

      <p className="social-signup-page__label">닉네임</p>
      <input
        type="text"
        className="social-signup-page__nickname-input"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <p className="social-signup-page__terms-title">이용약관 동의</p>
      <div className="social-signup-page__terms-card">
        <button
          type="button"
          className={`social-signup-page__checkbox social-signup-page__checkbox--all ${agreeAll ? "social-signup-page__checkbox--checked" : ""}`}
          onClick={handleToggleAgreeAll}
          aria-label="전체 동의하기"
        >
          {agreeAll && "✓"}
        </button>
        <p className="social-signup-page__terms-all-label">전체 동의하기</p>
        <span className="social-signup-page__terms-divider" />

        <button
          type="button"
          className={`social-signup-page__checkbox social-signup-page__checkbox--terms1 ${agreeTerms1 ? "social-signup-page__checkbox--checked" : ""}`}
          onClick={() => setAgreeTerms1((v) => !v)}
          aria-label="만 14세 이상"
        >
          {agreeTerms1 && "✓"}
        </button>
        <p className="social-signup-page__terms-label social-signup-page__terms-label--terms1">
          [필수] 만 14세 이상입니다
        </p>

        <button
          type="button"
          className={`social-signup-page__checkbox social-signup-page__checkbox--terms2 ${agreeTerms2 ? "social-signup-page__checkbox--checked" : ""}`}
          onClick={() => setAgreeTerms2((v) => !v)}
          aria-label="서비스 이용약관 동의"
        >
          {agreeTerms2 && "✓"}
        </button>
        <p className="social-signup-page__terms-label social-signup-page__terms-label--terms2">
          [필수] 서비스 이용약관 동의
        </p>
        <button
          type="button"
          className="social-signup-page__terms-view social-signup-page__terms-view--terms2"
          onClick={() =>
            setViewingTerm(terms.find((t) => t.termType === "SERVICE") ?? null)
          }
        >
          보기
        </button>

        <button
          type="button"
          className={`social-signup-page__checkbox social-signup-page__checkbox--privacy ${agreePrivacy ? "social-signup-page__checkbox--checked" : ""}`}
          onClick={() => setAgreePrivacy((v) => !v)}
          aria-label="개인정보 수집 및 이용 동의"
        >
          {agreePrivacy && "✓"}
        </button>
        <p className="social-signup-page__terms-label social-signup-page__terms-label--privacy">
          [필수] 개인정보 수집 및 이용 동의
        </p>
        <button
          type="button"
          className="social-signup-page__terms-view social-signup-page__terms-view--privacy"
          onClick={() =>
            setViewingTerm(terms.find((t) => t.termType === "PRIVACY") ?? null)
          }
        >
          보기
        </button>
      </div>

      <button
        type="button"
        className="social-signup-page__submit"
        onClick={() => void handleSubmit()}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "처리 중..." : "회원가입 완료"}
      </button>

      {viewingTerm && (
        <TermViewModal
          title={viewingTerm.title}
          content={viewingTerm.content}
          onClose={() => setViewingTerm(null)}
        />
      )}
    </div>
  );
};

export default SocialSignupPage;
