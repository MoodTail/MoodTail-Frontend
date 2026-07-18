import { COLORS } from "../theme/colors";
import Modal from "./Modal";

export default function LoginRequiredModal({
  variant = "simple",
  onLogin,
  onClose,
}: {
  variant?: "simple" | "detailed";
  onLogin: () => void;
  onClose: () => void;
}) {
  const isDetailed = variant === "detailed";

  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: isDetailed ? 17 : 18,
            fontWeight: 800,
            color: COLORS.ink,
            marginBottom: isDetailed ? 8 : 20,
          }}
        >
          {isDetailed ? "로그인하고 기록을 저장해요" : "저장 기능은 로그인이 필요해요!"}
        </div>
        {isDetailed && (
          <div style={{ fontSize: 12.5, color: COLORS.inkSoft, lineHeight: 1.5, marginBottom: 20 }}>
            테스트 결과, 도감, 즐겨찾기를 이어서 사용할 수 있어요.
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onLogin}
            style={{
              flex: 1,
              border: "none",
              background: COLORS.orange,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "13px 0",
              borderRadius: 16,
              cursor: "pointer",
            }}
          >
            {isDetailed ? "로그인하기" : "로그인"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              border: `1px solid ${COLORS.border}`,
              background: "#fff",
              color: COLORS.orange,
              fontSize: 14,
              fontWeight: 700,
              padding: "13px 0",
              borderRadius: 16,
              cursor: "pointer",
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}
