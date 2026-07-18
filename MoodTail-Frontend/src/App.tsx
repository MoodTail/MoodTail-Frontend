import { useState } from "react";
import { getRecipe } from "./data/recipes";
import LoginRequiredModal from "./components/LoginRequiredModal";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipePage from "./pages/RecipePage";
import SavedRecipesPage from "./pages/SavedRecipesPage";

type Screen =
  | { name: "recipe" }
  | { name: "recipeDetail"; id: string }
  | { name: "savedRecipes" };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "recipe" });
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: 390, position: "relative" }}>
        {screen.name === "recipe" && (
          <RecipePage
            onOpenSaved={() => setScreen({ name: "savedRecipes" })}
            onSelectRecipe={(id) => setScreen({ name: "recipeDetail", id })}
          />
        )}
        {screen.name === "recipeDetail" && (
          <RecipeDetailPage
            recipe={getRecipe(screen.id)}
            onBack={() => setScreen({ name: "recipe" })}
            onRequireLogin={() => setLoginModalOpen(true)}
          />
        )}
        {screen.name === "savedRecipes" && <SavedRecipesPage onBack={() => setScreen({ name: "recipe" })} />}

        {loginModalOpen && (
          <LoginRequiredModal
            variant="detailed"
            onLogin={() => setLoginModalOpen(false)}
            onClose={() => setLoginModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
