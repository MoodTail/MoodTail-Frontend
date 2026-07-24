import drink0 from "../../assets/drinks/0.png";
import { COLORS } from "../../theme/colors";
import type { PersonalityType } from "../../data/types";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import DexBackground from "../../components/DexBackground";
import { Mascot } from "../../components/icons";

export default function RepresentativeTypeSettingPage({
  type,
  onBack,
  onConfirm,
}: {
  type: PersonalityType;
  onBack: () => void;
  onConfirm: () => void;
}) {
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
        <Header title="대표 타입 설정" onBack={onBack} />

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
              padding: "28px 22px 22px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 8px 24px rgba(255,107,53,0.12)",
            }}
          >
            {type.id === "idealist" ? (
              <img src={drink0} alt="" style={{ width: 200, height: 250, objectFit: "contain" }} />
            ) : (
              <Mascot size={120} color={type.color} />
            )}
            <div style={{ fontSize: 25, fontWeight: 700, color: "#FD881C" }}>{type.name}</div>
            <div style={{ fontSize: 12, color: "#FD881C", textAlign: "center", lineHeight: 1.5 }}>
              {type.description}
            </div>
            <p
              style={{
                fontSize: 11,
                color: COLORS.inkSoft,
                textAlign: "center",
                lineHeight: 1.6,
                margin: 0,
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
                padding: "15px 0",
                borderRadius: 24,
                cursor: "pointer",
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
