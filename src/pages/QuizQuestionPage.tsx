import { useState } from "react";
import { COLORS } from "../theme/colors";
import type { QuizQuestion } from "../data/quiz";
import TwoButtonModal from "../components/common/modal/TwoButtonModal";
import PhoneFrame from "../components/PhoneFrame";
import TypeDetailBackground from "../components/TypeDetailBackground";
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
  const [pendingLeave, setPendingLeave] = useState<"exit" | "back" | null>(null);

  return (
    <PhoneFrame background={<TypeDetailBackground />}>
      <div style={{ padding: "18px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => setPendingLeave("exit")}
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

        <h1 style={{ fontSize: 25, fontWeight: 700, color: COLORS.ink, margin: "0 0 6px" }}>
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
                  background: selected ? COLORS.orangeSoft : '#FFFFFF',
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
              onClick={() => setPendingLeave("back")}
              style={{
                flex: 1,
                border: `1.5px solid ${COLORS.border}`,
                background: COLORS.card,
                color: '#FF8165',
                fontSize: 14,
                fontWeight: 700,
                padding: "14px 0",
                borderRadius: 22,
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(255, 129, 101, 0.05)",
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
              background: selectedOptionId ? COLORS.orange : COLORS.disabled,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "14px 0",
              borderRadius: 22,
              cursor: selectedOptionId ? "pointer" : "not-allowed",
              boxShadow: selectedOptionId ? "0 8px 18px rgba(255, 129, 101, 0.35)" : "none",
            }}
          >
            다음
          </button>
        </div>
        <p style={{ fontSize: 10.5, color: COLORS.inkSoft, textAlign: "center", margin: "8px 0 0" }}>
          선택시 해당 답변이 5가지 맛 지표에 반영됩니다
        </p>
      </div>

      {pendingLeave && (
        <TwoButtonModal
          isOpen
          title="뒤로가시겠어요?"
          description="뒤로가시면 진행사항은 저장이 불가합니다"
          leftButton={{
            label: "계속 진행하기",
            onClick: () => setPendingLeave(null),
            variant: "primary",
          }}
          rightButton={{
            label: "나가기",
            onClick: () => {
              setPendingLeave(null);
              if (pendingLeave === "exit") onExit();
              else onPrevious?.();
            },
            variant: "secondary",
          }}
          onOverlayClick={() => setPendingLeave(null)}
        />
      )}
    </PhoneFrame>
  );
}
