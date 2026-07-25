import drink9 from "../../assets/drinks/9.png";
import { COLORS } from "../../theme/colors";

export default function DexBox10({
  unlocked = false,
  onClick,
}: {
  unlocked?: boolean;
  onClick?: () => void;
}) {
  if (unlocked) {
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
        <img src={drink9} alt="" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
        <span style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.orange }}>평화주의자</span>
      </button>
    );
  }

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
