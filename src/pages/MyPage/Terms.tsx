import { useEffect, useState } from 'react'
import { getTerms } from '../../api/terms/terms.api'
import type { Term } from '../../api/terms/terms.types'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import '../../styles/Terms.css'

interface TermsProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function Terms({ onBack }: TermsProps) {
  const [terms, setTerms] = useState<Term[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let cancelled = false

    getTerms()
      .then((result) => {
        if (!cancelled) setTerms(result)
      })
      .catch(() => {
        if (!cancelled) setLoadError('이용약관을 불러오지 못했습니다')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

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

      <div className="terms__content">
        {isLoading && '불러오는 중...'}
        {!isLoading && loadError && loadError}
        {!isLoading &&
          !loadError &&
          terms.map((term) => (
            <section key={term.termId} className="terms__section">
              <h2 className="terms__section-title">{term.title}</h2>
              <p className="terms__section-body">{term.content}</p>
            </section>
          ))}
      </div>
    </div>
  )
}

export default Terms
