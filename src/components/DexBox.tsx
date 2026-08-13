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
  lockedNameFontSize,
  lockedRateFontSize,
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
  imageMarginTop?: number;
  imageMarginLeft?: number;
  imageWidth?: string;
  imageHeight?: string;
  borderRadius?: number;
  lockedNameFontSize?: number;
  lockedRateFontSize?: number;
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
      <div style={{ fontSize: lockedNameFontSize ?? 20, fontWeight: 700, color: "#323232" }}>타입명</div>
      <div style={{ fontSize: lockedRateFontSize ?? 13, fontWeight: 600, color: "#8E8A88" }}>수집률 {(collectionRate ?? 0).toFixed(1)}%</div>
    </button>
  );
}
