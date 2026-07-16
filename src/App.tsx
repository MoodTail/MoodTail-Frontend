import { useState } from "react";
import BottomNav from "./components/common/BottomNav";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import HistoryPhotoPage from "./pages/HistoryPage/HistoryPhotoPage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import MainPage from "./pages/MainPage/MainPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import MyPage from "./pages/MyPage/MyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";

export type NavKey = "history" | "dictionary" | "home" | "recipe" | "mypage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavKey>("home");
  const [isHistoryPhotoPageOpen, setIsHistoryPhotoPageOpen] = useState(false);
  const [historyPhotoHasTestResult, setHistoryPhotoHasTestResult] = useState(true);

  const openHistoryPhotoPage = (hasTestResult: boolean) => {
    setHistoryPhotoHasTestResult(hasTestResult);
    setIsHistoryPhotoPageOpen(true);
  };

  const renderPage = () => {
    switch (activeMenu) {
      case "history":
        return <HistoryPage onOpenPhotoDetails={openHistoryPhotoPage} />;
      case "dictionary":
        return <CharacterPage />;
      case "home":
        return <MainPage />;
      case "recipe":
        return <RecipePage />;
      case "mypage":
        return <MyPage />;
      default:
        return <MainPage />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  if (isHistoryPhotoPageOpen) {
    return (
      <div className="app-shell">
        <main className="app">
          <section className="app-content app-content--full">
            <HistoryPhotoPage
              hasTestResult={historyPhotoHasTestResult}
              onBack={() => setIsHistoryPhotoPageOpen(false)}
            />
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <main className="app">
        <section className="app-content">{renderPage()}</section>

        <BottomNav activeMenu={activeMenu} onChangeMenu={setActiveMenu} />
      </main>
    </div>
  );
}

export default App;
