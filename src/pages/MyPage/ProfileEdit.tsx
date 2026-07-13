import { useEffect, useState } from 'react'
import CompleteModal from '../../components/MyPage/CompleteModal'
import NicknameEditOverlay from './NicknameEditOverlay'
import { CHARACTER_IMAGES, CHARACTER_LABELS, type CharacterType } from '../../constants/characters'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import '../../styles/ProfileEdit.css'

const SAVED_MODAL_DURATION_MS = 1200

// TODO: 실제 유저 정보 API 연동 후 실제 응답으로 대체
const MOCK_PROFILE = {
  nickname: '임시 닉네임',
  characterType: 'romantic' as CharacterType,
}

interface ProfileEditProps {
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
}

function ProfileEdit({ onBack }: ProfileEditProps) {
  const [nickname, setNickname] = useState(MOCK_PROFILE.nickname)
  // TODO: 캐릭터 선택 화면 나오면 state로 변경
  const characterType = MOCK_PROFILE.characterType
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [isEditingNickname, setIsEditingNickname] = useState(false)

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

  const handleSave = () => {
    // TODO: 프로필 저장 API 연동
    console.log('TODO: 프로필 저장', { nickname, characterType })
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
    <div className="profile-edit">
      <header className="profile-edit__header">
        <button type="button" className="profile-edit__back" onClick={handleBack} aria-label="뒤로가기">
          <img className="profile-edit__back-icon" src={chevronLeftIcon} alt="" aria-hidden="true" />
        </button>
        <h1 className="profile-edit__title">프로필 수정</h1>
      </header>

      <section className="profile-edit__card profile-edit__avatar-card">
        <button type="button" className="profile-edit__avatar" onClick={handleSelectCharacter}>
          <img className="profile-edit__avatar-image" src={CHARACTER_IMAGES[characterType]} alt="" />
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
          {CHARACTER_LABELS[characterType]}
        </button>
      </section>

      <button type="button" className="profile-edit__save" onClick={handleSave}>
        저장하기
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
