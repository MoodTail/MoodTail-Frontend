import { useEffect, useState } from "react";
import { getType } from "../../data/types";
import { getCharacterType } from "../../data/characterType";
import { DEX_DATA } from "../../data/dexData";
import drinkImages from "../../assets/drinks";
import CharacterDexPage from "../CharacterDexPage/CharacterDexPage";
import RepresentativeTypeSettingPage from "../RepresentativeTypeSettingPage/RepresentativeTypeSettingPage";
import TypeDetailPage, { prefetchTypeDetail } from "../TypeDetailPage/TypeDetailPage";
import TypeDexPage from "../TypeDexPage/TypeDexPage";
import DexShareModal from "../../components/DexShareModal";
import ResultSnsShareModal from "../../components/common/modal/ResultSnsShareModal";
import SaveCompleteToast from "../../components/common/SaveCompleteToast";
import { getCollection, updateRepresentativeMoodType } from "../../api/collections/collections.api";
import { TYPECODE_TO_LOCAL_TYPE } from "../../data/typeCodeMapping";
import { getReceivedTestResultTypes } from "../../utils/testResultDex";

export interface DexStatus {
  unlocked: boolean;
  collectionRate: number;
}

let cachedMoodTypeIdByLocalId: Record<string, number> | null = null;
let cachedRepTypeId: string | null = null;
let cachedDexStatusByLocalId: Record<string, DexStatus> | null = null;

async function fetchAndCacheCollection(): Promise<{
  idMap: Record<string, number>;
  repLocalId: string | null;
  dexStatus: Record<string, DexStatus>;
}> {
  const result = await getCollection();
  const receivedTypes = getReceivedTestResultTypes();
  const idMap: Record<string, number> = {};
  const dexStatus: Record<string, DexStatus> = {};
  result.moodTypes.forEach((mt) => {
    const localId = TYPECODE_TO_LOCAL_TYPE[mt.typeCode];
    if (!localId) return;
    idMap[localId] = mt.moodTypeId;
    dexStatus[localId] = {
      unlocked: mt.unlocked || receivedTypes.has(localId),
      collectionRate: mt.collectionRate,
    };
  });
  cachedMoodTypeIdByLocalId = idMap;
  cachedDexStatusByLocalId = dexStatus;

  const repLocalId = TYPECODE_TO_LOCAL_TYPE[result.representativeMoodType?.typeCode] ?? null;
  if (repLocalId) cachedRepTypeId = repLocalId;

  Object.values(idMap).forEach((moodTypeId) => {
    prefetchTypeDetail(moodTypeId);
  });

  return { idMap, repLocalId, dexStatus };
}

export function prefetchCharacterDex(): Promise<void> {
  if (cachedMoodTypeIdByLocalId && cachedDexStatusByLocalId) return Promise.resolve();
  return fetchAndCacheCollection()
    .then(() => undefined)
    .catch((err) => console.error("도감 정보를 불러오지 못했습니다", err));
}

type DexOrigin = "typeDex" | "characterDex";

type Screen =
  | { name: "typeDex" }
  | { name: "characterDex"; typeId: string }
  | { name: "typeDetail"; typeId: string; from: DexOrigin }
  | { name: "repSetting"; typeId: string; from: DexOrigin };

interface CharacterPageProps {
  onGoTest: () => void;
  onNavVisibilityChange?: (visible: boolean) => void;
  onOpenCocktail?: (name: string) => void;
  isLoggedIn: boolean;
  onGoToLogin: () => void;
}

function CharacterPage({
  onGoTest,
  onNavVisibilityChange,
  onOpenCocktail,
  isLoggedIn,
  onGoToLogin,
}: CharacterPageProps) {
  const [screen, setScreen] = useState<Screen>({ name: "typeDex" });

  useEffect(() => {
    onNavVisibilityChange?.(screen.name !== "typeDetail" && screen.name !== "repSetting");
    return () => onNavVisibilityChange?.(true);
  }, [screen.name, onNavVisibilityChange]);
  const [repTypeId, setRepTypeId] = useState(cachedRepTypeId ?? "idealist");
  const [shareTypeId, setShareTypeId] = useState<string | null>(null);
  const [snsModalOpen, setSnsModalOpen] = useState(false);
  const [snsShareUrl, setSnsShareUrl] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [moodTypeIdByLocalId, setMoodTypeIdByLocalId] = useState<Record<string, number>>(
    cachedMoodTypeIdByLocalId ?? {},
  );
  const [dexStatusByLocalId, setDexStatusByLocalId] = useState<Record<string, DexStatus>>(
    cachedDexStatusByLocalId ?? {},
  );

  useEffect(() => {
    let cancelled = false;
    fetchAndCacheCollection()
      .then(({ idMap, repLocalId, dexStatus }) => {
        if (cancelled) return;
        setMoodTypeIdByLocalId(idMap);
        if (repLocalId) setRepTypeId(repLocalId);
        setDexStatusByLocalId(dexStatus);
      })
      .catch((err) => console.error("도감 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const goTypeDex = () => setScreen({ name: "typeDex" });
  const openCharacterDex = (typeId: string) => setScreen({ name: "characterDex", typeId });

  const openTypeDetail = (typeId: string, from: DexOrigin) => {
    setScreen((prev) =>
      prev.name === "typeDetail" && prev.typeId === typeId ? prev : { name: "typeDetail", typeId, from },
    );
  };
  const openRepSetting = (typeId: string, from: DexOrigin) => setScreen({ name: "repSetting", typeId, from });

  const handleKakaoShare = () => {
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
          isLoggedIn={isLoggedIn}
          onGoToLogin={onGoToLogin}
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
          onOpenCocktail={onOpenCocktail}
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
