import { COLORS } from "../theme/colors";

export default function ConfirmLeaveModal({
  onContinue,
  onLeave,
}: {
  onContinue: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onClick={onContinue}
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.overlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 20,
        borderRadius: 28,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.card,
          borderRadius: 22,
          width: "100%",
          maxWidth: 320,
          padding: 26,
          boxShadow: "0 20px 40px rgba(43,35,28,0.25)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink, marginBottom: 10 }}>
          뒤로가시겠어요?
        </div>
        <p style={{ fontSize: 13, color: COLORS.inkSoft, margin: "0 0 22px" }}>
          뒤로가시면 진행사항은 저장이 불가합니다
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onContinue}
            style={{
              flex: 1,
              border: "none",
              background: COLORS.orange,
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 700,
              padding: "13px 0",
              borderRadius: 16,
              cursor: "pointer",
            }}
          >
            계속 진행하기
          </button>
          <button
            onClick={onLeave}
            style={{
              flex: 1,
              border: "none",
              background: COLORS.orangeSoft,
              color: COLORS.orange,
              fontSize: 13.5,
              fontWeight: 700,
              padding: "13px 0",
              borderRadius: 16,
              cursor: "pointer",
            }}
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
