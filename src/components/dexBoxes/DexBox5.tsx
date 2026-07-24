import drink4 from "../../assets/drinks/4.png";
import { COLORS } from "../../theme/colors";

export default function DexBox5() {
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
      <img src={drink4} alt="" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
      <span style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.orange }}>현실주의자</span>
    </div>
  );
}
