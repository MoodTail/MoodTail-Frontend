import type { FC } from "react";
import googleIcon from "../../assets/icons/google-icon.png";
import { postOauthState } from "../../api/auth/auth.api";

const SnsLoginButtons: FC = () => {
  const handleKakaoClick = async (): Promise<void> => {
    try {
      const { state, codeChallenge, codeChallengeMethod } =
        await postOauthState("kakao");

      const kakaoAuthUrl = new URL("https://kauth.kakao.com/oauth/authorize");
      kakaoAuthUrl.searchParams.set(
        "client_id",
        import.meta.env.VITE_KAKAO_CLIENT_ID,
      );
      kakaoAuthUrl.searchParams.set(
        "redirect_uri",
        import.meta.env.VITE_KAKAO_REDIRECT_URI,
      );
      kakaoAuthUrl.searchParams.set("response_type", "code");
      kakaoAuthUrl.searchParams.set("state", state);
      kakaoAuthUrl.searchParams.set("code_challenge", codeChallenge);
      kakaoAuthUrl.searchParams.set(
        "code_challenge_method",
        codeChallengeMethod,
      );

      window.location.href = kakaoAuthUrl.toString();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleClick = async (): Promise<void> => {
    try {
      const { state, codeChallenge, codeChallengeMethod } =
        await postOauthState("google");

      const googleAuthUrl = new URL(
        "https://accounts.google.com/o/oauth2/v2/auth",
      );
      googleAuthUrl.searchParams.set(
        "client_id",
        import.meta.env.VITE_GOOGLE_CLIENT_ID,
      );
      googleAuthUrl.searchParams.set(
        "redirect_uri",
        import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      );
      googleAuthUrl.searchParams.set("response_type", "code");
      googleAuthUrl.searchParams.set("scope", "email profile");
      googleAuthUrl.searchParams.set("state", state);
      googleAuthUrl.searchParams.set("code_challenge", codeChallenge);
      googleAuthUrl.searchParams.set(
        "code_challenge_method",
        codeChallengeMethod,
      );

      window.location.href = googleAuthUrl.toString();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sns-login-buttons">
      <button
        type="button"
        className="sns-login-buttons__button sns-login-buttons__button--kakao"
        onClick={() => void handleKakaoClick()}
      >
        <span className="sns-login-buttons__icon-wrap">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path
              d="M10.6154 0C4.75265 0 0 3.72242 0 8.31418C0 11.2829 1.98692 13.8877 4.97577 15.3586C4.81317 15.9157 3.93087 18.9422 3.89576 19.18C3.89576 19.18 3.87463 19.3587 3.99109 19.4268C4.10755 19.4949 4.24453 19.442 4.24453 19.442C4.57851 19.3957 8.11743 16.9264 8.72996 16.4976C9.34187 16.5837 9.97196 16.6284 10.6154 16.6284C16.4782 16.6284 21.2308 12.906 21.2308 8.31418C21.2308 3.72242 16.4782 0 10.6154 0Z"
              fill="black"
            />
          </svg>
        </span>
        <span className="sns-login-buttons__label">카카오톡으로 로그인</span>
      </button>

      <button
        type="button"
        className="sns-login-buttons__button sns-login-buttons__button--google"
        onClick={() => void handleGoogleClick()}
      >
        <span className="sns-login-buttons__icon-wrap">
          <img
            src={googleIcon}
            alt="Google"
            className="sns-login-buttons__icon"
          />
        </span>
        <span className="sns-login-buttons__label">구글로 로그인</span>
      </button>
    </div>
  );
};

export default SnsLoginButtons;
