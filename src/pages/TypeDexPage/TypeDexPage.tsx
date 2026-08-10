
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

export default function TypeDexPage({
  repTypeId,
  dexStatus,
  onOpenTypeDetail,
  onShare,
  onGoTest,
}: {
  repTypeId: string;
  dexStatus?: Record<string, { unlocked: boolean; collectionRate: number }>;
  onOpenType: (typeId: string) => void;
  onOpenTypeDetail: (typeId: string) => void;
  onShare: () => void;
  onGoTest: () => void;
}) {
  const repType = TYPES.find((t) => t.id === repTypeId)!;
  const repCharacterType = getCharacterType(repTypeId);
  const repDexEntry = DEX_DATA.find((d) => d.typeId === repTypeId);
  const repImg = repDexEntry ? drinkImages[repDexEntry.id] : drink0;
  const [lockedName, setLockedName] = useState<string | null>(null);

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
          onClick={() => onOpenTypeDetail(repType.id)}
          style={{
            background: '#FFFAF9',
            border: "1px solid #fff",
            borderRadius: 20,
            boxShadow: "0 6px 20px rgba(255, 111, 79, 0.12), 0 2px 6px rgba(43, 35, 28, 0.06)",
            padding: "20px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
            width: "100%",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <img src={repImg} alt="" style={{ width: 84, height: 84, objectFit: "contain" }} />
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
            gap: 12,
            paddingBottom: 20,
          }}
        >
          {DEX_DATA.map((dex) => {
            const status = dexStatus?.[dex.typeId];
            const unlocked = status?.unlocked ?? dex.unlocked;
            const collectionRate = status?.collectionRate ?? dex.collectionRate;
            return (
              <DexBox
                key={dex.id}
                drinkImg={drinkImages[dex.id]}
                typeId={dex.typeId}
                unlocked={unlocked}
                collectionRate={collectionRate}
                onClick={
                  unlocked
                    ? () => onOpenTypeDetail(dex.typeId)
                    : () => setLockedName(getCharacterType(dex.typeId).name)
                }
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
    </PhoneFrame>
  );
}
