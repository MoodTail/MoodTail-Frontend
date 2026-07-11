import { COLORS } from "../theme/colors";
import Modal from "./Modal";

export default function CompleteModal({
  message = "지정 완료되었습니다",
  onClose,
}: {
  message?: string;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink, marginBottom: 20 }}>
          {message}
        </div>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            border: "none",
            background: COLORS.orange,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            padding: "12px 0",
            borderRadius: 14,
            cursor: "pointer",
          }}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}
