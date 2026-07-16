interface TrendHeaderProps {
  title: string;
  description: string;
  onBack?: () => void;
}

function TrendHeader({ title, description, onBack }: TrendHeaderProps) {
  return (
    <header className="trend-header">
      <button
        type="button"
        className="trend-header__back"
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
            d="M16.6762 19.8529L10.3232 13.5L16.6762 7.14705"
            stroke="black"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="trend-header__title">{title}</h1>
      <p className="trend-header__description">{description}</p>
    </header>
  );
}

export default TrendHeader;
