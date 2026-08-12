import drinkImages from "../../assets/drinks";
import { COLORS } from "../../theme/colors";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import DexBackground from "../../components/DexBackground";
import { Mascot } from "../../components/icons";
import type { PersonalityType } from "../../data/types";
import { DEX_DATA } from "../../data/dexData";
import { getCharacterType } from "../../data/characterType";

const PERSONALITY_DRINK_IMAGES: Record<string, string> = Object.fromEntries(
  DEX_DATA.map((dex) => [dex.typeId, drinkImages[dex.id]]),
);

export default function RepresentativeTypeSettingPage({
  type,
  onBack,
  onConfirm,
}: {
  type: PersonalityType;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const characterType = getCharacterType(type.id);

  return (
    <PhoneFrame background={<DexBackground />}>
      <div
        style={{
          padding: "18px 20px 28px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header title="대표 타입 설정" onBack={onBack} titleSize={20} titleGap={3} leftOffset={-8} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.8)",
              borderRadius: 24,
              padding: "32px 22px 26px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 8px 24px rgba(255,107,53,0.12)",
            }}
          >
            {PERSONALITY_DRINK_IMAGES[type.id] ? (
              <img
                src={PERSONALITY_DRINK_IMAGES[type.id]}
                alt=""
                style={{ width: 212, height: 262, objectFit: "contain" }}
              />
            ) : (
              <Mascot size={120} color={characterType.color} />
            )}
            <div style={{ fontSize: 25, fontWeight: 700, color: "#FD881C", marginTop: 14 }}>{characterType.name}</div>
            <div style={{ fontSize: 12, color: "#FD881C", textAlign: "center", lineHeight: 1.5, marginTop: 6 }}>
              {characterType.description}
            </div>
            <p
              style={{
                fontSize: 11,
                color: COLORS.inkSoft,
                textAlign: "center",
                lineHeight: 1.6,
                margin: "24px 0 0",
                maxWidth: 260,
              }}
            >
              이 캐릭터를 홈과 마이페이지의 대표 캐릭터로 지정할까요?
            </p>

            <button
              onClick={onConfirm}
              style={{
                width: "100%",
                border: "none",
                background: COLORS.orange,
                color: "#fff",
                fontSize: 14.5,
                fontWeight: 600,
                padding: "19px 0",
                borderRadius: 24,
                cursor: "pointer",
                marginTop: 14,
              }}
            >
              대표 캐릭터로 지정
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
