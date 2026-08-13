import type { CSSProperties } from 'react'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import type { HistoryTestResultDetail } from '../../api/histories/histories.types'
import { RESULT_TYPE_THEMES } from '../../constants/resultTypeThemes'
import RadarChart, { type RadarChartData } from '../../components/ResultPage/RadarChart'
import MonthlyReportBackground from '../../components/common/MonthlyReportBackground'
import './TestResultPage.css'

interface TestResultPageProps {
  onBack: () => void
  result: HistoryTestResultDetail
}

function toRadarData(scores: HistoryTestResultDetail['displayTasteScores']): RadarChartData {
  return {
    당도: scores.sweetness,
    산도: scores.sourness,
    쓴맛: scores.bitterness,
    청량감: scores.refreshing,
    도수: scores.alcoholIntensity,
  }
}

function TestResultPage({ onBack, result }: TestResultPageProps) {
  const resultTheme = RESULT_TYPE_THEMES[result.moodType.typeCode]
  const pageThemeStyle = {
    '--history-result-accent': resultTheme?.accentColor ?? '#ff6f4f',
  } as CSSProperties

  const myTaste = toRadarData(result.displayTasteScores)
  const tasteItems = [
    { label: '도수', value: result.displayTasteScores.alcoholIntensity, active: true },
    { label: '당도', value: result.displayTasteScores.sweetness, active: false },
    { label: '산도', value: result.displayTasteScores.sourness, active: true },
    { label: '쓴맛', value: result.displayTasteScores.bitterness, active: false },
    { label: '청량감', value: result.displayTasteScores.refreshing, active: true },
  ]
  const cocktails = [...result.recommendedCocktails].sort(
    (a, b) => a.ranking - b.ranking,
  )

  return (
    <div className="history-full-result-page">
      <div className="history-full-result-page__canvas" style={pageThemeStyle}>
        <MonthlyReportBackground variant="long" />
        <button
          type="button"
          className="history-full-result-page__back"
          onClick={onBack}
          aria-label="히스토리 상세 화면으로 돌아가기"
        >
          <img src={chevronLeftIcon} alt="" />
        </button>

        <img
          className="history-full-result-page__character"
          src={result.moodType.characterImageUrl}
          alt={`${result.moodType.name} 캐릭터`}
        />

        <h1 className="history-full-result-page__type">{result.moodType.name}</h1>
        <p className="history-full-result-page__description">
          {result.moodType.shortDescription}
        </p>
        <div className="history-full-result-page__quote">
          “{result.moodType.characterQuote}”
        </div>

        <section className="history-full-result-page__sheet" aria-label="상세 테스트 결과">
          <div className="history-full-result-page__sheet-handle" aria-hidden="true" />

          <section className="history-full-result-page__cocktails">
            <h2>나와 일치하는 칵테일 TOP 4</h2>
            <div className="history-full-result-page__cocktail-grid">
              {cocktails.map((cocktail) => (
                <article key={cocktail.cocktailId} className="history-full-result-page__cocktail-card">
                  <span>{cocktail.ranking}위</span>
                  <img src={cocktail.cocktailImageUrl} alt="" />
                  <strong>{cocktail.cocktailName}</strong>
                  <small>일치율 {cocktail.matchScore}%</small>
                </article>
              ))}
            </div>
          </section>

          <section className="history-full-result-page__taste-analysis">
            <h2>나의 취향 분석</h2>
            <div className="history-full-result-page__radar">
              <RadarChart myData={myTaste} />
            </div>
            <div className="history-full-result-page__taste-values">
              {tasteItems.map((item) => (
                <div
                  key={item.label}
                  className={`history-full-result-page__taste-value${item.active ? ' is-active' : ''}`}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="history-full-result-page__type-matches">
            <article className="history-full-result-page__type-match is-compatible">
              <h2>잘 맞는 타입</h2>
              <div>{result.compatibilities.best?.name ?? '궁합 정보 없음'}</div>
            </article>
            <article className="history-full-result-page__type-match is-incompatible">
              <h2>안 맞는 타입</h2>
              <div>{result.compatibilities.worst?.name ?? '궁합 정보 없음'}</div>
            </article>
          </section>

        </section>
      </div>
    </div>
  )
}

export default TestResultPage
export type { TestResultPageProps }
