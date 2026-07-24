import drink0 from "../../assets/drinks/0.png";
import { COLORS } from "../../theme/colors";

export default function DexBox1({ onClick }: { onClick?: () => void }) {
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
      <img src={drink0} alt="" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
      <span style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.orange }}>이상주의자</span>
    </button>
  );
}
