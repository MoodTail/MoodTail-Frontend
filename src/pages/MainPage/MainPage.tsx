import { useState, type FC } from "react";
import "../../styles/MainPage.css";
import Button from "../../components/Button/Button";
import BackgroundBlur from "../../components/common/BackgroundBlur";
import TrendPage from "../TrendPage/TrendPage";

// ui 구현용으로 잔 이미지 하나 무작위로 넣음
import cocktail from "../../assets/images/glass/glass-1.png";

interface MenuItem {
  label: string;
  onClick?: () => void;
}

const MainPage: FC = () => {
  const [view, setView] = useState<"home" | "trend">("home");

  const menuItems: MenuItem[] = [
    { label: "트렌드집계 확인", onClick: () => setView("trend") },
    { label: "다른 사용자량" },
    { label: "커스텀 추천" },
  ];

  if (view === "trend") {
    return <TrendPage onBack={() => setView("home")} />;
  }

  return (
    <div className="main-page">
      {/* 배경 블러 */}
      <BackgroundBlur
        idPrefix="main-bg"
        width={393}
        height={797}
        top={51}
        circles={[
          { cx: 20, cy: 159, r: 159, color: "#FEF6D9", opacity: 0.68 },
          { cx: 334, cy: 367, r: 159, color: "#FF6F4F", opacity: 0.37 },
          { cx: 38, cy: 895, r: 199, color: "#FF6F4F", opacity: 0.56 },
          { cx: 219, cy: 956, r: 199, color: "#FEECAD", opacity: 0.56 },
        ]}
      />

      {/* 브랜드 타이틀 */}
      <p className="main-page__brand">MoodTail</p>

      {/* 무드 테스트 배너 */}
      <div className="main-page__banner">
        <p className="main-page__banner-title">
          안녕하세요!
          <br />
          오늘의 감정은 무슨 맛인지 알아볼까요?
        </p>
        <p className="main-page__banner-subtitle">
          나에게 딱 맞는 칵테일을 찾아드릴게요
        </p>
        <Button variant="light" className="main-page__banner-button">
          무드 테스트 시작하기 →
        </Button>
      </div>

      {/* 오늘의 추천 칵테일 */}
      <h2 className="main-page__section-title">오늘의 추천 칵테일</h2>

      <div className="main-page__cocktail-card">
        <div className="main-page__cocktail-thumb">
          <img
            src={cocktail}
            alt="선라이즈 소다"
            className="main-page__cocktail-image"
          />
        </div>

        <div className="main-page__cocktail-info">
          <p className="main-page__cocktail-name">선라이즈 소다</p>
          <p className="main-page__cocktail-tags">달콤 · 청량 · 과일향</p>
          <p className="main-page__cocktail-desc">
            오렌지 주스 + 소다워터 + 그레나딘으로
            <br />
            만드는 상큼한 여름 칵테일이에요.
          </p>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="main-page__menu-list">
        {menuItems.map((item) => (
          <li key={item.label} className="main-page__memu-item">
            <button
              type="button"
              className="main-page__menu-item-button"
              onClick={item.onClick}
            >
              <span className="main-page__menu-item-label">{item.label}</span>
              <span className="main-page__menu-item-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
