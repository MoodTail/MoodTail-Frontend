import { COLORS } from "../../theme/colors";

export default function FitUnfitCard({
  label,
  name,
  img,
}: {
  label: string;
  name?: string;
  img?: string;
}) {
  return (
    <div
      style={{
        width: 165,
        height: 105,
        flexShrink: 0,
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "10px 10px 0",
        display: "flex",
        flexDirection: "column",
        border: `1px solid #fff`,
        alignItems: "center",
        gap: 4,
        overflow: "hidden",
        boxShadow: `0 4px 10px ${COLORS.orangeSoft}`,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink }}>{label}</span>
      {img && (
        <div
          style={{
            width: 68,
            height: 80,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={img}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
}
