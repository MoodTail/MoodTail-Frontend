import drink1 from "../../assets/drinks/1.png";
import { COLORS } from "../../theme/colors";

export default function DexBox2() {
  return (
    <div
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
      }}
    >
      <img src={drink1} alt="" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
      <span style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.orange }}>낭만주의자</span>
    </div>
  );
}
