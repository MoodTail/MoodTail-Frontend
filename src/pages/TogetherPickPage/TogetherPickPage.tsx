import { useState } from "react";
import TogetherPickHeader from "../../components/TogetherPick/TogetherPickHeader";
import MatchIntroCard from "../../components/TogetherPick/MatchIntroCard";
import InviteCodeCard from "../../components/TogetherPick/InviteCodeCard";
import PartnerCodeCard from "../../components/TogetherPick/PartnerCodeCard";
import NoResultModal from "../../components/TogetherPick/NoResultModal";
import LoginRequiredModal from "../../components/TogetherPick/LoginRequiredModal";
import TasteComparePage from "../TasteComparePage/TasteComparePage";
import CocktailRecommendPage from "../../components/CocktailRecommendPage/CocktailRecommendPage";
import Button from "../../components/Button/Button";
import "../../styles/TogetherPickPage.css";

type TogetherPickStep = "input" | "compare" | "result";

interface TogetherPickPageProps {
  onBack?: () => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
  myInviteCode?: string;
}

function TogetherPickPage({
  onBack,
  onLogin,
  isLoggedIn = true,
  myInviteCode = "MOOD-4821",
}: TogetherPickPageProps) {
  const [step, setStep] = useState<TogetherPickStep>("input");
  const [partnerCode, setPartnerCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [showNoResultModal, setShowNoResultModal] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(
    () => !isLoggedIn || localStorage.getItem("isGuest") === "true",
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(myInviteCode);
  };

  const handleStart = () => {
    const isValidCode = true; // TODO: 실제 API 연동 전 임시로 true (흐름 확인용)
    if (!isValidCode) {
      setIsError(true);
      const nextCount = errorCount + 1;
      setErrorCount(nextCount);
      if (nextCount >= 2) setShowNoResultModal(true);
      return;
    }
    setIsError(false);
    setStep("compare");
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
        matchPercent={70} // TODO: API 연동
        myValues={[80, 65, 40, 55, 70]} // TODO: API 연동
        partnerValues={[60, 75, 55, 45, 50]} // TODO: API 연동
      />
    );
  }

  if (step === "result") {
    return (
      <CocktailRecommendPage
        onBack={() => setStep("compare")}
        onRetry={() => setStep("input")}
        matchPercent={70} // TODO: API 연동
        topPick={{
          tagline: "둘의 최적 타협점",
          name: "피치 하이볼",
          description: "달콤한 과일감은 살리고\n도수는 부담 없게 맞춘 한 잔",
          myMatchPercent: 70,
          partnerMatchPercent: 85,
        }} // TODO: API 연동
        tasteAttribution={{
          dominant: "달달함",
          dominantOwner: "A",
          secondary: "씁쓸함",
          secondaryOwner: "B",
        }} // TODO: API 연동
        ranking={[
          {
            rank: 1,
            name: "피치 하이볼",
            description: "달콤하고 산뜻한 균형",
            percent: 91,
            color: "#FF613D",
          },
          {
            rank: 2,
            name: "모히토",
            description: "청량감 중심의 타협",
            percent: 87,
            color: "#34DBCE",
          },
          {
            rank: 3,
            name: "진 토닉",
            description: "깔끔한 쌉싸름함",
            percent: 82,
            color: "#1564FE",
          },
        ]} // TODO: API 연동
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
      <InviteCodeCard code={myInviteCode} onCopy={handleCopy} />
      <PartnerCodeCard
        value={partnerCode}
        onChange={setPartnerCode}
        isError={isError}
      />
      <Button
        variant="cta"
        className="together-pick-page__start"
        onClick={handleStart}
        disabled={partnerCode.trim().length === 0}
      >
        같이 고르기 시작
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
