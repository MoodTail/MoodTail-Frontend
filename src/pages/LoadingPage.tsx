import { useEffect } from "react";
import { COLORS } from "../theme/colors";
import PhoneFrame from "../components/PhoneFrame";
import TypeDetailBackground from "../components/TypeDetailBackground";

const LOADING_DURATION_MS = 5000;

export default function LoadingPage({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, LOADING_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PhoneFrame background={<TypeDetailBackground />}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
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
          {/* 가장 큰 원 */}
          <div
            style={{
              position: "absolute",
              width: 436,
              height: 436,
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, #FFF0E9 0%, #FFF0E9 92%, rgba(255,255,255,0) 100%)",
              animation: "breathe-1 3s ease-in-out infinite",
            }}
          />

          {/* 두번째 원 */}
          <div
            style={{
              position: "absolute",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, #FFE8DC 0%, #FFE8DC 92%, rgba(255,255,255,0) 100%)",
              animation: "breathe-2 3s ease-in-out infinite",
            }}
          />

          {/* 가장 작은 원 */}
          <div
            style={{
              position: "absolute",
              width: 264,
              height: 254,
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, #FFD3BF 0%, #FFD3BF 92%, rgba(255,255,255,0) 100%)",
              animation: "breathe-3 3s ease-in-out infinite",
            }}
          />

          <style>{`
            @keyframes breathe-1 {
              0%, 100% { transform: scale(0.96); opacity: 0.9; }
              50% { transform: scale(1.06); opacity: 1; }
            }
            @keyframes breathe-2 {
              0%, 100% { transform: scale(0.95); opacity: 0.9; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes breathe-3 {
              0%, 100% { transform: scale(0.94); opacity: 0.9; }
              50% { transform: scale(1.1); opacity: 1; }
            }
          `}</style>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        <p
          style={{
            fontSize: 21,
            fontWeight: 800,
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
