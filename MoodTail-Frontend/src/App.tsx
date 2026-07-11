import { useState } from "react";
import { getType } from "./data/types";
import CharacterDexPage from "./pages/CharacterDexPage";
import RepresentativeTypeSettingPage from "./pages/RepresentativeTypeSettingPage";
import TypeDetailPage from "./pages/TypeDetailPage";
import TypeDexPage from "./pages/TypeDexPage";
import DexShareModal from "./components/DexShareModal";
import SnsShareOptionsModal from "./components/SnsShareOptionsModal";
import CompleteModal from "./components/CompleteModal";

type Screen =
  | { name: "typeDex" }
  | { name: "characterDex"; typeId: string }
  | { name: "typeDetail"; typeId: string }
  | { name: "repSetting"; typeId: string };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "typeDex" });
  const [repTypeId, setRepTypeId] = useState("idealist");
  const [shareTypeId, setShareTypeId] = useState<string | null>(null);
  const [snsModalOpen, setSnsModalOpen] = useState(false);
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  const goTypeDex = () => setScreen({ name: "typeDex" });
  const openCharacterDex = (typeId: string) => setScreen({ name: "characterDex", typeId });
  const openTypeDetail = (typeId: string) => setScreen({ name: "typeDetail", typeId });
  const openRepSetting = (typeId: string) => setScreen({ name: "repSetting", typeId });

  const handleGoTest = () => setCompleteMessage("취향 테스트 페이지는 준비 중이에요");

  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 390 }}>
        {screen.name === "typeDex" && (
          <TypeDexPage
            repTypeId={repTypeId}
            onOpenType={openCharacterDex}
            onShare={() => setShareTypeId(repTypeId)}
            onBack={() => window.history.back()}
          />
        )}

        {screen.name === "characterDex" && (
          <CharacterDexPage
            type={getType(screen.typeId)}
            onShare={() => setShareTypeId(screen.typeId)}
            onOpenDetail={() => openTypeDetail(screen.typeId)}
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
              setCompleteMessage("지정 완료되었습니다");
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
            onSaveImage={() => {
              setShareTypeId(null);
              setCompleteMessage("저장 완료되었습니다");
            }}
          />
        )}

        {snsModalOpen && <SnsShareOptionsModal onClose={() => setSnsModalOpen(false)} />}

        {completeMessage && (
          <CompleteModal
            message={completeMessage}
            onClose={() => {
              setCompleteMessage(null);
              if (screen.name === "repSetting") goTypeDex();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
