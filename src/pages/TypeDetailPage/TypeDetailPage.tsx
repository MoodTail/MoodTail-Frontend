import { useState } from "react";
import drink0 from "../../assets/drinks/0.png";
import drink1 from "../../assets/drinks/1.png";
import drink4 from "../../assets/drinks/4.png";
import drink5 from "../../assets/drinks/5.png";
import drink6 from "../../assets/drinks/6.png";
import drink7 from "../../assets/drinks/7.png";
import drink8 from "../../assets/drinks/8.png";
import drink9 from "../../assets/drinks/9.png";
import drink10 from "../../assets/drinks/10.png";
import drink11 from "../../assets/drinks/11.png";
import drinkImages from "../../assets/drinks";
import fitFan from "../../assets/match/fit_fan.png";
import unfitStr from "../../assets/match/unfit_str.png";
import { COLORS } from "../../theme/colors";
import { getType, type Cocktail, type PersonalityType } from "../../data/types";
import { getCharacterType } from "../../data/characterType";
import { DEX_DATA } from "../../data/dexData";
import { getCocktailsByType, getGlassImage } from "../../data/cocktailGlasses";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import TypeDetailBackground from "../../components/TypeDetailBackground";
import { LockIcon, Mascot } from "../../components/icons";
import LockedCocktailModal from "../../components/LockedCocktailModal";

const TASTE_LABELS: { key: keyof PersonalityType["taste"]; label: string }[] = [
  { key: "alcohol", label: "도수" },
  { key: "sweet", label: "당도" },
  { key: "sour", label: "산도" },
  { key: "bitter", label: "쓴맛" },
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
  const [lockedCocktail, setLockedCocktail] = useState<Cocktail | null>(null);
  const goodMatch = getType(type.goodMatchId);
  const badMatch = getType(type.badMatchId);
  const dexEntry = DEX_DATA.find((d) => d.typeId === type.id);
  const characterImg = dexEntry ? drinkImages[dexEntry.id] : undefined;
  const characterType = getCharacterType(type.id);
  const realCocktails = dexEntry ? getCocktailsByType(dexEntry.typeNumber) : [];

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
      alt={characterType.name}
      style={{ width: 250, height: 250, objectFit: "contain" }}
    />
  ) : (
    <Mascot size={88} color={characterType.color} />
  )}
  <div style={{ fontSize: 27, fontWeight: 700, color: characterType.color, marginTop: 18 }}>{characterType.name}</div>
  <p
    style={{
      fontSize: 14,
      color: characterType.color,
      textAlign: "center",
      lineHeight: 1.6,
      margin: "6px 0 0",
      maxWidth: 280,
    }}
  >
    {characterType.description}
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
          <span style={{ fontSize: 15, fontWeight: 400 }}>"{type.agreeLine}"</span>
        </div>
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
          사용자의 {type.agreeRate}%가 이 타입이 나왔어요
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
                <span style={{ fontSize: 13, fontWeight: 800, color: textColor }}>
                  {type.taste[key]}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >

            <img src={fitFan} alt="" style={{ width: "125%", height: "auto", objectFit: "contain" }} />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >

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
    <span style={{ fontSize: 14, fontWeight: 800, color: "#FDE2B4" }}>{goodMatch.name}</span>
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
    <span style={{ fontSize: 14, fontWeight: 800, color: "#1564FE" }}>{badMatch.name}</span>
  </div>
</div>

        <div style={{ fontSize: 18, fontWeight: 700, color: '#10161F', marginBottom: 10 }}>
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
          {type.cocktails.map((cocktail, index) => {
            const realCocktail = realCocktails[index];
            return cocktail.unlocked ? (
              <div
                key={cocktail.id}
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
                  src={getGlassImage(realCocktail?.glassNumber)}
                  alt=""
                  style={{ width: 90, height: 90, objectFit: "contain" }}
                />
                <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.ink }}>
                  {realCocktail?.nameKo ?? cocktail.name}
                </span>
              </div>
            ) : (
              <button
                key={cocktail.id}
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
            );
          })}
        </div>
      </div>

      {lockedCocktail && (
        <LockedCocktailModal
          name={lockedCocktail.name}
          hint={lockedCocktail.hint}
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
