export default function NameTag({
  text,
  bgColor,
  fontColor,
  width = 165,
  fontSize = 14,
}: {
  text?: string;
  bgColor: string;
  fontColor: string;
  width?: number;
  fontSize?: number;
}) {
  return (
    <div
      style={{
        width,
        boxSizing: "border-box",
        background: bgColor,
        color: fontColor,
        borderRadius: 999,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "3px 4px 6px rgba(0, 0, 0, 0.15)",
      }}
    >
      <span style={{ fontSize, fontWeight: 600, whiteSpace: "nowrap" }}>{text}</span>
    </div>
  );
}
