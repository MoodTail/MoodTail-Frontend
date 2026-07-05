import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import Input from "../Input/Input";
import "./PasswordInput.css";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {}

function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="password-input-wrapper">
      <Input type={showPassword ? "text" : "password"} {...props} />
      <button
        type="button"
        className="eye-toggle"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label="비밀번호 보기 전환"
      >
        {showPassword ? (
          <svg width="24" height="17" viewBox="0 0 24 17" fill="none">
            <path
              d="M1 8.5C1 8.5 5 1 12 1C19 1 23 8.5 23 8.5C23 8.5 19 16 12 16C5 16 1 8.5 1 8.5Z"
              stroke="#FF6F4F"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="8.5" r="3" stroke="#FF6F4F" strokeWidth={2} />
          </svg>
        ) : (
          <span className="eye-off-icon">
            <svg
              width="24"
              height="17"
              viewBox="0 0 24 17"
              fill="none"
              className="eye-off-base"
            >
              <path
                d="M17.94 14.0688C16.2306 15.2903 14.1491 15.9671 12 16C5 16 1 8.50001 1 8.50001C2.24389 6.32679 3.96914 4.42809 6.06 2.93127M9.9 1.22502C10.5883 1.07397 11.2931 0.998466 12 1.00002C19 1.00002 23 8.50001 23 8.50001C22.393 9.56464 21.6691 10.5669 20.84 11.4906M14.12 10.4875C13.8454 10.7638 13.5141 10.9855 13.1462 11.1392C12.7782 11.2929 12.3809 11.3756 11.9781 11.3822C11.5753 11.3889 11.1752 11.3194 10.8016 11.178C10.4281 11.0365 10.0887 10.826 9.80385 10.5589C9.51897 10.2918 9.29439 9.97371 9.14351 9.6235C8.99262 9.2733 8.91853 8.89819 8.92563 8.52055C8.93274 8.14292 9.02091 7.77049 9.18488 7.4255C9.34884 7.0805 9.58525 6.77 9.88 6.51252"
                stroke="#FF6F4F"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              className="eye-off-slash"
            >
              <path
                d="M1 1L21.5 21.5"
                stroke="#FF6F4F"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
}

export default PasswordInput;
