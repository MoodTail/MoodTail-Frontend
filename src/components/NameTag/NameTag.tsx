export default function NameTag({
  text,
  bgColor,
  fontColor,
}: {
  text?: string;
  bgColor: string;
  fontColor: string;
}) {
  return (
    <div
      style={{
        width: 165,
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
      <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>{text}</span>
    </div>
  );
}
