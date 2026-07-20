import { useState } from "react";
import CustomRecommendHeader from "../../components/CustomRecommend/CustomRecommendHeader";
import MatchIntroCard from "../../components/CustomRecommend/MatchIntroCard";
import InviteCodeCard from "../../components/CustomRecommend/InviteCodeCard";
import PartnerCodeCard from "../../components/CustomRecommend/PartnerCodeCard";
import NoResultModal from "../../components/CustomRecommend/NoResultModal";
import Button from "../../components/Button/Button";
import "../../styles/CustomRecommendPage.css";

interface CustomRecommendPageProps {
  onBack?: () => void;
  myInviteCode?: string;
}

function CustomRecommendPage({
  onBack,
  myInviteCode = "MOOD-4821",
}: CustomRecommendPageProps) {
  const [partnerCode, setPartnerCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [showNoResultModal, setShowNoResultModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(myInviteCode);
  };

  const handleStart = () => {
    // api 연동해서 상태 코드로 결과 조회
    const isValidCode = false; // 이건 임시코드

    if (!isValidCode) {
      setIsError(true);
      const nextCount = errorCount + 1;
      setErrorCount(nextCount);
      if (nextCount >= 2) {
        setShowNoResultModal(true);
      }
      return;
    }

    setIsError(false);
    //다음 단계 이동
  };

  return (
    <div className="custom-recommend-page">
      <CustomRecommendHeader
        title="커스텀 추천"
        description="상대방의 결과를 가져와 둘 다 만족할 칵테일을 찾아요."
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
        className="custom-recommend-page__start"
        onClick={handleStart}
      >
        함께 고르기 시작
      </Button>
      <p className="custom-recommend-page__hint">
        상대방이 링크를 열면 자동으로 다음 단계로 이동해요.
      </p>

      {showNoResultModal && (
        <NoResultModal onClose={() => setShowNoResultModal(false)} />
      )}
    </div>
  );
}

export default CustomRecommendPage;
