import MainPage from "./pages/MainPage/MainPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import MyPage from "./pages/MyPage/MyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";

export type NavKey = "history" | "dictionary" | "home" | "recipe" | "mypage";

function App() {
  return <MainPage />;
}

export default App;
