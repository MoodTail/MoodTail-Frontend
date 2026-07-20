import { useEffect, useState } from "react";
import type { FC } from "react";
import OnboardingImageGroup from "../../components/onboarding/OnboardingImageGroup";
import image8 from "../../assets/images/cocktails/image 8.png";
import image4 from "../../assets/images/cocktails/image 4.png";
import image10 from "../../assets/images/cocktails/image 10.png";
import image6 from "../../assets/images/cocktails/image 6.png";
import image3 from "../../assets/images/cocktails/image 3.png";
import "../../styles/PostLoginScreen.css";

interface PostLoginScreenProps {
  onComplete: () => void;
}

type Phase = "loading" | "blend" | "welcome";

const glassImages = [
  {
    src: image8,
    width: 157,
    height: 204,
    left: 37,
    top: 229,
    motion: "landing" as const,
    durationSeconds: 2.5,
    delaySeconds: 0,
  },
  {
    src: image4,
    width: 105,
    height: 132,
    left: 122,
    top: 324,
    motion: "bounce" as const,
    durationSeconds: 1.6,
    delaySeconds: 0.2,
  },
  {
    src: image10,
    width: 86,
    height: 80,
    left: 191,
    top: 343,
    motion: "landing" as const,
    durationSeconds: 2.5,
    delaySeconds: 0.4,
  },
  {
    src: image6,
    width: 123,
    height: 134,
    left: 234,
    top: 289,
    motion: "sway" as const,
    durationSeconds: 2.2,
    delaySeconds: 0.75,
  },
  {
    src: image3,
    width: 83,
    height: 104,
    left: 240,
    top: 356,
    motion: "landing" as const,
    durationSeconds: 2.5,
    delaySeconds: 0.8,
  },
];

const PostLoginScreen: FC<PostLoginScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const toBlend = setTimeout(() => setPhase("blend"), 1800);
    return () => clearTimeout(toBlend);
  }, []);

  useEffect(() => {
    if (phase !== "blend") return;
    const toWelcome = setTimeout(() => setPhase("welcome"), 800);
    return () => clearTimeout(toWelcome);
  }, [phase]);

  useEffect(() => {
    if (phase !== "welcome") return;
    const finish = setTimeout(onComplete, 1300);
    return () => clearTimeout(finish);
  }, [phase, onComplete]);

  return (
    <div className={`post-login-screen post-login-screen--${phase}`}>
      {phase !== "welcome" ? (
        <>
          <div className="post-login-screen__glasses">
            <OnboardingImageGroup images={glassImages} />
          </div>
          <p className="post-login-screen__loading-text">
            로딩중
            <span className="post-login-screen__dot">.</span>
            <span className="post-login-screen__dot">.</span>
            <span className="post-login-screen__dot">.</span>
          </p>
        </>
      ) : (
        <p className="post-login-screen__welcome-text">환영합니다!</p>
      )}

      {phase === "blend" && (
        <div className="post-login-screen__blend">
          <span className="post-login-screen__blob post-login-screen__blob--pink" />
          <span className="post-login-screen__blob post-login-screen__blob--mint" />
          <span className="post-login-screen__whiteout" />
        </div>
      )}
    </div>
  );
};

export default PostLoginScreen;
