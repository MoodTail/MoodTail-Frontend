import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import characterImage from '../../assets/images/history/detail_modal_character.png'
import glass1 from '../../assets/images/glass/glass-1.png'
import glass2 from '../../assets/images/glass/glass-2.png'
import glass3 from '../../assets/images/glass/glass-3.png'
import glass4 from '../../assets/images/glass/glass-4.png'
import Button from '../../components/Button/Button'
import RadarChart, { type RadarChartData } from '../../components/ResultPage/RadarChart'
import MonthlyReportBackground from '../../components/common/MonthlyReportBackground'
import './TestResultPage.css'

const TOP_COCKTAILS = [
  { rank: 1, name: '선셋 피즈', taste: '청량·과일', image: glass4 },
  { rank: 2, name: '모히토', taste: '청량·과일', image: glass3 },
  { rank: 3, name: '피나콜라다', taste: '청량·과일', image: glass2 },
  { rank: 4, name: '진토닉', taste: '청량·과일', image: glass1 },
]

const TASTE_DATA: RadarChartData = {
  당도: 30,
  산도: 70,
  쓴맛: 20,
  청량감: 90,
  도수: 45,
}

const TASTE_ITEMS = [
  { label: '도수', value: 45, active: true },
  { label: '당도', value: 30, active: false },
  { label: '산도', value: 70, active: true },
  { label: '쓴맛', value: 20, active: false },
  { label: '청량감', value: 90, active: true },
]

interface TestResultPageProps {
  onBack: () => void
}

function TestResultPage({ onBack }: TestResultPageProps) {
  return (
    <div className="history-full-result-page">
      <div className="history-full-result-page__canvas">
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
          src={characterImage}
          alt="낭만주의자 캐릭터"
        />

        <h1 className="history-full-result-page__type">낭만주의자</h1>
        <p className="history-full-result-page__description">
          작은 순간도 특별한 추억으로 만드는 타입
        </p>
        <div className="history-full-result-page__quote">
          “재밌으면 그걸로 충분한거 아닐까?!”
        </div>

        <section className="history-full-result-page__sheet" aria-label="상세 테스트 결과">
          <div className="history-full-result-page__sheet-handle" aria-hidden="true" />

          <section className="history-full-result-page__cocktails">
            <h2>나와 일치하는 칵테일 TOP 4</h2>
            <div className="history-full-result-page__cocktail-grid">
              {TOP_COCKTAILS.map((cocktail) => (
                <article key={cocktail.rank} className="history-full-result-page__cocktail-card">
                  <span>{cocktail.rank}위</span>
                  <img src={cocktail.image} alt="" />
                  <strong>{cocktail.name}</strong>
                  <small>{cocktail.taste}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="history-full-result-page__taste-analysis">
            <h2>나의 취향 분석</h2>
            <div className="history-full-result-page__radar">
              <RadarChart myData={TASTE_DATA} />
            </div>
            <div className="history-full-result-page__taste-values">
              {TASTE_ITEMS.map((item) => (
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
              <div>이상주의자</div>
            </article>
            <article className="history-full-result-page__type-match is-incompatible">
              <h2>안 맞는 타입</h2>
              <div>현실주의자</div>
            </article>
          </section>

          <div className="history-full-result-page__actions">
            <Button type="button" variant="primary">결과 공유하기</Button>
            <Button type="button" variant="result">히스토리 저장</Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TestResultPage
export type { TestResultPageProps }
