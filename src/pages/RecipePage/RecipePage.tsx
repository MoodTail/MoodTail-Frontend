import { useMemo, useState } from "react";
import { RECIPES, type Recipe } from "./recipeData";
import RecipeCard from "./RecipeCard";
import RecipeDetailView from "./RecipeDetailView";
import SavedRecipesView from "./SavedRecipesView";
import TwoButtonModal from "../../components/common/modal/TwoButtonModal";
import "../../styles/RecipePage.css";

const FILTERS = ["전체", "15도 이하", "15-25도", "25도 이상"];

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

function RecipePage() {
  const [view, setView] = useState<View>({ name: "list" });
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [query, setQuery] = useState("");
  const [loginModal, setLoginModal] = useState<null | "simple" | "detailed">(null);

  const isSearching = query.length > 0;
  const filteredRecipes = useMemo(() => filterAndSortBySimilarity(RECIPES, query), [query]);
  const hasNoResults = isSearching && filteredRecipes.length === 0;
  const savedRecipes = RECIPES.filter((r) => INITIAL_SAVED_IDS.includes(r.id));

  if (view.name === "detail") {
    const recipe = RECIPES.find((r) => r.id === view.id);
    if (recipe) {
      return (
        <>
          <RecipeDetailView
            recipe={recipe}
            onBack={() => setView({ name: "list" })}
            onRequireLogin={() => setLoginModal("detailed")}
          />
          {loginModal && (
            <LoginModal variant={loginModal} onClose={() => setLoginModal(null)} />
          )}
        </>
      );
    }
  }

  if (view.name === "saved") {
    return <SavedRecipesView recipes={savedRecipes} onBack={() => setView({ name: "list" })} />;
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
              fill="none"
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
              key={filter}
              type="button"
              className={`recipe-page__filter ${filter === activeFilter ? "recipe-page__filter--active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
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
              onSelect={() => setView({ name: "detail", id: recipe.id })}
              onRequireLogin={() => setLoginModal("simple")}
            />
          ))}
        </div>
      )}

      {loginModal && <LoginModal variant={loginModal} onClose={() => setLoginModal(null)} />}
    </div>
  );
}

function LoginModal({ variant, onClose }: { variant: "simple" | "detailed"; onClose: () => void }) {
  const isDetailed = variant === "detailed";
  return (
    <TwoButtonModal
      isOpen
      title={isDetailed ? "로그인하고 기록을 저장해요" : "저장 기능은 로그인이 필요해요!"}
      description={isDetailed ? "테스트 결과, 도감, 즐겨찾기를 이어서 사용할 수 있어요." : undefined}
      leftButton={{ label: isDetailed ? "로그인하기" : "로그인", onClick: onClose, variant: "primary" }}
      rightButton={{ label: "닫기", onClick: onClose, variant: "secondary" }}
      onOverlayClick={onClose}
    />
  );
}

export default RecipePage;
