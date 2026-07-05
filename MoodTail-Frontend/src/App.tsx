import { useState } from "react";
import { QUIZ_QUESTIONS } from "./data/quiz";
import QuizQuestionPage from "./pages/QuizQuestionPage";

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = QUIZ_QUESTIONS[step];

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
      <div style={{ width: "100%", maxWidth: 390 }}>
        <QuizQuestionPage
          step={step}
          totalSteps={QUIZ_QUESTIONS.length}
          question={question}
          selectedOptionId={answers[step] ?? null}
          onSelectOption={(id) => setAnswers((prev) => ({ ...prev, [step]: id }))}
          onPrevious={step > 0 ? () => setStep((s) => s - 1) : undefined}
          onNext={() => setStep((s) => Math.min(s + 1, QUIZ_QUESTIONS.length - 1))}
          onExit={() => window.history.back()}
        />
      </div>
    </div>
  );
}

export default App;
