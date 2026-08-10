import { useEffect, useRef, useState, type FC } from "react";
import "../../styles/MainPage.css";
import Button from "../../components/Button/Button";
import BackgroundBlur from "../../components/common/BackgroundBlur";
import TrendPage from "../TrendPage/TrendPage";
import ShareModal from "../../components/Modal/ShareModal";
import TogetherPickPage from "../TogetherPickPage/TogetherPickPage";
import CustomRecommend from "../CustomRecommend/CustomRecommend";
import CustomRecommendResultPage from "../CustomRecommendResultPage/CustomRecommendResultPage";
import QuizQuestionPage from "../QuizQuestionPage";
import LoadingPage from "../LoadingPage";
import RecipePage from "../RecipePage/RecipePage";
import {
  buildQuizQuestions,
  toQuizQuestions,
  type QuizQuestion,
} from "../../data/quiz";
import {
  getMoodTestQuestions,
  postMoodTestResult,
} from "../../api/mood-tests/moodTests.api";
import type {
  MoodTestAnswer,
  MoodTestResult,
} from "../../api/mood-tests/moodTests.types";
import { getTodayCocktail } from "../../api/cocktails/cocktails.api";
import type {
  TodayCocktailResult,
  CustomCocktailResult,
} from "../../api/cocktails/cocktails.types";
import {
  clearQuizProgress,
  loadQuizProgress,
  saveQuizProgress,
} from "../../utils/quizProgress";

const MAIN_QUIZ_PROGRESS_KEY = "moodtail-main-quiz-progress";

interface MenuItem {
  label: string;
  onClick?: () => void;
}

interface TasteValues {
  strength: number;
  sweetness: number;
  acidity: number;
  bitterness: number;
  refreshing: number;
}

type ViewState =
  | "home"
  | "trend"
  | "together"
  | "custom"
  | "customResult"
  | "quiz"
  | "quizLoading"
  | "recipe";

interface MainPageProps {
  onQuizComplete?: (result: MoodTestResult | null) => void;
  initialView?: "quiz";
  onInitialViewConsumed?: () => void;
  onNavVisibilityChange?: (visible: boolean) => void;
  onGoToLogin?: () => void;
}

const MainPage: FC<MainPageProps> = ({
  onQuizComplete,
  initialView,
  onInitialViewConsumed,
  onNavVisibilityChange,
  onGoToLogin,
}) => {
  const [initialQuizProgress] = useState(() =>
    loadQuizProgress(MAIN_QUIZ_PROGRESS_KEY),
  );
  const [view, setView] = useState<ViewState>(
    initialView === "quiz" || initialQuizProgress ? "quiz" : "home",
  );
  const [isShareOpen, setIsShareOpen] = useState(false); // TODO: 확인용 임시 코드, 삭제 예정
  const [myTasteValues, setMyTasteValues] = useState<TasteValues | null>(null);
  const [customResult, setCustomResult] = useState<CustomCocktailResult | null>(
    null,
  );

  const [quizStep, setQuizStep] = useState(
    () => initialQuizProgress?.step ?? 0,
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>(
    () => initialQuizProgress?.answers ?? {},
  );
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(
    () => initialQuizProgress?.questions ?? buildQuizQuestions(),
  );
  const [quizResult, setQuizResult] = useState<MoodTestResult | null>(null);

  const [todayCocktail, setTodayCocktail] =
    useState<TodayCocktailResult | null>(null);

  useEffect(() => {
    if (initialView === "quiz") onInitialViewConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skipNextFetchRef = useRef(initialQuizProgress !== null);
  useEffect(() => {
    if (view !== "quiz") return;
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }
    let cancelled = false;
    getMoodTestQuestions()
      .then(({ questions }) => {
        if (!cancelled) setQuizQuestions(toQuizQuestions(questions));
      })
      .catch((err) => console.error("테스트 질문을 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, [view]);

  useEffect(() => {
    if (view !== "quiz") return;
    saveQuizProgress(MAIN_QUIZ_PROGRESS_KEY, {
      step: quizStep,
      answers: quizAnswers,
      questions: quizQuestions,
    });
  }, [view, quizStep, quizAnswers, quizQuestions]);

  useEffect(() => {
    const fetchTodayCocktail = async () => {
      try {
        const result = await getTodayCocktail();
        setTodayCocktail(result);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchTodayCocktail();
  }, []);

  useEffect(() => {
    onNavVisibilityChange?.(view !== "together");
  }, [view, onNavVisibilityChange]);

  const exitQuiz = () => {
    setView("home");
    setQuizStep(0);
    setQuizAnswers({});
    clearQuizProgress(MAIN_QUIZ_PROGRESS_KEY);
  };

  const startQuiz = () => {
    setQuizQuestions(buildQuizQuestions());
    setQuizStep(0);
    setQuizAnswers({});
    setView("quiz");
  };

  const menuItems: MenuItem[] = [
    { label: "트렌드집계", onClick: () => setView("trend") },
    { label: "같이 고르기", onClick: () => setView("together") },
    { label: "커스텀 추천", onClick: () => setView("custom") },
  ];

  if (view === "quiz") {
    const question = quizQuestions[quizStep];
    const isLastStep = quizStep === quizQuestions.length - 1;
    return (
      <QuizQuestionPage
        step={quizStep}
        totalSteps={quizQuestions.length}
        question={question}
        selectedOptionId={quizAnswers[quizStep] ?? null}
        onSelectOption={(id) =>
          setQuizAnswers((prev) => ({ ...prev, [quizStep]: id }))
        }
        onPrevious={quizStep > 0 ? () => setQuizStep((s) => s - 1) : undefined}
        onNext={() => {
          if (isLastStep) {
            // 로컬 목데이터로 폴백된 상태라면 questionId/optionId가 실제 숫자 id가 아니라서 제출을 건너뜁니다.
            const answers = quizQuestions
              .map((q, i) => {
                const questionId = Number(q.id);
                const optionId = Number(quizAnswers[i]);
                if (Number.isNaN(questionId) || Number.isNaN(optionId))
                  return null;
                return { questionId, optionId };
              })
              .filter((a): a is MoodTestAnswer => a !== null);

            if (answers.length === quizQuestions.length) {
              postMoodTestResult(answers)
                .then(setQuizResult)
                .catch((err) => {
                  console.error("테스트 결과 제출에 실패했습니다", err);
                  setQuizResult(null);
                });
            } else {
              setQuizResult(null);
            }

            setView("quizLoading");
            clearQuizProgress(MAIN_QUIZ_PROGRESS_KEY);
          } else {
            setQuizStep((s) => s + 1);
          }
        }}
        onExit={exitQuiz}
      />
    );
  }

  if (view === "quizLoading") {
    return (
      <LoadingPage
        onComplete={() => {
          exitQuiz();
          onQuizComplete?.(quizResult);
        }}
      />
    );
  }

  if (view === "trend") {
    return <TrendPage onBack={() => setView("home")} />;
  }

  if (view === "together") {
    return (
      <TogetherPickPage onBack={() => setView("home")} onLogin={onGoToLogin} />
    );
  }

  if (view === "custom") {
    return (
      <CustomRecommend
        onBack={() => setView("home")}
        onViewResult={(values, result) => {
          setMyTasteValues(values);
          setCustomResult(result);
          setView("customResult");
        }}
      />
    );
  }

  if (view === "customResult" && myTasteValues && customResult) {
    return (
      <CustomRecommendResultPage
        onBack={() => setView("custom")}
        onRetry={() => setView("custom")}
        cocktailName={customResult.name}
        description={customResult.description}
        matchPercent={customResult.matchRate}
        imageUrl={customResult.imageUrl}
        myValues={myTasteValues}
        cocktailValues={{
          strength: customResult.cocktailFigures.alcoholIntensity,
          sweetness: customResult.cocktailFigures.sweetness,
          acidity: customResult.cocktailFigures.sourness,
          bitterness: customResult.cocktailFigures.bitterness,
          refreshing: customResult.cocktailFigures.refreshing,
        }}
      />
    );
  }

  if (view === "recipe") {
    const isLoggedIn = localStorage.getItem("isGuest") !== "true";
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <button
          type="button"
          onClick={() => setView("home")}
          aria-label="뒤로가기"
          style={{
            position: "absolute",
            left: 10,
            top: 16,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <RecipePage
          onNavVisibilityChange={onNavVisibilityChange}
          isLoggedIn={isLoggedIn}
          onGoToLogin={onGoToLogin ?? (() => {})}
        />
      </div>
    );
  }

  return (
    <div className="main-page">
      {/* 배경 블러 */}
      <BackgroundBlur
        idPrefix="main-bg"
        width={393}
        height={797}
        top={51}
        circles={[
          { cx: 20, cy: 159, r: 159, color: "#FEF6D9", opacity: 0.68 },
          { cx: 334, cy: 367, r: 159, color: "#FF6F4F", opacity: 0.37 },
          { cx: 38, cy: 895, r: 199, color: "#FF6F4F", opacity: 0.56 },
          { cx: 219, cy: 956, r: 199, color: "#FEECAD", opacity: 0.56 },
        ]}
      />

      {/* 브랜드 타이틀 */}
      <p className="main-page__brand">MoodTail</p>

      {/* 무드 테스트 배너 */}
      <div className="main-page__banner">
        <p className="main-page__banner-title">
          안녕하세요!
          <br />
          오늘의 감정은 무슨 맛인지 알아볼까요?
        </p>
        <p className="main-page__banner-subtitle">
          나에게 딱 맞는 칵테일을 찾아드릴게요
        </p>
        <Button
          variant="light"
          className="main-page__banner-button"
          onClick={startQuiz}
        >
          무드 테스트 시작하기 →
        </Button>
      </div>

      {/* 오늘의 추천 칵테일 */}
      <h2 className="main-page__section-title">오늘의 추천 칵테일</h2>

      <div className="main-page__below-title">
        <button
          type="button"
          className="main-page__cocktail-card"
          onClick={() => setView("recipe")}
        >
          <div className="main-page__cocktail-info">
            <p className="main-page__cocktail-name">
              {todayCocktail?.cocktail.nameKo ?? "불러오는 중..."}
            </p>
            <p className="main-page__cocktail-desc">
              {todayCocktail?.cocktail.shortDescription}
            </p>
          </div>
        </button>

        {/* 메뉴 리스트 */}
        <ul className="main-page__menu-list">
          {menuItems.map((item) => (
            <li key={item.label} className="main-page__menu-item">
              <button
                type="button"
                className="main-page__menu-item-button"
                onClick={item.onClick}
              >
                <span className="main-page__menu-item-label">{item.label}</span>
                <span className="main-page__menu-item-arrow" aria-hidden="true">
                  <span className="main-page__menu-item-arrow-icon">↗</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isShareOpen && (
        <ShareModal
          onClose={() => setIsShareOpen(false)}
          shareUrl="https://moodtail.app/share/example"
          onKakaoShare={() => console.log("카카오톡 공유")}
        />
      )}
    </div>
  );
};

export default MainPage;
