import { useState } from "react";
import { getType } from "./data/types";
import CharacterDexPage from "./pages/CharacterDexPage";
import RepresentativeTypeSettingPage from "./pages/RepresentativeTypeSettingPage";
import TypeDetailPage from "./pages/TypeDetailPage";
import TypeDexPage from "./pages/TypeDexPage";
import DexShareModal from "./components/DexShareModal";
import CompleteModal from "./components/CompleteModal";

type Screen =
  | { name: "typeDex" }
  | { name: "characterDex"; typeId: string }
  | { name: "typeDetail"; typeId: string }
  | { name: "repSetting"; typeId: string };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "typeDex" });
  const [repTypeId, setRepTypeId] = useState("idealist");
  const [shareOpen, setShareOpen] = useState(false);
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
            onShare={() => setShareOpen(true)}
            onBack={() => window.history.back()}
          />
        )}

        {screen.name === "characterDex" && (
          <CharacterDexPage
            type={getType(screen.typeId)}
            onBack={goTypeDex}
            onShare={() => setShareOpen(true)}
            onOpenDetail={() => openTypeDetail(screen.typeId)}
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
              setCompleteMessage("지정 완료되었습니다");
            }}
          />
        )}

        {shareOpen && (
          <DexShareModal
            repTypeId={repTypeId}
            onClose={() => setShareOpen(false)}
            onShared={() => {
              setShareOpen(false);
              setCompleteMessage("SNS 공유가 완료되었습니다");
            }}
            onSaved={() => {
              setShareOpen(false);
              setCompleteMessage("이미지가 저장되었습니다");
            }}
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
      </div>
    </div>
  );
}

export default App;
