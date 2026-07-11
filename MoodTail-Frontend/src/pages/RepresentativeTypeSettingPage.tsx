import { COLORS, GRADIENTS } from "../theme/colors";
import type { PersonalityType } from "../data/types";
import GradientBackground from "../components/GradientBackground";
import GlowSpot from "../components/GlowSpot";
import Header from "../components/Header";
import PhoneFrame from "../components/PhoneFrame";
import { Mascot } from "../components/icons";

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
    <PhoneFrame>
      <GradientBackground colors={GRADIENTS.warm} />
      <GlowSpot color={type.color} top="26%" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
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
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Mascot size={120} color={type.color} />
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink }}>{type.name}</div>
          <p
            style={{
              fontSize: 13,
              color: COLORS.inkSoft,
              textAlign: "center",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 260,
            }}
          >
            대표 캐릭터로 지정하시겠어요?
            <br />이 캐릭터가 도감과 프로필의 대표 캐릭터로 설정됩니다.
          </p>
        </div>

        <button
          onClick={onConfirm}
          style={{
            width: "100%",
            border: "none",
            background: COLORS.orange,
            color: "#fff",
            fontSize: 14.5,
            fontWeight: 800,
            padding: "15px 0",
            borderRadius: 16,
            cursor: "pointer",
          }}
        >
          대표 캐릭터로 지정
        </button>
      </div>
    </PhoneFrame>
  );
}
