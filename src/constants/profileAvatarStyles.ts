import type { CharacterType } from './characters'

export type ProfileAvatarStyle = { scale: number; x: number; y: number }
export type ProfileCharacterChipColors = { background: string; color: string }

export const PROFILE_AVATAR_STYLES: Record<CharacterType, ProfileAvatarStyle> = {
  'easygoing-optimist': { scale: 1.3, x: -3, y: 20 },
  'free-spirited-romantic': { scale: 1.9, x: 5, y: 25 },
  'refreshing-explorer': { scale: 1.68, x: -8, y: 44 },
  'passionate-challenger': { scale: 1.1, x: 6, y: 30 },
  'grounded-realist': { scale: 0.98, x: 0, y: 35 },
  'emotional-thinker': { scale: 1.05, x: 2, y: 33 },
  'explosive-adventurer': { scale: 1.57, x: 0, y: 5 },
  'meticulous-critic': { scale: 1.1, x: 5, y: 50 },
  'sensitive-perfectionist': { scale: 1.25, x: 0, y: 26 },
  'steadfast-principlist': { scale: 1.15, x: 0, y: 25 },
  'quiet-supporter': { scale: 1.15, x: 0, y: 40 },
  'balanced-mediator': { scale: 1.3, x: 0, y: 24 },
}

export const PROFILE_CHARACTER_CHIP_COLORS: Record<CharacterType, ProfileCharacterChipColors> = {
  'easygoing-optimist': { background: '#3C9857', color: '#F7F0BB' },
  'free-spirited-romantic': { background: '#FE8A42', color: '#FEE8B1' },
  'refreshing-explorer': { background: '#FDA8A8', color: '#FFECB9' },
  'passionate-challenger': { background: '#FED653', color: '#FFFFFF' },
  'grounded-realist': { background: '#1665FE', color: '#CEE2FF' },
  'emotional-thinker': { background: '#346A99', color: '#BFD8E6' },
  'explosive-adventurer': { background: '#FA3D11', color: '#FFFFFF' },
  'meticulous-critic': { background: '#9F2B03', color: '#FC9F24' },
  'sensitive-perfectionist': { background: '#FE7E4C', color: '#FFFFFF' },
  'steadfast-principlist': { background: '#124480', color: '#FFFFFF' },
  'quiet-supporter': { background: '#A0DB9F', color: '#21A26A' },
  'balanced-mediator': { background: '#6DCC9F', color: '#FFFFFF' },
}
