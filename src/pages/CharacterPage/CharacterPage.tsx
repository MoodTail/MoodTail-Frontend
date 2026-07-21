import { useEffect, useState } from "react";
import { getType } from "../../data/types";
import CharacterDexPage from "../CharacterDexPage";
import RepresentativeTypeSettingPage from "../RepresentativeTypeSettingPage";
import TypeDetailPage from "../TypeDetailPage";
import TypeDexPage from "../TypeDexPage";
import DexShareModal from "../../components/DexShareModal";
import SnsShareOptionsModal from "../../components/SnsShareOptionsModal";
import CompleteModal from "../../components/CompleteModal";
import SavedToast from "../../components/MyPage/CompleteModal";

const SAVED_TOAST_DURATION_MS = 1200;

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

  const dismissSavedToast = () => {
    setShowSavedToast(false);
    if (screen.name === "repSetting") goTypeDex();
  };

  useEffect(() => {
    if (!showSavedToast) return;
    const timer = setTimeout(dismissSavedToast, SAVED_TOAST_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSavedToast]);

  return (
    <>
      {screen.name === "typeDex" && (
        <TypeDexPage
          repTypeId={repTypeId}
          onOpenType={openCharacterDex}
          onOpenTypeDetail={openTypeDetail}
          onShare={() => setShareTypeId(repTypeId)}
          onBack={() => window.history.back()}
        />
      )}

      {screen.name === "characterDex" && (
        <CharacterDexPage
          type={getType(screen.typeId)}
          onShare={() => setShareTypeId(screen.typeId)}
          onOpenDetail={() => openTypeDetail(screen.typeId)}
          onOpenTypeDetail={openTypeDetail}
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

      {snsModalOpen && <SnsShareOptionsModal onClose={() => setSnsModalOpen(false)} />}

      {showSavedToast && (
        <SavedToast
          className="modal--saved modal--dex"
          title="저장 완료되었습니다"
          onOverlayClick={dismissSavedToast}
        />
      )}

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
