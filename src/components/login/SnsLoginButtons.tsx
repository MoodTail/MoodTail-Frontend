import "../../styles/SnsLoginButtons.css";

function SnsLoginButtons() {
  return (
    <div className="sns-login-buttons">
      <button
        type="button"
        className="sns-login-buttons__button sns-login-buttons__button--kakao"
      >
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6154 0C4.75265 0 0 3.72242 0 8.31418C0 11.2829 1.98692 13.8877 4.97577 15.3586C4.81317 15.9157 3.93087 18.9422 3.89576 19.18C3.89576 19.18 3.87463 19.3587 3.99109 19.4268C4.10755 19.4949 4.24453 19.442 4.24453 19.442C4.57851 19.3957 8.11743 16.9264 8.72996 16.4976C9.34187 16.5837 9.97196 16.6284 10.6154 16.6284C16.4782 16.6284 21.2308 12.906 21.2308 8.31418C21.2308 3.72242 16.4782 0 10.6154 0Z"
            fill="black"
          />
        </svg>
        <span>카카오톡으로 로그인</span>
      </button>

      <button
        type="button"
        className="sns-login-buttons__button sns-login-buttons__button--google"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="white" stroke="#EFEFEF" />
          <path
            d="M28.5 20.3c0-.7-.1-1.4-.2-2H20v3.8h4.8c-.2 1.1-.8 2.1-1.8 2.7v2.3h2.9c1.7-1.6 2.6-3.9 2.6-6.8z"
            fill="#4285F4"
          />
          <path
            d="M20 29c2.4 0 4.5-.8 6-2.2l-2.9-2.3c-.8.5-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8h-3v2.4C13.4 27.1 16.5 29 20 29z"
            fill="#34A853"
          />
          <path
            d="M14.9 22.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9v-2.4h-3C11.2 18.1 11 19 11 21s.2 2.9.9 4.2l3-2.3z"
            fill="#FBBC05"
          />
          <path
            d="M20 15.5c1.3 0 2.5.5 3.4 1.3l2.6-2.6C24.4 12.7 22.4 12 20 12c-3.5 0-6.6 1.9-8.1 4.8l3 2.4c.7-2.1 2.7-3.7 5.1-3.7z"
            fill="#EA4335"
          />
        </svg>
        <span>구글로 로그인</span>
      </button>
    </div>
  );
}

export default SnsLoginButtons;
