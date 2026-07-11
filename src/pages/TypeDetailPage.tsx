import { useState } from "react";
import { COLORS } from "../theme/colors";
import { getType, type Cocktail, type PersonalityType } from "../data/types";
import Header from "../components/Header";
import PhoneFrame from "../components/PhoneFrame";
import LockedCocktailModal from "../components/LockedCocktailModal";
import { GlassIcon, LockIcon, Mascot } from "../components/icons";

const TASTE_LABELS: { key: keyof PersonalityType["taste"]; label: string }[] = [
  { key: "sour", label: "신맛" },
  { key: "sweet", label: "단맛" },
  { key: "bitter", label: "쓴맛" },
  { key: "alcohol", label: "알콜" },
  { key: "refreshing", label: "청량감" },
];

export default function TypeDetailPage({
  type,
  onBack,
  onSetRepresentative,
  onGoTest,
}: {
  type: PersonalityType;
  onBack: () => void;
  onSetRepresentative: () => void;
  onGoTest: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [matchTab, setMatchTab] = useState<"good" | "bad">("good");
  const [lockedCocktail, setLockedCocktail] = useState<Cocktail | null>(null);

  const matchType = getType(matchTab === "good" ? type.goodMatchId : type.badMatchId);

  return (
    <PhoneFrame>
      <div style={{ padding: "18px 20px 0", flex: 1, overflowY: "auto" }}>
        <Header
          title="타입 상세"
          onBack={onBack}
          right={
            <button
              onClick={onSetRepresentative}
              style={{
                border: `1.3px solid ${COLORS.orange}`,
                color: COLORS.orange,
                background: "transparent",
                fontSize: 11,
                fontWeight: 600,
                padding: "6px 10px",
                borderRadius: 20,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              대표 설정
            </button>
          }
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <Mascot size={88} color={type.color} />
          <div style={{ fontSize: 21, fontWeight: 800, color: COLORS.ink, marginTop: 8 }}>{type.name}</div>
          <p
            style={{
              fontSize: 12.5,
              color: COLORS.inkSoft,
              textAlign: "center",
              lineHeight: 1.6,
              margin: "6px 0 0",
              maxWidth: 280,
            }}
          >
            {type.description}
          </p>
        </div>

        <button
          onClick={() => setAgreed((v) => !v)}
          style={{
            width: "100%",
            border: "none",
            background: agreed ? COLORS.good : COLORS.orange,
            color: "#fff",
            borderRadius: 16,
            padding: "14px 0",
            marginBottom: 22,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 14.5, fontWeight: 800 }}>
            {agreed ? "공감했어요!" : type.agreeLine}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>
            사용자의 {type.agreeRate}%가 이 타입입니다
          </span>
        </button>

        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.inkSoft, marginBottom: 10 }}>
          맛 프로필
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
          {TASTE_LABELS.map(({ key, label }) => (
            <div
              key={key}
              style={{
                flex: 1,
                background: COLORS.chipBg,
                borderRadius: 12,
                padding: "10px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.orange }}>
                {type.taste[key]}
              </span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: COLORS.inkSoft }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button
            onClick={() => setMatchTab("good")}
            style={{
              flex: 1,
              border: "none",
              background: matchTab === "good" ? COLORS.goodBg : COLORS.chipBg,
              color: matchTab === "good" ? COLORS.good : COLORS.inkSoft,
              fontSize: 12.5,
              fontWeight: 700,
              padding: "10px 0",
              borderRadius: 14,
              cursor: "pointer",
            }}
          >
            잘 맞는 타입
          </button>
          <button
            onClick={() => setMatchTab("bad")}
            style={{
              flex: 1,
              border: "none",
              background: matchTab === "bad" ? COLORS.badBg : COLORS.chipBg,
              color: matchTab === "bad" ? COLORS.bad : COLORS.inkSoft,
              fontSize: 12.5,
              fontWeight: 700,
              padding: "10px 0",
              borderRadius: 14,
              cursor: "pointer",
            }}
          >
            안 맞는 타입
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 14,
            marginBottom: 22,
          }}
        >
          <Mascot size={44} color={matchType.color} />
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: COLORS.ink }}>{matchType.name}</div>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: matchTab === "good" ? COLORS.good : COLORS.bad,
                background: matchTab === "good" ? COLORS.goodBg : COLORS.badBg,
                padding: "3px 8px",
                borderRadius: 8,
                display: "inline-block",
                marginTop: 4,
              }}
            >
              {matchTab === "good" ? "궁합 좋음" : "궁합 나쁨"}
            </span>
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.inkSoft, marginBottom: 10 }}>
          해당 타입 칵테일 {type.cocktails.length}종
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
            paddingBottom: 20,
          }}
        >
          {type.cocktails.map((cocktail) => (
            <button
              key={cocktail.id}
              onClick={() => !cocktail.unlocked && setLockedCocktail(cocktail)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: cocktail.unlocked ? COLORS.card : COLORS.lockedBg,
                border: cocktail.unlocked ? `1px solid ${COLORS.border}` : "none",
                borderRadius: 14,
                padding: "10px 12px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {cocktail.unlocked ? <GlassIcon shape={cocktail.shape} color={type.color} /> : <LockIcon />}
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: cocktail.unlocked ? COLORS.ink : COLORS.lockedIcon }}>
                  {cocktail.unlocked ? cocktail.name : "잠김"}
                </div>
                {cocktail.unlocked && (
                  <div style={{ fontSize: 10, color: COLORS.inkSoft, fontWeight: 600 }}>수집 완료</div>
                )}
              </div>
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
