import { useEffect, useState } from "react";
import { getType, TYPES } from "../../data/types";
import CharacterDexPage from "../CharacterDexPage/CharacterDexPage";
import RepresentativeTypeSettingPage from "../RepresentativeTypeSettingPage/RepresentativeTypeSettingPage";
import TypeDetailPage from "../TypeDetailPage/TypeDetailPage";
import TypeDexPage from "../TypeDexPage/TypeDexPage";
import DexShareModal from "../../components/DexShareModal";
import ResultSnsShareModal from "../../components/common/modal/ResultSnsShareModal";
import SaveCompleteToast from "../../components/common/SaveCompleteToast";
import { getCollection, updateRepresentativeMoodType } from "../../api/collections/collections.api";

type DexOrigin = "typeDex" | "characterDex";

type Screen =
  | { name: "typeDex" }
  | { name: "characterDex"; typeId: string }
  | { name: "typeDetail"; typeId: string; from: DexOrigin }
  | { name: "repSetting"; typeId: string; from: DexOrigin };

interface CharacterPageProps {
  onGoTest: () => void;
}

function CharacterPage({ onGoTest }: CharacterPageProps) {
  const [screen, setScreen] = useState<Screen>({ name: "typeDex" });
  const [repTypeId, setRepTypeId] = useState("idealist");
  const [shareTypeId, setShareTypeId] = useState<string | null>(null);
  const [snsModalOpen, setSnsModalOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [moodTypeIdByLocalId, setMoodTypeIdByLocalId] = useState<Record<string, number>>({});

  // 도감 정보를 실제 API로 받아와, 이름이 일치하는 로컬 타입에 실제 moodTypeId를 매핑해둡니다.
  // 게스트 등 비로그인 상태거나 CORS 등으로 실패하면 조용히 무시합니다(대표 타입 지정은 로컬 상태만 반영).
  useEffect(() => {
    let cancelled = false;
    getCollection()
      .then((result) => {
        if (cancelled) return;
        const idMap: Record<string, number> = {};
        result.moodTypes.forEach((mt) => {
          const local = TYPES.find((t) => t.name === mt.name);
          if (local) idMap[local.id] = mt.moodTypeId;
        });
        setMoodTypeIdByLocalId(idMap);
      })
      .catch((err) => console.error("도감 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const goTypeDex = () => setScreen({ name: "typeDex" });
  const openCharacterDex = (typeId: string) => setScreen({ name: "characterDex", typeId });
  const openTypeDetail = (typeId: string, from: DexOrigin) => setScreen({ name: "typeDetail", typeId, from });
  const openRepSetting = (typeId: string, from: DexOrigin) => setScreen({ name: "repSetting", typeId, from });

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
          onOpenTypeDetail={(typeId) => openTypeDetail(typeId, "typeDex")}
          onShare={() => setShareTypeId(repTypeId)}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "characterDex" && (
        <CharacterDexPage
          type={getType(screen.typeId)}
          onShare={() => setShareTypeId(screen.typeId)}
          onOpenDetail={() => openTypeDetail(screen.typeId, "characterDex")}
          onOpenTypeDetail={(typeId) => openTypeDetail(typeId, "characterDex")}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "typeDetail" && (
        <TypeDetailPage
          type={getType(screen.typeId)}
          onBack={() =>
            screen.from === "typeDex" ? goTypeDex() : openCharacterDex(screen.typeId)
          }
          onSetRepresentative={() => openRepSetting(screen.typeId, screen.from)}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "repSetting" && (
        <RepresentativeTypeSettingPage
          type={getType(screen.typeId)}
          onBack={() => openTypeDetail(screen.typeId, screen.from)}
          onConfirm={() => {
            setRepTypeId(screen.typeId);
            setShowSavedToast(true);

            const moodTypeId = moodTypeIdByLocalId[screen.typeId];
            if (moodTypeId) {
              updateRepresentativeMoodType(moodTypeId).catch((err) =>
                console.error("대표 타입 변경에 실패했습니다", err),
              );
            }
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
    </>
  );
}

export default CharacterPage;
