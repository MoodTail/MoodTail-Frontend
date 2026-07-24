import { useState } from "react";
import CompleteModal from "../../components/MyPage/CompleteModal";
import TwoButtonModal from "../../components/common/modal/TwoButtonModal";
import {
  CHARACTER_GRADIENTS,
  CHARACTER_IMAGES,
  type CharacterType,
} from "../../constants/characters";
import chevronRightIcon from "../../assets/icons/chevron-right.svg";
import "../../styles/MyPage.css";

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

// TODO: 유저 정보 API 연동 후 실제 응답으로 대체
const MOCK_USER = {
  nickname: "무드테일 소다",
  characterType: "visionary" as CharacterType,
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
  | "withdraw-confirm"
  | "withdraw-done"
  | "login-prompt";

interface MyPageProps {
  isLoggedIn?: boolean;
  // TODO: react-router-dom 도입되면 이 prop들 대신 라우팅으로 대체
  onEditProfile?: () => void;
  onInquiry?: () => void;
  onTerms?: () => void;
}

function MyPage({
  isLoggedIn = true,
  onEditProfile,
  onInquiry,
  onTerms,
}: MyPageProps) {
  const [modalStep, setModalStep] = useState<ModalStep>("none");
  const [guestId] = useState(generateGuestId);

  const { nickname, characterType, testCount, monthlyCount, collectedCount } =
    MOCK_USER;

  const closeModal = () => setModalStep("none");

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile();
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
    // TODO: react-router-dom 도입 후 로그인 페이지로 라우팅 연결
    console.log("TODO: 로그인 페이지로 이동");
  };

  const handleLogout = () => {
    // TODO: 로그아웃 API 연동
    setModalStep("logout-done");
  };

  const handleWithdraw = () => {
    // TODO: 회원 탈퇴 API 연동
    setModalStep("withdraw-done");
  };

  return (
    <div className="mypage">
      <section
        className="mypage__profile"
        style={
          isLoggedIn
            ? { background: CHARACTER_GRADIENTS[characterType] }
            : undefined
        }
      >
        {isLoggedIn ? (
          <>
            <div className="mypage__avatar" aria-hidden="true">
              {CHARACTER_IMAGES[characterType] ? (
                <img
                  className="mypage__avatar-image"
                  src={CHARACTER_IMAGES[characterType]}
                  alt=""
                />
              ) : (
                "🍹"
              )}
            </div>
            <p className="mypage__nickname">{nickname}</p>
          </>
        ) : (
          <button
            type="button"
            className="mypage__profile-trigger"
            onClick={() => setModalStep("login-prompt")}
          >
            <div
              className="mypage__avatar mypage__avatar--empty"
              aria-hidden="true"
            >
              <span className="mypage__nickname mypage__nickname--guest">
                로그인이 필요해요!
              </span>
            </div>
            <p className="mypage__guest-id">user: {guestId}</p>
          </button>
        )}
      </section>

      <div className="mypage__panel">
        <section className="mypage__stats">
          <div className="mypage__stat-card">
            <p className="mypage__stat-value">{testCount}회</p>
            <p className="mypage__stat-label">총 테스트</p>
          </div>
          <div className="mypage__stat-card">
            <p className="mypage__stat-value">{monthlyCount}회</p>
            <p className="mypage__stat-label">이번달 기록</p>
          </div>
          {isLoggedIn && (
            <div className="mypage__stat-card">
              <p className="mypage__stat-value">{collectedCount}개</p>
              <p className="mypage__stat-label">수집 캐릭터</p>
            </div>
          )}
        </section>

        <nav className="mypage__menu" aria-label="마이페이지 메뉴">
          <button
            type="button"
            className="mypage__menu-item mypage__menu-item--highlight"
            onClick={handleEditProfile}
          >
            <span>프로필 수정</span>
            <MenuArrow />
          </button>

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

          {isLoggedIn && (
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
          button={{ label: "닫기", onClick: closeModal, variant: "primary" }}
        />
      )}

      <TwoButtonModal
        isOpen={modalStep === "login-prompt"}
        title="로그인하고 기록을 저장해요"
        description={"테스트 결과, 도감, 즐겨찾기를\n이어서 사용할 수 있어요."}
        leftButton={{
          label: "로그인하기",
          onClick: handleGoToLogin,
          variant: "primary",
        }}
        rightButton={{ label: "닫기", onClick: closeModal, variant: "secondary" }}
        onOverlayClick={closeModal}
      />
    </div>
  );
}

export default MyPage;
