import type { FC } from "react";
import googleIcon from "../../assets/icons/google-icon.png";

const SnsLoginButtons: FC = () => {
  return (
    <div className="sns-login-buttons">
      <button
        type="button"
        className="sns-login-buttons__button sns-login-buttons__button--kakao"
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
