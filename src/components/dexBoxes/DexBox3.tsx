import drink2 from "../../assets/drinks/2.png";
import { COLORS } from "../../theme/colors";

export default function DexBox3({
  unlocked = true,
  onClick,
}: {
  unlocked?: boolean;
  onClick?: () => void;
}) {
  if (!unlocked) {
    return (
      <div
        style={{
          aspectRatio: "1 / 1",
          borderRadius: 18,
          background: COLORS.lockedBg,
          boxShadow: "0 6px 14px rgba(43, 35, 28, 0.10)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.lockedIcon }}>타입명</div>
        <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.lockedIcon }}>수집률 56%</div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      style={{
        aspectRatio: "1 / 1",
        borderRadius: 18,
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 8px 18px rgba(43, 35, 28, 0.14)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: 8,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <img src={drink2} alt="" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
      <span style={{ fontSize: 10.5, fontWeight: 700, color: '#F1ACAA' }}>환상가</span>
    </button>
  );
}
