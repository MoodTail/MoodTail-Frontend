import { useState } from 'react'
import chevronLeftIcon from '../../assets/icons/chevron-left-white.svg'
import shareIcon from '../../assets/icons/share.svg'
import RadarChart, { type RadarChartData } from '../../components/ResultPage/RadarChart'
import CocktailTopList, { type CocktailTopItem } from '../../components/ResultPage/CocktailTopList'
import TypeMatchCard from '../../components/ResultPage/TypeMatchCard'
import TwoButtonModal from '../../components/common/modal/TwoButtonModal'
import ResultShareModal from '../../components/common/modal/ResultShareModal'
import ResultSnsShareModal from '../../components/common/modal/ResultSnsShareModal'
import SaveCompleteToast from '../../components/common/SaveCompleteToast'
import romanticCharacterImg from '../../assets/images/character/character-12.png'
import visionaryCharacterImg from '../../assets/images/character-crop/character-crop-11.svg'
import disciplinarianCharacterImg from '../../assets/images/character-crop/character-crop-2.png'
import glass1 from '../../assets/images/glass/glass-1.png'
import glass2 from '../../assets/images/glass/glass-2.png'
import glass3 from '../../assets/images/glass/glass-3.png'
import glass4 from '../../assets/images/glass/glass-4.png'
import '../../styles/ResultPage.css'

// TODO: 실제 테스트 결과 API 연동 후 실제 응답으로 대체
const MOCK_RESULT = {
  characterImage: romanticCharacterImg,
  typeName: '낭만주의자',
  typeDescription: '작은 순간도 특별한 추억으로 만드는 타입',
  shareDescription: '작은 순간도 특별한 추억으로', // 공유 카드용 축약 문구
  quote: '재밌으면 그걸로 충분한거 아닐까?!',
}

// TODO: glass-*.png 파일명이 번호로만 되어 있어 모양으로 임의 매핑함. 실제 칵테일-잔 매핑 확정되면 교체
const MOCK_TOP_COCKTAILS: CocktailTopItem[] = [
  { rank: 1, name: '선셋 피즈', matchRate: 95, glassImage: glass4 },
  { rank: 2, name: '모히토', matchRate: 75, glassImage: glass3 },
  { rank: 3, name: '피나콜라다', matchRate: 55, glassImage: glass2 },
  { rank: 4, name: '진토닉', matchRate: 25, glassImage: glass1 },
]

const MOCK_MY_TASTE: RadarChartData = { 당도: 30, 산도: 70, 쓴맛: 20, 청량감: 90, 도수: 45 }
const MOCK_COMPARE_TASTE: RadarChartData = { 당도: 55, 산도: 45, 쓴맛: 60, 청량감: 40, 도수: 65 }

// TODO: 활성(active) 여부는 아직 데이터 기반 규칙이 없어 목데이터 기준으로 고정함. 실제 기준 정해지면 교체
const TASTE_CHIP_ORDER: { key: keyof RadarChartData; label: string; active: boolean }[] = [
  { key: '도수', label: '도수', active: true },
  { key: '당도', label: '당도', active: false },
  { key: '산도', label: '산도', active: true },
  { key: '쓴맛', label: '쓴맛', active: false },
  { key: '청량감', label: '청량감', active: true },
]

type ModalStep = 'none' | 'save-overwrite-warning' | 'login-required' | 'back-confirm'

interface ResultPageProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function ResultPage({ onBack }: ResultPageProps) {
  // TODO: 실제 저장/로그인 상태 API 연동 후 아래 mock state를 실제 값으로 교체
  const [hasStoredResult, setHasStoredResult] = useState(false) // 오늘 이미 저장된 결과가 있는지
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 여부
  const [isResultSaved, setIsResultSaved] = useState(false) // 지금 보고 있는 결과를 저장했는지

  const [modalStep, setModalStep] = useState<ModalStep>('none')
  const closeModal = () => setModalStep('none')

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSnsModalOpen, setIsSnsModalOpen] = useState(false)
  const [isSaveToastVisible, setIsSaveToastVisible] = useState(false)

  const goBack = () => {
    if (onBack) {
      onBack()
      return
    }
    // TODO: react-router-dom 도입 후 이전 화면으로 돌아가는 라우팅 연결
    console.log('TODO: 이전 화면으로 이동')
  }

  const handleBack = () => {
    if (!isResultSaved) {
      setModalStep('back-confirm')
      return
    }
    goBack()
  }

  const handleRetest = () => {
    // TODO: 테스트 다시 시작 라우팅 연결
    console.log('TODO: 테스트 다시 시작')
  }

  const performSave = () => {
    // TODO: 테스트 결과 저장 API 연동
    console.log('TODO: 테스트 결과 저장')
    setIsResultSaved(true)
    setHasStoredResult(true)
    setModalStep('none')
  }

  const handleSaveResult = () => {
    if (!isLoggedIn) {
      setModalStep('login-required')
      return
    }
    if (hasStoredResult) {
      setModalStep('save-overwrite-warning')
      return
    }
    performSave()
  }

  const handleGoToLogin = () => {
    closeModal()
    // TODO: react-router-dom 도입 후 로그인 페이지로 라우팅 연결. 지금은 라우팅이 없어 로그인 성공 상태만 mock으로 반영
    console.log('TODO: 로그인 페이지로 이동')
    setIsLoggedIn(true)
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleSnsShare = () => {
    setIsSnsModalOpen(true)
  }

  const handleKakaoShare = () => {
    // TODO: 카카오 SDK 연동
    console.log('TODO: 카카오톡 공유 SDK 연동')
  }

  const handleImageSaved = () => {
    setIsSaveToastVisible(true)
  }

  return (
    <>
      <div className="result-page">
        <header className="result-page__header">
          <button
            type="button"
            className="result-page__back"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <img className="result-page__back-icon" src={chevronLeftIcon} alt="" aria-hidden="true" />
          </button>

          <div className="result-page__character-circle">
            <img className="result-page__character" src={MOCK_RESULT.characterImage} alt="" />
          </div>
          <p className="result-page__type-name">{MOCK_RESULT.typeName}</p>
          <p className="result-page__type-description">{MOCK_RESULT.typeDescription}</p>
          <p className="result-page__quote">&ldquo;{MOCK_RESULT.quote}&rdquo;</p>
        </header>

        <div className="result-page__sheet">
          <div className="result-page__sheet-handle" aria-hidden="true" />

          <section className="result-page__section">
            <h2 className="result-page__section-title">나와 일치하는 칵테일 TOP 4</h2>
            <CocktailTopList items={MOCK_TOP_COCKTAILS} />
          </section>

          <section className="result-page__section">
            <h2 className="result-page__section-title">나의 취향 분석</h2>
            <RadarChart myData={MOCK_MY_TASTE} compareData={MOCK_COMPARE_TASTE} />
            <div className="taste-chips">
              {TASTE_CHIP_ORDER.map(({ key, label, active }) => (
                <div
                  key={key}
                  className={`taste-chips__item${active ? ' taste-chips__item--active' : ''}`}
                >
                  <span className="taste-chips__label">{label}</span>
                  <span className="taste-chips__value">{MOCK_MY_TASTE[key]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="result-page__match-section">
            <TypeMatchCard
              label="잘 맞는 타입"
              typeName="환상주의자"
              typeNameColor="#fda8a8"
              image={visionaryCharacterImg}
            />
            <TypeMatchCard
              label="안 맞는 타입"
              typeName="규칙주의자"
              typeNameColor="#6fa8dc"
              image={disciplinarianCharacterImg}
            />
          </section>

          <div className="result-page__actions">
            <button type="button" className="result-page__retest" onClick={handleRetest}>
              다시 테스트하기
            </button>
            <button type="button" className="result-page__save" onClick={handleSaveResult}>
              테스트 결과 저장
            </button>

            <button type="button" className="result-page__share" onClick={handleShare}>
              <img className="result-page__share-icon" src={shareIcon} alt="" aria-hidden="true" />
              공유하기
            </button>
          </div>
        </div>
      </div>

      <TwoButtonModal
        isOpen={modalStep === 'save-overwrite-warning'}
        title="앗! 저장하기 전에"
        description={'이미 오늘 검사한 결과가 있는 사용자는\n지금 저장하게 되면 이전 결과는 사라집니다'}
        leftButton={{ label: '저장하기', onClick: performSave, variant: 'primary' }}
        rightButton={{ label: '닫기', onClick: closeModal, variant: 'secondary' }}
        onOverlayClick={closeModal}
      />

      <TwoButtonModal
        isOpen={modalStep === 'login-required'}
        title="로그인이 필요해요"
        description={'저장기능은 로그인 유저에게만 가능합니다\n로그인할까요?'}
        leftButton={{ label: '로그인', onClick: handleGoToLogin, variant: 'primary' }}
        rightButton={{ label: '닫기', onClick: closeModal, variant: 'secondary' }}
        onOverlayClick={closeModal}
      />

      <TwoButtonModal
        isOpen={modalStep === 'back-confirm'}
        title="뒤로가시겠어요?"
        description="테스트 결과는 저장되지 않습니다"
        leftButton={{ label: '저장하기', onClick: handleSaveResult, variant: 'primary' }}
        rightButton={{ label: '뒤로가기', onClick: () => { closeModal(); goBack(); }, variant: 'secondary' }}
        onOverlayClick={closeModal}
      />

      <ResultShareModal
        isOpen={isShareModalOpen}
        shareCard={{
          characterImage: MOCK_RESULT.characterImage,
          typeName: MOCK_RESULT.typeName,
          typeDescription: MOCK_RESULT.shareDescription,
          quote: MOCK_RESULT.quote,
        }}
        onClose={() => setIsShareModalOpen(false)}
        onSnsShare={handleSnsShare}
        onImageSaved={handleImageSaved}
      />

      <ResultSnsShareModal
        isOpen={isSnsModalOpen}
        url="https://moodtail.app/share/mock-id"
        onClose={() => setIsSnsModalOpen(false)}
        onKakaoShare={handleKakaoShare}
      />

      <SaveCompleteToast
        message="저장 완료되었습니다"
        isVisible={isSaveToastVisible}
        onHide={() => setIsSaveToastVisible(false)}
      />
    </>
  )
}

export default ResultPage
