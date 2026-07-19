export default function GlowSpot({
  color,
  top = "50%",
  left = "50%",
  size = 340,
}: {
  color: string;
  top?: string;
  left?: string;
  size?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}55 0%, ${color}00 70%)`,
        filter: "blur(6px)",
        zIndex: 0,
      }}
    />
  );
}
