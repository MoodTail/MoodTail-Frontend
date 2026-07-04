
import { COLORS } from "../theme/colors";
import { TYPES } from "../data/types";
import Header from "../components/Header";
import PhoneFrame from "../components/PhoneFrame";
import { Mascot } from "../components/icons";

export default function TypeDexPage({
  repTypeId,
  onOpenType,
  onShare,
  onBack,
}: {
  repTypeId: string;
  onOpenType: (typeId: string) => void;
  onShare: () => void;
  onBack: () => void;
}) {
  const repType = TYPES.find((t) => t.id === repTypeId)!;

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
                border: "none",
                background: COLORS.orange,
                color: "#fff",
                fontSize: 11.5,
                fontWeight: 700,
                padding: "7px 12px",
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
          onClick={() => onOpenType(repType.id)}
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20,
            padding: 18,
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
            width: "100%",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <Mascot color={repType.color} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink }}>{repType.name}</div>
          </div>
        </button>
      </div>
    </PhoneFrame>
  );
}
