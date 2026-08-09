import { useEffect, useState } from "react";
import TogetherPickHeader from "../../components/TogetherPick/TogetherPickHeader";
import MatchIntroCard from "../../components/TogetherPick/MatchIntroCard";
import InviteCodeCard from "../../components/TogetherPick/InviteCodeCard";
import PartnerCodeCard from "../../components/TogetherPick/PartnerCodeCard";
import NoResultModal from "../../components/TogetherPick/NoResultModal";
import LoginRequiredModal from "../../components/TogetherPick/LoginRequiredModal";
import TasteComparePage from "../TasteComparePage/TasteComparePage";
import CocktailRecommendPage from "../../components/CocktailRecommendPage/CocktailRecommendPage";
import Button from "../../components/Button/Button";
import { postPairRecommendation } from "../../api/cocktails/cocktails.api";
import type { PairRecommendationResult } from "../../api/cocktails/cocktails.types";
import { postInviteCode } from "../../api/users/users.api";
import "../../styles/TogetherPickPage.css";

type TogetherPickStep = "input" | "compare" | "result";

interface TogetherPickPageProps {
  onBack?: () => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
  myResultId?: number;
  myResultShareToken?: string;
}

const RANKING_COLORS = ["#FF613D", "#34DBCE", "#1564FE", "#FFC107"];

function TogetherPickPage({
  onBack,
  onLogin,
  isLoggedIn = true,
  myResultId,
  myResultShareToken,
}: TogetherPickPageProps) {
  const [step, setStep] = useState<TogetherPickStep>("input");
  const [inviteCode, setInviteCode] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [showNoResultModal, setShowNoResultModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pairResult, setPairResult] = useState<PairRecommendationResult | null>(
    null,
  );

  const [showLoginModal, setShowLoginModal] = useState(
    () => !isLoggedIn || localStorage.getItem("isGuest") === "true",
  );

  useEffect(() => {
    postInviteCode()
      .then((result) => setInviteCode(result.inviteCode))
      .catch(() => {
        // TODO: 초대 코드 조회 실패 시 에러 UI 필요하면 여기서 처리
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
  };

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const result = await postPairRecommendation({
        resultId: myResultId,
        resultShareToken: myResultShareToken,
        partnerShareToken: partnerCode,
      });
      setPairResult(result);
      setIsError(false);
      setStep("compare");
    } catch {
      setIsError(true);
      const nextCount = errorCount + 1;
      setErrorCount(nextCount);
      if (nextCount >= 2) setShowNoResultModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    onLogin?.();
  };

  if (step === "compare") {
    return (
      <TasteComparePage
        onBack={() => setStep("input")}
        onViewResult={() => setStep("result")}
        matchPercent={70} // 개별 취향 비교 API 필요
        myValues={[80, 65, 40, 55, 70]} // 개별 취향 비교 API 필요
        partnerValues={[60, 75, 55, 45, 50]} // 개별 취향 비교 API 필요
      />
    );
  }

  if (step === "result" && pairResult) {
    const first =
      pairResult.recommendations.find((item) => item.ranking === 1) ??
      pairResult.recommendations[0];

    return (
      <CocktailRecommendPage
        onBack={() => setStep("compare")}
        onRetry={() => setStep("input")}
        matchPercent={first?.matchScore ?? 0}
        topPick={{
          tagline: "둘의 최적 타협점",
          name: first?.nameKo ?? "",
          description: "", // API에 설명 텍스트 없음
          myMatchPercent: first?.matchScore ?? 0,
          partnerMatchPercent: first?.matchScore ?? 0,
        }}
        tasteAttribution={{
          dominant: "달달함", // compromiseProfile 기반 계산 필요
          dominantOwner: "A",
          secondary: "씁쓸함",
          secondaryOwner: "B",
        }}
        ranking={pairResult.recommendations.map((item) => ({
          rank: item.ranking,
          name: item.nameKo,
          description: "",
          percent: item.matchScore,
          color: RANKING_COLORS[(item.ranking - 1) % RANKING_COLORS.length],
        }))}
      />
    );
  }

  return (
    <div className="together-pick-page">
      <TogetherPickHeader
        title="같이 고르기"
        description="가장 최근 결과를 불러와서 알맞는 칵테일을 추천해줘요"
        onBack={onBack}
      />
      <MatchIntroCard />
      <InviteCodeCard code={inviteCode} onCopy={handleCopy} />
      <PartnerCodeCard
        value={partnerCode}
        onChange={setPartnerCode}
        isError={isError}
      />
      <Button
        variant="cta"
        className="together-pick-page__start"
        onClick={handleStart}
        disabled={partnerCode.trim().length === 0 || isLoading}
      >
        {isLoading ? "확인 중..." : "같이 고르기 시작"}
      </Button>
      <p className="together-pick-page__hint">
        상대방이 링크를 열면 자동으로 다음 단계로 이동해요.
      </p>
      {showNoResultModal && (
        <NoResultModal onClose={() => setShowNoResultModal(false)} />
      )}
      {showLoginModal && (
        <LoginRequiredModal
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default TogetherPickPage;
