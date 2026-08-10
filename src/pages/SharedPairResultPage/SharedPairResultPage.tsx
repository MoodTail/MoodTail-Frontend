import { useEffect, useState } from "react";
import { getSharedPairRecommendation } from "../../api/cocktails/cocktails.api";
import type { SharedPairRecommendation } from "../../api/cocktails/cocktails.types";
import { COLORS } from "../../theme/colors";

const RANKING_COLORS = ["#FF613D", "#34DBCE", "#1564FE", "#FFC107"];

export default function SharedPairResultPage({
  shareToken,
  onGoHome,
}: {
  shareToken: string;
  onGoHome: () => void;
}) {
  const [result, setResult] = useState<SharedPairRecommendation | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    getSharedPairRecommendation(shareToken)
      .then((data) => {
        if (cancelled) return;
        setResult(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("공유된 페어 추천 결과를 불러오지 못했습니다", err);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        overflowY: "auto",
        padding: "24px 20px 40px",
        gap: 20,
      }}
    >
      {result.thumbnailImageUrl && (
        <img
          src={result.thumbnailImageUrl}
          alt="같이 고르기 결과"
          style={{
            width: "100%",
            maxWidth: 360,
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        />
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <span
          style={{
            background: "#FFF1EC",
            color: COLORS.orange,
            fontSize: 13,
            fontWeight: 700,
            padding: "6px 12px",
            borderRadius: 14,
          }}
        >
          나와의 일치율 {result.myMatchScore}%
        </span>
        <span
          style={{
            background: "#EEF6FF",
            color: "#1564FE",
            fontSize: 13,
            fontWeight: 700,
            padding: "6px 12px",
            borderRadius: 14,
          }}
        >
          친구와의 일치율 {result.partnerMatchScore}%
        </span>
      </div>

      <div style={{ width: "100%", maxWidth: 360 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: COLORS.ink,
            margin: "0 0 12px",
          }}
        >
          추천 순위
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {result.recommendations.map((item) => (
            <div
              key={item.ranking}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#F7F7FA",
                borderRadius: 12,
                padding: "10px 14px",
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background:
                    RANKING_COLORS[(item.ranking - 1) % RANKING_COLORS.length],
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.ranking}
              </span>
              <p
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.ink,
                  margin: 0,
                }}
              >
                {item.nameKo}
              </p>
              <span
                style={{ fontSize: 13, fontWeight: 700, color: COLORS.inkSoft }}
              >
                {item.matchScore}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onGoHome}
        style={{
          border: "none",
          background: COLORS.orange,
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          padding: "14px 28px",
          borderRadius: 24,
          cursor: "pointer",
          marginTop: 8,
        }}
      >
        나도 MoodTail 시작하기
      </button>
    </div>
  );
}
