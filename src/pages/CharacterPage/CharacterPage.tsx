import { useEffect, useState } from "react";
import { getType } from "../../data/types";
import { getCharacterType } from "../../data/characterType";
import { DEX_DATA } from "../../data/dexData";
import drinkImages from "../../assets/drinks";
import CharacterDexPage from "../CharacterDexPage/CharacterDexPage";
import RepresentativeTypeSettingPage from "../RepresentativeTypeSettingPage/RepresentativeTypeSettingPage";
import TypeDetailPage from "../TypeDetailPage/TypeDetailPage";
import TypeDexPage from "../TypeDexPage/TypeDexPage";
import DexShareModal from "../../components/DexShareModal";
import ResultSnsShareModal from "../../components/common/modal/ResultSnsShareModal";
import SaveCompleteToast from "../../components/common/SaveCompleteToast";
import { getCollection, updateRepresentativeMoodType } from "../../api/collections/collections.api";
import { TYPECODE_TO_LOCAL_TYPE } from "../../data/typeCodeMapping";

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
  const [snsShareUrl, setSnsShareUrl] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [moodTypeIdByLocalId, setMoodTypeIdByLocalId] = useState<Record<string, number>>({});
  const [dexStatusByLocalId, setDexStatusByLocalId] = useState<
    Record<string, { unlocked: boolean; collectionRate: number }>
  >({});

  // 도감 정보를 실제 API로 받아와 실제 moodTypeId를 로컬 타입에 매핑해둡니다.
  // 로컬 typeId ↔ 실제 typeCode 매핑(data/typeCodeMapping.ts)은 사용자가 직접 확정한 값입니다.
  // representativeMoodType도 서버 값으로 초기화합니다 — repTypeId를 로컬 state 기본값(idealist)에만
  // 의존하면, 탭을 이동했다가 도감으로 돌아올 때 CharacterPage가 다시 마운트되면서 방금 설정한
  // 대표 타입이 초기값으로 되돌아가 버립니다.
  // unlocked/collectionRate도 서버 값을 그대로 씁니다 — data/dexData.ts는 전부 unlocked: true로
  // 고정되어 있어서, 실제로는 아직 안 모은 타입도 항상 해금된 것처럼 보였습니다.
  useEffect(() => {
    let cancelled = false;
    getCollection()
      .then((result) => {
        if (cancelled) return;
        const idMap: Record<string, number> = {};
        const statusMap: Record<string, { unlocked: boolean; collectionRate: number }> = {};
        result.moodTypes.forEach((mt) => {
          const localId = TYPECODE_TO_LOCAL_TYPE[mt.typeCode];
          if (!localId) return;
          idMap[localId] = mt.moodTypeId;
          statusMap[localId] = { unlocked: mt.unlocked, collectionRate: mt.collectionRate };
        });
        setMoodTypeIdByLocalId(idMap);
        setDexStatusByLocalId(statusMap);

        const repLocalId = TYPECODE_TO_LOCAL_TYPE[result.representativeMoodType?.typeCode];
        if (repLocalId) setRepTypeId(repLocalId);
      })
      .catch((err) => console.error("도감 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const goTypeDex = () => setScreen({ name: "typeDex" });
  const openCharacterDex = (typeId: string) => setScreen({ name: "characterDex", typeId });

  // 캐릭터를 연타해도 상세 화면이 여러 번 겹쳐 열리지 않도록, 이미 그 캐릭터의 상세 화면에
  // 있는 상태에서 같은 캐릭터를 다시 열려는 중복 호출은 무시합니다.
  const openTypeDetail = (typeId: string, from: DexOrigin) => {
    setScreen((prev) =>
      prev.name === "typeDetail" && prev.typeId === typeId ? prev : { name: "typeDetail", typeId, from },
    );
  };
  const openRepSetting = (typeId: string, from: DexOrigin) => setScreen({ name: "repSetting", typeId, from });

  const handleKakaoShare = () => {
    // TODO: 카카오 SDK 연동
    console.log("TODO: 카카오톡 공유 SDK 연동");
  };

  const repDexEntry = DEX_DATA.find((d) => d.typeId === repTypeId);
  const repShareImg = repDexEntry ? drinkImages[repDexEntry.id] : undefined;

  const dismissSavedToast = () => {
    setShowSavedToast(false);
    if (screen.name === "repSetting") goTypeDex();
  };

  return (
    <>
      {screen.name === "typeDex" && (
        <TypeDexPage
          repTypeId={repTypeId}
          dexStatus={dexStatusByLocalId}
          onOpenType={openCharacterDex}
          onOpenTypeDetail={(typeId) => openTypeDetail(typeId, "typeDex")}
          onShare={() => setShareTypeId(repTypeId)}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "characterDex" && (
        <CharacterDexPage
          type={getType(screen.typeId)}
          dexStatus={dexStatusByLocalId}
          onShare={() => setShareTypeId(screen.typeId)}
          onOpenDetail={() => openTypeDetail(screen.typeId, "characterDex")}
          onOpenTypeDetail={(typeId) => openTypeDetail(typeId, "characterDex")}
          onGoTest={onGoTest}
        />
      )}

      {screen.name === "typeDetail" && (
        <TypeDetailPage
          type={getType(screen.typeId)}
          moodTypeId={moodTypeIdByLocalId[screen.typeId]}
          onBack={() =>
            screen.from === "typeDex" ? goTypeDex() : openCharacterDex(screen.typeId)
          }
          onSetRepresentative={() => openRepSetting(screen.typeId, screen.from)}
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
          dexStatus={dexStatusByLocalId}
          onClose={() => setShareTypeId(null)}
          onShareSns={(shareUrl) => {
            setShareTypeId(null);
            setSnsShareUrl(shareUrl ?? null);
            setSnsModalOpen(true);
          }}
          onSaveImage={() => setShowSavedToast(true)}
        />
      )}

      <ResultSnsShareModal
        isOpen={snsModalOpen}
        url={snsShareUrl ?? "https://moodtail.app/share/mock-id"}
        onClose={() => setSnsModalOpen(false)}
        kakaoShare={
          snsShareUrl
            ? {
                title: "MoodTail 캐릭터 도감",
                description: `대표 타입 "${getCharacterType(repTypeId).name}"의 캐릭터 도감을 확인해보세요!`,
                imageUrl: repShareImg,
                webUrl: snsShareUrl,
                buttonTitle: "도감 보기",
              }
            : undefined
        }
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
