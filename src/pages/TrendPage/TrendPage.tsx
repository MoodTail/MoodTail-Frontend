import { useCallback, useEffect, useState } from "react";
import BackgroundBlur from "../../components/common/BackgroundBlur";
import TrendHeader from "../../components/Trend/TrendHeader";
import TopTypeCard from "../../components/Trend/TopTypeCard";
import TasteAverageCard from "../../components/Trend/TasteAverageCard";
import PopularCocktailCard from "../../components/Trend/PopularCocktailCard";
import RankChangeCard from "../../components/Trend/RankChangeCard";
import { getCocktailTrend } from "../../api/cocktails/cocktails.api";
import type { CocktailTrendResult } from "../../api/cocktails/cocktails.types";
import "../../styles/TrendPage.css";

interface TrendPageProps {
  onBack?: () => void;
}

function TrendPage({ onBack }: TrendPageProps) {
  const [isCocktailExpanded, setIsCocktailExpanded] = useState(false);
  const [trend, setTrend] = useState<CocktailTrendResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const requestTrend = useCallback(() => {
    getCocktailTrend()
      .then(setTrend)
      .catch((error) => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const retryTrend = () => {
    setIsLoading(true);
    setHasError(false);
    requestTrend();
  };

  useEffect(() => {
    document.body.classList.add("hide-bottom-nav");
    return () => {
      document.body.classList.remove("hide-bottom-nav");
    };
  }, []);

  useEffect(() => {
    requestTrend();
  }, [requestTrend]);

  return (
    <div className="trend-page">
      <BackgroundBlur
        idPrefix="trend-bg"
        width={393}
        height={1233}
        circles={[
          { cx: 20, cy: 210, r: 159, color: "#FEF6D9", opacity: 0.68 },
          { cx: 334, cy: 418, r: 159, color: "#FF6F4F", opacity: 0.37 },
          { cx: 38, cy: 946, r: 199, color: "#FF6F4F", opacity: 0.56 },
          { cx: 219, cy: 1007, r: 199, color: "#FEECAD", opacity: 0.56 },
        ]}
      />
      <TrendHeader
        title="트렌드 집계"
        description="지난달과 이번달의 도수, 당도, 산도 변화를 한눈에 비교해요"
        onBack={onBack}
      />
      {isLoading && (
        <div
          className="trend-skeleton"
          role="status"
          aria-label="트렌드 정보를 불러오는 중"
        >
          <div className="trend-skeleton__card trend-skeleton__card--types">
            <span className="trend-skeleton__line trend-skeleton__line--title" />
            <div className="trend-skeleton__tiles">
              {[0, 1, 2].map((item) => (
                <span key={item} className="trend-skeleton__tile" />
              ))}
            </div>
          </div>
          <div className="trend-skeleton__card trend-skeleton__card--taste">
            <span className="trend-skeleton__line trend-skeleton__line--heading" />
            <span className="trend-skeleton__line trend-skeleton__line--description" />
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className="trend-skeleton__bar" />
            ))}
          </div>
        </div>
      )}
      {!isLoading && hasError && (
        <section className="trend-error" role="alert">
          <p>트렌드 정보를 불러오지 못했어요.</p>
          <button type="button" onClick={retryTrend}>
            다시 시도
          </button>
        </section>
      )}
      {trend && (
        <>
          <TopTypeCard items={trend.popularMoodTypes} />
          <TasteAverageCard scores={trend.displayAverageTasteScores} />
          <PopularCocktailCard
            cocktails={trend.popularCocktails}
            isExpanded={isCocktailExpanded}
            onToggle={() => setIsCocktailExpanded((prev) => !prev)}
          />
          <RankChangeCard items={trend.rankChangeCocktails} />
        </>
      )}
    </div>
  );
}

export default TrendPage;
