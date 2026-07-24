
import { useState } from "react";
import drink0 from "../../assets/drinks/0.png";
import drinkImages from "../../assets/drinks";
import { COLORS } from "../../theme/colors";
import { TYPES } from "../../data/types";
import { DEX_DATA } from "../../data/dexData";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import DexBackground from "../../components/DexBackground";
import LockedCocktailModal from "../../components/LockedCocktailModal";
import DexBox from "../../components/DexBox";

export default function TypeDexPage({
  repTypeId,
  onOpenTypeDetail,
  onShare,
  onBack,
  onGoTest,
}: {
  repTypeId: string;
  onOpenType: (typeId: string) => void;
  onOpenTypeDetail: (typeId: string) => void;
  onShare: () => void;
  onBack: () => void;
  onGoTest: () => void;
}) {
  const repType = TYPES.find((t) => t.id === repTypeId)!;
  const [lockedName, setLockedName] = useState<string | null>(null);

  return (
    <PhoneFrame background={<DexBackground />}>
      <div style={{ padding: "18px 20px 0", flex: 1 }}>
        <Header
          title="캐릭터 도감"
          onBack={onBack}
          right={
            <button
              onClick={onShare}
              style={{
                border: "none",
                background: COLORS.orange,
                color: "#fff",
                fontSize: 11.5,
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
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20,
            padding: 18,
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 18,
            width: "100%",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <img src={drink0} alt="" style={{ width: 60, height: 60, objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink }}>{repType.name}</div>
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
          {DEX_DATA.map((dex) => (
            <DexBox
              key={dex.id}
              drinkImg={drinkImages[dex.id]}
              name={dex.name}
              unlocked={dex.unlocked}
              collectionRate={dex.collectionRate}
              onClick={
                dex.typeId
                  ? () => onOpenTypeDetail(dex.typeId!)
                  : dex.unlocked
                    ? undefined
                    : () => setLockedName(dex.name)
              }
            />
          ))}
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
