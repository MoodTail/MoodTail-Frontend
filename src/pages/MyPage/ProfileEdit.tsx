import { useEffect, useState } from 'react'
import CompleteModal from '../../components/MyPage/CompleteModal'
import NicknameEditOverlay from './NicknameEditOverlay'
import { getMyPage, updateProfile } from '../../api/users/users.api'
import type { RepresentativeMoodType } from '../../api/users/users.types'
import {
  PROFILE_AVATAR_STYLES,
  type MyPageProfileSnapshot,
} from './MyPage'
import { CHARACTER_IMAGES, CHARACTER_LABELS, type CharacterType } from '../../constants/characters'
import { RESULT_TYPE_THEMES } from '../../constants/resultTypeThemes'
import { DEX_DATA } from '../../data/dexData'
import { TYPECODE_TO_LOCAL_TYPE } from '../../data/typeCodeMapping'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import '../../styles/ProfileEdit.css'

const SAVED_MODAL_DURATION_MS = 1200
const FALLBACK_CHARACTER_TYPE = 'free-spirited-romantic' as CharacterType

const MOCK_PROFILE = {
  nickname: '임시 닉네임',
  characterType: FALLBACK_CHARACTER_TYPE,
}

function normalizeTypeCode(typeCode?: string | null) {
  return typeCode?.trim().toLowerCase().replace(/_/g, '-') ?? null
}

function resolveCharacterType(typeCode?: string | null): CharacterType | null {
  const normalized = normalizeTypeCode(typeCode)
  if (!normalized) return null
  return normalized in CHARACTER_IMAGES ? (normalized as CharacterType) : null
}

function getNonEmptyValue(value?: string | null): string | null {
  const trimmed = value?.trim()
  return trimmed ? value! : null
}

function getDexCharacterName(typeCode?: string | null): string | null {
  const normalized = normalizeTypeCode(typeCode)
  if (!normalized) return null
  const localTypeId = TYPECODE_TO_LOCAL_TYPE[normalized]
  if (!localTypeId) return null
  return DEX_DATA.find((dex) => dex.typeId === localTypeId)?.name ?? null
}

interface ProfileEditProps {
  initialProfileSnapshot?: MyPageProfileSnapshot | null
  onBack?: () => void
}

function ProfileEdit({ initialProfileSnapshot, onBack }: ProfileEditProps) {
  const [nickname, setNickname] = useState(initialProfileSnapshot?.nickname ?? MOCK_PROFILE.nickname)
  const [representativeMoodType, setRepresentativeMoodType] = useState<RepresentativeMoodType | null>(
    initialProfileSnapshot?.profile?.representativeMoodType ?? null,
  )
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const themeTypeCode = normalizeTypeCode(representativeMoodType?.typeCode)
  const resultTheme = themeTypeCode ? RESULT_TYPE_THEMES[themeTypeCode] : undefined
  const characterType =
    resolveCharacterType(representativeMoodType?.typeCode) ?? MOCK_PROFILE.characterType
  const avatarImageSrc =
    getNonEmptyValue(initialProfileSnapshot?.avatarImageSrc) ??
    getNonEmptyValue(representativeMoodType?.characterImageUrl) ??
    resultTheme?.characterImage ??
    CHARACTER_IMAGES[characterType]
  const characterLabel =
    getNonEmptyValue(initialProfileSnapshot?.characterLabel) ??
    getDexCharacterName(representativeMoodType?.typeCode) ??
    getNonEmptyValue(representativeMoodType?.name) ??
    resultTheme?.name ??
    CHARACTER_LABELS[characterType]
  const avatarStyle =
    initialProfileSnapshot?.avatarStyle ?? PROFILE_AVATAR_STYLES[characterType]

  useEffect(() => {
    if (!initialProfileSnapshot) return
    setNickname(initialProfileSnapshot.nickname)
    setRepresentativeMoodType(initialProfileSnapshot.profile?.representativeMoodType ?? null)
  }, [initialProfileSnapshot])

  useEffect(() => {
    if (initialProfileSnapshot) return

    let cancelled = false

    getMyPage()
      .then((result) => {
        if (cancelled) return
        setNickname(result.nickname)
        setRepresentativeMoodType(result.representativeMoodType)
      })
      .catch(() => {
        // 로그인 연동 전/조회 실패 시에는 mock profile을 그대로 유지합니다.
      })

    return () => {
      cancelled = true
    }
  }, [initialProfileSnapshot])

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    console.log('TODO: 마이페이지로 돌아가기')
  }

  const handleSelectCharacter = () => {
    console.log('TODO: 캐릭터 선택 화면으로 이동')
  }

  const handleSave = async () => {
    setSaveError('')
    setIsSaving(true)
    try {
      const result = await updateProfile({ nickname })
      setNickname(result.nickname)
      setRepresentativeMoodType(result.representativeMoodType)
      setShowSavedModal(true)
    } catch {
      setSaveError('프로필 저장에 실패했습니다. 잠시 후 다시 시도해주세요')
    } finally {
      setIsSaving(false)
    }
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
    <div className="profile-edit">
      <header className="profile-edit__header">
        <button type="button" className="profile-edit__back" onClick={handleBack} aria-label="뒤로가기">
          <img className="profile-edit__back-icon" src={chevronLeftIcon} alt="" aria-hidden="true" />
        </button>
        <h1 className="profile-edit__title">프로필 수정</h1>
      </header>

      <section className="profile-edit__card profile-edit__avatar-card">
        <button type="button" className="profile-edit__avatar" onClick={handleSelectCharacter}>
          <img
            className="profile-edit__avatar-image"
            src={avatarImageSrc}
            alt=""
            style={{
              transform: `translate(${avatarStyle.x}px, ${avatarStyle.y}px) scale(${avatarStyle.scale})`,
            }}
          />
        </button>
        <p className="profile-edit__avatar-hint">프로필 이미지는 기본 또는 해금 캐릭터 중 선택</p>
      </section>

      <section className="profile-edit__card">
        <label className="profile-edit__label">닉네임</label>
        <button
          type="button"
          className={`profile-edit__nickname-display${
            nickname ? '' : ' profile-edit__nickname-display--empty'
          }`}
          onClick={() => setIsEditingNickname(true)}
        >
          {nickname || '닉네임을 입력해주세요'}
        </button>

        <p className="profile-edit__label profile-edit__label--character">대표 캐릭터</p>
        <button type="button" className="profile-edit__character-chip" onClick={handleSelectCharacter}>
          {characterLabel}
        </button>
      </section>

      {saveError && <p className="profile-edit__error">{saveError}</p>}

      <button
        type="button"
        className="profile-edit__save"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? '저장 중...' : '저장하기'}
      </button>

      {showSavedModal && <CompleteModal className="modal--saved" title="저장 완료되었습니다" />}

      {isEditingNickname && (
        <NicknameEditOverlay
          value={nickname}
          onChange={setNickname}
          onClose={() => setIsEditingNickname(false)}
        />
      )}
    </div>
  )
}

export default ProfileEdit
