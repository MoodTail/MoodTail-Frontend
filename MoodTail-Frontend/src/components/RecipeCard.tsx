import { COLORS } from "../theme/colors";
import type { Recipe } from "../data/recipes";
import { GlassPlaceholderIcon } from "./icons";
import SaveButton from "./SaveButton";

export default function RecipeCard({
  recipe,
  onSelect,
  onRequireLogin,
}: {
  recipe: Recipe;
  onSelect: () => void;
  onRequireLogin: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        border: `1.5px solid ${COLORS.border}`,
        background: "#fff",
        borderRadius: 16,
        padding: 14,
        cursor: "pointer",
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

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink }}>{recipe.name}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, flexShrink: 0 }}>
            {recipe.degree}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 11.5, color: COLORS.inkSoft }}>{recipe.description}</span>
          <SaveButton
            saved={false}
            onClick={(e) => {
              e.stopPropagation();
              onRequireLogin();
            }}
          />
        </div>
      </div>
    </div>
  );
}
