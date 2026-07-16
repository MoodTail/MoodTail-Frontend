import { useState } from "react";
import BottomNav from "./components/common/BottomNav";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import HistoryPhotoPage from "./pages/HistoryPage/HistoryPhotoPage";
import MonthlyReportPage from "./pages/HistoryPage/MonthlyReportPage";
import TestResultPage from "./pages/HistoryPage/TestResultPage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import MainPage from "./pages/MainPage/MainPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import MyPage from "./pages/MyPage/MyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";

export type NavKey = "history" | "dictionary" | "home" | "recipe" | "mypage";
type HistoryView = "calendar" | "photo" | "test-result" | "monthly-report";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavKey>("home");
  const [historyView, setHistoryView] = useState<HistoryView>("calendar");
  const [historyPhotoHasTestResult, setHistoryPhotoHasTestResult] = useState(true);

  const openHistoryPhotoPage = (hasTestResult: boolean) => {
    setHistoryPhotoHasTestResult(hasTestResult);
    setHistoryView("photo");
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

  if (historyView !== "calendar") {
    const historyDetailPage = {
      photo: (
        <HistoryPhotoPage
          hasTestResult={historyPhotoHasTestResult}
          onBack={() => setHistoryView("calendar")}
        />
      ),
      "test-result": <TestResultPage onBack={() => setHistoryView("photo")} />,
      "monthly-report": (
        <MonthlyReportPage onBack={() => setHistoryView("calendar")} />
      ),
    }[historyView];

    return (
      <div className="app-shell">
        <main className="app">
          <section className="app-content app-content--full">
            {historyDetailPage}
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
