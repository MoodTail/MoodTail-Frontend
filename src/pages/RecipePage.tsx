import { useMemo, useState } from "react";
import { COLORS } from "../theme/colors";
import { RECIPES, type Recipe } from "../data/recipes";
import { BookmarkIcon, ClearIcon } from "../components/icons";
import LoginRequiredModal from "../components/LoginRequiredModal";
import PhoneFrame from "../components/PhoneFrame";
import RecipeCard from "../components/RecipeCard";

const FILTERS = ["전체", "15도 이하", "15-25도", "25도 이상"];

function filterAndSortBySimilarity(recipes: Recipe[], query: string): Recipe[] {
  if (!query.trim()) return recipes;
  const q = query.trim().toLowerCase();
  const score = (name: string) => {
    const n = name.toLowerCase();
    if (n.startsWith(q)) return 0;
    return 1;
  };
  return recipes
    .filter((r) => r.name.toLowerCase().includes(q))
    .sort((a, b) => score(a.name) - score(b.name));
}

export default function RecipePage({
  onOpenSaved,
  onSelectRecipe,
}: {
  onOpenSaved: () => void;
  onSelectRecipe: (id: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [query, setQuery] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const isSearching = query.length > 0;
  const filteredRecipes = useMemo(() => filterAndSortBySimilarity(RECIPES, query), [query]);
  const hasNoResults = isSearching && filteredRecipes.length === 0;

  return (
    <PhoneFrame>
      <div style={{ padding: "18px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 25, fontWeight: 800, color: COLORS.ink, marginBottom: 4 }}>
              레시피
            </div>
            <div style={{ fontSize: 12.5, color: COLORS.inkSoft, fontWeight: 600 }}>
            96가지 칵테일 레시피
            </div>
            <div
            style={{
            position: "absolute",
            left:28,
            top: 64,
            width: 105,
            height: 50,
            }}
  />
            </div>
          <button
            onClick={onOpenSaved}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 5,
              border: `1px solid ${COLORS.orange}`,
              background: "#fff",
              color: COLORS.orange,
              fontSize: 11,
              fontWeight: 700,
              padding: "7px 11px",
              borderRadius: 20,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <BookmarkIcon color={COLORS.orange} />
            저장된 레시피
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 14,
            padding: "12px 12px",
            marginBottom: 14,
            background: "#fffaf9",
            height:"22px",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="칵테일 검색..."
            style={{
              flex: 1,
              minWidth: 0,
              border: "none",
              outline: "none",
              background: "#fffaf9",
              fontSize: 13,
              color: COLORS.ink,
              fontFamily: "inherit",
            }}
          />
          {query.length > 0 && (
            <button
              onClick={() => setQuery("")}
              style={{ display: "flex", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {!isSearching && (
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {FILTERS.map((filter) => {
              const active = filter === activeFilter;
              const isDegreeFilter = filter !== "전체";
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    flex: 1,
                    border: active ? "none" : `1px solid ${COLORS.border}`,
                    background: active ? COLORS.orange : "#fff",
                    color: active ? "#fff" : isDegreeFilter ? "#6B6B6B" : COLORS.ink,
                    fontSize: isDegreeFilter ? 11 : 12.5,
                    fontWeight: 700,
                    padding: "9px 8px",
                    borderRadius: 20,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        )}

        {hasNoResults ? (
          <div
            style={{
              marginTop: 18,
              textAlign: "center",
              fontSize: 13,
              color: "#aaaaaa",
            }}
          >
            검색 결과가 없어요...
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: isSearching ? 18 : 0 }}>
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={() => onSelectRecipe(recipe.id)}
                onRequireLogin={() => setLoginModalOpen(true)}
              />
            ))}
          </div>
        )}
      </div>

      {loginModalOpen && (
        <LoginRequiredModal
          onLogin={() => setLoginModalOpen(false)}
          onClose={() => setLoginModalOpen(false)}
        />
      )}
    </PhoneFrame>
  );
}
