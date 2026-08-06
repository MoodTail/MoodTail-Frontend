import { useEffect, useMemo, useState } from "react";
import { MOOD_TYPES, buildDexGridEntries } from "../../data/moodTypes";
import CharacterDexPage from "../CharacterDexPage/CharacterDexPage";
import RepresentativeTypeSettingPage from "../RepresentativeTypeSettingPage/RepresentativeTypeSettingPage";
import TypeDetailPage from "../TypeDetailPage/TypeDetailPage";
import TypeDexPage from "../TypeDexPage/TypeDexPage";
import DexShareModal from "../../components/DexShareModal";
import ResultSnsShareModal from "../../components/common/modal/ResultSnsShareModal";
import SaveCompleteToast from "../../components/common/SaveCompleteToast";
import { getCollection, updateRepresentativeMoodType } from "../../api/collections/collections.api";
import type { CollectionResult } from "../../api/collections/collections.types";

type DexOrigin = "typeDex" | "characterDex";

type Screen =
  | { name: "typeDex" }
  | { name: "characterDex"; typeCode: string }
  | { name: "typeDetail"; typeCode: string; from: DexOrigin }
  | { name: "repSetting"; typeCode: string; from: DexOrigin };

interface CharacterPageProps {
  onGoTest: () => void;
}

function CharacterPage({ onGoTest }: CharacterPageProps) {
  const [screen, setScreen] = useState<Screen>({ name: "typeDex" });
  const [repTypeCode, setRepTypeCode] = useState(MOOD_TYPES[0].typeCode as string);
  const [collection, setCollection] = useState<CollectionResult | null>(null);
  const [shareTypeCode, setShareTypeCode] = useState<string | null>(null);
  const [snsModalOpen, setSnsModalOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // 실제 도감 정보(수집 현황 + 대표 타입 + moodTypeId)를 가져옵니다.
  // 이제 로컬 타입과 API 타입이 typeCode로 완전히 통일되어 있어, 이름 매칭 같은 우회 없이
  // API의 typeCode를 그대로 화면 상태의 키로 씁니다.
  useEffect(() => {
    let cancelled = false;
    getCollection()
      .then((result) => {
        if (cancelled) return;
        setCollection(result);
        setRepTypeCode(result.representativeMoodType.typeCode);
      })
      .catch((err) => console.error("도감 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const entries = useMemo(() => buildDexGridEntries(collection?.moodTypes), [collection]);
  const moodTypeIdByTypeCode = useMemo(() => {
    const map: Record<string, number> = {};
    collection?.moodTypes.forEach((mt) => {
      map[mt.typeCode] = mt.moodTypeId;
    });
    return map;
  }, [collection]);

  const getEntry = (typeCode: string) => entries.find((e) => e.typeCode === typeCode) ?? entries[0];

  const goTypeDex = () => setScreen({ name: "typeDex" });
  const openCharacterDex = (typeCode: string) => setScreen({ name: "characterDex", typeCode });
  const openTypeDetail = (typeCode: string, from: DexOrigin) => setScreen({ name: "typeDetail", typeCode, from });
  const openRepSetting = (typeCode: string, from: DexOrigin) => setScreen({ name: "repSetting", typeCode, from });

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
          repEntry={getEntry(repTypeCode)}
          entries={entries}
          onOpenTypeDetail={(typeCode) => openTypeDetail(typeCode, "typeDex")}
          onShare={() => setShareTypeCode(repTypeCode)}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "characterDex" && (
        <CharacterDexPage
          entry={getEntry(screen.typeCode)}
          entries={entries}
          onShare={() => setShareTypeCode(screen.typeCode)}
          onOpenDetail={() => openTypeDetail(screen.typeCode, "characterDex")}
          onOpenTypeDetail={(typeCode) => openTypeDetail(typeCode, "characterDex")}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "typeDetail" && (
        <TypeDetailPage
          entry={getEntry(screen.typeCode)}
          moodTypeId={moodTypeIdByTypeCode[screen.typeCode]}
          onBack={() =>
            screen.from === "typeDex" ? goTypeDex() : openCharacterDex(screen.typeCode)
          }
          onSetRepresentative={() => openRepSetting(screen.typeCode, screen.from)}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "repSetting" && (
        <RepresentativeTypeSettingPage
          entry={getEntry(screen.typeCode)}
          onBack={() => openTypeDetail(screen.typeCode, screen.from)}
          onConfirm={() => {
            setRepTypeCode(screen.typeCode);
            setShowSavedToast(true);

            const moodTypeId = moodTypeIdByTypeCode[screen.typeCode];
            if (moodTypeId) {
              updateRepresentativeMoodType(moodTypeId).catch((err) =>
                console.error("대표 타입 변경에 실패했습니다", err),
              );
            }
          }}
        />
      )}

      {shareTypeCode && (
        <DexShareModal
          entry={getEntry(shareTypeCode)}
          entries={entries}
          onClose={() => setShareTypeCode(null)}
          onShareSns={() => {
            setShareTypeCode(null);
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
