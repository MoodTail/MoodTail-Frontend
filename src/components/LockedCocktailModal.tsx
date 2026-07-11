import { COLORS } from "../theme/colors";
import type { Cocktail } from "../data/types";
import Modal from "./Modal";
import { LockIcon } from "./icons";

export default function LockedCocktailModal({
  cocktail,
  onClose,
  onGoTest,
}: {
  cocktail: Cocktail;
  onClose: () => void;
  onGoTest: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: COLORS.lockedBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
          }}
        >
          <LockIcon />
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 10 }}>
          아래 조건 중 하나를 달성하면
          <br />
          캐릭터가 해제돼요!
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: "0 0 20px",
            padding: 0,
            fontSize: 12.5,
            color: COLORS.inkSoft,
            lineHeight: 1.7,
          }}
        >
          <li>· {cocktail.hint}</li>
          <li>· 오늘의 취향 테스트에서 "{cocktail.name}" 결과 받기</li>
        </ul>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              border: `1px solid ${COLORS.border}`,
              background: "#fff",
              color: COLORS.inkSoft,
              fontSize: 13,
              fontWeight: 700,
              padding: "11px 0",
              borderRadius: 14,
              cursor: "pointer",
            }}
          >
            닫기
          </button>
          <button
            onClick={onGoTest}
            style={{
              flex: 1,
              border: "none",
              background: COLORS.orange,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              padding: "11px 0",
              borderRadius: 14,
              cursor: "pointer",
            }}
          >
            테스트하러 가기
          </button>
        </div>
      </div>
    </Modal>
  );
}
