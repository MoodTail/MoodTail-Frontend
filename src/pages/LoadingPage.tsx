import { useEffect, useRef } from "react";
import { COLORS } from "../theme/colors";
import PhoneFrame from "../components/PhoneFrame";
import TypeDetailBackground from "../components/TypeDetailBackground";
import ellipseGlow from "../assets/images/ellipse/Ellipse.png";

const LOADING_DURATION_MS = 5000;

export default function LoadingPage({ onComplete }: { onComplete: () => void }) {
  // onComplete가 렌더마다 새로 생성되는 클로저(예: 최신 API 응답을 캡처한 콜백)일 수 있으므로,
  // ref로 항상 최신 함수를 참조하게 해서 5초 타이머가 마운트 시점의 오래된 값을 부르지 않게 합니다.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timer = setTimeout(() => onCompleteRef.current(), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PhoneFrame background={<TypeDetailBackground />}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 20px 0",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 450,
            marginTop: -40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 가장 바깥 (첨부 이미지) */}
          <img
            src={ellipseGlow}
            alt=""
            style={{
              position: "absolute",
              zIndex: 1,
              width: 480,
              height: 532,
              objectFit: "contain",
              animation: "breathe-0 3s ease-in-out infinite",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          {/* 가장 큰 원 */}
          <div
            style={{
              position: "absolute",
              width: 436,
              height: 436,
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, #FFF0E9 0%, rgba(255, 255, 255, 0) 100%)",
              animation: "breathe-1 3s ease-in-out infinite",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          {/* 두번째 원 */}
          <div
            style={{
              position: "absolute",
              width: 333,
              height: 333,
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, #FFE8DC 0%, rgba(255, 255, 255, 0) 100%)",
              animation: "breathe-2 3s ease-in-out infinite",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          {/* 가장 작은 원 */}
          <div
            style={{
              position: "absolute",
              width: 209,
              height: 209,
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, #FFD3BF 0%, rgba(255, 255, 255, 0) 100%)",
              animation: "breathe-3 3s ease-in-out infinite",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          <style>{`
            @keyframes breathe-0 {
              0%, 100% { transform: scale(0.88); opacity: 0.8; }
              50% { transform: scale(1.16); opacity: 1; }
            }
            @keyframes breathe-1 {
              0%, 100% { transform: scale(0.85); opacity: 0.8; }
              50% { transform: scale(1.2); opacity: 1; }
            }
            @keyframes breathe-2 {
              0%, 100% { transform: scale(0.82); opacity: 0.8; }
              50% { transform: scale(1.26); opacity: 1; }
            }
            @keyframes breathe-3 {
              0%, 100% { transform: scale(0.78); opacity: 0.8; }
              50% { transform: scale(1.32); opacity: 1; }
            }
          `}</style>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

        <p
          style={{
            fontSize: 23,
            fontWeight: 700,
            color: COLORS.ink,
            margin: "-40px 0 0",
            textAlign: "center",
          }}
        >
          취향을 분석 중이에요...
        </p>
        <p
          style={{
            fontSize: 14,
            color: COLORS.inkSoft,
            margin: "8px 0 0",
            textAlign: "center",
          }}
        >
          96가지 칵테일과 나의 취향을 비교하고 있어요
        </p>
      </div>
    </PhoneFrame>
  );
}