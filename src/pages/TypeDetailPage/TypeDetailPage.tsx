import { useEffect, useState } from "react";
import fitFan from "../../assets/match/fit_fan.png";
import unfitStr from "../../assets/match/unfit_str.png";
import { COLORS } from "../../theme/colors";
import type { DexGridEntry } from "../../data/moodTypes";
import { getMoodTypeDetail } from "../../api/mood-types/moodTypes.api";
import type { MoodTypeCocktailSummary, MoodTypeDetailResult } from "../../api/mood-types/moodTypes.types";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import TypeDetailBackground from "../../components/TypeDetailBackground";
import { LockIcon } from "../../components/icons";
import LockedCocktailModal from "../../components/LockedCocktailModal";

const TASTE_LABELS: { key: keyof MoodTypeDetailResult["typeFigures"]; label: string }[] = [
  { key: "alcoholIntensity", label: "도수" },
  { key: "sweetness", label: "당도" },
  { key: "sourness", label: "산도" },
  { key: "bitterness", label: "쓴맛" },
  { key: "refreshing", label: "청량감" },
];

export default function TypeDetailPage({
  entry,
  moodTypeId,
  onBack,
  onSetRepresentative,
  onGoTest,
  onDetailLoaded,
}: {
  entry: DexGridEntry;
  moodTypeId?: number;
  onBack: () => void;
  onSetRepresentative: () => void;
  onGoTest: () => void;
  onDetailLoaded?: (result: MoodTypeDetailResult) => void;
}) {
  const [detail, setDetail] = useState<MoodTypeDetailResult | null>(null);
  const [lockedCocktail, setLockedCocktail] = useState<MoodTypeCocktailSummary | null>(null);

  useEffect(() => {
    setDetail(null);
    if (!moodTypeId) return;
    let cancelled = false;
    getMoodTypeDetail(moodTypeId)
      .then((result) => {
        if (cancelled) return;
        setDetail(result);
        onDetailLoaded?.(result);
      })
      .catch((err) => console.error("타입 상세 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moodTypeId]);

  const characterImg = detail?.characterImageUrl || entry.image;
  const name = detail?.name || entry.name;

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
          <img
            src={characterImg}
            alt={name}
            style={{ width: 250, height: 250, objectFit: "contain" }}
          />
          <div style={{ fontSize: 27, fontWeight: 700, color: entry.accent, marginTop: 18 }}>{name}</div>
          {detail?.shortDescription && (
            <p
              style={{
                fontSize: 14,
                color: entry.accent,
                textAlign: "center",
                lineHeight: 1.6,
                margin: "6px 0 0",
                maxWidth: 280,
              }}
            >
              {detail.shortDescription}
            </p>
          )}
        </div>

        {detail?.catchphrase && (
          <div
            style={{
              width: "100%",
              background: entry.accent,
              color: "#fff",
              borderRadius: 22,
              padding: "14px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 400 }}>"{detail.catchphrase}"</span>
          </div>
        )}
        {detail && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.orange,
              textAlign: "center",
              marginTop: 6,
              marginBottom: 22,
            }}
          >
            사용자의 {detail.typePercent}%가 이 타입이 나왔어요
          </div>
        )}

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
                <span style={{ fontSize: 13, fontWeight: 800, color: textColor }}>
                  {detail ? detail.typeFigures[key] : "-"}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <img src={fitFan} alt="" style={{ width: "125%", height: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <img src={unfitStr} alt="" style={{ width: "125%", height: "auto", objectFit: "contain" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 22, marginTop: 0 }}>
          <div
            style={{
              flex: 1,
              background: "#F9B8AE",
              borderRadius: 20,
              padding: "8px 0",
              textAlign: "center",
              boxShadow: "0 4px 10px #D0D0D0",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: "#FDE2B4" }}>
              {detail?.compatibilities.best.name ?? "-"}
            </span>
          </div>
          <div
            style={{
              flex: 1,
              background: "#D6EAF8",
              borderRadius: 20,
              padding: "8px 0",
              textAlign: "center",
              boxShadow: "0 4px 10px #D0D0D0",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1564FE" }}>
              {detail?.compatibilities.worst.name ?? "-"}
            </span>
          </div>
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, color: '#10161F', marginBottom: 10 }}>
          해당 타입 칵테일{detail ? ` ${detail.totalCocktailCount}종` : ""}
        </div>
        {detail ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
              paddingBottom: 20,
            }}
          >
            {detail.cocktails.map((cocktail) =>
              cocktail.unlocked ? (
                <div
                  key={cocktail.cocktailId}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: 20,
                    background: "#FFFFFF",
                    border: "1.5px solid #F6C9C2",
                    boxShadow: "3px 4px 4px 0px rgba(255, 111, 79, 0.16), 0px 0px 1.9px 0px rgba(255, 111, 79, 1) inset",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <img
                    src={cocktail.imageUrl}
                    alt=""
                    style={{ width: 90, height: 90, objectFit: "contain" }}
                  />
                  <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.ink }}>
                    {cocktail.nameKo}
                  </span>
                </div>
              ) : (
                <button
                  key={cocktail.cocktailId}
                  type="button"
                  onClick={() => setLockedCocktail(cocktail)}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: 20,
                    background: COLORS.lockedBg,
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                  }}
                >
                  <LockIcon />
                  <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.lockedIcon }}>
                    ???
                  </span>
                </button>
              ),
            )}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: COLORS.inkSoft, paddingBottom: 20 }}>
            칵테일 정보를 불러오는 중이에요...
          </p>
        )}
      </div>

      {lockedCocktail && (
        <LockedCocktailModal
          name={lockedCocktail.nameKo}
          onClose={() => setLockedCocktail(null)}
          onGoTest={() => {
            setLockedCocktail(null);
            onGoTest();
          }}
        />
      )}
    </PhoneFrame>
  );
}
