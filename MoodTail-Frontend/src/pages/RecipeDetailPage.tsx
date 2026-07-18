import { COLORS } from "../theme/colors";
import type { Recipe, TasteProfile } from "../data/recipes";
import { BookmarkIcon, ChevronLeftIcon } from "../components/icons";
import PhoneFrame from "../components/PhoneFrame";

const TASTE_LABELS: { key: keyof TasteProfile; label: string }[] = [
  { key: "도수", label: "도수" },
  { key: "단맛", label: "단맛" },
  { key: "산도", label: "산도" },
  { key: "쓴맛", label: "쓴맛" },
  { key: "청량감", label: "청량감" },
];

export default function RecipeDetailPage({
  recipe,
  onBack,
  onRequireLogin,
}: {
  recipe: Recipe;
  onBack: () => void;
  onRequireLogin: () => void;
}) {
  return (
    <PhoneFrame>
      <div style={{ padding: "18px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <button
            onClick={onBack}
            style={{ display: "flex", background: "none", border: "none", cursor: "pointer", padding: 2 }}
          >
            <ChevronLeftIcon />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.ink }}>레시피</span>
        </div>

        <div
          style={{
            height: 200,
            borderRadius: 18,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.ink, marginBottom: 4 }}>{recipe.name}</div>
            <div style={{ fontSize: 12.5, color: COLORS.inkSoft }}>{recipe.description}</div>
          </div>
          <button
            onClick={onRequireLogin}
            style={{ display: "flex", background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}
          >
            <BookmarkIcon color={COLORS.orange} size={20} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, margin: "12px 0 22px" }}>
          <span
            style={{
              background: COLORS.orange,
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              padding: "8px 18px",
              borderRadius: 20,
              whiteSpace: "nowrap",
            }}
          >
            도수 {recipe.degree}
          </span>
          <span
            style={{
              background: "#fff",
              border: `1px solid ${COLORS.orange}`,
              color: COLORS.orange,
              fontSize: 13,
              fontWeight: 800,
              padding: "8px 18px",
              borderRadius: 20,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 10px rgba(255, 107, 53, 0.25)",
            }}
          >
            일치율 {recipe.sweetness}
          </span>
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, marginBottom: 10 }}>맛 지표</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {TASTE_LABELS.map(({ label, key }, i) => {
            const isOrange = i % 2 === 0;
            return (
              <div
                key={key}
                style={{
                  flex: 1,
                  background: isOrange ? "#FFF0E8":"#F5F4F0",
                  border: `1px solid ${isOrange ? COLORS.orange : "#C7C0B8"}`,
                  borderRadius: 12,
                  padding: "5px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  aspectRatio: "1 / 1",
                }}
              >
                <span style={{ fontSize: 10.5, fontWeight: 600, color: isOrange ? "#FF6120" : "#6B6B6B" }}>
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: isOrange ? "#FF6120" : "#1A1A2E",
                  }}
                >
                  {recipe.taste[key]}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A2E", marginBottom: 10 }}>재료</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {recipe.ingredients.map((ingredient) => (
            <div
              key={ingredient}
              style={{
                background: "#FFFBF5",
                border: `1px solid #E8E0D8`,
                borderRadius: 10,
                padding: "5px 14px",
                fontSize: 12.5,
                color: "#6B6B6B",
                fontWeight: 500,
              }}
            >
              {ingredient}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, marginBottom: 10 }}>만드는 방법</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recipe.steps.map((step, i) => (
            <div key={i} style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: COLORS.orange,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </span>
              {i < recipe.steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 9,
                    top: 20,
                    bottom: -12,
                    width: 2,
                    background: COLORS.orangeSoft,
                  }}
                />
              )}
              <span style={{ fontSize: 12.5, color: COLORS.ink, lineHeight: 1.5, paddingTop: 1 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
