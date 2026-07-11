import { COLORS } from "../theme/colors";
import Modal from "./Modal";
import { CloseIcon, FacebookIcon, InstagramIcon, KakaoIcon, NaverIcon } from "./icons";

const OPTIONS = [
  { key: "kakao", label: "카카오톡", Icon: KakaoIcon },
  { key: "facebook", label: "페이스북", Icon: FacebookIcon },
  { key: "naver", label: "네이버", Icon: NaverIcon },
  { key: "instagram", label: "인스타그램", Icon: InstagramIcon },
];

export default function SnsShareOptionsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.ink }}>공유하기</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <CloseIcon />
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        {OPTIONS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={onClose}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Icon />
            <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.inkSoft }}>{label}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
