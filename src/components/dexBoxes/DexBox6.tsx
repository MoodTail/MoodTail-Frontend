import { COLORS } from "../../theme/colors";

export default function DexBox6() {
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
