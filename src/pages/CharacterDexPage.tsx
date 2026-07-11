import { COLORS } from "../theme/colors";
import type { PersonalityType } from "../data/types";
import Header from "../components/Header";
import PhoneFrame from "../components/PhoneFrame";
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

export default function CharacterDexPage({
  type,
  onShare,
  onOpenDetail,
}: {
  type: PersonalityType;
  onShare: () => void;
  onOpenDetail: () => void;
}) {
  const unlockedCount = type.cocktails.filter((c) => c.unlocked).length;
  const collectRate = Math.round((unlockedCount / type.cocktails.length) * 100);

  return (
    <PhoneFrame>
      <div style={{ padding: "18px 20px 0", flex: 1 }}>
        <Header
          title="캐릭터 도감"
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
            boxShadow: "0 8px 20px rgba(255, 107, 53, 0.16)",
          }}
        >
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
