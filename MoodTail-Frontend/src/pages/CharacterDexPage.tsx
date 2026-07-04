import { useState } from "react";
import { COLORS } from "../theme/colors";
import type { PersonalityType, Cocktail } from "../data/types";
import Header from "../components/Header";
import PhoneFrame from "../components/PhoneFrame";
import LockedCocktailModal from "../components/LockedCocktailModal";
import { GlassIcon, LockIcon, Mascot } from "../components/icons";

export default function CharacterDexPage({
  type,
  onBack,
  onShare,
  onOpenDetail,
  onGoTest,
}: {
  type: PersonalityType;
  onBack: () => void;
  onShare: () => void;
  onOpenDetail: () => void;
  onGoTest: () => void;
}) {
  const [lockedCocktail, setLockedCocktail] = useState<Cocktail | null>(null);
  const unlockedCount = type.cocktails.filter((c) => c.unlocked).length;
  const collectRate = Math.round((unlockedCount / type.cocktails.length) * 100);

  return (
    <PhoneFrame>
      <div style={{ padding: "18px 20px 0", flex: 1 }}>
        <Header
          title="캐릭터 도감"
          onBack={onBack}
          right={
            <button
              onClick={onShare}
              style={{
                border: `1.3px solid ${COLORS.orange}`,
                color: COLORS.orange,
                background: "transparent",
                fontSize: 11.5,
                fontWeight: 600,
                padding: "6px 10px",
                borderRadius: 20,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              도감 공유
            </button>
          }
        />

        <button
          onClick={onOpenDetail}
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20,
            padding: 18,
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
            width: "100%",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <Mascot color={type.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink }}>{type.name}</div>
          </div>
          <div
            style={{
              background: COLORS.orangeSoft,
              color: COLORS.orange,
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: 14,
              whiteSpace: "nowrap",
            }}
          >
            수집률 {collectRate}%
          </div>
        </button>

        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.inkSoft, marginBottom: 10 }}>
          해당 타입 캐릭터 {type.cocktails.length}종
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            paddingBottom: 20,
          }}
        >
          {type.cocktails.map((cocktail) => (
            <button
              key={cocktail.id}
              onClick={() => (cocktail.unlocked ? onOpenDetail() : setLockedCocktail(cocktail))}
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: cocktail.unlocked ? COLORS.card : COLORS.lockedBg,
                border: cocktail.unlocked ? `1px solid ${COLORS.border}` : "none",
                cursor: "pointer",
              }}
            >
              {cocktail.unlocked ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <GlassIcon shape={cocktail.shape} color={type.color} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.ink }}>{cocktail.name}</span>
                </div>
              ) : (
                <>
                  <LockIcon />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      fontSize: 11,
                      fontWeight: 700,
                      color: COLORS.lockedIcon,
                    }}
                  >
                    잠김
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {lockedCocktail && (
        <LockedCocktailModal
          cocktail={lockedCocktail}
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
