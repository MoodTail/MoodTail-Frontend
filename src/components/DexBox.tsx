export default function DexBox({
  image,
  name,
  accent,
  collectionRate,
  unlocked,
  onClick,
}: {
  image: string;
  name: string;
  accent: string;
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
          background: '#FFFAF9',
          border: "none",
          boxShadow: "0 6px 20px rgba(255, 111, 79, 0.12), 0 2px 6px rgba(43, 35, 28, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          padding: 8,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <img src={image} alt="" style={{ width: "90%", height: "70%", objectFit: "contain" }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>{name}</span>
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
        boxShadow: "inset 0 1px 2px rgba(43, 35, 28, 0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: "#323232" }}>타입명</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#8E8A88" }}>수집률 {collectionRate ?? 0}%</div>
    </button>
  );
}
