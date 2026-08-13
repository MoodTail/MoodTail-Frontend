import { useEffect, useState } from "react";
import BottomNav from "./components/common/BottomNav";
import TwoButtonModal from "./components/common/modal/TwoButtonModal";
import DexBackground from "./components/DexBackground";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import HistoryPhotoPage from "./pages/HistoryPage/HistoryPhotoPage";
import type { HistoryRecordTab } from "./pages/HistoryPage/HistoryPhotoPage";
import MonthlyReportPage from "./pages/HistoryPage/MonthlyReportPage";
import TestResultPage from "./pages/HistoryPage/TestResultPage";
import CharacterPage, { prefetchCharacterDex } from "./pages/CharacterPage/CharacterPage";
import MainPage from "./pages/MainPage/MainPage";
import RecipePage, { prefetchRecipes, prefetchSavedRecipes } from "./pages/RecipePage/RecipePage";
import MyPage, { type MyPageProfileSnapshot } from "./pages/MyPage/MyPage";
import ProfileEdit from "./pages/MyPage/ProfileEdit";
import Inquiry from "./pages/MyPage/Inquiry";
import Terms from "./pages/MyPage/Terms";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import QuizQuestionPage from "./pages/QuizQuestionPage";
import {
  buildQuizQuestions,
  fetchAndCacheQuizQuestions,
  getCachedQuizQuestions,
  prefetchQuizQuestions,
  type QuizQuestion,
} from "./data/quiz";
import { postMoodTestResult } from "./api/mood-tests/moodTests.api";
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
import { resetHistoryEntryNotice } from "./utils/historyNotice";
import SharedPairResultPage from "./pages/SharedPairResultPage/SharedPairResultPage";

const RETEST_PROGRESS_KEY = "moodtail-retest-progress";
const LOCAL_AUTH_PREVIEW_KEY = "moodtail-local-auth-preview";

export type NavKey = "history" | "dictionary" | "home" | "recipe" | "mypage";
type HistoryView = "calendar" | "photo" | "test-result" | "monthly-report";
type MyPageView = "main" | "profile-edit" | "inquiry" | "terms";

function App() {
  const isLocalAuthPreview =
    import.meta.env.DEV &&
    localStorage.getItem(LOCAL_AUTH_PREVIEW_KEY) === "true";
  const [mainNavVisible, setMainNavVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => isLocalAuthPreview || !!localStorage.getItem("accessToken"),
  );
  const [isGuest, setIsGuest] = useState(
    () => !isLocalAuthPreview && localStorage.getItem("isGuest") === "true",
  );
  const [activeMenu, setActiveMenu] = useState<NavKey>("home");
  const [loginRequiredMenu, setLoginRequiredMenu] = useState<"history" | "dictionary" | null>(null);
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
  const [mypageProfile, setMypageProfile] =
    useState<MyPageProfileSnapshot | null>(null);
  const [recipeNavVisible, setRecipeNavVisible] = useState(true);
  const [characterNavVisible, setCharacterNavVisible] = useState(true);
  // 캐릭터 상세의 "해당 타입 칵테일 8종" 박스를 누르면 레시피 탭으로 이동해 해당
  // 칵테일의 상세 화면을 바로 엽니다. 이름으로만 연결되므로(별도 id 매핑이 없음)
  // 레시피 쪽 로컬 데이터와 이름이 일치하는 칵테일이 없으면 목록 화면이 그대로 보입니다.
  const [pendingCocktailName, setPendingCocktailName] = useState<string | null>(null);
  const [goToQuizOnHome, setGoToQuizOnHome] = useState(false);
  const [isTestResultOpen, setIsTestResultOpen] = useState(false);
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

  // 로그인 직후 캐릭터 도감/레시피 탭의 데이터를 미리 받아와 각 페이지 컴포넌트의 모듈
  // 캐시를 채워둡니다 — 사용자가 실제로 그 탭을 눌렀을 때 로딩 없이 바로 보여주기 위함입니다.
  // 초기 렌더를 막지 않도록 약간 지연시키고, 게스트는 도감 API 호출 권한이 없어 레시피만
  // 미리 받습니다.
  useEffect(() => {
    if (!isLoggedIn) return;
    const timer = window.setTimeout(() => {
      prefetchRecipes();
      prefetchQuizQuestions();
      if (!isGuest) {
        prefetchCharacterDex();
        prefetchSavedRecipes();
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [isLoggedIn, isGuest]);

  const startRetest = () => {
    setIsTestResultOpen(false);
    setRetestStep(0);
    setRetestAnswers({});
    setRetestQuestions(getCachedQuizQuestions() ?? buildQuizQuestions());
    setIsRetestOpen(true);
    fetchAndCacheQuizQuestions().then((questions) => {
      if (questions) setRetestQuestions(questions);
    });
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
    resetHistoryEntryNotice();
    localStorage.removeItem(LOCAL_AUTH_PREVIEW_KEY);
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
            isLoggedIn={!isGuest}
            onGoToLogin={handleGoToLoginScreen}
          />
        );
      case "dictionary":
        return (
          <CharacterPage
            onGoTest={handleGoToTest}
            onNavVisibilityChange={setCharacterNavVisible}
            onOpenCocktail={(name) => {
              setPendingCocktailName(name);
              setActiveMenu("recipe");
            }}
            isLoggedIn={!isGuest}
            onGoToLogin={handleGoToLoginScreen}
          />
        );
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
            initialDetailName={pendingCocktailName}
            onInitialDetailConsumed={() => setPendingCocktailName(null)}
            onExitToOrigin={() => setActiveMenu("dictionary")}
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
          resetHistoryEntryNotice();
          setOauthCallback(null);
          localStorage.removeItem("isGuest");
          setIsGuest(false);
          setIsLoggedIn(true);
        }}
        onLoginFailed={() => {
          window.history.replaceState({}, "", "/");
          setOauthCallback(null);
        }}
      />
    );
  }

  if (sharedRoute) {
    return (
      <div className="app-shell">
        <main className="app">
          <section className="app-content app-content--full">
            {sharedRoute.type === "result" && (
              <SharedResultPage
                shareToken={sharedRoute.shareToken}
                onGoHome={exitSharedRoute}
              />
            )}
            {sharedRoute.type === "collection" && (
              <SharedCollectionPage
                shareToken={sharedRoute.shareToken}
                onGoHome={exitSharedRoute}
              />
            )}
            {sharedRoute.type === "pair" && (
              <SharedPairResultPage
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
          resetHistoryEntryNotice();
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

  const handleNavChange = (menu: NavKey) => {
    if (isGuest && (menu === "history" || menu === "dictionary")) {
      setLoginRequiredMenu(menu);
      return;
    }
    setActiveMenu(menu);
  };

  return (
    <div className="app-shell">
      <main
        className={`app${activeMenu === "history" ? " app--history-responsive" : ""}`}
      >
        {activeMenu === "recipe" && <DexBackground />}
        {(() => {
          const navVisible =
            (activeMenu !== "recipe" || recipeNavVisible) &&
            (activeMenu !== "home" || mainNavVisible) &&
            (activeMenu !== "dictionary" || characterNavVisible);
          return (
            <>
              <section className={`app-content${navVisible ? "" : " app-content--no-nav"}`}>
                {renderPage()}
              </section>
              {navVisible && <BottomNav activeMenu={activeMenu} onChangeMenu={handleNavChange} />}
              {loginRequiredMenu && (
                <TwoButtonModal
                  isOpen
                  title={loginRequiredMenu === "history" ? "로그인이 필요해요" : "로그인하고 도감을 확인해요"}
                  description={
                    loginRequiredMenu === "history"
                      ? "히스토리는 로그인 후 이용할 수 있어요.\n로그인 화면으로 이동할까요?"
                      : "테스트 결과, 도감, 즐겨찾기를 이어서 사용할 수 있어요."
                  }
                  leftButton={{
                    label: "로그인하기",
                    variant: "primary",
                    onClick: () => {
                      setLoginRequiredMenu(null);
                      handleGoToLoginScreen();
                    },
                  }}
                  rightButton={{
                    label: "닫기",
                    variant: "secondary",
                    onClick: () => setLoginRequiredMenu(null),
                  }}
                  onOverlayClick={() => setLoginRequiredMenu(null)}
                />
              )}
            </>
          );
        })()}
      </main>

    </div>
  );
}

export default App;
