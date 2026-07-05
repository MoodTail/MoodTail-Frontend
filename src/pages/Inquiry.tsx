import { useEffect, useState } from 'react'
import Modal from '../components/common/Modal'
import '../styles/Inquiry.css'

const MAX_LENGTH = 500
const SAVED_MODAL_DURATION_MS = 1200

type InquiryStep = 'intro' | 'form'

interface InquiryProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function Inquiry({ onBack }: InquiryProps) {
  const [step, setStep] = useState<InquiryStep>('intro')
  const [content, setContent] = useState('')
  const [showSavedModal, setShowSavedModal] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    // TODO: react-router-dom 도입 후 마이페이지로 돌아가는 라우팅 연결
    console.log('TODO: 마이페이지로 돌아가기')
  }

  const handleSubmit = () => {
    // TODO: 실제 문의 접수 연동 (외부 링크 연결 또는 API 전송)
    console.log('TODO: 문의 접수', { content })
    setShowSavedModal(true)
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
          ‹
        </button>
        <h1 className="inquiry__title">문의하기</h1>
      </header>

      <p className="inquiry__description">
        {step === 'intro' ? (
          '서비스 이용 중 불편한 점이나 개선 사항을 알려주세요. 문의사항은 외부 링크로 연결되며, 답변은 로그인한 이메일 계정으로 전송됩니다.'
        ) : (
          <>
            서비스 이용 중 불편한 점이나 개선 사항을 알려주세요.
            <br />
            답변은 로그인한 이메일 계정으로 전송됩니다.
          </>
        )}
      </p>

      {step === 'form' && (
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
      )}

      <button
        type="button"
        className="inquiry__submit"
        onClick={step === 'intro' ? () => setStep('form') : handleSubmit}
      >
        {step === 'intro' ? '문의 접수하러가기' : '문의 접수'}
      </button>

      {showSavedModal && <Modal className="modal--saved" title="저장 완료되었습니다" buttons={[]} />}
    </div>
  )
}

export default Inquiry
