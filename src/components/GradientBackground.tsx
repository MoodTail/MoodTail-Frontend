export default function GradientBackground({
  colors,
  angle = 150,
}: {
  colors: readonly string[];
  angle?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
      }}
    />
  );
}
