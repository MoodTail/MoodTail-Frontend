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

// 백엔드 실제 typeCode(GET /api/v1/mood-types) 기준으로 키를 맞춤.
// 이미지/이름은 API의 characterImageUrl/name을 우선 사용하고, 아래 값들은
// (1) 프로필 상단 그라데이션 배경(API가 색상을 내려주지 않아 로컬에서 결정)
// (2) 대표 캐릭터 미설정/조회 실패 시 mock 폴백 용도로만 씀
export const CHARACTER_GRADIENTS = {
  'easygoing-optimist': 'linear-gradient(180deg, #e3f9f3 -30%, #ffda61 70%, #fd7a15 100%)',
  'free-spirited-romantic': 'linear-gradient(180deg, #ffe176 0%, #ff9458 35%, #ff9458 65%, #ff6e0c 100%)',
  'refreshing-explorer': 'linear-gradient(180deg, #fde5ca 50%, #fda8a8 100%)',
  'passionate-challenger': 'linear-gradient(180deg, #1564fe 0%, #c9e0ff 100%)',
  'grounded-realist': 'linear-gradient(180deg, #508af7 0%, #e1ecf4 100%)',
  'emotional-thinker': 'linear-gradient(180deg, #8ab7d4 0%, #457eab 35%, #457eab 65%, #a6d2ea 100%)',
  'explosive-adventurer': 'linear-gradient(180deg, #fca22b 0%, #fb3f11 35%, #fb3f11 65%, #f87909 100%)',
  'meticulous-critic': 'linear-gradient(180deg, #ffebe1 -30%, #ff682c 10%, #fd966d 65%, #fcb99e 100%)',
  'sensitive-perfectionist': 'linear-gradient(180deg, #d18155 0%, #9f2b03 35%, #9f2b03 65%, #ca6d30 100%)',
  'steadfast-principlist': 'linear-gradient(180deg, #dbda87 -30%, #6fdcb3 35%, #f2e69e 100%)',
  'quiet-supporter': 'linear-gradient(180deg, #fde3ad -30%, #21a26a 30%, #fde3ad 100%)',
  'balanced-mediator': 'linear-gradient(180deg, #fdf6e2 0%, #bde67a 35%, #bde67a 65%, #ceedb1 100%)',
} as const

export type CharacterType = keyof typeof CHARACTER_GRADIENTS

// mock 폴백 전용 로컬 이미지 (실제 캐릭터 이미지는 API의 characterImageUrl 사용)
export const CHARACTER_IMAGES: Record<CharacterType, string> = {
  'easygoing-optimist': idealistCharacter,
  'free-spirited-romantic': romanticCharacter,
  'refreshing-explorer': visionaryCharacter,
  'passionate-challenger': disciplinarianCharacter,
  'grounded-realist': realistCharacter,
  'emotional-thinker': melancholicCharacter,
  'explosive-adventurer': adventurerCharacter,
  'meticulous-critic': sharpCharacter,
  'sensitive-perfectionist': analystCharacter,
  'steadfast-principlist': stabilistCharacter,
  'quiet-supporter': gentleCharacter,
  'balanced-mediator': pacifistCharacter,
}

// mock 폴백 전용 로컬 라벨 (실제 이름은 API의 name 사용)
export const CHARACTER_LABELS: Record<CharacterType, string> = {
  'easygoing-optimist': '이상주의자',
  'free-spirited-romantic': '낭만주의자',
  'refreshing-explorer': '환상가',
  'passionate-challenger': '규칙주의자',
  'grounded-realist': '현실주의자',
  'emotional-thinker': '잔잔한 캐릭터',
  'explosive-adventurer': '열정적인 캐릭터',
  'meticulous-critic': '날카로운 캐릭터',
  'sensitive-perfectionist': '분석가',
  'steadfast-principlist': '안정주의자',
  'quiet-supporter': '부드러운 캐릭터',
  'balanced-mediator': '평화주의자',
}

export const CHARACTER_ORDER: CharacterType[] = [
  'easygoing-optimist',
  'free-spirited-romantic',
  'refreshing-explorer',
  'passionate-challenger',
  'grounded-realist',
  'emotional-thinker',
  'explosive-adventurer',
  'meticulous-critic',
  'sensitive-perfectionist',
  'steadfast-principlist',
  'quiet-supporter',
  'balanced-mediator',
]
