import { useEffect, useMemo, useState } from "react";
import { RECIPES, type Recipe } from "./recipeData";
import {
  addFavoriteCocktail,
  getCocktailDetail,
  getCocktails,
  getFavoriteCocktails,
  removeFavoriteCocktail,
} from "../../api/cocktails/cocktails.api";
import RecipeCard from "./RecipeCard";
import RecipeDetailView from "./RecipeDetailView";
import SavedRecipesView from "./SavedRecipesView";
import TwoButtonModal from "../../components/common/modal/TwoButtonModal";
import "../../styles/RecipePage.css";

// taste.도수는 이제 실제 ABV(%) 값이라 버튼 라벨의 도수 구간과 그대로 맞춥니다.
const FILTERS: { label: string; test: (recipe: Recipe) => boolean }[] = [
  { label: "전체", test: () => true },
  { label: "15도 이하", test: (r) => r.taste.도수 <= 15 },
  { label: "15-25도", test: (r) => r.taste.도수 > 15 && r.taste.도수 <= 25 },
  { label: "25도 이상", test: (r) => r.taste.도수 > 25 },
];
const SELECT_ANIMATION_MS = 700;

// 레시피 탭을 벗어났다가 돌아오면 RecipePage가 다시 마운트되면서 recipes가 로컬 잔
// 이미지(RECIPES)로 리셋됐다가, 서버 실사진(getCocktails)을 다시 받아온 뒤에야 바뀌어서
// 매번 "잔 → 실사진" 전환이 보이는 지연이 생깁니다. 컴포넌트 바깥에 마지막으로 받아온
// 결과를 캐시해뒀다가 다음 마운트의 초기값으로 재사용해서, 재방문 시에는 바로 실사진을
// 보여주고 그 사이에도 아래 effect가 최신 데이터로 갱신합니다.
let cachedRecipes: Recipe[] | null = null;
let cachedCocktailIdByRecipeId: Record<string, number> | null = null;

// 목록 화면은 실제 API(/api/v1/cocktails)에서 이름/도수/설명을 받아오되, 재료/조리법 등
// 백엔드에 아직 없는 필드는 이름이 일치하는 로컬 목데이터에서 그대로 가져옵니다. 컴포넌트
// effect와 아래 프리캐치용 prefetchRecipes()가 이 로직을 공유합니다.
async function fetchAndCacheRecipes(): Promise<{
  recipes: Recipe[];
  idMap: Record<string, number>;
} | null> {
  const { cocktails } = await getCocktails();
  const merged: Recipe[] = [];
  const idMap: Record<string, number> = {};
  cocktails.forEach((c) => {
    const local = RECIPES.find((r) => r.name === c.nameKo);
    if (!local) return;
    merged.push({
      ...local,
      description: c.description,
      degree: `${Math.round(c.alcoholDegree)}°`,
      taste: { ...local.taste, 도수: Math.round(c.alcoholDegree) },
      ...(c.imageUrl ? { glassImage: c.imageUrl, heroImage: c.imageUrl, hasHeroPhoto: true } : {}),
    });
    idMap[local.id] = c.cocktailId;
  });
  if (merged.length === 0) return null;
  cachedRecipes = merged;
  cachedCocktailIdByRecipeId = idMap;
  preloadRecipePhotos(merged);
  return { recipes: merged, idMap };
}

// 실사진 URL만 미리 브라우저에 다운로드해둡니다(로컬 잔 실루엣은 이미 번들에 포함돼 있어
// 네트워크가 필요 없습니다). 로그인 직후 prefetchRecipes()가 호출되는 시점에 함께 실행돼,
// 실제로 레시피 목록/상세 화면에 그려질 때는 이미 브라우저 캐시에 있는 이미지라 사진이
// 늦게 팝인하지 않습니다.
function preloadRecipePhotos(recipes: Recipe[]): void {
  recipes.forEach((r) => {
    if (!r.hasHeroPhoto || !r.heroImage) return;
    const img = new Image();
    img.src = r.heroImage;
  });
}

// 레시피 탭에 들어가기 전에(예: 로그인 성공 직후, PostLoginScreen이 도는 동안) 실제 칵테일
// 목록을 미리 받아와 모듈 캐시를 채워둡니다. RecipePage가 마운트될 때 cachedRecipes가 이미
// 채워져 있으면 로딩 지연 없이 바로 실사진을 보여줄 수 있습니다. 로그인 직후와 App.tsx의
// 로그인 상태 진입 시점 둘 다에서 호출될 수 있어, 이미 캐시가 있으면 중복 요청을 건너뜁니다.
export function prefetchRecipes(): Promise<void> {
  if (cachedRecipes) return Promise.resolve();
  return fetchAndCacheRecipes()
    .then(() => undefined)
    .catch((err) => console.error("칵테일 목록을 불러오지 못했습니다", err));
}

// "저장된 레시피" 화면도 같은 이유로 지연이 보였습니다 — 즐겨찾기 목록(/api/v1/cocktails/favorites)이
// 레시피 탭에 들어가야만 요청되던 터라, 그 사이에 "저장된 레시피" 버튼을 누르면 아직 안 채워진
// 빈 목록이 잠깐 보였습니다. cachedRecipes와 같은 방식으로 모듈 캐시에 저장해둡니다.
let cachedSavedIds: Set<string> | null = null;

async function fetchAndCacheSavedIds(): Promise<Set<string>> {
  const { cocktails } = await getFavoriteCocktails();
  const ids = cocktails
    .map((c) => RECIPES.find((r) => r.name === c.name)?.id)
    .filter((id): id is string => id !== undefined);
  const set = new Set(ids);
  cachedSavedIds = set;
  return set;
}

// 로그인 직후(게스트는 즐겨찾기 API 인증이 안 되므로 제외) 미리 받아와 캐시를 채워둡니다.
// 이미 캐시가 있으면 중복 요청을 건너뜁니다.
export function prefetchSavedRecipes(): Promise<void> {
  if (cachedSavedIds) return Promise.resolve();
  return fetchAndCacheSavedIds()
    .then(() => undefined)
    .catch((err) => console.error("즐겨찾기 목록을 불러오지 못했습니다", err));
}

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
  isLoggedIn: boolean;
  onGoToLogin: () => void;
  // 다른 화면(캐릭터 상세 등)에서 특정 칵테일을 눌러 들어온 경우, 목록을 거치지 않고
  // 이름이 일치하는 레시피의 상세 화면을 바로 엽니다.
  initialDetailName?: string | null;
  onInitialDetailConsumed?: () => void;
  // initialDetailName으로 열린 상세 화면에서 뒤로가기를 누르면 레시피 목록 대신
  // 원래 있던 화면(캐릭터 도감)으로 돌아갑니다.
  onExitToOrigin?: () => void;
}

function RecipePage({
  onNavVisibilityChange,
  isLoggedIn,
  onGoToLogin,
  initialDetailName,
  onInitialDetailConsumed,
  onExitToOrigin,
}: RecipePageProps) {
  // 캐릭터 상세 등에서 특정 칵테일 이름으로 들어온 경우, 목록 화면을 먼저 그렸다가 상세로
  // 전환하면(useEffect는 첫 페인트 이후에 실행됩니다) 목록 화면이 잠깐 보이는 깜빡임이
  // 생깁니다. 그래서 목록/상세 여부를 useEffect가 아니라 이 초기값 계산에서 바로 정해,
  // 첫 렌더부터 곧장 상세 화면으로 그립니다.
  const initialMatch = initialDetailName
    ? (cachedRecipes ?? RECIPES).find((r) => r.name === initialDetailName)
    : undefined;
  const [view, setView] = useState<View>(
    initialMatch ? { name: "detail", id: initialMatch.id } : { name: "list" },
  );
  const [openedFromOrigin, setOpenedFromOrigin] = useState(Boolean(initialMatch));
  const [activeFilter, setActiveFilter] = useState(FILTERS[0].label);
  const [query, setQuery] = useState("");
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(() => cachedSavedIds ?? new Set());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>(cachedRecipes ?? RECIPES);
  const [cocktailIdByRecipeId, setCocktailIdByRecipeId] = useState<Record<string, number>>(
    cachedCocktailIdByRecipeId ?? {},
  );
  const [liveDetail, setLiveDetail] = useState<
    Record<string, { ingredients?: string[]; steps?: string[]; heroImage?: string }>
  >({});

  useEffect(() => {
    if (!initialDetailName) return;
    onInitialDetailConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDetailName]);

  useEffect(() => {
    onNavVisibilityChange?.(view.name === "list");
    return () => onNavVisibilityChange?.(true);
  }, [view.name, onNavVisibilityChange]);

  // 목록 썸네일(glassImage)/상세 히어로 이미지(heroImage) 둘 다 서버 실제 칵테일 사진(imageUrl)으로
  // 대체합니다. 로그인 직후 prefetchRecipes()가 이미 캐시를 채워뒀다면 이 요청은 최신 데이터로
  // 다시 한번 갱신하는 역할만 합니다.
  useEffect(() => {
    let cancelled = false;
    fetchAndCacheRecipes()
      .then((result) => {
        if (cancelled || !result) return;
        setRecipes(result.recipes);
        setCocktailIdByRecipeId(result.idMap);
      })
      .catch((err) => console.error("칵테일 목록을 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, []);

  // 저장(즐겨찾기) 목록은 실제 API(/api/v1/cocktails/favorites)에서만 받아옵니다.
  // 로그인 상태가 아니면 애초에 저장된 게 없으므로 빈 목록을 유지합니다.
  useEffect(() => {
    if (!isLoggedIn) {
      setSavedIds(new Set());
      return;
    }
    let cancelled = false;
    fetchAndCacheSavedIds()
      .then((ids) => {
        if (!cancelled) setSavedIds(ids);
      })
      .catch((err) => console.error("즐겨찾기 목록을 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  const detailId = view.name === "detail" ? view.id : null;

  // 상세 화면을 열면 실제 재료/조리법(/api/v1/cocktails/{id})을 받아와 덮어씁니다.
  // 아직 데이터가 비어있는 칵테일이면 조용히 무시하고 로컬 재료/조리법을 그대로 보여줍니다.
  useEffect(() => {
    if (!detailId) return;
    const cocktailId = cocktailIdByRecipeId[detailId];
    if (!cocktailId) return;
    let cancelled = false;
    getCocktailDetail(cocktailId)
      .then((detail) => {
        if (cancelled) return;
        const hasSteps = detail.cocktailIngredients.length > 0 || detail.recipeSteps.length > 0;
        if (!hasSteps && !detail.imageUrl) return;
        setLiveDetail((prev) => ({
          ...prev,
          [detailId]: {
            ...(hasSteps
              ? {
                  ingredients: [...detail.cocktailIngredients]
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((i) => `${i.amountText} ${i.name}`),
                  steps: [...detail.recipeSteps]
                    .sort((a, b) => a.stepOrder - b.stepOrder)
                    .map((s) => s.description),
                }
              : {}),
            ...(detail.imageUrl ? { heroImage: detail.imageUrl } : {}),
          },
        }));
      })
      .catch((err) => console.error("칵테일 상세 정보를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, [detailId, cocktailIdByRecipeId]);

  const isSearching = query.length > 0;
  const filteredRecipes = useMemo(() => {
    if (isSearching) return filterAndSortBySimilarity(recipes, query);
    const filter = FILTERS.find((f) => f.label === activeFilter) ?? FILTERS[0];
    return recipes.filter(filter.test);
  }, [recipes, query, isSearching, activeFilter]);
  const hasNoResults = isSearching && filteredRecipes.length === 0;
  const savedRecipes = recipes.filter((r) => savedIds.has(r.id));

  const handleSelectRecipe = (id: string) => {
    if (selectingId) return;
    setSelectingId(id);
    setTimeout(() => {
      setSelectingId(null);
      setView({ name: "detail", id });
    }, SELECT_ANIMATION_MS);
  };

  const toggleSaved = (id: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const wasSaved = savedIds.has(id);
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (wasSaved) next.delete(id);
      else next.add(id);
      cachedSavedIds = next;
      return next;
    });

    // 실제 즐겨찾기 API 반영은 최선 노력으로만 시도합니다.
    // 실패해도(비로그인 등) 위에서 이미 반영한 로컬 상태는 그대로 유지합니다.
    const cocktailId = cocktailIdByRecipeId[id];
    if (!cocktailId) return;
    const request = wasSaved ? removeFavoriteCocktail(cocktailId) : addFavoriteCocktail(cocktailId);
    request.catch((err) => console.error("즐겨찾기 반영에 실패했습니다", err));
  };

  const loginModal = (
    <TwoButtonModal
      isOpen={showLoginModal}
      title="로그인하고 기록을 저장해요"
      description="테스트 결과, 도감, 즐겨찾기를 이어서 사용할 수 있어요."
      leftButton={{
        label: "로그인하기",
        variant: "primary",
        onClick: () => {
          setShowLoginModal(false);
          onGoToLogin();
        },
      }}
      rightButton={{
        label: "닫기",
        variant: "secondary",
        onClick: () => setShowLoginModal(false),
      }}
      onOverlayClick={() => setShowLoginModal(false)}
    />
  );

  if (view.name === "detail") {
    const recipe = recipes.find((r) => r.id === view.id);
    if (recipe) {
      const override = liveDetail[view.id];
      const displayRecipe = override
        ? { ...recipe, ...override, hasHeroPhoto: recipe.hasHeroPhoto || Boolean(override.heroImage) }
        : recipe;
      return (
        <RecipeDetailView
          recipe={displayRecipe}
          onBack={() => {
            if (openedFromOrigin) {
              setOpenedFromOrigin(false);
              onExitToOrigin?.();
              return;
            }
            setView({ name: "list" });
          }}
          saved={savedIds.has(recipe.id)}
          isLoggedIn={isLoggedIn}
          onToggleSave={() => toggleSaved(recipe.id)}
          onGoToLogin={onGoToLogin}
        />
      );
    }
  }

  if (view.name === "saved") {
    return (
      <>
        <SavedRecipesView
          recipes={savedRecipes}
          selectingId={selectingId}
          onBack={() => setView({ name: "list" })}
          onUnsave={toggleSaved}
          onSelectRecipe={handleSelectRecipe}
        />
        {loginModal}
      </>
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
      {loginModal}
    </div>
  );
}

export default RecipePage;
