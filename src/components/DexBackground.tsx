export default function DexBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: `
          radial-gradient(340px 340px at 22% 4%, #FFF3D6 0%, rgba(255,243,214,0) 70%),
          radial-gradient(420px 420px at 78% 38%, #FFD9D6 0%, rgba(255,217,214,0) 70%),
          radial-gradient(150px 150px at 2% 68%, #FFD9D6 0%, rgba(255,217,214,0) 70%),
          radial-gradient(260px 260px at 4% 106%, #CDF1EA 0%, rgba(205,241,234,0) 70%),
          #FFFFFF
        `,
      }}
    />
  );
}
