import "../../styles/LoginRequiredModal.css";

interface LoginRequiredModalProps {
  onLogin: () => void;
  onClose: () => void;
}

function LoginRequiredModal({ onLogin, onClose }: LoginRequiredModalProps) {
  return (
    <div className="login-required-modal__overlay">
      <div className="login-required-modal">
        <p className="login-required-modal__title">로그인이 필요해요</p>
        <p className="login-required-modal__description">
          저장기능은 로그인 유저에게만 가능합니다
          <br />
          로그인할까요?
        </p>
        <div className="login-required-modal__actions">
          <button className="login-required-modal__login" onClick={onLogin}>
            로그인
          </button>
          <button className="login-required-modal__close" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRequiredModal;
