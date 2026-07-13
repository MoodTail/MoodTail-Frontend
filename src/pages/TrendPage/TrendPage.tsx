import { useState } from "react";
import BackgroundBlur from "../../components/common/BackgroundBlur";
import TrendHeader from "../../components/Trend/TrendHeader";
import TopTypeCard from "../../components/Trend/TopTypeCard";
import TasteAverageCard from "../../components/Trend/TasteAverageCard";
import PopularCocktailCard from "../../components/Trend/PopularCocktailCard";
import RankChangeCard from "../../components/Trend/RankChangeCard";
import "../../styles/TrendPage.css";

interface TrendPageProps {
  onBack?: () => void;
}

function TrendPage({ onBack }: TrendPageProps) {
  const [isCocktailExpanded, setIsCocktailExpanded] = useState(false);

  return (
    <div className="trend-page">
      <BackgroundBlur
        idPrefix="trend-bg"
        width={393}
        height={824}
        circles={[
          { cx: 331, cy: 230, r: 173, color: "#FF6F4F", opacity: 0.28 },
          { cx: 33, cy: 676, r: 199, color: "#FEF6D9", opacity: 0.38 },
        ]}
      />
      <TrendHeader
        title="트렌드 집계"
        description="지난달과 이번달의 도수, 당도, 산도 변화를 한눈에 비교해요"
        onBack={onBack}
      />
      <TopTypeCard />
      <TasteAverageCard />
      <PopularCocktailCard
        isExpanded={isCocktailExpanded}
        onToggle={() => setIsCocktailExpanded((prev) => !prev)}
      />
      <RankChangeCard />
    </div>
  );
}

export default TrendPage;
