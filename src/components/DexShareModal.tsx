import drink0 from "../assets/drinks/0.png";
import { COLORS } from "../theme/colors";
import type { PersonalityType } from "../data/types";
import Modal from "./Modal";
import DexBackground from "./DexBackground";
import { CloseIcon } from "./icons";
import DexBox1 from "./dexBoxes/DexBox1";
import DexBox2 from "./dexBoxes/DexBox2";
import DexBox3 from "./dexBoxes/DexBox3";
import DexBox4 from "./dexBoxes/DexBox4";
import DexBox5 from "./dexBoxes/DexBox5";
import DexBox6 from "./dexBoxes/DexBox6";
import DexBox7 from "./dexBoxes/DexBox7";
import DexBox8 from "./dexBoxes/DexBox8";
import DexBox9 from "./dexBoxes/DexBox9";
import DexBox10 from "./dexBoxes/DexBox10";
import DexBox11 from "./dexBoxes/DexBox11";
import DexBox12 from "./dexBoxes/DexBox12";

export default function DexShareModal({
  type,
  onClose,
  onShareSns,
  onSaveImage,
}: {
  type: PersonalityType;
  onClose: () => void;
  onShareSns: () => void;
  onSaveImage: () => void;
}) {
  const unlockedCount = type.cocktails.filter((c) => c.unlocked).length;
  const collectRate = Math.round((unlockedCount / type.cocktails.length) * 100);

  return (
    <Modal onClose={onClose} background={<DexBackground />}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.orange }}>MoodTail</span>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </button>
      </div>

      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 20,
          padding: 18,
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 14,
          boxShadow: "0 8px 20px rgba(255, 107, 53, 0.16)",
        }}
      >
        <img src={drink0} alt="" style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
            대표 타입
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.ink, whiteSpace: "nowrap" }}>
            {type.name}
          </div>
        </div>
        <div
          style={{
            background: COLORS.orangeSoft,
            color: COLORS.orange,
            fontSize: 11,
            fontWeight: 700,
            padding: "5px 9px",
            borderRadius: 14,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          수집률 {collectRate}%
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 20,
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

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onShareSns}
          style={{
            flex: 1,
            border: "none",
            background: COLORS.orange,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            padding: "12px 0",
            borderRadius: 14,
            cursor: "pointer",
          }}
        >
          SNS 공유하기
        </button>
        <button
          onClick={onSaveImage}
          style={{
            flex: 1,
            border: `1px solid ${COLORS.border}`,
            background: "#fff",
            color: COLORS.orange,
            fontSize: 13,
            fontWeight: 700,
            padding: "12px 0",
            borderRadius: 14,
            cursor: "pointer",
          }}
        >
          이미지 저장
        </button>
      </div>
    </Modal>
  );
}
