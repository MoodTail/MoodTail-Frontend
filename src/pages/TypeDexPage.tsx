
import { COLORS } from "../theme/colors";
import { TYPES } from "../data/types";
import Header from "../components/Header";
import PhoneFrame from "../components/PhoneFrame";
import { Mascot } from "../components/icons";
import DexBox1 from "../components/dexBoxes/DexBox1";
import DexBox2 from "../components/dexBoxes/DexBox2";
import DexBox3 from "../components/dexBoxes/DexBox3";
import DexBox4 from "../components/dexBoxes/DexBox4";
import DexBox5 from "../components/dexBoxes/DexBox5";
import DexBox6 from "../components/dexBoxes/DexBox6";
import DexBox7 from "../components/dexBoxes/DexBox7";
import DexBox8 from "../components/dexBoxes/DexBox8";
import DexBox9 from "../components/dexBoxes/DexBox9";
import DexBox10 from "../components/dexBoxes/DexBox10";
import DexBox11 from "../components/dexBoxes/DexBox11";
import DexBox12 from "../components/dexBoxes/DexBox12";

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            paddingBottom: 20,
          }}
        >
          <DexBox1 />
          <DexBox2 />
          <DexBox3 />
          <DexBox4 />
          <DexBox5 />
          <DexBox6 />
          <DexBox7 />
          <DexBox8 />
          <DexBox9 />
          <DexBox10 />
          <DexBox11 />
          <DexBox12 />
        </div>
      </div>
    </PhoneFrame>
  );
}
