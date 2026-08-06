import { useState } from "react";
import { COLORS } from "../../theme/colors";
import type { DexGridEntry } from "../../data/moodTypes";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import DexBackground from "../../components/DexBackground";
import LockedCocktailModal from "../../components/LockedCocktailModal";
import DexBox from "../../components/DexBox";

export default function CharacterDexPage({
  entry,
  entries,
  onShare,
  onOpenDetail,
  onOpenTypeDetail,
  onGoTest,
}: {
  entry: DexGridEntry;
  entries: DexGridEntry[];
  onShare: () => void;
  onOpenDetail: () => void;
  onOpenTypeDetail: (typeCode: string) => void;
  onGoTest: () => void;
}) {
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
          <img src={entry.image} alt="" style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink }}>{entry.name}</div>
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
            수집률 {entry.collectionRate}%
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
          {entries.map((e) => (
            <DexBox
              key={e.typeCode}
              image={e.image}
              name={e.name}
              accent={e.accent}
              unlocked={e.unlocked}
              collectionRate={e.collectionRate}
              onClick={
                e.unlocked
                  ? () => onOpenTypeDetail(e.typeCode)
                  : () => setLockedName(e.name)
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
