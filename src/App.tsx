import { useState } from "react";
import BottomNav from "./components/common/BottomNav";
import DexBackground from "./components/DexBackground";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import HistoryPhotoPage from "./pages/HistoryPage/HistoryPhotoPage";
import type { HistoryRecordTab } from "./pages/HistoryPage/HistoryPhotoPage";
import MonthlyReportPage from "./pages/HistoryPage/MonthlyReportPage";
import TestResultPage from "./pages/HistoryPage/TestResultPage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import MainPage from "./pages/MainPage/MainPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import MyPage from "./pages/MyPage/MyPage";
import ProfileEdit from "./pages/MyPage/ProfileEdit";
import Inquiry from "./pages/MyPage/Inquiry";
import Terms from "./pages/MyPage/Terms";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import QuizQuestionPage from "./pages/QuizQuestionPage";
import { buildQuizQuestions, toQuizQuestions, type QuizQuestion } from "./data/quiz";
import { getMoodTestQuestions, postMoodTestResult } from "./api/mood-tests/moodTests.api";
import type { MoodTestAnswer, MoodTestResult } from "./api/mood-tests/moodTests.types";
import "./App.css";
import { parseOauthCallback } from "./utils/oauth";
import SocialSignupPage from "./pages/SocialSignupPage/SocialSignupPage";

export type NavKey = "history" | "dictionary" | "home" | "recipe" | "mypage";
type HistoryView = "calendar" | "photo" | "test-result" | "monthly-report";
type MyPageView = "main" | "profile-edit" | "inquiry" | "terms";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavKey>("home");
  const [historyView, setHistoryView] = useState<HistoryView>("calendar");
  const [historyPhotoHasTestResult, setHistoryPhotoHasTestResult] =
    useState(true);
  const [historyPhotoDate, setHistoryPhotoDate] = useState(new Date());
  const [historyRecordTab, setHistoryRecordTab] =
    useState<HistoryRecordTab>("photo");
  const [monthlyReportMonth, setMonthlyReportMonth] = useState(new Date());
  const [mypageView, setMypageView] = useState<MyPageView>("main");
  const [recipeNavVisible, setRecipeNavVisible] = useState(true);
  const [goToQuizOnHome, setGoToQuizOnHome] = useState(false);
  const [isTestResultOpen, setIsTestResultOpen] = useState(false);
  const [isRetestOpen, setIsRetestOpen] = useState(false);
  const [retestStep, setRetestStep] = useState(0);
  const [retestAnswers, setRetestAnswers] = useState<Record<number, string>>(
    {},
  );
  const [retestQuestions, setRetestQuestions] = useState<QuizQuestion[]>(() =>
    buildQuizQuestions(),
  );
  const [quizResult, setQuizResult] = useState<MoodTestResult | null>(null);
  const [oauthCallback, setOauthCallback] = useState(() =>
    parseOauthCallback(),
  );

  const startRetest = () => {
    setIsTestResultOpen(false);
    setRetestStep(0);
    setRetestAnswers({});
    setRetestQuestions(buildQuizQuestions());
    setIsRetestOpen(true);
    getMoodTestQuestions()
      .then(({ questions }) => setRetestQuestions(toQuizQuestions(questions)))
      .catch((err) => console.error("테스트 질문을 불러오지 못했습니다", err));
  };

  const exitRetest = () => {
    setIsRetestOpen(false);
    setRetestStep(0);
    setRetestAnswers({});
    setRetestQuestions(buildQuizQuestions());
  };

  const startTestFromHistory = () => {
    setHistoryView("calendar");
    setRetestStep(0);
    setRetestAnswers({});
    setIsRetestOpen(true);
  };

  const handleGoToTest = () => {
    setGoToQuizOnHome(true);
    setActiveMenu("home");
  };

  const handleGoToLoginScreen = () => {
    setIsLoggedIn(false);
    setIsGuest(false);
    setMypageView("main");
  };

  const openHistoryRecordPage = (
    hasTestResult: boolean,
    date: Date,
    tab: HistoryRecordTab = "photo",
  ) => {
    setHistoryPhotoHasTestResult(hasTestResult);
    setHistoryPhotoDate(date);
    setHistoryRecordTab(tab);
    setHistoryView("photo");
  };

  const openMonthlyReportPage = (month: Date) => {
    setMonthlyReportMonth(month);
    setHistoryView("monthly-report");
  };

  const renderPage = () => {
    switch (activeMenu) {
      case "history":
        return (
          <HistoryPage
            onOpenPhotoDetails={(hasTestResult, date) =>
              openHistoryRecordPage(hasTestResult, date, "photo")
            }
            onOpenCocktailRecord={(hasTestResult, date) =>
              openHistoryRecordPage(hasTestResult, date, "cocktail")
            }
            onOpenTestResult={(hasTestResult, date) =>
              openHistoryRecordPage(hasTestResult, date, "result")
            }
            onOpenMonthlyReport={openMonthlyReportPage}
            onStartTest={startTestFromHistory}
          />
        );
      case "dictionary":
        return <CharacterPage onGoTest={handleGoToTest} />;
      case "home":
        return (
          <MainPage
            onQuizComplete={(result) => {
              setQuizResult(result);
              setIsTestResultOpen(true);
            }}
            initialView={goToQuizOnHome ? "quiz" : undefined}
            onInitialViewConsumed={() => setGoToQuizOnHome(false)}
          />
        );
      case "recipe":
        return (
          <RecipePage
            onNavVisibilityChange={setRecipeNavVisible}
            onGoToLogin={handleGoToLoginScreen}
          />
        );
      case "mypage":
        return (
          <MyPage
            isLoggedIn={!isGuest}
            onEditProfile={() => setMypageView("profile-edit")}
            onInquiry={() => setMypageView("inquiry")}
            onTerms={() => setMypageView("terms")}
            onLoggedOut={handleGoToLoginScreen}
            onGoToLogin={handleGoToLoginScreen}
          />
        );
      default:
        return <MainPage />;
    }
  };

  if (oauthCallback) {
    const redirectUri =
      oauthCallback.provider === "kakao"
        ? import.meta.env.VITE_KAKAO_REDIRECT_URI
        : import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    return (
      <SocialSignupPage
        provider={oauthCallback.provider}
        authorizationCode={oauthCallback.code}
        stateValue={oauthCallback.state}
        redirectUri={redirectUri}
        onSignupComplete={() => {
          window.history.replaceState({}, "", "/");
          setOauthCallback(null);
          setIsGuest(localStorage.getItem("isGuest") === "true");
          setIsLoggedIn(true);
        }}
      />
    );
  }

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() => {
          setIsGuest(localStorage.getItem("isGuest") === "true");
          setIsLoggedIn(true);
        }}
      />
    );
  }

  if (historyView !== "calendar") {
    const historyDetailPage = {
      photo: (
        <HistoryPhotoPage
          hasTestResult={historyPhotoHasTestResult}
          selectedDate={historyPhotoDate}
          initialTab={historyRecordTab}
          onBack={() => setHistoryView("calendar")}
          onOpenFullResult={() => setHistoryView("test-result")}
          onStartTest={startTestFromHistory}
        />
      ),
      "test-result": <TestResultPage onBack={() => setHistoryView("photo")} />,
      "monthly-report": (
        <MonthlyReportPage
          reportMonth={monthlyReportMonth}
          onBack={() => setHistoryView("calendar")}
        />
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

  if (isRetestOpen) {
    const question = retestQuestions[retestStep];
    const isLastStep = retestStep === retestQuestions.length - 1;
    return (
      <div className="app-shell">
        <main className="app">
          <section className="app-content app-content--full">
            <QuizQuestionPage
              step={retestStep}
              totalSteps={retestQuestions.length}
              question={question}
              selectedOptionId={retestAnswers[retestStep] ?? null}
              onSelectOption={(id) =>
                setRetestAnswers((prev) => ({ ...prev, [retestStep]: id }))
              }
              onPrevious={
                retestStep > 0 ? () => setRetestStep((s) => s - 1) : undefined
              }
              onNext={() => {
                if (isLastStep) {
                  // 로컬 목데이터로 폴백된 상태라면 id가 실제 숫자 id가 아니라서 제출을 건너뜁니다.
                  const answers = retestQuestions
                    .map((q, i) => {
                      const questionId = Number(q.id);
                      const optionId = Number(retestAnswers[i]);
                      if (Number.isNaN(questionId) || Number.isNaN(optionId)) return null;
                      return { questionId, optionId };
                    })
                    .filter((a): a is MoodTestAnswer => a !== null);

                  exitRetest();
                  if (answers.length === retestQuestions.length) {
                    postMoodTestResult(answers)
                      .then((result) => {
                        setQuizResult(result);
                        setIsTestResultOpen(true);
                      })
                      .catch((err) => {
                        console.error("테스트 결과 제출에 실패했습니다", err);
                        setQuizResult(null);
                        setIsTestResultOpen(true);
                      });
                  } else {
                    setQuizResult(null);
                    setIsTestResultOpen(true);
                  }
                } else {
                  setRetestStep((s) => s + 1);
                }
              }}
              onExit={exitRetest}
            />
          </section>
        </main>
      </div>
    );
  }

  if (isTestResultOpen) {
    return (
      <div className="app-shell">
        <main className="app">
          <section className="app-content app-content--full">
            <ResultPage
              isLoggedIn={!isGuest}
              result={quizResult}
              onBack={() => setIsTestResultOpen(false)}
              onRetest={startRetest}
              onGoToLogin={handleGoToLoginScreen}
            />
          </section>
        </main>
      </div>
    );
  }

  if (mypageView !== "main") {
    const mypageDetailPage = {
      "profile-edit": <ProfileEdit onBack={() => setMypageView("main")} />,
      inquiry: <Inquiry onBack={() => setMypageView("main")} />,
      terms: <Terms onBack={() => setMypageView("main")} />,
    }[mypageView];

    return (
      <div className="app-shell">
        <main className="app">
          <section className="app-content app-content--full">
            {mypageDetailPage}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <main className="app">
        {activeMenu === "recipe" && <DexBackground />}
        <section className="app-content">{renderPage()}</section>

        {(activeMenu !== "recipe" || recipeNavVisible) && (
          <BottomNav activeMenu={activeMenu} onChangeMenu={setActiveMenu} />
        )}
      </main>
    </div>
  );
}

export default App;
