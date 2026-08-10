import { useEffect, useState } from "react";
import CompleteModal from "../../components/MyPage/CompleteModal";
import TwoButtonModal from "../../components/common/modal/TwoButtonModal";
import { logout, withdraw } from "../../api/auth/auth.api";
import { getMyPage } from "../../api/users/users.api";
import type { MyPageResult } from "../../api/users/users.types";
import {
  CHARACTER_GRADIENTS,
  CHARACTER_IMAGES,
  CHARACTER_LABELS,
  type CharacterType,
} from "../../constants/characters";
import { RESULT_TYPE_THEMES } from "../../constants/resultTypeThemes";
import {
  PROFILE_AVATAR_STYLES,
  type ProfileAvatarStyle,
} from "../../constants/profileAvatarStyles";
import { DEX_DATA } from "../../data/dexData";
import { TYPECODE_TO_LOCAL_TYPE } from "../../data/typeCodeMapping";
import chevronRightIcon from "../../assets/icons/chevron-right.svg";
import "../../styles/MyPage.css";

// typeCode(백엔드) -> CharacterType(프론트) 매핑. 서로 다른 표기일 수 있어 소문자로 비교
function resolveCharacterType(typeCode?: string | null): CharacterType | null {
  if (!typeCode) return null
  const normalized = typeCode.trim().toLowerCase().replace(/_/g, '-')
  return (normalized in CHARACTER_GRADIENTS
    ? (normalized as CharacterType)
    : null)
}

function getNonEmptyValue(value?: string | null): string | null {
  const trimmed = value?.trim()
  return trimmed ? value! : null
}

function getDexCharacterName(typeCode?: string | null): string | null {
  const normalized = typeCode?.trim().toLowerCase().replace(/_/g, '-')
  if (!normalized) return null
  const localTypeId = TYPECODE_TO_LOCAL_TYPE[normalized]
  if (!localTypeId) return null
  return DEX_DATA.find((dex) => dex.typeId === localTypeId)?.name ?? null
}

const PREVIEW_MY_PAGE_CHARACTER_TYPE: CharacterType | null = null;
const PREVIEW_MY_PAGE_BACKEND_IMAGE_URL = PREVIEW_MY_PAGE_CHARACTER_TYPE
  ? `https://moodtail-bucket.s3.ap-southeast-2.amazonaws.com/public/mood-types/${PREVIEW_MY_PAGE_CHARACTER_TYPE}.png`
  : null;

function MenuArrow() {
  return (
    <img
      className="mypage__menu-arrow"
      src={chevronRightIcon}
      alt=""
      aria-hidden="true"
    />
  );
}

// TODO: 조회 실패(로그인 미연동 등) 시 폴백으로 사용
const MOCK_USER = {
  nickname: "무드테일 소다",
  characterType: "refreshing-explorer" as CharacterType,
  testCount: 8,
  monthlyCount: 3,
  collectedCount: 4,
};

// TODO: 실제 게스트 ID는 백엔드에서 발급, 지금은 화면 확인용으로 임시 생성
function generateGuestId() {
  return Math.random().toString(36).slice(2, 14);
}

type ModalStep =
  | "none"
  | "logout-confirm"
  | "logout-done"
  | "logout-error"
  | "withdraw-confirm"
  | "withdraw-done"
  | "withdraw-error";

export interface MyPageProfileSnapshot {
  profile: MyPageResult | null;
  nickname: string;
  avatarImageSrc: string;
  avatarStyle: ProfileAvatarStyle;
  characterLabel: string;
}

interface MyPageProps {
  isLoggedIn?: boolean;
  // TODO: react-router-dom 도입되면 이 prop들 대신 라우팅으로 대체
  onEditProfile?: (snapshot: MyPageProfileSnapshot) => void;
  onInquiry?: () => void;
  onTerms?: () => void;
  onLoggedOut?: () => void;
  onGoToLogin?: () => void;
}

function MyPage({
  isLoggedIn = true,
  onEditProfile,
  onInquiry,
  onTerms,
  onLoggedOut,
  onGoToLogin,
}: MyPageProps) {
  const [modalStep, setModalStep] = useState<ModalStep>("none");
  const [guestId] = useState(generateGuestId);
  const [profile, setProfile] = useState<MyPageResult | null>(null);

  useEffect(() => {
    // profile은 isLoggedIn일 때만 화면에 쓰이므로, 로그아웃 상태에서는 그냥 조회하지 않음
    if (!isLoggedIn) return;

    let cancelled = false;
    getMyPage()
      .then((result) => {
        if (!cancelled) setProfile(result);
      })
      .catch(() => {
        // TODO: 실제 로그인 연동 전까지는 401이 정상이라 조용히 mock으로 폴백
      });

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  const nickname = profile?.nickname ?? MOCK_USER.nickname;
  const previewThemeTypeCode = PREVIEW_MY_PAGE_CHARACTER_TYPE;
  const themeTypeCode =
    previewThemeTypeCode ??
    profile?.representativeMoodType?.typeCode?.trim().toLowerCase().replace(/_/g, '-');
  const resultTheme = themeTypeCode ? RESULT_TYPE_THEMES[themeTypeCode] : undefined;
  const characterType =
    PREVIEW_MY_PAGE_CHARACTER_TYPE ??
    resolveCharacterType(profile?.representativeMoodType?.typeCode) ??
    MOCK_USER.characterType;
  // API가 실제 캐릭터 이미지 URL을 내려주면 그걸 우선 사용, 없으면 로컬 mock 이미지로 폴백
  const avatarImageSrc =
    PREVIEW_MY_PAGE_BACKEND_IMAGE_URL ??
    (previewThemeTypeCode ? resultTheme?.characterImage : getNonEmptyValue(profile?.representativeMoodType?.characterImageUrl)) ??
    resultTheme?.characterImage ??
    CHARACTER_IMAGES[characterType];
  const characterLabel =
    (previewThemeTypeCode ? getDexCharacterName(previewThemeTypeCode) : getDexCharacterName(profile?.representativeMoodType?.typeCode)) ??
    (previewThemeTypeCode ? resultTheme?.name : getNonEmptyValue(profile?.representativeMoodType?.name)) ??
    resultTheme?.name ??
    CHARACTER_LABELS[characterType];
  const testCount = profile?.totalTestCount ?? MOCK_USER.testCount;
  const monthlyCount = profile?.monthlyRecordCount ?? MOCK_USER.monthlyCount;
  const collectedCount =
    profile?.unlockedMoodTypeCount ?? MOCK_USER.collectedCount;
  const avatarStyle = PROFILE_AVATAR_STYLES[characterType];

  const closeModal = () => setModalStep("none");

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile({ profile, nickname, avatarImageSrc, avatarStyle, characterLabel });
      return;
    }
    // TODO: react-router-dom 도입 후 프로필 수정 페이지로 라우팅 연결
    console.log("TODO: 프로필 수정 페이지로 이동");
  };

  const handleInquiry = () => {
    if (onInquiry) {
      onInquiry();
      return;
    }
    // TODO: react-router-dom 도입 후 문의하기 페이지로 라우팅 연결
    console.log("TODO: 문의하기 페이지로 이동");
  };

  const handleTerms = () => {
    if (onTerms) {
      onTerms();
      return;
    }
    // TODO: react-router-dom 도입 후 이용약관 페이지로 라우팅 연결
    console.log("TODO: 이용약관 페이지로 이동");
  };

  const handleGoToLogin = () => {
    if (onGoToLogin) {
      onGoToLogin();
      return;
    }
    // TODO: react-router-dom 도입 후 로그인 페이지로 라우팅 연결
    console.log("TODO: 로그인 페이지로 이동");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setModalStep("logout-done");
    } catch {
      setModalStep("logout-error");
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw();
      setModalStep("withdraw-done");
    } catch {
      setModalStep("withdraw-error");
    }
  };

  const handleLoggedOutDone = () => {
    closeModal();
    if (onLoggedOut) {
      onLoggedOut();
      return;
    }
    // TODO: react-router-dom 도입 후 로그인 화면으로 라우팅 연결
    console.log("TODO: 로그인 화면으로 이동");
  };

  return (
    <div className="mypage">
      <section
        className={`mypage__profile${isLoggedIn ? "" : " mypage__profile--guest"}`}
        style={
          isLoggedIn
            ? { background: CHARACTER_GRADIENTS[characterType] }
            : undefined
        }
      >
        {isLoggedIn ? (
          <>
            <div className="mypage__avatar" aria-hidden="true">
              {avatarImageSrc ? (
                <img
                  className="mypage__avatar-image"
                  src={avatarImageSrc}
                  alt=""
                  style={{
                    transform: `translate(${avatarStyle.x}px, ${avatarStyle.y}px) scale(${avatarStyle.scale})`,
                  }}
                />
              ) : (
                "🍹"
              )}
            </div>
            <p className="mypage__nickname">{nickname}</p>
          </>
        ) : (
          <div className="mypage__profile-trigger">
            <div
              className="mypage__avatar mypage__avatar--empty"
              aria-hidden="true"
            >
              <span className="mypage__nickname mypage__nickname--guest">
                로그인이 필요해요!
              </span>
            </div>
            <p className="mypage__guest-id">user: {guestId}</p>
          </div>
        )}
      </section>

      <div className="mypage__panel">
        {isLoggedIn && (
          <section className="mypage__stats">
            <div className="mypage__stat-card">
              <p className="mypage__stat-value">{testCount}회</p>
              <p className="mypage__stat-label">총 테스트</p>
            </div>
            <div className="mypage__stat-card">
              <p className="mypage__stat-value">{monthlyCount}회</p>
              <p className="mypage__stat-label">이번달 기록</p>
            </div>
            <div className="mypage__stat-card">
              <p className="mypage__stat-value">{collectedCount}개</p>
              <p className="mypage__stat-label">수집 캐릭터</p>
            </div>
          </section>
        )}

        <nav className="mypage__menu" aria-label="마이페이지 메뉴">
          {isLoggedIn && (
            <button
              type="button"
              className="mypage__menu-item mypage__menu-item--highlight"
              onClick={handleEditProfile}
            >
              <span>프로필 수정</span>
              <MenuArrow />
            </button>
          )}

          <button
            type="button"
            className="mypage__menu-item"
            onClick={handleInquiry}
          >
            <span>문의하기</span>
            <MenuArrow />
          </button>

          <button
            type="button"
            className="mypage__menu-item mypage__menu-item--muted"
            onClick={handleTerms}
          >
            <span>서비스 이용약관</span>
            <MenuArrow />
          </button>

          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="mypage__menu-item mypage__menu-item--danger"
                onClick={() => setModalStep("withdraw-confirm")}
              >
                <span>회원 탈퇴</span>
                <MenuArrow />
              </button>
              <button
                type="button"
                className="mypage__menu-item mypage__menu-item--muted"
                onClick={() => setModalStep("logout-confirm")}
              >
                <span>로그아웃</span>
                <MenuArrow />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="mypage__menu-item mypage__menu-item--highlight"
              onClick={handleGoToLogin}
            >
              <span>로그인하러가기</span>
              <MenuArrow />
            </button>
          )}
        </nav>
      </div>

      <TwoButtonModal
        isOpen={modalStep === "logout-confirm"}
        title="정말 로그아웃하시겠어요?"
        leftButton={{
          label: "로그아웃",
          onClick: handleLogout,
          variant: "secondary",
        }}
        rightButton={{ label: "닫기", onClick: closeModal, variant: "primary" }}
        onOverlayClick={closeModal}
      />

      {modalStep === "logout-done" && (
        <CompleteModal
          title="로그아웃 되었습니다"
          button={{ label: "닫기", onClick: handleLoggedOutDone, variant: "primary" }}
        />
      )}

      {modalStep === "logout-error" && (
        <CompleteModal
          title="로그아웃에 실패했습니다"
          description="잠시 후 다시 시도해주세요"
          button={{ label: "닫기", onClick: closeModal, variant: "primary" }}
        />
      )}

      <TwoButtonModal
        isOpen={modalStep === "withdraw-confirm"}
        title="정말 탈퇴하시겠어요?"
        description={"탈퇴 시 모든 데이터가 삭제되며,\n복구할 수 없습니다."}
        leftButton={{
          label: "탈퇴하기",
          onClick: handleWithdraw,
          variant: "secondary",
        }}
        rightButton={{ label: "닫기", onClick: closeModal, variant: "primary" }}
        onOverlayClick={closeModal}
      />

      {modalStep === "withdraw-done" && (
        <CompleteModal
          title="탈퇴가 완료되었습니다"
          button={{ label: "닫기", onClick: handleLoggedOutDone, variant: "primary" }}
        />
      )}

      {modalStep === "withdraw-error" && (
        <CompleteModal
          title="탈퇴에 실패했습니다"
          description="잠시 후 다시 시도해주세요"
          button={{ label: "닫기", onClick: closeModal, variant: "primary" }}
        />
      )}
    </div>
  );
}

export default MyPage;
