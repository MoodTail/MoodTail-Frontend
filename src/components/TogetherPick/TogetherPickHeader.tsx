import "../../styles/TogetherPickHeader.css";

interface TogetherPickHeaderProps {
  title: string;
  description: string;
  onBack?: () => void;
}

function TogetherPickHeader({
  title,
  description,
  onBack,
}: TogetherPickHeaderProps) {
  return (
    <header className="together-pick-header">
      <div className="together-pick-header__top-row">
        <button
          type="button"
          className="together-pick-header__back"
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6772 19.8529L10.3242 13.5L16.6772 7.14705"
              stroke="black"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="together-pick-header__title">{title}</h1>
      </div>
      <p className="together-pick-header__description">{description}</p>
    </header>
  );
}

export default TogetherPickHeader;
