import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";
import { ChevronLeft } from "./icons";

export default function Header({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}
          >
            <ChevronLeft />
          </button>
        )}
        <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.ink }}>{title}</span>
      </div>
      {right}
    </div>
  );
}
