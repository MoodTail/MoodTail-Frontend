import type { FC } from "react";
import "../../styles/TermViewModal.css";

interface TermViewModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const TermViewModal: FC<TermViewModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="term-view-modal__overlay" onClick={onClose}>
      <div className="term-view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="term-view-modal__header">
          <p className="term-view-modal__title">{title}</p>
          <button
            type="button"
            className="term-view-modal__close"
            onClick={onClose}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
        <div className="term-view-modal__content">{content}</div>
      </div>
    </div>
  );
};

export default TermViewModal;
