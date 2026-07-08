import "../../styles/SnsLoginButtons.css";

function SnsLoginButtons() {
  return (
    <div className="sns-login-wrapper">
      <p className="sns-label">SNS 계정으로 로그인</p>
      <div className="sns-icons">
        <button type="button" className="sns-icon" aria-label="카카오로 로그인">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#FFE812" />
            <path
              d="M20 10C14 10 9 13.8 9 18.5c0 3 2 5.7 5.1 7.2-.2.6-1.1 3.7-1.1 3.9 0 0 0 .2.1.2.1.1.2.1.3.1.3 0 3.9-2.6 4.5-3 .6.1 1.3.1 2 .1 6 0 11-3.8 11-8.6C30.8 13.8 25.9 10 20 10z"
              fill="black"
            />
          </svg>
        </button>

        <button
          type="button"
          className="sns-icon"
          aria-label="페이스북으로 로그인"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#1877F2" />
            <path
              d="M22.5 21.3h2.7l.4-3.1h-3.1v-2c0-.9.2-1.5 1.5-1.5h1.6v-2.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H17v3.1h2.4V29h3.1v-7.7z"
              fill="white"
            />
          </svg>
        </button>

        <button type="button" className="sns-icon" aria-label="구글로 로그인">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
        </button>

        <button type="button" className="sns-icon" aria-label="네이버로 로그인">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#03CF5D" />
            <path
              d="M22.97 20.59 16.79 11.67h-5.12v16.67h5.36v-8.92l6.18 8.92h5.12V11.67h-5.36v8.92z"
              fill="white"
            />
          </svg>
        </button>

        <button type="button" className="sns-icon" aria-label="애플로 로그인">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="black" />
            <path
              d="M27.67 16.82c-1.35.82-2.19 2.24-2.19 3.81 0 1.76 1.08 3.37 2.71 4.03-.32 1.02-.79 1.96-1.39 2.83-.88 1.22-1.79 2.47-3.15 2.47s-1.75-.78-3.34-.78-1.83.82-3.11.82-2.23-1.14-3.22-2.55c-1.31-1.96-2.07-4.24-2.11-6.63 0-3.88 2.55-5.96 5.1-5.96 1.35 0 2.47.86 3.3.86.8 0 2.08-.9 3.59-.9 1.59-.04 3.1.7 4.02 1.99v.01zM22.93 13.18c.68-.78 1.04-1.76 1.08-2.78 0-.12 0-.28-.04-.4-1.15.12-2.23.67-2.98 1.53-.68.75-1.08 1.69-1.11 2.71 0 .12 0 .23.04.35.08 0 .2.04.28.04 1.07-.08 2.07-.63 2.73-1.45z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SnsLoginButtons;
