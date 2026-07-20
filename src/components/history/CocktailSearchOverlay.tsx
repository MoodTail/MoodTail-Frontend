import { useMemo, useState } from 'react'
import ginAndTonicImage from '../../assets/images/history/gin-and-tonic.png'
import pinaColadaImage from '../../assets/images/history/pina-colada.png'
import sunsetFizzImage from '../../assets/images/history/sunset-fizz.png'
import mojitoImage from '../../assets/images/history/mojito.png'
import HistoryPrimaryButton from './HistoryPrimaryButton'
import SaveCompleteModal from '../Modal/SaveCompleteModal'
import './CocktailSearchOverlay.css'

const cocktailSamples = [
  { name: '진 토닉', description: '청량하고 쌉쌀한 클래식 칵테일', temperature: '0°', image: ginAndTonicImage },
  { name: '피냐 콜라다', description: '달콤하고 부드러운 트로피컬 칵테일', temperature: '20°', image: pinaColadaImage },
  { name: '선셋 피즈', description: '상큼하고 청량한 과일 칵테일', temperature: '24°', image: sunsetFizzImage },
  { name: '모히토', description: '민트와 라임의 청량한 만남', temperature: '24°', image: mojitoImage },
] as const

const mockCocktails = Array.from({ length: 16 }, (_, index) => ({
  ...cocktailSamples[index % cocktailSamples.length],
  id: `mock-cocktail-${index}`,
}))

interface CocktailSearchOverlayProps {
  initialCocktails?: CocktailSelection[]
  onSave: (cocktails: CocktailSelection[]) => void
}

interface CocktailSelection {
  id: string
  name: string
  description: string
  temperature: string
  image: string
}

function CocktailSearchOverlay({
  initialCocktails = [],
  onSave,
}: CocktailSearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(initialCocktails.map((cocktail) => cocktail.id)),
  )
  const [isSaveCompleteOpen, setIsSaveCompleteOpen] = useState(false)
  const filteredCocktails = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return mockCocktails
    return mockCocktails.filter((cocktail) =>
      cocktail.name.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

  const toggleCocktail = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleCloseSaveComplete = () => {
    setIsSaveCompleteOpen(false)
    onSave(mockCocktails.filter((cocktail) => selectedIds.has(cocktail.id)))
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
        {filteredCocktails.map((cocktail) => (
          <button
            key={cocktail.id}
            type="button"
            className={`cocktail-search__item${selectedIds.has(cocktail.id) ? ' is-selected' : ''}`}
            onClick={() => toggleCocktail(cocktail.id)}
          >
            <img src={cocktail.image} alt="" />
            <span className="cocktail-search__copy">
              <strong>{cocktail.name}</strong>
              <small>{cocktail.description}</small>
            </span>
            <b>{cocktail.temperature}</b>
          </button>
        ))}
      </div>

      <div className="cocktail-search__fade" aria-hidden="true" />
      <HistoryPrimaryButton
        className="cocktail-search__save"
        onClick={() => setIsSaveCompleteOpen(true)}
      >
        저장하기
      </HistoryPrimaryButton>

      {isSaveCompleteOpen && (
        <SaveCompleteModal title="저장 완료되었습니다" onClose={handleCloseSaveComplete} />
      )}
    </section>
  )
}

export default CocktailSearchOverlay
export type { CocktailSearchOverlayProps, CocktailSelection }
