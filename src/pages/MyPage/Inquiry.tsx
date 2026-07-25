import { useEffect, useState } from 'react'
import CompleteModal from '../../components/MyPage/CompleteModal'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import '../../styles/Inquiry.css'

const MAX_LENGTH = 500
const SAVED_MODAL_DURATION_MS = 1200
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface InquiryProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function Inquiry({ onBack }: InquiryProps) {
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    // TODO: react-router-dom 도입 후 마이페이지로 돌아가는 라우팅 연결
    console.log('TODO: 마이페이지로 돌아가기')
  }

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      setIsEmailInvalid(true)
      return
    }

    // TODO: 실제 문의 접수 연동 (외부 링크 연결 또는 API 전송)
    console.log('TODO: 문의 접수', { email, content })
    setShowSavedModal(true)
  }

  const handleEmailChange = (event: { target: { value: string } }) => {
    setEmail(event.target.value)
    if (isEmailInvalid) setIsEmailInvalid(false)
  }

  useEffect(() => {
    if (!showSavedModal) return

    const timer = setTimeout(() => {
      setShowSavedModal(false)
      onBack?.()
    }, SAVED_MODAL_DURATION_MS)

    return () => clearTimeout(timer)
  }, [showSavedModal, onBack])

  return (
    <div className="inquiry">
      <header className="inquiry__header">
        <button type="button" className="inquiry__back" onClick={handleBack} aria-label="뒤로가기">
          <img className="inquiry__back-icon" src={chevronLeftIcon} alt="" aria-hidden="true" />
        </button>
        <h1 className="inquiry__title">문의하기</h1>
      </header>

      <p className="inquiry__description">
        서비스 이용 중 불편한 점이나 개선 사항을 알려주세요.
        <br />
        답변은 입력하신 이메일 계정으로 전송됩니다.
      </p>

      <input
        type="email"
        className={`inquiry__email${isEmailInvalid ? ' inquiry__email--error' : ''}`}
        value={email}
        onChange={handleEmailChange}
        placeholder="example@moodtail.com"
      />
      {isEmailInvalid && <p className="inquiry__email-error">이메일 형식에 맞지 않습니다</p>}

      <div className="inquiry__textarea-wrap">
        <textarea
          className="inquiry__textarea"
          value={content}
          onChange={(event) => setContent(event.target.value.slice(0, MAX_LENGTH))}
          placeholder="문의 내용을 입력해주세요..."
          maxLength={MAX_LENGTH}
        />
        <span className="inquiry__counter">
          {content.length} / {MAX_LENGTH}
        </span>
      </div>

      <button type="button" className="inquiry__submit" onClick={handleSubmit}>
        문의 접수
      </button>

      {showSavedModal && <CompleteModal className="modal--saved" title="접수 완료되었습니다" />}
    </div>
  )
}

export default Inquiry
