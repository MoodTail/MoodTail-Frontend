import { useEffect, useState } from "react";
import type { FC } from "react";
import "../../styles/SocialSignupPage.css";
import { getTerms } from "../../api/terms/terms.api";
import type { Term } from "../../api/terms/terms.types";

interface SocialSignupPageProps {
  provider: "kakao" | "google";
  onSignupComplete?: () => void;
}

const SocialSignupPage: FC<SocialSignupPageProps> = ({
  provider,
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

      // TODO: provider(kakao/google) 회원가입 API 연동
      // const result = await postSocialSignup(provider, { nickname, agreements });
      // localStorage.setItem("accessToken", result.accessToken);

      onSignupComplete?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="social-signup-page">
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
