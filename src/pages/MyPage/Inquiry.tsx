import { useEffect, useState } from 'react'
import CompleteModal from '../../components/MyPage/CompleteModal'
import { createInquiry } from '../../api/inquiries/inquiries.api'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import '../../styles/Inquiry.css'

const MIN_LENGTH = 10
const MAX_LENGTH = 1000
const SAVED_MODAL_DURATION_MS = 1200
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
// 마이페이지 문의하기는 별도 유형 선택 UI가 없어 ETC(기타)로 고정
const DEFAULT_INQUIRY_TYPE = 'ETC'

interface InquiryProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function Inquiry({ onBack }: InquiryProps) {
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [contentError, setContentError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    // TODO: react-router-dom 도입 후 마이페이지로 돌아가는 라우팅 연결
    console.log('TODO: 마이페이지로 돌아가기')
  }

  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(email)) {
      setIsEmailInvalid(true)
      return
    }

    const trimmedContent = content.trim()
    if (trimmedContent.length < MIN_LENGTH) {
      setContentError(`문의 내용을 ${MIN_LENGTH}자 이상 입력해주세요`)
      return
    }
    setContentError('')
    setSubmitError('')
    setIsSubmitting(true)

    try {
      await createInquiry({
        inquiryType: DEFAULT_INQUIRY_TYPE,
        content: trimmedContent,
        contactEmail: email,
      })
      setShowSavedModal(true)
    } catch {
      setSubmitError('문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요')
    } finally {
      setIsSubmitting(false)
    }
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
          onChange={(event) => {
            setContent(event.target.value.slice(0, MAX_LENGTH))
            if (contentError) setContentError('')
          }}
          placeholder="문의 내용을 입력해주세요..."
          maxLength={MAX_LENGTH}
        />
        <span className="inquiry__counter">
          {content.length} / {MAX_LENGTH}
        </span>
      </div>
      {contentError && <p className="inquiry__email-error">{contentError}</p>}
      {submitError && <p className="inquiry__email-error">{submitError}</p>}

      <button
        type="button"
        className="inquiry__submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? '접수 중...' : '문의 접수'}
      </button>

      {showSavedModal && <CompleteModal className="modal--saved" title="접수 완료되었습니다" />}
    </div>
  )
}

export default Inquiry
