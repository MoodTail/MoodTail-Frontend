import { useState } from "react";
import { getType } from "../../data/types";
import CharacterDexPage from "../CharacterDexPage/CharacterDexPage";
import RepresentativeTypeSettingPage from "../RepresentativeTypeSettingPage/RepresentativeTypeSettingPage";
import TypeDetailPage from "../TypeDetailPage/TypeDetailPage";
import TypeDexPage from "../TypeDexPage/TypeDexPage";
import DexShareModal from "../../components/DexShareModal";
import ResultSnsShareModal from "../../components/common/modal/ResultSnsShareModal";
import CompleteModal from "../../components/CompleteModal";
import SaveCompleteToast from "../../components/common/SaveCompleteToast";

type Screen =
  | { name: "typeDex" }
  | { name: "characterDex"; typeId: string }
  | { name: "typeDetail"; typeId: string }
  | { name: "repSetting"; typeId: string };

function CharacterPage() {
  const [screen, setScreen] = useState<Screen>({ name: "typeDex" });
  const [repTypeId, setRepTypeId] = useState("idealist");
  const [shareTypeId, setShareTypeId] = useState<string | null>(null);
  const [snsModalOpen, setSnsModalOpen] = useState(false);
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const goTypeDex = () => setScreen({ name: "typeDex" });
  const openCharacterDex = (typeId: string) => setScreen({ name: "characterDex", typeId });
  const openTypeDetail = (typeId: string) => setScreen({ name: "typeDetail", typeId });
  const openRepSetting = (typeId: string) => setScreen({ name: "repSetting", typeId });

  const handleGoTest = () => setCompleteMessage("취향 테스트 페이지는 준비 중이에요");

  const handleKakaoShare = () => {
    // TODO: 카카오 SDK 연동
    console.log("TODO: 카카오톡 공유 SDK 연동");
  };

  const dismissSavedToast = () => {
    setShowSavedToast(false);
    if (screen.name === "repSetting") goTypeDex();
  };

  return (
    <>
      {screen.name === "typeDex" && (
        <TypeDexPage
          repTypeId={repTypeId}
          onOpenType={openCharacterDex}
          onOpenTypeDetail={openTypeDetail}
          onShare={() => setShareTypeId(repTypeId)}
          onBack={() => window.history.back()}
          onGoTest={handleGoTest}
        />
      )}

      {screen.name === "characterDex" && (
        <CharacterDexPage
          type={getType(screen.typeId)}
          onShare={() => setShareTypeId(screen.typeId)}
          onOpenDetail={() => openTypeDetail(screen.typeId)}
          onOpenTypeDetail={openTypeDetail}
          onGoTest={handleGoTest}
        />
      )}

      {screen.name === "typeDetail" && (
        <TypeDetailPage
          type={getType(screen.typeId)}
          onBack={() => openCharacterDex(screen.typeId)}
          onSetRepresentative={() => openRepSetting(screen.typeId)}
          onGoTest={handleGoTest}
        />
      )}

      {screen.name === "repSetting" && (
        <RepresentativeTypeSettingPage
          type={getType(screen.typeId)}
          onBack={() => openTypeDetail(screen.typeId)}
          onConfirm={() => {
            setRepTypeId(screen.typeId);
            setShowSavedToast(true);
          }}
        />
      )}

      {shareTypeId && (
        <DexShareModal
          type={getType(shareTypeId)}
          onClose={() => setShareTypeId(null)}
          onShareSns={() => {
            setShareTypeId(null);
            setSnsModalOpen(true);
          }}
          onSaveImage={() => setShowSavedToast(true)}
        />
      )}

      <ResultSnsShareModal
        isOpen={snsModalOpen}
        url="https://moodtail.app/share/mock-id"
        onClose={() => setSnsModalOpen(false)}
        onKakaoShare={handleKakaoShare}
      />

      <SaveCompleteToast
        message="저장 완료되었습니다"
        isVisible={showSavedToast}
        onHide={dismissSavedToast}
        duration={1200}
      />

      {completeMessage && (
        <CompleteModal
          message={completeMessage}
          onClose={() => {
            setCompleteMessage(null);
            if (screen.name === "repSetting") goTypeDex();
          }}
        />
      )}
    </>
  );
}

export default CharacterPage;
