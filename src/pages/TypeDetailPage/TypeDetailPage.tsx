import { useEffect, useState } from "react";
import drinkImages from "../../assets/drinks";
import { COLORS } from "../../theme/colors";
import type { PersonalityType } from "../../data/types";
import { getCharacterMatch, getCharacterType } from "../../data/characterType";
import { DEX_DATA } from "../../data/dexData";
import { getCocktailsByType, getGlassImage } from "../../data/cocktailGlasses";
import { getMoodTypeDetail } from "../../api/mood-types/moodTypes.api";
import type { MoodTypeDetailResult } from "../../api/mood-types/moodTypes.types";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import TypeDetailBackground from "../../components/TypeDetailBackground";
import { Mascot } from "../../components/icons";
import { FitUnfitMatch } from "../../components/fit_unfit";
import TasteProfileGrid from "../../components/TasteProfileGrid";

interface DisplayCocktail {
  id: string;
  name: string;
  imageUrl?: string;
  glassNumber?: number;
}

const TASTE_LABELS: { key: keyof PersonalityType["taste"]; label: string }[] = [
  { key: "alcohol", label: "도수" },
  { key: "sweet", label: "당도" },
  { key: "sour", label: "산도" },
  { key: "bitter", label: "쓴맛" },
  { key: "refreshing", label: "청량감" },
];


// 이 화면은 detail의 unlocked/representative/collectionRate 등 사용자별 필드는 전혀 읽지
// 않고, 이름/설명/맛 프로필/궁합/칵테일 이름·이미지처럼 타입마다 고정된(모든 사용자에게
// 동일한) 정보만 사용합니다. 그래서 새로고침 후에도 재사용할 수 있게 localStorage에
// moodTypeId별로 저장해두고, 캐시가 있으면 API 응답을 기다리지 않고 바로 보여줍니다.
const DETAIL_CACHE_KEY = "moodtail_type_detail_cache";

function loadDetailCache(): Record<number, MoodTypeDetailResult> {
  try {
    const raw = localStorage.getItem(DETAIL_CACHE_KEY);
    return raw ? (JSON.parse(raw) as Record<number, MoodTypeDetailResult>) : {};
  } catch {
    return {};
  }
}

const detailCache: Record<number, MoodTypeDetailResult> = loadDetailCache();

function cacheDetail(moodTypeId: number, result: MoodTypeDetailResult) {
  detailCache[moodTypeId] = result;
  try {
    localStorage.setItem(DETAIL_CACHE_KEY, JSON.stringify(detailCache));
  } catch {
    // 저장 공간 초과 등으로 실패해도 메모리 캐시는 계속 동작하므로 무시합니다.
  }
}

// 타입 상세 화면에 들어가기 전에(예: 도감 정보를 받아온 직후) 미리 호출해 detailCache를
// 채워둡니다. 이미 캐시돼 있으면 아무 요청도 하지 않습니다 — 컴포넌트가 마운트될 때는
// useState 초기값이 이 캐시를 그대로 읽으므로 "불러오는 중" 화면 없이 바로 보여줄 수 있습니다.
export async function prefetchTypeDetail(moodTypeId: number): Promise<void> {
  if (detailCache[moodTypeId]) return;
  try {
    const result = await getMoodTypeDetail(moodTypeId);
    cacheDetail(moodTypeId, result);
  } catch (err) {
    console.error("타입 상세 정보를 불러오지 못했습니다", err);
  }
}

export default function TypeDetailPage({
  type,
  moodTypeId,
  onBack,
  onSetRepresentative,
  onOpenCocktail,
}: {
  type: PersonalityType;
  moodTypeId?: number;
  onBack: () => void;
  onSetRepresentative: () => void;
  onOpenCocktail?: (name: string) => void;
}) {
  const [detail, setDetail] = useState<MoodTypeDetailResult | null>(
    moodTypeId !== undefined ? detailCache[moodTypeId] ?? null : null,
  );
  const localMatch = getCharacterMatch(type.id);
  const dexEntry = DEX_DATA.find((d) => d.typeId === type.id);
  const characterImg = dexEntry ? drinkImages[dexEntry.id] : undefined;
  const characterType = getCharacterType(type.id);
  const realCocktails = dexEntry ? getCocktailsByType(dexEntry.typeNumber) : [];

  // 색/이미지는 로컬 데이터를 그대로 쓰고, 이름/설명/맛 프로필/궁합 등 "기본 정보"만
  // data/typeCodeMapping.ts로 매핑된 실제 서버 타입에서 받아와 대체합니다.
  useEffect(() => {
    if (!moodTypeId) {
      setDetail(null);
      return;
    }
    setDetail(detailCache[moodTypeId] ?? null);
    let cancelled = false;
    getMoodTypeDetail(moodTypeId)
      .then((result) => {
        if (!cancelled) {
          setDetail(result);
          cacheDetail(moodTypeId, result);
        }
      })
      .catch((err) => console.error("타입 상세 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, [moodTypeId]);

  // moodTypeId가 있는(서버 매핑이 있는) 타입인데 아직 detail을 못 받아온 상태면, 로컬
  // 목데이터로 먼저 그렸다가 서버 값으로 바뀌는 "깜빡임"을 피하기 위해 로딩으로 대기합니다.
  // moodTypeId 자체가 없는 타입은 서버에서 받아올 방법이 없으므로 로컬 값을 그대로 씁니다.
  const isLoadingDetail = moodTypeId !== undefined && !detail;

  const displayName = detail?.name ?? characterType.name;
  const displayShortDescription = detail?.shortDescription ?? characterType.description;
  const displayCatchphrase = detail?.catchphrase ?? type.agreeLine;
  const displayPercent = detail?.typePercent ?? type.agreeRate;
  // detailDescription은 서버 값으로 덮어쓰지 않고 항상 로컬 목데이터를 씁니다.
  const displayDescription = characterType.detailDescription;
  const goodMatch = localMatch.good;
  const badMatch = localMatch.bad;
  const goodMatchDexEntry = goodMatch ? DEX_DATA.find((d) => d.typeId === goodMatch.id) : undefined;
  const badMatchDexEntry = badMatch ? DEX_DATA.find((d) => d.typeId === badMatch.id) : undefined;
  const goodMatchImg =
    detail?.compatibilities.best.characterImageUrl ??
    (goodMatchDexEntry ? drinkImages[goodMatchDexEntry.id] : undefined);
  const badMatchImg =
    detail?.compatibilities.worst.characterImageUrl ??
    (badMatchDexEntry ? drinkImages[badMatchDexEntry.id] : undefined);
  // 이름표는 이미지와 같은 소스를 우선 써야 서로 어긋나지 않습니다 — 서버가 내려준
  // compatibilities에도 name이 포함돼 있어서, 이미지처럼 서버 값을 우선하고 로컬은 폴백으로만 씁니다.
  const goodMatchDisplay = goodMatch
    ? { ...goodMatch, name: detail?.compatibilities.best.name ?? goodMatch.name }
    : undefined;
  const badMatchDisplay = badMatch
    ? { ...badMatch, name: detail?.compatibilities.worst.name ?? badMatch.name }
    : undefined;
  const displayTaste: PersonalityType["taste"] = detail
    ? {
        alcohol: detail.typeFigures.alcoholIntensity,
        sweet: detail.typeFigures.sweetness,
        sour: detail.typeFigures.sourness,
        bitter: detail.typeFigures.bitterness,
        refreshing: detail.typeFigures.refreshing,
      }
    : type.taste;
  // 해당 타입에 배정된 칵테일 8종은 잠금/해금 대상이 아니라 항상 공개되는
  // 기준 정보이므로, 서버 unlocked 값과 무관하게 이름/이미지를 그대로 보여줍니다.
  // 이미지는 서버 실사진(imageUrl)을 우선 쓰고, 없으면 로컬 잔 실루엣(glassNumber)으로 대체합니다.
  const displayCocktails: DisplayCocktail[] = detail
    ? detail.cocktails.map((c) => ({
        id: String(c.cocktailId),
        name: c.nameKo,
        imageUrl: c.imageUrl,
        glassNumber: realCocktails.find((rc) => rc.nameKo === c.nameKo)?.glassNumber,
      }))
    : type.cocktails.map((cocktail, index) => {
        const realCocktail = realCocktails[index];
        return {
          id: cocktail.id,
          name: realCocktail?.nameKo ?? cocktail.name,
          glassNumber: realCocktail?.glassNumber,
        };
      });

  if (isLoadingDetail) {
    return (
      <PhoneFrame background={<TypeDetailBackground />}>
        <div style={{ padding: "18px 20px 0", flex: 1 }}>
          <Header title="타입 상세" onBack={onBack} titleSize={22} titleGap={2} leftOffset={-8} />
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0", color: COLORS.inkSoft, fontSize: 13 }}>
            불러오는 중...
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame background={<TypeDetailBackground />}>
      <div style={{ padding: "18px 20px 0", flex: 1, overflowY: "auto" }}>
        <Header
          title="타입 상세"
          onBack={onBack}
          titleSize={22}
          titleGap={2}
          leftOffset={-8}
          right={
            <button
              onClick={onSetRepresentative}
              style={{
                border: "none",
                color: "#fff",
                background: COLORS.orange,
                fontSize: 12,
                fontWeight: 600,
                padding: "7px 10px",
                borderRadius: 16,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              대표 타입 설정
            </button>
          }
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
  {characterImg ? (
    <img
      src={characterImg}
      alt={displayName}
      style={{ width: 320, height: 270, objectFit: "contain" }}
    />
  ) : (
    <Mascot size={88} color={characterType.color} />
  )}
  <div style={{ fontSize: 27, fontWeight: 700, color: characterType.color, marginTop: 18 }}>{displayName}</div>
  <p
    style={{
      fontSize: 12,
      color: characterType.color,
      textAlign: "center",
      lineHeight: 1.6,
      margin: "6px 0 0",
      maxWidth: 280,
      wordBreak: "keep-all",
    }}
  >
    {displayShortDescription}
  </p>
</div>

        <div
          style={{
            width: "92%",
            margin: "14px auto",
            background: characterType.color,
            color: "#fff",
            borderRadius: 19,
            padding: "14px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 600 }}>"{displayCatchphrase}"</span>
        </div>

        <div
          style={{
            width: "92%",
            margin: "14px auto 22px",
            height: 200,
            background: "#FFF9F5",
            border: "1px solid #F0DDD4",
            borderRadius: 20,
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: "#10161F", marginBottom: 8 }}>
            {displayName}
          </div>
          <p style={{ fontSize: 11, color: COLORS.inkSoft, lineHeight: 1.5, margin: 0, wordBreak: "keep-all", textAlign: "center" }}>
            {displayDescription}
          </p>

          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: COLORS.orange,
              textAlign: "center",
              marginTop: "auto",
            }}
          >
            사용자의 {displayPercent}%가 이 타입이 나왔어요
          </div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 700, color: "#10161F", marginLeft: 14, marginBottom: 18 }}>
            맛 프로필
        </div>
        <div style={{ marginBottom: 22 }}>
          <TasteProfileGrid
            variant="type"
            items={TASTE_LABELS.map(({ key, label }) => ({ key, label, value: displayTaste[key] }))}
          />
        </div>

        <FitUnfitMatch
          goodMatch={goodMatchDisplay}
          goodMatchImg={goodMatchImg}
          badMatch={badMatchDisplay}
          badMatchImg={badMatchImg}
        />

        <div style={{ fontSize: 22, fontWeight: 700, color: '#10161F', marginLeft: 10, marginBottom: 14 }}>
          해당 타입 칵테일 {displayCocktails.length}종
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            rowGap: 28,
            columnGap: 11,
            paddingBottom: 20,
          }}
        >
          {displayCocktails.map((cocktail) => (
            <button
              key={cocktail.id}
              type="button"
              onClick={() => onOpenCocktail?.(cocktail.name)}
              style={{
                width: "90%",
                justifySelf: "center",
                aspectRatio: "1 / 1",
                borderRadius: 20,
                background: "#FFFFFF",
                border: "1px solid #fff",
                boxShadow: `0 4px 10px ${COLORS.orangeSoft}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                cursor: onOpenCocktail ? "pointer" : "default",
              }}
            >
              <img
                src={cocktail.imageUrl ?? getGlassImage(cocktail.glassNumber)}
                alt=""
                style={{ width: 70, height: 90, objectFit: "contain" }}
              />
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink }}>
                {cocktail.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
