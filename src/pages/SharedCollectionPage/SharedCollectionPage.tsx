import { useEffect, useState } from "react";
import drinkImages from "../../assets/drinks";
import { COLORS } from "../../theme/colors";
import { DEX_DATA } from "../../data/dexData";
import { getCharacterType } from "../../data/characterType";
import { TYPECODE_TO_LOCAL_TYPE } from "../../data/typeCodeMapping";
import { getSharedCollection } from "../../api/collections/collections.api";
import type { CollectionResult } from "../../api/collections/collections.types";
import Header from "../../components/Header";
import PhoneFrame from "../../components/PhoneFrame";
import DexBackground from "../../components/DexBackground";
import DexBox from "../../components/DexBox";

export default function SharedCollectionPage({
  shareToken,
  onGoHome,
}: {
  shareToken: string;
  onGoHome: () => void;
}) {
  const [collection, setCollection] = useState<CollectionResult | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    getSharedCollection(shareToken)
      .then((result) => {
        if (cancelled) return;
        setCollection(result);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("공유된 도감을 불러오지 못했습니다", err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [shareToken]);

  if (status === "loading") {
    return (
      <PhoneFrame background={<DexBackground />}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: COLORS.inkSoft }}>
          불러오는 중...
        </div>
      </PhoneFrame>
    );
  }

  if (status === "error" || !collection) {
    return (
      <PhoneFrame background={<DexBackground />}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 12,
            padding: 24,
            textAlign: "center",
          }}
        >
          <p style={{ color: COLORS.inkSoft, fontSize: 14 }}>
            공유된 도감을 찾을 수 없어요.<br />
            링크가 만료되었거나 잘못된 링크일 수 있어요.
          </p>
          <button
            type="button"
            onClick={onGoHome}
            style={{
              border: "none",
              background: COLORS.orange,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "12px 20px",
              borderRadius: 22,
              cursor: "pointer",
            }}
          >
            MoodTail 시작하기
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const repLocalId = TYPECODE_TO_LOCAL_TYPE[collection.representativeMoodType.typeCode];
  const repCharacterType = repLocalId ? getCharacterType(repLocalId) : null;
  const repDexEntry = repLocalId ? DEX_DATA.find((d) => d.typeId === repLocalId) : undefined;
  const repImg = repDexEntry ? drinkImages[repDexEntry.id] : undefined;

  const statusByLocalId: Record<string, { unlocked: boolean; collectionRate: number }> = {};
  collection.moodTypes.forEach((mt) => {
    const localId = TYPECODE_TO_LOCAL_TYPE[mt.typeCode];
    if (localId) statusByLocalId[localId] = { unlocked: mt.unlocked, collectionRate: mt.collectionRate };
  });

  return (
    <PhoneFrame background={<DexBackground />}>
      <div style={{ padding: "18px 20px 0", flex: 1 }}>
        <Header title="공유된 도감" onBack={onGoHome} titleSize={20} />

        {repCharacterType && (
          <div
            style={{
              background: "#FFFAF9",
              border: "1px solid #fff",
              borderRadius: 20,
              boxShadow: "0 6px 20px rgba(255, 111, 79, 0.12), 0 2px 6px rgba(43, 35, 28, 0.06)",
              padding: "20px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
              width: "100%",
            }}
          >
            {repImg && <img src={repImg} alt="" style={{ width: 84, height: 84, objectFit: "contain" }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
                대표 타입
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.ink }}>{repCharacterType.name}</div>
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            paddingBottom: 20,
          }}
        >
          {DEX_DATA.map((dex) => {
            const dexStatus = statusByLocalId[dex.typeId];
            return (
              <DexBox
                key={dex.id}
                drinkImg={drinkImages[dex.id]}
                typeId={dex.typeId}
                unlocked={dexStatus?.unlocked ?? false}
                collectionRate={dexStatus?.collectionRate}
              />
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}
