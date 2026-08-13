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
    // eslint-disable-next-line no-empty
  } catch {}
}

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

  const isLoadingDetail = moodTypeId !== undefined && !detail;

  const displayName = detail?.name ?? characterType.name;
  const displayShortDescription = detail?.shortDescription ?? characterType.description;
  const displayCatchphrase = detail?.catchphrase ?? type.agreeLine;
  const displayPercent = detail?.typePercent ?? type.agreeRate;
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
