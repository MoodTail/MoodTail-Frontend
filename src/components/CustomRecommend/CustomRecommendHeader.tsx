import "../../styles/CustomRecommendHeader.css";

interface CustomRecommendHeaderProps {
  title: string;
  description: string;
  onBack?: () => void;
}

function CustomRecommendHeader({
  title,
  description,
  onBack,
}: CustomRecommendHeaderProps) {
  return (
    <header className="custom-recommend-header">
      <div className="custom-recommend-header__top-row">
        <button
          type="button"
          className="custom-recommend-header__back"
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
        <h1 className="custom-recommend-header__title">{title}</h1>
      </div>
      <p className="custom-recommend-header__description">{description}</p>
    </header>
  );
}

export default CustomRecommendHeader;
