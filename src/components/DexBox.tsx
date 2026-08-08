import { COLORS } from "../theme/colors";
import { getCharacterType } from "../data/characterType";

export default function DexBox({
  drinkImg,
  typeId,
  collectionRate,
  unlocked,
  onClick,
}: {
  drinkImg: string;
  typeId: string;
  collectionRate?: number;
  unlocked: boolean;
  onClick?: () => void;
}) {
  if (unlocked) {
    // number가 아니라 typeId로 직접 찾습니다 — number는 characterType.ts에서 중복될 수 있어서
    // (예: realist/straightforward가 둘 다 number 3) number 기준 조회는 틀린 항목을 찾을 수 있습니다.
    const characterType = getCharacterType(typeId);

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        style={{
          aspectRatio: "1 / 1",
          borderRadius: 18,
          background: '#FFFAF9',
          border: "none",
          boxShadow: "0 6px 20px rgba(255, 111, 79, 0.12), 0 2px 6px rgba(43, 35, 28, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          padding: 8,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <img src={drinkImg} alt="" style={{ width: "90%", height: "70%", objectFit: "contain" }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: characterType?.color,
            textAlign: "center",
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {characterType?.name}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      style={{
        aspectRatio: "1 / 1",
        borderRadius: 18,
        background: "#CAB8B3",
        border: "none",
        boxShadow: "inset 0 1px 2px rgba(43, 35, 28, 0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: "#323232" }}>타입명</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#8E8A88" }}>수집률 {collectionRate}%</div>
    </button>
  );
}
