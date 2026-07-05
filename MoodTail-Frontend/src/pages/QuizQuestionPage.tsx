import { COLORS } from "../theme/colors";
import type { QuizQuestion } from "../data/quiz";
import PhoneFrame from "../components/PhoneFrame";
import { ChevronLeft } from "../components/icons";

export default function QuizQuestionPage({
  step,
  totalSteps,
  question,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrevious,
  onExit,
}: {
  step: number;
  totalSteps: number;
  question: QuizQuestion;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  onExit: () => void;
}) {
  const progress = (step + 1) / totalSteps;

  return (
    <PhoneFrame>
      <div style={{ padding: "18px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button
            onClick={onExit}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}
          >
            <ChevronLeft />
          </button>
          <div
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              background: COLORS.progressTrack,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: "100%",
                background: COLORS.orange,
                borderRadius: 3,
              }}
            />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.inkSoft, whiteSpace: "nowrap" }}>
            {step + 1}/{totalSteps}
          </span>
        </div>

        <h1 style={{ fontSize: 18, fontWeight: 800, color: COLORS.ink, margin: "0 0 6px" }}>
          {question.title}
        </h1>
        <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "0 0 20px" }}>{question.subtitle}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((option) => {
            const selected = option.id === selectedOptionId;
            return (
              <button
                key={option.id}
                onClick={() => onSelectOption(option.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: `1.5px solid ${selected ? COLORS.orange : COLORS.border}`,
                  background: selected ? COLORS.orangeSoft : COLORS.card,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: `2px solid ${selected ? COLORS.orange : COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selected && (
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: COLORS.orange,
                      }}
                    />
                  )}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: COLORS.ink }}>{option.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", gap: 8 }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                flex: "0 0 38%",
                border: `1.5px solid ${COLORS.border}`,
                background: COLORS.card,
                color: COLORS.ink,
                fontSize: 14,
                fontWeight: 700,
                padding: "14px 0",
                borderRadius: 16,
                cursor: "pointer",
              }}
            >
              뒤로가기
            </button>
          )}
          <button
            onClick={onNext}
            disabled={!selectedOptionId}
            style={{
              flex: 1,
              border: "none",
              background: selectedOptionId ? COLORS.orange : COLORS.progressTrack,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "14px 0",
              borderRadius: 16,
              cursor: selectedOptionId ? "pointer" : "not-allowed",
            }}
          >
            다음
          </button>
        </div>
        <p style={{ fontSize: 10.5, color: COLORS.inkSoft, textAlign: "center", margin: "8px 0 0" }}>
          선택 시 해당 답변이 5가지 유형 지표에 반영됩니다
        </p>
      </div>
    </PhoneFrame>
  );
}
