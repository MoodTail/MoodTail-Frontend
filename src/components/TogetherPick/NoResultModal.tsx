import Button from "../Button/Button";
import "../../styles/NoResultModal.css";

interface NoResultModalProps {
  onClose: () => void;
}

function NoResultModal({ onClose }: NoResultModalProps) {
  return (
    <div className="no-result-modal__overlay">
      <div className="no-result-modal">
        <p className="no-result-modal__title">
          두 사용자 모두 저장된 테스트 <br /> 결과가 필요해요
        </p>
        <p className="no-result-modal__description">다시 한번 시도해주세요</p>
        <Button
          variant="cta"
          className="no-result-modal__close"
          onClick={onClose}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}

export default NoResultModal;
