import { useState, type FC } from "react";
import "../../styles/MainPage.css";
import Button from "../../components/Button/Button";
import BackgroundBlur from "../../components/common/BackgroundBlur";
import TrendPage from "../TrendPage/TrendPage";
import ShareModal from "../../components/Modal/ShareModal";
import TogetherPickPage from "../TogetherPickPage/TogetherPickPage";
import CustomRecommend from "../CustomRecommend/CustomRecommend";
import CustomRecommendResultPage from "../CustomRecommendResultPage/CustomRecommendResultPage";

// ui 구현용으로 잔 이미지 하나 무작위로 넣음
import cocktail from "../../assets/images/glass/glass-1.png";

interface MenuItem {
  label: string;
  onClick?: () => void;
}

interface TasteValues {
  strength: number;
  sweetness: number;
  acidity: number;
  bitterness: number;
  refreshing: number;
}

type ViewState = "home" | "trend" | "together" | "custom" | "customResult";

const MainPage: FC = () => {
  const [view, setView] = useState<ViewState>("home");
  const [isShareOpen, setIsShareOpen] = useState(false); // TODO: 확인용 임시 코드, 삭제 예정
  const [myTasteValues, setMyTasteValues] = useState<TasteValues | null>(null);

  const menuItems: MenuItem[] = [
    { label: "트렌드집계 확인", onClick: () => setView("trend") },
    { label: "같이 고르기", onClick: () => setView("together") },
    { label: "커스텀 추천", onClick: () => setView("custom") },
  ];

  if (view === "trend") {
    return <TrendPage onBack={() => setView("home")} />;
  }

  if (view === "together") {
    return <TogetherPickPage onBack={() => setView("home")} />;
  }

  if (view === "custom") {
    return (
      <CustomRecommend
        onBack={() => setView("home")}
        onViewResult={(values) => {
          setMyTasteValues(values);
          setView("customResult");
        }}
      />
    );
  }

  if (view === "customResult" && myTasteValues) {
    return (
      <CustomRecommendResultPage
        onBack={() => setView("custom")}
        onRetry={() => setView("custom")}
        cocktailName="피치 하이볼"
        description="달콤함과 청량감은 살리고 도수는 부담 없이 맞춘 추천이에요."
        matchPercent={92}
        myValues={myTasteValues}
        cocktailValues={{
          strength: 40,
          sweetness: 80,
          acidity: 60,
          bitterness: 20,
          refreshing: 100,
        }}
      />
    );
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
          <li key={item.label} className="main-page__menu-item">
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

      {isShareOpen && (
        <ShareModal
          onClose={() => setIsShareOpen(false)}
          shareUrl="https://moodtail.app/share/example"
          tipText="TIP: 캐릭터는 무료 12종이나 된답니다! 전부 해금할 수 있을까요?"
          onKakaoShare={() => console.log("카카오톡 공유")}
        />
      )}
    </div>
  );
};

export default MainPage;
