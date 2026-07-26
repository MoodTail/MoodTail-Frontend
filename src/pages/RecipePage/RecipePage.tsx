import { useEffect, useMemo, useState } from "react";
import { RECIPES, type Recipe } from "./recipeData";
import RecipeCard from "./RecipeCard";
import RecipeDetailView from "./RecipeDetailView";
import SavedRecipesView from "./SavedRecipesView";
import "../../styles/RecipePage.css";

// taste.도수는 이제 실제 ABV(%) 값이라 버튼 라벨의 도수 구간과 그대로 맞춥니다.
const FILTERS: { label: string; test: (recipe: Recipe) => boolean }[] = [
  { label: "전체", test: () => true },
  { label: "15도 이하", test: (r) => r.taste.도수 <= 15 },
  { label: "15-25도", test: (r) => r.taste.도수 > 15 && r.taste.도수 <= 25 },
  { label: "25도 이상", test: (r) => r.taste.도수 > 25 },
];
const SELECT_ANIMATION_MS = 700;

// 저장된 레시피 화면 데모용 초기값입니다. 실제로는 로그인한 사용자의 저장 목록을 API로 받아와야 합니다.
const INITIAL_SAVED_IDS = ["mojito", "gin-fizz", "black-russian", "cosmopolitan"];

function filterAndSortBySimilarity(recipes: Recipe[], query: string): Recipe[] {
  if (!query.trim()) return recipes;
  const q = query.trim().toLowerCase();
  const score = (name: string) => (name.toLowerCase().startsWith(q) ? 0 : 1);
  return recipes
    .filter((r) => r.name.toLowerCase().includes(q))
    .sort((a, b) => score(a.name) - score(b.name));
}

type View = { name: "list" } | { name: "detail"; id: string } | { name: "saved" };

interface RecipePageProps {
  onNavVisibilityChange?: (visible: boolean) => void;
}

function RecipePage({ onNavVisibilityChange }: RecipePageProps) {
  const [view, setView] = useState<View>({ name: "list" });
  const [activeFilter, setActiveFilter] = useState(FILTERS[0].label);
  const [query, setQuery] = useState("");
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set(INITIAL_SAVED_IDS));

  useEffect(() => {
    onNavVisibilityChange?.(view.name === "list");
    return () => onNavVisibilityChange?.(true);
  }, [view.name, onNavVisibilityChange]);

  const isSearching = query.length > 0;
  const filteredRecipes = useMemo(() => {
    if (isSearching) return filterAndSortBySimilarity(RECIPES, query);
    const filter = FILTERS.find((f) => f.label === activeFilter) ?? FILTERS[0];
    return RECIPES.filter(filter.test);
  }, [query, isSearching, activeFilter]);
  const hasNoResults = isSearching && filteredRecipes.length === 0;
  const savedRecipes = RECIPES.filter((r) => savedIds.has(r.id));

  const handleSelectRecipe = (id: string) => {
    if (selectingId) return;
    setSelectingId(id);
    setTimeout(() => {
      setSelectingId(null);
      setView({ name: "detail", id });
    }, SELECT_ANIMATION_MS);
  };

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (view.name === "detail") {
    const recipe = RECIPES.find((r) => r.id === view.id);
    if (recipe) {
      return (
        <RecipeDetailView
          recipe={recipe}
          onBack={() => setView({ name: "list" })}
          saved={savedIds.has(recipe.id)}
        />
      );
    }
  }

  if (view.name === "saved") {
    return (
      <SavedRecipesView
        recipes={savedRecipes}
        onBack={() => setView({ name: "list" })}
        onUnsave={toggleSaved}
      />
    );
  }

  return (
    <div className="recipe-page">
      <div className="recipe-page__header">
        <div>
          <div className="recipe-page__title">레시피</div>
          <div className="recipe-page__subtitle">96가지 칵테일 레시피</div>
        </div>
        <button type="button" className="recipe-page__saved-btn" onClick={() => setView({ name: "saved" })}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 3.5 h12 a1 1 0 0 1 1 1 V21 l-7 -4.5 L5 21 V4.5 a1 1 0 0 1 1 -1 z"
              fill="#ff6f4f"
              stroke="#ff6f4f"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          저장된 레시피
        </button>
      </div>

      <div className="recipe-page__search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="칵테일 검색..."
        />
        {query.length > 0 && (
          <button type="button" className="recipe-page__clear" onClick={() => setQuery("")} aria-label="검색어 지우기">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#efe7de" />
              <path d="M9 9 L15 15 M15 9 L9 15" stroke="#9b9088" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {!isSearching && (
        <div className="recipe-page__filters">
          {FILTERS.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={`recipe-page__filter ${filter.label === activeFilter ? "recipe-page__filter--active" : ""}`}
              onClick={() => setActiveFilter(filter.label)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {hasNoResults ? (
        <div className="recipe-page__no-results">검색 결과가 없어요...</div>
      ) : (
        <div className="recipe-page__list">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              selecting={selectingId === recipe.id}
              saved={savedIds.has(recipe.id)}
              onSelect={() => handleSelectRecipe(recipe.id)}
              onToggleSave={() => toggleSaved(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipePage;
