import idealistCharacter from '../assets/characters/idealist.svg'
import romanticCharacter from '../assets/characters/romantic.svg'
import visionaryCharacter from '../assets/characters/visionary.svg'
import disciplinarianCharacter from '../assets/characters/disciplinarian.svg'
import realistCharacter from '../assets/characters/realist.svg'
import melancholicCharacter from '../assets/characters/melancholic.svg'
import adventurerCharacter from '../assets/characters/adventurer.png'
import sharpCharacter from '../assets/characters/sharp.svg'
import analystCharacter from '../assets/characters/analyst.svg'
import stabilistCharacter from '../assets/characters/stabilist.svg'
import gentleCharacter from '../assets/characters/gentle.svg'
import pacifistCharacter from '../assets/characters/pacifist.svg'

// TODO: 캐릭터 타입이 추가되면 함께 갱신 (지금은 12종 확정)
// TODO: melancholic, adventurer, sharp, gentle은 공식 명칭을 아직 안 받아서 임시로 지은 키값 - 이름 확정되면 교체
export const CHARACTER_GRADIENTS = {
  idealist: 'linear-gradient(180deg, #e3f9f3 -30%, #ffda61 70%, #fd7a15 100%)',
  romantic: 'linear-gradient(180deg, #ffe176 0%, #ff9458 35%, #ff9458 65%, #ff6e0c 100%)',
  visionary: 'linear-gradient(180deg, #fde5ca 50%, #fda8a8 100%)',
  disciplinarian: 'linear-gradient(180deg, #1564fe 0%, #c9e0ff 100%)',
  realist: 'linear-gradient(180deg, #508af7 0%, #e1ecf4 100%)',
  melancholic: 'linear-gradient(180deg, #8ab7d4 0%, #457eab 35%, #457eab 65%, #a6d2ea 100%)',
  adventurer: 'linear-gradient(180deg, #fca22b 0%, #fb3f11 35%, #fb3f11 65%, #f87909 100%)',
  sharp: 'linear-gradient(180deg, #ffebe1 -30%, #ff682c 10%, #fd966d 65%, #fcb99e 100%)',
  analyst: 'linear-gradient(180deg, #d18155 0%, #9f2b03 35%, #9f2b03 65%, #ca6d30 100%)',
  stabilist: 'linear-gradient(180deg, #dbda87 -30%, #6fdcb3 35%, #f2e69e 100%)',
  gentle: 'linear-gradient(180deg, #fde3ad -30%, #21a26a 30%, #fde3ad 100%)',
  pacifist: 'linear-gradient(180deg, #fdf6e2 0%, #bde67a 35%, #bde67a 65%, #ceedb1 100%)',
} as const

export type CharacterType = keyof typeof CHARACTER_GRADIENTS

export const CHARACTER_IMAGES: Record<CharacterType, string> = {
  idealist: idealistCharacter,
  romantic: romanticCharacter,
  visionary: visionaryCharacter,
  disciplinarian: disciplinarianCharacter,
  realist: realistCharacter,
  melancholic: melancholicCharacter,
  adventurer: adventurerCharacter,
  sharp: sharpCharacter,
  analyst: analystCharacter,
  stabilist: stabilistCharacter,
  gentle: gentleCharacter,
  pacifist: pacifistCharacter,
}

// TODO: 미확정 캐릭터(melancholic/adventurer/sharp/gentle) 공식 명칭 나오면 교체
export const CHARACTER_LABELS: Record<CharacterType, string> = {
  idealist: '이상주의자',
  romantic: '낭만주의자',
  visionary: '환상가',
  disciplinarian: '규칙주의자',
  realist: '현실주의자',
  melancholic: '잔잔한 캐릭터',
  adventurer: '열정적인 캐릭터',
  sharp: '날카로운 캐릭터',
  analyst: '분석가',
  stabilist: '안정주의자',
  gentle: '부드러운 캐릭터',
  pacifist: '평화주의자',
}

export const CHARACTER_ORDER: CharacterType[] = [
  'idealist',
  'romantic',
  'visionary',
  'disciplinarian',
  'realist',
  'melancholic',
  'adventurer',
  'sharp',
  'analyst',
  'stabilist',
  'gentle',
  'pacifist',
]
