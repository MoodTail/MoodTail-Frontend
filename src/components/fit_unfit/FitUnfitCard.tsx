import { COLORS } from "../../theme/colors";

export default function FitUnfitCard({
  label,
  name,
  color,
  img,
}: {
  label: string;
  name?: string;
  color?: string;
  img?: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        height: 115,
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "14px 10px 0",
        display: "flex",
        flexDirection: "column",
        border: `1px solid #fff`,
        alignItems: "center",
        gap: 6,
        overflow: "hidden",
        boxShadow: `0 4px 10px ${COLORS.orangeSoft}`,
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink }}>{label}</span>
      {img && (
        <div
          style={{
            width: 90,
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={img}
            alt={name}
            style={{ width: "80%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      )}
    </div>
  );
}
