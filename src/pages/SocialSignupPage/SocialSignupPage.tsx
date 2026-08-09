import { useEffect, useState } from "react";
import type { FC } from "react";
import "../../styles/SocialSignupPage.css";
import { getTerms } from "../../api/terms/terms.api.ts";
import type { Term } from "../../api/terms/terms.types.ts";
import { postKakaoLogin, postGoogleLogin } from "../../api/auth/auth.api.ts";

interface SocialSignupPageProps {
  provider: "kakao" | "google";
  authorizationCode: string;
  stateValue: string;
  redirectUri: string;
  onSignupComplete?: () => void;
}

const SocialSignupPage: FC<SocialSignupPageProps> = ({
  provider,
  authorizationCode,
  stateValue,
  redirectUri,
  onSignupComplete,
}) => {
  const [nickname, setNickname] = useState("");
  const [agreeTerms1, setAgreeTerms1] = useState(false);
  const [agreeTerms2, setAgreeTerms2] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [terms, setTerms] = useState<Term[]>([]);

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
    if (!isFormValid) return;

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

      const requestBody = {
        authorizationCode,
        redirectUri,
        state: stateValue,
        nickname,
        agreements,
      };

      const result =
        provider === "kakao"
          ? await postKakaoLogin(requestBody)
          : await postGoogleLogin(requestBody);

      localStorage.setItem("accessToken", result.accessToken);
      onSignupComplete?.();
    } catch (error) {
      console.error(error);
    }
  };

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

        <p className="social-signup-page__terms-label social-signup-page__terms-label--terms2">
          [필수] 서비스 이용약관 동의
        </p>
        <button
          type="button"
          className="social-signup-page__terms-view social-signup-page__terms-view--terms2"
        >
          보기
        </button>

        <p className="social-signup-page__terms-label social-signup-page__terms-label--privacy">
          [필수] 개인정보 수집 및 이용 동의
        </p>
        <button
          type="button"
          className="social-signup-page__terms-view social-signup-page__terms-view--privacy"
        >
          보기
        </button>
      </div>

      <button
        type="button"
        className="social-signup-page__submit"
        onClick={() => void handleSubmit()}
        disabled={!isFormValid}
      >
        회원가입 완료
      </button>
    </div>
  );
};

export default SocialSignupPage;
