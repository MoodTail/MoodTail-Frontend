import Button from "../Button/Button";
import "../../styles/NoResultModal.css";

interface NoResultModalProps {
  onClose: () => void;
}

function NoResultModal({ onClose }: NoResultModalProps) {
  return (
    <div className="no-result-modal__overlay">
      <div className="no-result-modal">
        <p className="no-result-modal__title">아직 불러올 결과가 없어요</p>
        <p className="no-result-modal__description">
          상대가 먼저 무드 테스트를 완료해야 해요
          <br />
          완료 후 같은 코드로 다시 시도해주세요
        </p>
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
