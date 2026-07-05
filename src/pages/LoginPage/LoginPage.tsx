import { useState } from "react";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Button from "../../components/Button/Button";
import SnsLoginButtons from "../../components/SnsLoginButtons/SnsLoginButtons";
import "./LoginPage.css";

function LoginPage() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log({ userId, password });
  };

  const handleGuestLogin = () => {
    console.log("게스트로 이용하기");
  };

  return (
    <div className="login-page">
      <svg
        className="bg-blobs"
        viewBox="0 0 393 824"
        preserveAspectRatio="none"
      >
        <circle
          cx="331"
          cy="240"
          r="173"
          fill="url(#blob1)"
          fillOpacity={0.28}
        />
        <circle
          cx="33"
          cy="686"
          r="199"
          fill="url(#blob2)"
          fillOpacity={0.38}
        />
        <defs>
          <radialGradient
            id="blob1"
            gradientTransform="translate(331 240) rotate(90) scale(173)"
          >
            <stop stopColor="#FF6F4F" />
            <stop offset="1" stopColor="white" stopOpacity={0} />
          </radialGradient>
          <radialGradient
            id="blob2"
            gradientTransform="translate(33 686) rotate(90) scale(199)"
          >
            <stop stopColor="#FEF6D9" />
            <stop offset="1" stopColor="white" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>

      <h1 className="brand-title">MoodTail</h1>
      <p className="brand-subtitle">오늘의 기분을, 한잔의 칵테일로</p>

      <div className="login-form">
        <Input
          type="text"
          placeholder="아이디 입력"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <PasswordInput
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button variant="primary" className="login-btn" onClick={handleLogin}>
        로그인
      </Button>

      <Button variant="text" className="guest-link" onClick={handleGuestLogin}>
        로그인 없이 이용하기
      </Button>

      <SnsLoginButtons />
    </div>
  );
}

export default LoginPage;
