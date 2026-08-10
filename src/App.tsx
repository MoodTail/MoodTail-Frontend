import { useEffect, useState } from "react";
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
import MyPage, { type MyPageProfileSnapshot } from "./pages/MyPage/MyPage";
import ProfileEdit from "./pages/MyPage/ProfileEdit";
import Inquiry from "./pages/MyPage/Inquiry";
import Terms from "./pages/MyPage/Terms";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import QuizQuestionPage from "./pages/QuizQuestionPage";
import {
  buildQuizQuestions,
  toQuizQuestions,
  type QuizQuestion,
} from "./data/quiz";
import {
  getMoodTestQuestions,
  postMoodTestResult,
} from "./api/mood-tests/moodTests.api";
import type {
  MoodTestAnswer,
  MoodTestResult,
} from "./api/mood-tests/moodTests.types";
import type { HistoryTestResultDetail } from "./api/histories/histories.types";
import "./App.css";
import { parseOauthCallback } from "./utils/oauth";
import { parseSharedRoute } from "./utils/shareRoute";
import {
  clearQuizProgress,
  loadQuizProgress,
  saveQuizProgress,
} from "./utils/quizProgress";
import SocialSignupPage from "./pages/SocialSignupPage/SocialSignupPage";
import SharedResultPage from "./pages/SharedResultPage/SharedResultPage";
import SharedCollectionPage from "./pages/SharedCollectionPage/SharedCollectionPage";

const RETEST_PROGRESS_KEY = "moodtail-retest-progress";

export type NavKey = "history" | "dictionary" | "home" | "recipe" | "mypage";
type HistoryView = "calendar" | "photo" | "test-result" | "monthly-report";
type MyPageView = "main" | "profile-edit" | "inquiry" | "terms";

function App() {
  const [mainNavVisible, setMainNavVisible] = useState(true);
  // 새로고침/백그라운드 복귀 시에도 재로그인 없이 이어서 쓸 수 있도록, 이미 저장된
  // accessToken이 있으면 로그인 상태를 그대로 복원합니다. 이게 없으면 토큰이 남아있어도
  // 매번 온보딩/로그인 화면부터 다시 봐야 해서, 테스트 진행 상황 복원도 체감이 안 됩니다.
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("accessToken"),
  );
  const [isGuest, setIsGuest] = useState(
    () => localStorage.getItem("isGuest") === "true",
  );
  const [activeMenu, setActiveMenu] = useState<NavKey>("home");
  const [historyView, setHistoryView] = useState<HistoryView>("calendar");
  const [historyPhotoHasTestResult, setHistoryPhotoHasTestResult] =
    useState(true);
  const [historyPhotoDate, setHistoryPhotoDate] = useState(new Date());
  const [historyRecordTab, setHistoryRecordTab] =
    useState<HistoryRecordTab>("photo");
  const [monthlyReportMonth, setMonthlyReportMonth] = useState(new Date());
  const [historyTestResult, setHistoryTestResult] =
    useState<HistoryTestResultDetail | null>(null);
  const [mypageView, setMypageView] = useState<MyPageView>("main");
  const [mypageProfile, setMypageProfile] = useState<MyPageProfileSnapshot | null>(null);
  const [recipeNavVisible, setRecipeNavVisible] = useState(true);
  const [goToQuizOnHome, setGoToQuizOnHome] = useState(false);
  const [isTestResultOpen, setIsTestResultOpen] = useState(false);
  // 앱이 백그라운드로 갔다가 돌아오거나(탭이 메모리 부족으로 재로드) 새로고침돼도 진행 중이던
  // 재테스트를 이어할 수 있도록, 시작할 때 sessionStorage에 저장된 진행 상황이 있으면 그대로 복원합니다.
  // 탭을 완전히 닫으면 sessionStorage가 비워지므로 그땐 자연스럽게 시작 화면(도감/결과 화면)이 보입니다.
  const [initialRetestProgress] = useState(() =>
    loadQuizProgress(RETEST_PROGRESS_KEY),
  );
  const [isRetestOpen, setIsRetestOpen] = useState(
    () => initialRetestProgress !== null,
  );
  const [retestStep, setRetestStep] = useState(
    () => initialRetestProgress?.step ?? 0,
  );
  const [retestAnswers, setRetestAnswers] = useState<Record<number, string>>(
    () => initialRetestProgress?.answers ?? {},
  );
  const [retestQuestions, setRetestQuestions] = useState<QuizQuestion[]>(
    () => initialRetestProgress?.questions ?? buildQuizQuestions(),
  );
  const [quizResult, setQuizResult] = useState<MoodTestResult | null>(null);
  const [oauthCallback, setOauthCallback] = useState(() =>
    parseOauthCallback(),
  );
  // 공유 링크(카카오톡 미리보기 등)로 들어온 경우 로그인 여부와 무관하게 바로 공유 콘텐츠를 보여줍니다.
  const [sharedRoute, setSharedRoute] = useState(() => parseSharedRoute());
  const exitSharedRoute = () => {
    window.history.replaceState({}, "", "/");
    setSharedRoute(null);
  };

  useEffect(() => {
    if (!isRetestOpen) return;
    saveQuizProgress(RETEST_PROGRESS_KEY, {
      step: retestStep,
      answers: retestAnswers,
      questions: retestQuestions,
    });
  }, [isRetestOpen, retestStep, retestAnswers, retestQuestions]);

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
    clearQuizProgress(RETEST_PROGRESS_KEY);
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
            onNavVisibilityChange={setMainNavVisible}
            onGoToLogin={handleGoToLoginScreen}
          />
        );
      case "recipe":
        return (
          <RecipePage
            onNavVisibilityChange={setRecipeNavVisible}
            isLoggedIn={!isGuest}
            onGoToLogin={handleGoToLoginScreen}
          />
        );
      case "mypage":
        return (
          <MyPage
            isLoggedIn={!isGuest}
            onEditProfile={(snapshot) => {
              setMypageProfile(snapshot);
              setMypageView("profile-edit");
            }}
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

  if (sharedRoute) {
    return (
      <div className="app-shell">
        <main className="app">
          <section className="app-content app-content--full">
            {sharedRoute.type === "result" ? (
              <SharedResultPage
                shareToken={sharedRoute.shareToken}
                onGoHome={exitSharedRoute}
              />
            ) : (
              <SharedCollectionPage
                shareToken={sharedRoute.shareToken}
                onGoHome={exitSharedRoute}
              />
            )}
          </section>
        </main>
      </div>
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
          onOpenFullResult={(result) => {
            setHistoryTestResult(result);
            setHistoryView("test-result");
          }}
          onStartTest={startTestFromHistory}
        />
      ),
      "test-result": historyTestResult ? (
        <TestResultPage
          result={historyTestResult}
          onBack={() => setHistoryView("photo")}
        />
      ) : null,
      "monthly-report": (
        <MonthlyReportPage
          reportMonth={monthlyReportMonth}
          onBack={() => setHistoryView("calendar")}
        />
      ),
    }[historyView];

    return (
      <div className="app-shell">
        <main className="app app--history-responsive">
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
                      if (Number.isNaN(questionId) || Number.isNaN(optionId))
                        return null;
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
      "profile-edit": (
        <ProfileEdit
          initialProfileSnapshot={mypageProfile}
          onBack={() => setMypageView("main")}
        />
      ),
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
      <main
        className={`app${activeMenu === "history" ? " app--history-responsive" : ""}`}
      >
        {activeMenu === "recipe" && <DexBackground />}
        <section className="app-content">{renderPage()}</section>

        {(activeMenu !== "recipe" || recipeNavVisible) &&
          (activeMenu !== "home" || mainNavVisible) && (
            <BottomNav activeMenu={activeMenu} onChangeMenu={setActiveMenu} />
          )}
      </main>
    </div>
  );
}

export default App;
