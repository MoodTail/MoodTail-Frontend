import { useEffect, useState } from 'react'
import CompleteModal from '../../components/MyPage/CompleteModal'
import NicknameEditOverlay from './NicknameEditOverlay'
import { getMyPage, updateProfile } from '../../api/users/users.api'
import type { RepresentativeMoodType } from '../../api/users/users.types'
import { CHARACTER_IMAGES, CHARACTER_LABELS, type CharacterType } from '../../constants/characters'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import '../../styles/ProfileEdit.css'

const SAVED_MODAL_DURATION_MS = 1200

// TODO: 프로필 조회 실패(로그인 미연동 등) 시 폴백으로 사용
const MOCK_PROFILE = {
  nickname: '임시 닉네임',
  characterType: 'romantic' as CharacterType,
}

// typeCode(백엔드) -> CharacterType(프론트) 매핑. 대표 캐릭터 "선택"은 다른 화면(도감 등) 담당,
// 여기서는 API로 받은 값을 그대로 표시만 함
function resolveCharacterType(typeCode?: string | null): CharacterType | null {
  if (!typeCode) return null
  const normalized = typeCode.toLowerCase()
  return normalized in CHARACTER_IMAGES ? (normalized as CharacterType) : null
}

interface ProfileEditProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function ProfileEdit({ onBack }: ProfileEditProps) {
  const [nickname, setNickname] = useState(MOCK_PROFILE.nickname)
  const [representativeMoodType, setRepresentativeMoodType] = useState<RepresentativeMoodType | null>(null)
  const characterType =
    resolveCharacterType(representativeMoodType?.typeCode) ?? MOCK_PROFILE.characterType
  // API가 실제 캐릭터 이미지/이름을 내려주면 그걸 우선 사용, 없으면 로컬 mock으로 폴백
  const avatarImageSrc = representativeMoodType?.characterImageUrl ?? CHARACTER_IMAGES[characterType]
  const characterLabel = representativeMoodType?.name ?? CHARACTER_LABELS[characterType]
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    getMyPage()
      .then((result) => {
        if (cancelled) return
        setNickname(result.nickname)
        setRepresentativeMoodType(result.representativeMoodType)
      })
      .catch(() => {
        // TODO: 실제 로그인 연동 전까지는 401이 정상이라 조용히 mock으로 폴백
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

  const handleSelectCharacter = () => {
    // TODO: 기본/해금 캐릭터 선택 화면 연결
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
          <img className="profile-edit__avatar-image" src={avatarImageSrc} alt="" />
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
