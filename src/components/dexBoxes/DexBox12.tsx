import { COLORS } from "../../theme/colors";

export default function DexBox12() {
  return (
    <div
      style={{
        aspectRatio: "1 / 1",
        borderRadius: 18,
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 8px 20px rgba(255, 107, 53, 0.16)",
      }}
    />
  );
}
