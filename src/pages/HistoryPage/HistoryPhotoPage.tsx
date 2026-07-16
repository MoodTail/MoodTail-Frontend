import { useState } from 'react'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import HistoryPhotoUploader from '../../components/history/HistoryPhotoUploader'
import './HistoryPhotoPage.css'

interface HistoryPhotoPageProps {
  onBack: () => void
  hasTestResult: boolean
}

function HistoryPhotoPage({ onBack, hasTestResult }: HistoryPhotoPageProps) {
  const [activeTab, setActiveTab] = useState<'record' | 'result'>('record')

  return (
    <div className="history-photo-page">
      <header className="history-photo-page__header">
        <button
          type="button"
          className="history-photo-page__back-button"
          onClick={onBack}
          aria-label="히스토리로 돌아가기"
        >
          <img src={chevronLeftIcon} alt="" />
        </button>
        <h1>히스토리</h1>
      </header>

      <div className="history-photo-page__tabs" role="tablist" aria-label="히스토리 상세 메뉴">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'record'}
          className={`history-photo-page__tab history-photo-page__tab--record${
            activeTab === 'record' ? ' is-active' : ''
          }`}
          onClick={() => setActiveTab('record')}
        >
          사진/칵테일 기록
        </button>
        {hasTestResult && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'result'}
            className={`history-photo-page__tab history-photo-page__tab--result${
              activeTab === 'result' ? ' is-active' : ''
            }`}
            onClick={() => setActiveTab('result')}
          >
            테스트 결과
          </button>
        )}
      </div>

      {activeTab === 'record' ? (
        <HistoryPhotoUploader collapsible />
      ) : (
        <div className="history-photo-page__result-placeholder">
          테스트 결과 화면은 추후 연결될 예정입니다.
        </div>
      )}
    </div>
  )
}

export default HistoryPhotoPage
export type { HistoryPhotoPageProps }
