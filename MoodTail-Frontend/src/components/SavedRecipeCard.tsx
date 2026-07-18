import { COLORS } from "../theme/colors";
import { BookmarkIcon, GlassPlaceholderIcon } from "./icons";

export type SavedCardPhase = "visible" | "exiting" | "collapsing";

export default function SavedRecipeCard({
  name,
  description,
  phase,
  onUnsave,
}: {
  name: string;
  description: string;
  phase: SavedCardPhase;
  onUnsave: () => void;
}) {
  const isLeaving = phase === "exiting" || phase === "collapsing";

  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: phase === "collapsing" ? 0 : 100,
        marginBottom: phase === "collapsing" ? 0 : 10,
        transition: "opacity 0.2s ease, transform 0.2s ease, max-height 0.3s ease, margin-bottom 0.3s ease",
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? "translateY(8px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: 14,
          background: "#fff",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: 12,
            background: COLORS.placeholder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GlassPlaceholderIcon />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, marginBottom: 2 }}>{name}</div>
          <div style={{ fontSize: 11.5, color: COLORS.inkSoft }}>{description}</div>
        </div>

        <button
          onClick={onUnsave}
          style={{ flexShrink: 0, display: "flex", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <BookmarkIcon filled color={COLORS.orange} size={18} />
        </button>
      </div>
    </div>
  );
}
