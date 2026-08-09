import { useEffect, useState } from 'react'
import { getCocktails } from '../../api/histories/histories.api'
import type { CocktailSummary } from '../../api/histories/histories.types'
import HistoryPrimaryButton from './HistoryPrimaryButton'
import SaveCompleteModal from '../Modal/SaveCompleteModal'
import './CocktailSearchOverlay.css'

interface CocktailSearchOverlayProps {
  initialCocktails?: CocktailSelection[]
  onSave: (cocktails: CocktailSelection[]) => Promise<void>
  onClose: () => void
}

interface CocktailSelection {
  id: number
  recordId?: number
  name: string
  description: string
  temperature: string
  image: string
}

function CocktailSearchOverlay({
  initialCocktails = [],
  onSave,
  onClose,
}: CocktailSearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [cocktails, setCocktails] = useState<CocktailSummary[]>([])
  const [selectedCocktails, setSelectedCocktails] = useState<
    Map<number, CocktailSelection>
  >(
    () => new Map(initialCocktails.map((cocktail) => [cocktail.id, cocktail])),
  )
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [saveErrorMessage, setSaveErrorMessage] = useState<string>()
  const [isSaving, setIsSaving] = useState(false)
  const [isSaveCompleteOpen, setIsSaveCompleteOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        setIsLoading(true)
        setErrorMessage(undefined)

        const result = await getCocktails(
          query.trim() ? { keyword: query.trim() } : {},
          controller.signal,
        )
        setCocktails(result.cocktails)
      } catch (error) {
        if (controller.signal.aborted) return
        console.error(error)
        setCocktails([])
        setErrorMessage('칵테일을 불러오지 못했습니다.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }, 250)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const toSelection = (cocktail: CocktailSummary): CocktailSelection => ({
    id: cocktail.cocktailId,
    name: cocktail.nameKo || cocktail.nameEn,
    description: cocktail.description,
    temperature: `${cocktail.alcoholDegree}°`,
    image: cocktail.imageUrl,
  })

  const toggleCocktail = (cocktail: CocktailSummary) => {
    setSelectedCocktails((current) => {
      const next = new Map(current)
      const selectedCocktail = next.get(cocktail.cocktailId)
      if (selectedCocktail?.recordId !== undefined) return current
      if (selectedCocktail) next.delete(cocktail.cocktailId)
      else next.set(cocktail.cocktailId, toSelection(cocktail))
      return next
    })
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setSaveErrorMessage(undefined)
      await onSave(Array.from(selectedCocktails.values()))
      setIsSaveCompleteOpen(true)
    } catch (error) {
      console.error(error)
      setSaveErrorMessage('칵테일 기록을 저장하지 못했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCloseSaveComplete = () => {
    setIsSaveCompleteOpen(false)
    onClose()
  }

  return (
    <section className="cocktail-search" aria-label="칵테일 검색 및 선택">
      <input
        className="cocktail-search__input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="칵테일 검색..."
        aria-label="칵테일 검색"
      />

      <div className="cocktail-search__list">
        {isLoading && <p className="cocktail-search__status">불러오는 중...</p>}
        {!isLoading && errorMessage && (
          <p className="cocktail-search__status cocktail-search__status--error">
            {errorMessage}
          </p>
        )}
        {!isLoading && !errorMessage && cocktails.length === 0 && (
          <p className="cocktail-search__status">검색 결과가 없습니다.</p>
        )}
        {!isLoading && cocktails.map((cocktail) => (
          <button
            key={cocktail.cocktailId}
            type="button"
            className={`cocktail-search__item${selectedCocktails.has(cocktail.cocktailId) ? ' is-selected' : ''}${selectedCocktails.get(cocktail.cocktailId)?.recordId !== undefined ? ' is-saved' : ''}`}
            onClick={() => toggleCocktail(cocktail)}
            aria-disabled={selectedCocktails.get(cocktail.cocktailId)?.recordId !== undefined}
          >
            <img src={cocktail.imageUrl} alt="" />
            <span className="cocktail-search__copy">
              <strong>{cocktail.nameKo || cocktail.nameEn}</strong>
              <small>{cocktail.description}</small>
            </span>
            <b>{cocktail.alcoholDegree}°</b>
          </button>
        ))}
      </div>

      <div className="cocktail-search__fade" aria-hidden="true" />
      <HistoryPrimaryButton
        className="cocktail-search__save"
        onClick={() => void handleSave()}
        disabled={isSaving}
      >
        {isSaving ? '저장 중...' : '저장하기'}
      </HistoryPrimaryButton>
      {saveErrorMessage && (
        <p className="cocktail-search__save-error">{saveErrorMessage}</p>
      )}

      {isSaveCompleteOpen && (
        <SaveCompleteModal title="저장 완료되었습니다" onClose={handleCloseSaveComplete} />
      )}
    </section>
  )
}

export default CocktailSearchOverlay
export type { CocktailSearchOverlayProps, CocktailSelection }
