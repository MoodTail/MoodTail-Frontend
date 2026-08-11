import { useEffect, useState } from "react";
import ResultPage from "../ResultPage/ResultPage";
import { getSharedMoodTestResult } from "../../api/mood-tests/moodTests.api";
import type { MoodTestResult } from "../../api/mood-tests/moodTests.types";
import { COLORS } from "../../theme/colors";

export default function SharedResultPage({
  shareToken,
  onGoHome,
}: {
  shareToken: string;
  onGoHome: () => void;
}) {
  const [result, setResult] = useState<MoodTestResult | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    getSharedMoodTestResult(shareToken)
      .then((data) => {
        if (cancelled) return;
        setResult(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("공유된 테스트 결과를 불러오지 못했습니다", err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [shareToken]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: COLORS.inkSoft,
        }}
      >
        불러오는 중...
      </div>
    );
  }

  if (status === "error" || !result) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 12,
          padding: 24,
          textAlign: "center",
        }}
      >
        <p style={{ color: COLORS.inkSoft, fontSize: 14 }}>
          공유된 결과를 찾을 수 없어요.
          <br />
          링크가 만료되었거나 잘못된 링크일 수 있어요.
        </p>
        <button
          type="button"
          onClick={onGoHome}
          style={{
            border: "none",
            background: COLORS.orange,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            padding: "12px 20px",
            borderRadius: 22,
            cursor: "pointer",
          }}
        >
          MoodTail 시작하기
        </button>
      </div>
    );
  }

  return (
    <ResultPage
      isLoggedIn={false}
      result={result}
      onBack={onGoHome}
      onRetest={onGoHome}
      onGoToLogin={onGoHome}
    />
  );
}
