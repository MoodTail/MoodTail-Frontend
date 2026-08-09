import { useState } from "react";
import type { FC } from "react";
import type { AxiosError } from "axios";
import BackgroundBlur from "../../components/common/BackgroundBlur";
import VerifyCodePage from "./VerifyCodePage";
import ResetPasswordPage from "./ResetPasswordPage";
import "../../styles/FindPasswordPage.css";
import {
  postPasswordResetCodes,
  postPasswordResetVerify,
  patchPassword,
} from "../../api/auth/auth.api";
import type { PatchPasswordRequest } from "../../api/auth/auth.types";

interface FindPasswordPageProps {
  onBack: () => void;
}

type FindPasswordStep = "email" | "verify" | "reset";

const MAX_SESSION_REVOKE_RETRIES = 2;

const FindPasswordPage: FC<FindPasswordPageProps> = ({ onBack }) => {
  const [step, setStep] = useState<FindPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState("");

  const handleSubmit = async (): Promise<void> => {
    if (!email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await postPasswordResetCodes({ email });
      setStep("verify");
    } catch (error) {
      console.error(error);
      setErrorMessage("이메일 전송에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifySubmit = async (code: string): Promise<void> => {
    setIsVerifying(true);
    setVerifyError("");

    try {
      const result = await postPasswordResetVerify({ email, code });
      setResetToken(result.resetToken);
      setStep("reset");
    } catch (error) {
      console.error(error);
      setVerifyError("인증 코드가 올바르지 않아요. 다시 확인해주세요.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async (): Promise<void> => {
    try {
      await postPasswordResetCodes({ email });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async (newPassword: string): Promise<void> => {
    setIsChangingPassword(true);
    setChangePasswordError("");

    const body: PatchPasswordRequest = {
      resetToken,
      newPassword,
      newPasswordConfirm: newPassword,
    };

    let attempt = 0;

    while (attempt <= MAX_SESSION_REVOKE_RETRIES) {
      try {
        await patchPassword(body);
        setIsChangingPassword(false);
        onBack();
        return;
      } catch (error) {
        const errorCode = (error as AxiosError<{ code?: string }>).response
          ?.data?.code;

        if (errorCode === "AUTH042" && attempt < MAX_SESSION_REVOKE_RETRIES) {
          attempt += 1;
          continue;
        }

        console.error(error);
        setChangePasswordError(
          errorCode === "AUTH042"
            ? "비밀번호는 변경됐지만 기존 로그인 세션 정리에 실패했어요. 다시 로그인해주세요."
            : "비밀번호 변경에 실패했어요. 다시 시도해주세요.",
        );
        setIsChangingPassword(false);
        return;
      }
    }
  };

  if (step === "reset") {
    return (
      <ResetPasswordPage
        onBack={() => setStep("verify")}
        onSubmit={(newPassword) => void handleChangePassword(newPassword)}
        isSubmitting={isChangingPassword}
        submitError={changePasswordError}
      />
    );
  }

  if (step === "verify") {
    return (
      <VerifyCodePage
        onBack={() => setStep("email")}
        onSubmit={(code) => void handleVerifySubmit(code)}
        onResend={() => void handleResend()}
        isSubmitting={isVerifying}
        errorMessage={verifyError}
      />
    );
  }

  return (
    <div className="find-password-page">
      <BackgroundBlur
        idPrefix="find-password-bg"
        width={393}
        height={824}
        circles={[{ cx: 33, cy: 676, r: 199, color: "#FEF6D9", opacity: 0.38 }]}
      />

      <button
        type="button"
        className="find-password-page__back"
        onClick={onBack}
        aria-label="뒤로가기"
      >
        <svg viewBox="0 0 27 27" width="27" height="27">
          <path
            d="M17 4L8 13.5L17 23"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>

      <h1 className="find-password-page__title">비밀번호 찾기</h1>

      <p className="find-password-page__desc">
        가입한 아이디 또는 이메일을 입력하시면 비밀번호
        <br />
        재설정 안내를 보내드려요
      </p>

      <div className="find-password-page__icon">
        <svg viewBox="0 0 184 184" width="184" height="184">
          <circle cx="92" cy="92" r="92" fill="#FFE0D6" />
          <path
            d="M92 60a20 20 0 00-20 20v10h-6a6 6 0 00-6 6v34a6 6 0 006 6h52a6 6 0 006-6v-34a6 6 0 00-6-6h-6V80a20 20 0 00-20-20zm0 12a8 8 0 018 8v10H84V80a8 8 0 018-8z"
            fill="#FF613D"
          />
        </svg>
      </div>

      <label
        className="find-password-page__label"
        htmlFor="find-password-email"
      >
        아이디 또는 이메일
      </label>
      <input
        id="find-password-email"
        type="email"
        className="find-password-page__input"
        placeholder="example@moodtail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {errorMessage && (
        <p className="find-password-page__error">{errorMessage}</p>
      )}

      <button
        type="button"
        className="find-password-page__submit"
        onClick={() => void handleSubmit()}
        disabled={isSubmitting}
      >
        {isSubmitting ? "전송 중..." : "재설정 링크 받기"}
      </button>
    </div>
  );
};

export default FindPasswordPage;
