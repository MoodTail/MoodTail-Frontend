import { getCharacterType } from "../data/characterType";

export default function DexBox({
  drinkImg,
  typeId,
  collectionRate,
  unlocked,
  onClick,
  border,
  boxShadow,
  nameFontSize,
  nameLineClamp,
  nameOverflowVisible,
  nameSplitAtSpace,
  boxAspectRatio,
  contentJustify,
  imageGap,
  imageMarginTop,
  imageMarginLeft,
  imageWidth,
  imageHeight,
  borderRadius,
}: {
  drinkImg: string;
  typeId: string;
  collectionRate?: number;
  unlocked: boolean;
  onClick?: () => void;
  border?: string;
  boxShadow?: string;
  nameFontSize?: number;
  nameLineClamp?: number;
  nameOverflowVisible?: boolean;
  nameSplitAtSpace?: boolean;
  boxAspectRatio?: string;
  contentJustify?: "center" | "flex-start";
  imageGap?: number;
  // contentJustify="flex-start"일 때, 이미지를 박스 상단 padding 기준에서 더 아래로
  // 내립니다. imageGap(이미지-이름 간격)과는 별개로 캐릭터 자체의 세로 위치만 조절합니다.
  imageMarginTop?: number;
  // 캐릭터의 가로 위치를 조절합니다(양수면 오른쪽으로).
  imageMarginLeft?: number;
  imageWidth?: string;
  imageHeight?: string;
  borderRadius?: number;
}) {
  if (unlocked) {
    const characterType = getCharacterType(typeId);

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        style={{
          width: "100%",
          aspectRatio: boxAspectRatio ?? "1 / 1",
          borderRadius: borderRadius ?? 18,
          background: '#FFFAF9',
          border: border ?? "none",
          boxShadow: boxShadow ?? "0 6px 20px rgba(255, 111, 79, 0.12), 0 2px 6px rgba(43, 35, 28, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: contentJustify ?? "center",
          gap: imageGap ?? 5,
          padding: 8,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        <img
          src={drinkImg}
          alt=""
          style={{
            width: imageWidth ?? "80%",
            height: imageHeight ?? "74%",
            objectFit: "contain",
            marginTop: imageMarginTop,
            marginLeft: imageMarginLeft,
          }}
        />
        <span
          style={{
            fontSize: nameFontSize ?? 11,
            fontWeight: 700,
            color: characterType?.color,
            textAlign: "center",
            lineHeight: 1.2,
            wordBreak: "keep-all",
            display: "-webkit-box",
            WebkitLineClamp: nameLineClamp ?? 2,
            WebkitBoxOrient: "vertical",
            overflow: nameOverflowVisible ? "visible" : "hidden",
          }}
        >
          {nameSplitAtSpace && characterType
            ? characterType.name.split(" ").map((part, i, parts) => (
                <span key={i}>
                  {part}
                  {i < parts.length - 1 && <br />}
                </span>
              ))
            : characterType?.name}
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
        width: "100%",
        aspectRatio: boxAspectRatio ?? "1 / 1",
        borderRadius: 18,
        background: "#CAB8B3",
        border: border ? "1px solid #CAB8B3" : "none",
        boxShadow: boxShadow ?? "inset 0 1px 2px rgba(43, 35, 28, 0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: "#323232" }}>타입명</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#8E8A88" }}>수집률 {(collectionRate ?? 0).toFixed(1)}%</div>
    </button>
  );
}
