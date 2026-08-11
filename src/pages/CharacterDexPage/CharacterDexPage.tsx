import { useState } from "react";
import drink0 from "../../assets/drinks/0.png";
import drinkImages from "../../assets/drinks";
import { COLORS } from "../../theme/colors";
import type { PersonalityType } from "../../data/types";
import { DEX_DATA } from "../../data/dexData";
import { getCharacterType } from "../../data/characterType";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import DexBackground from "../../components/DexBackground";
import LockedCocktailModal from "../../components/LockedCocktailModal";
import DexBox from "../../components/DexBox";

export default function CharacterDexPage({
  type,
  dexStatus,
  onShare,
  onOpenDetail,
  onOpenTypeDetail,
  onGoTest,
}: {
  type: PersonalityType;
  dexStatus?: Record<string, { unlocked: boolean; collectionRate: number }>;
  onShare: () => void;
  onOpenDetail: () => void;
  onOpenTypeDetail: (typeId: string) => void;
  onGoTest: () => void;
}) {
  const characterType = getCharacterType(type.id);
  const dexEntry = DEX_DATA.find((d) => d.typeId === type.id);
  const repImg = dexEntry ? drinkImages[dexEntry.id] : drink0;
  const unlockedCount = type.cocktails.filter((c) => c.unlocked).length;
  const collectRate = Math.round((unlockedCount / type.cocktails.length) * 100);
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
                height: 40,
                border: "1px solid white,",
                color: '#fff',
                background: COLORS.orange,
                fontSize: 11.5,
                fontWeight: 600,
                padding: "10px 12px",
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
          onClick={onOpenDetail}
          style={{
            background: '#FEFAF9',
            border: "1px solid white",
            borderRadius: 20,
            padding: 18,
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
            width: "100%",
            cursor: "pointer",
            textAlign: "left",
            boxShadow: "0 8px 20px rgba(255, 107, 53, 0.16)",
          }}
        >
          <img src={repImg} alt="" style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink }}>{characterType.name}</div>
          </div>
          <div
            style={{
              background: COLORS.orangeSoft,
              color: COLORS.orange,
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 9px",
              borderRadius: 14,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            수집률 {collectRate}%
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
