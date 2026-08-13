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
import { computeCollectionProgress, type TypeCollectionProgress } from "../../utils/collectionProgress";

// 탭을 옮겼다가 돌아오면 CharacterPage가 매번 다시 마운트되면서 useState 초기값(빈 값)으로
// 리셋되고, 서버 응답이 돌아올 때까지 화면이 잠깐 기본/잠금 상태로 보였다가 다시 채워지는
// 지연이 생깁니다. useMemo는 컴포넌트가 리마운트되면 함께 초기화되어 이 문제를 못 없애므로,
// 컴포넌트 바깥(모듈 스코프)에 마지막으로 받아온 값을 캐시해뒀다가 다음 마운트의 useState
// 초기값으로 재사용합니다 — 새로고침 전까지는 즉시 이전 화면을 보여주고, 그 사이에도
// 아래 effect가 여전히 최신 데이터로 갱신합니다.
let cachedMoodTypeIdByLocalId: Record<string, number> | null = null;
let cachedRepTypeId: string | null = null;
let cachedDexStatusByLocalId: Record<string, { unlocked: boolean; collectionRate: number }> | null = null;

// 도감 정보(실제 moodTypeId 매핑 + 대표 타입)를 받아와 모듈 캐시에 반영합니다. 컴포넌트
// effect와 아래 프리캐치용 prefetchCharacterDex()가 이 로직을 공유합니다.
async function fetchAndCacheCollection(): Promise<{
  idMap: Record<string, number>;
  repLocalId: string | null;
}> {
  const result = await getCollection();
  const idMap: Record<string, number> = {};
  result.moodTypes.forEach((mt) => {
    const localId = TYPECODE_TO_LOCAL_TYPE[mt.typeCode];
    if (!localId) return;
    idMap[localId] = mt.moodTypeId;
  });
  cachedMoodTypeIdByLocalId = idMap;

  const repLocalId = TYPECODE_TO_LOCAL_TYPE[result.representativeMoodType?.typeCode] ?? null;
  if (repLocalId) cachedRepTypeId = repLocalId;

  // 타입 상세 화면(TypeDetailPage)의 "불러오는 중" 로딩을 없애기 위해, 도감에 있는 모든
  // 타입의 상세 정보를 여기서 함께 미리 받아둡니다. moodTypeId만 있으면 되는 정적 정보라
  // 결과를 기다리지 않고(내부에서 각자 알아서 캐시) 바로 진행합니다.
  Object.values(idMap).forEach((moodTypeId) => {
    prefetchTypeDetail(moodTypeId);
  });

  return { idMap, repLocalId };
}

// 해금/수집률(최근 12개월 히스토리 집계)을 받아와 모듈 캐시에 반영합니다.
async function fetchAndCacheDexStatus(): Promise<Record<string, TypeCollectionProgress>> {
  const progress = await computeCollectionProgress();
  cachedDexStatusByLocalId = progress;
  return progress;
}

// 캐릭터 도감 탭에 들어가기 전에(예: 로그인 성공 직후, PostLoginScreen이 도는 동안) 위 두
// 정보를 미리 받아와 모듈 캐시를 채워둡니다. CharacterPage가 마운트될 때 캐시가 이미 채워져
// 있으면 로딩 지연 없이 바로 최신 도감 상태를 보여줄 수 있습니다. 로그인 직후와 App.tsx의
// 로그인 상태 진입 시점 둘 다에서 호출될 수 있어, 이미 캐시가 있으면 중복 요청을 건너뜁니다.
export function prefetchCharacterDex(): Promise<void> {
  if (cachedMoodTypeIdByLocalId && cachedDexStatusByLocalId) return Promise.resolve();
  return Promise.all([
    fetchAndCacheCollection().catch((err) => console.error("도감 정보를 불러오지 못했습니다", err)),
    fetchAndCacheDexStatus().catch((err) => console.error("수집률 계산에 실패했습니다", err)),
  ]).then(() => undefined);
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

  // 타입 상세/대표 타입 설정 화면은 전체 화면으로 쓰이므로 하단 nav를 숨깁니다.
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
  const [dexStatusByLocalId, setDexStatusByLocalId] = useState<
    Record<string, { unlocked: boolean; collectionRate: number }>
  >(cachedDexStatusByLocalId ?? {});

  // 도감 정보를 실제 API로 받아와 실제 moodTypeId를 로컬 타입에 매핑해둡니다.
  // 로컬 typeId ↔ 실제 typeCode 매핑(data/typeCodeMapping.ts)은 사용자가 직접 확정한 값입니다.
  // representativeMoodType도 서버 값으로 초기화합니다 — repTypeId를 로컬 state 기본값(idealist)에만
  // 의존하면, 탭을 이동했다가 도감으로 돌아올 때 CharacterPage가 다시 마운트되면서 방금 설정한
  // 대표 타입이 초기값으로 되돌아가 버립니다.
  // unlocked/collectionRate는 서버 값(mt.unlocked/mt.collectionRate)이 정상 동작하지 않아서 쓰지
  // 않고, 아래 별도 effect에서 히스토리 기록을 직접 집계해 계산합니다.
  useEffect(() => {
    let cancelled = false;
    fetchAndCacheCollection()
      .then(({ idMap, repLocalId }) => {
        if (cancelled) return;
        setMoodTypeIdByLocalId(idMap);
        if (repLocalId) setRepTypeId(repLocalId);
      })
      .catch((err) => console.error("도감 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, []);

  // 해금/수집률은 히스토리에 실제 기록된 칵테일을 최근 12개월치 집계해서 계산합니다
  // (서버 collectionRate가 정상 동작하지 않아 프론트에서 대체 계산).
  useEffect(() => {
    let cancelled = false;
    fetchAndCacheDexStatus()
      .then((progress) => {
        if (!cancelled) setDexStatusByLocalId(progress);
      })
      .catch((err) => console.error("수집률 계산에 실패했습니다", err));
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
