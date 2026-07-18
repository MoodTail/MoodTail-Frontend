import type { MouseEvent } from "react";
import { COLORS } from "../theme/colors";
import { BookmarkIcon } from "./icons";

export default function SaveButton({
  saved,
  onClick,
}: {
  saved: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        border: `1px solid ${COLORS.orange}`,
        background: saved ? COLORS.orange : "#fff",
        color: saved ? "#fff" : COLORS.orange,
        fontSize: 11,
        fontWeight: 700,
        padding: "5px 10px",
        borderRadius: 20,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      <BookmarkIcon filled={saved} color={saved ? "#fff" : COLORS.orange} />
      {saved ? "저장된" : "저장"}
    </button>
  );
}
