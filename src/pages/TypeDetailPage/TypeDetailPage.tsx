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

export default function TypeDetailPage({
  type,
  moodTypeId,
  onBack,
  onSetRepresentative,
}: {
  type: PersonalityType;
  moodTypeId?: number;
  onBack: () => void;
  onSetRepresentative: () => void;
}) {
  const [detail, setDetail] = useState<MoodTypeDetailResult | null>(null);
  const localMatch = getCharacterMatch(type.id);
  const dexEntry = DEX_DATA.find((d) => d.typeId === type.id);
  const characterImg = dexEntry ? drinkImages[dexEntry.id] : undefined;
  const characterType = getCharacterType(type.id);
  const realCocktails = dexEntry ? getCocktailsByType(dexEntry.typeNumber) : [];

  // 색/이미지는 로컬 데이터를 그대로 쓰고, 이름/설명/맛 프로필/궁합 등 "기본 정보"만
  // data/typeCodeMapping.ts로 매핑된 실제 서버 타입에서 받아와 대체합니다.
  useEffect(() => {
    setDetail(null);
    if (!moodTypeId) return;
    let cancelled = false;
    getMoodTypeDetail(moodTypeId)
      .then((result) => {
        if (!cancelled) setDetail(result);
      })
      .catch((err) => console.error("타입 상세 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, [moodTypeId]);

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
  const displayCocktails: DisplayCocktail[] = detail
    ? detail.cocktails.map((c) => ({
        id: String(c.cocktailId),
        name: c.nameKo,
        imageUrl: c.imageUrl,
      }))
    : type.cocktails.map((cocktail, index) => {
        const realCocktail = realCocktails[index];
        return {
          id: cocktail.id,
          name: realCocktail?.nameKo ?? cocktail.name,
          glassNumber: realCocktail?.glassNumber,
        };
      });

  return (
    <PhoneFrame background={<TypeDetailBackground />}>
      <div style={{ padding: "18px 20px 0", flex: 1, overflowY: "auto" }}>
        <Header
          title="타입 상세"
          onBack={onBack}
          titleSize={20}
          right={
            <button
              onClick={onSetRepresentative}
              style={{
                border: "none",
                color: "#fff",
                background: COLORS.orange,
                fontSize: 15,
                fontWeight: 600,
                padding: "6px 10px",
                borderRadius: 20,
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
      style={{ width: 250, height: 250, objectFit: "contain" }}
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
    }}
  >
    {displayShortDescription}
  </p>
</div>

        <div
          style={{
            width: "100%",
            background: characterType.color,
            color: "#fff",
            borderRadius: 22,
            padding: "14px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600 }}>"{displayCatchphrase}"</span>
        </div>

        <div
          style={{
            width: "100%",
            height: 220,
            background: "#FFF9F5",
            border: "1px solid #F0DDD4",
            borderRadius: 20,
            padding: "18px 20px",
            marginTop: 14,
            marginBottom: 22,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: "#10161F", marginBottom: 8 }}>
            {displayName}
          </div>
          <p style={{ fontSize: 13, color: COLORS.inkSoft, lineHeight: 1.6, margin: 0 }}>
            {displayDescription}
          </p>

          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.orange,
              textAlign: "center",
              marginTop: "auto",
            }}
          >
            사용자의 {displayPercent}%가 이 타입이 나왔어요
          </div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, color: "#10161F", marginBottom: 10 }}>
          맛 프로필
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
          {TASTE_LABELS.map(({ key, label }, index) => {
            const isPrimary = index % 2 === 0;
            const textColor = isPrimary ? "#FF6120" : "#10161F";
            return (
              <div
                key={key}
                style={{
                  flex: 1,
                  background: isPrimary ? "#FDF2EF" : "#FFFFFF",
                  border: `1px solid ${isPrimary ? "#FF6F4F" : "#C2C2C2"}`,
                  borderRadius: 12,
                  padding: "10px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 10.5, fontWeight: 600, color: textColor }}>{label}</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: textColor }}>
                  {displayTaste[key]}
                </span>
              </div>
            );
          })}
        </div>

        <FitUnfitMatch
          goodMatch={goodMatch}
          goodMatchImg={goodMatchImg}
          badMatch={badMatch}
          badMatchImg={badMatchImg}
        />

        <div style={{ fontSize: 18, fontWeight: 700, color: '#10161F', marginBottom: 10 }}>
          해당 타입 칵테일 {displayCocktails.length}종
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
            paddingBottom: 20,
          }}
        >
          {displayCocktails.map((cocktail) => (
            <div
              key={cocktail.id}
              style={{
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
              }}
            >
              <img
                src={cocktail.imageUrl ?? getGlassImage(cocktail.glassNumber)}
                alt=""
                style={{ width: 90, height: 90, objectFit: "contain" }}
              />
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink }}>
                {cocktail.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
