import { COLORS } from "../theme/colors";

export default function DexBox({
  drinkImg,
  name,
  collectionRate,
  unlocked,
  onClick,
}: {
  drinkImg: string;
  name: string;
  collectionRate?: number;
  unlocked: boolean;
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
        <img src={drinkImg} alt="" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
        <span style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.orange }}>{name}</span>
      </button>
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
        background: "#CAB8B3",
        border: "none",
        boxShadow: "0 6px 14px rgba(43, 35, 28, 0.10)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontSize: 11.5, fontWeight: 700, color: "#323232" }}>타입명</div>
      <div style={{ fontSize: 10, fontWeight: 600, color: "#827F7F" }}>
        수집률 {collectionRate ?? 0}%
      </div>
    </button>
  );
}
