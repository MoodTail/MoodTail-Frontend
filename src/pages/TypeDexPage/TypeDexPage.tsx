
import { useState } from "react";
import drink0 from "../../assets/drinks/0.png";
import drinkImages from "../../assets/drinks";
import { COLORS } from "../../theme/colors";
import { TYPES } from "../../data/types";
import { DEX_DATA } from "../../data/dexData";
import { getCharacterType } from "../../data/characterType";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import DexBackground from "../../components/DexBackground";
import LockedCocktailModal from "../../components/LockedCocktailModal";
import DexBox from "../../components/DexBox";
import TwoButtonModal from "../../components/common/modal/TwoButtonModal";

export default function TypeDexPage({
  repTypeId,
  dexStatus,
  onOpenTypeDetail,
  onShare,
  onGoTest,
  isLoggedIn,
  onGoToLogin,
}: {
  repTypeId: string;
  dexStatus?: Record<string, { unlocked: boolean; collectionRate: number }>;
  onOpenType: (typeId: string) => void;
  onOpenTypeDetail: (typeId: string) => void;
  onShare: () => void;
  onGoTest: () => void;
  isLoggedIn: boolean;
  onGoToLogin: () => void;
}) {
  const repType = TYPES.find((t) => t.id === repTypeId)!;
  const repCharacterType = getCharacterType(repTypeId);
  const repDexEntry = DEX_DATA.find((d) => d.typeId === repTypeId);
  const repImg = repDexEntry ? drinkImages[repDexEntry.id] : drink0;
  const [lockedName, setLockedName] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <PhoneFrame background={<DexBackground />}>
      <div style={{ padding: "18px 20px 0", flex: 1 }}>
        <Header
          title="캐릭터 도감"
          titleSize={20}
          right={
            <button
              onClick={onShare}
              style={{
                width: 80,
                border: "none",
                background: COLORS.orange,
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                padding: "7px 12px",
                borderRadius: 20,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              도감 공유
            </button>
          }
        />

        <button
          onClick={() => (isLoggedIn ? onOpenTypeDetail(repType.id) : setShowLoginModal(true))}
          style={{
            background: '#FFFAF9',
            border: "1px solid #fff",
            borderRadius: 20,
            boxShadow: "0 6px 20px rgba(255, 111, 79, 0.12), 0 2px 6px rgba(43, 35, 28, 0.06)",
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
            width: "100%",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <img src={repImg} alt="" style={{ width: 104, height: 104, objectFit: "contain", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.ink }}>{repCharacterType.name}</div>
          </div>
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            rowGap: 22,
            columnGap: 12,
            paddingBottom: 20,
          }}
        >
          {DEX_DATA.map((dex) => {
            const status = dexStatus?.[dex.typeId];
            const unlocked = status?.unlocked ?? dex.unlocked;
            const collectionRate = status?.collectionRate ?? dex.collectionRate;
            const raiseImage = [
              "idealist",
              "romantic",
              "fantasist",
              "passionate",
              "analyst",
              "critic",
              "peacemaker",
              "stable",
            ].includes(dex.typeId);
            return (
              <DexBox
                key={dex.id}
                drinkImg={drinkImages[dex.id]}
                typeId={dex.typeId}
                unlocked={unlocked}
                collectionRate={collectionRate}
                nameFontSize={12}
                nameSplitAtSpace
                nameOverflowVisible
                boxAspectRatio="1 / 1"
                contentJustify="flex-start"
                imageGap={5}
                imageMarginTop={raiseImage ? 4 : 10}
                imageMarginLeft={dex.typeId === "critic" ? 6 : undefined}
                imageWidth="70%"
                imageHeight="57%"
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowLoginModal(true);
                    return;
                  }
                  if (unlocked) {
                    onOpenTypeDetail(dex.typeId);
                  } else {
                    setLockedName(getCharacterType(dex.typeId).name);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {lockedName && (
        <LockedCocktailModal
          name={lockedName}
          onClose={() => setLockedName(null)}
          onGoTest={() => {
            setLockedName(null);
            onGoTest();
          }}
        />
      )}

      {showLoginModal && (
        <TwoButtonModal
          isOpen
          title="로그인하고 기록을 저장해요"
          description="테스트 결과, 도감, 즐겨찾기를 이어서 사용할 수 있어요."
          leftButton={{
            label: "로그인하기",
            variant: "primary",
            onClick: onGoToLogin,
          }}
          rightButton={{
            label: "닫기",
            variant: "secondary",
            onClick: () => setShowLoginModal(false),
          }}
          onOverlayClick={() => setShowLoginModal(false)}
        />
      )}
    </PhoneFrame>
  );
}
