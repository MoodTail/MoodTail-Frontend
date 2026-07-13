import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import '../../styles/Terms.css'

interface TermsProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function Terms({ onBack }: TermsProps) {
  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    // TODO: react-router-dom 도입 후 마이페이지로 돌아가는 라우팅 연결
    console.log('TODO: 마이페이지로 돌아가기')
  }

  return (
    <div className="terms">
      <header className="terms__header">
        <button type="button" className="terms__back" onClick={handleBack} aria-label="뒤로가기">
          <img className="terms__back-icon" src={chevronLeftIcon} alt="" aria-hidden="true" />
        </button>
        <h1 className="terms__title">이용 약관</h1>
      </header>

      <div className="terms__content">{/* TODO: 실제 이용약관 텍스트 반영 예정 */}</div>
    </div>
  )
}

export default Terms
