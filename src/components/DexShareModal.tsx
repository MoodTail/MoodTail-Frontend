import { useRef } from "react";
import { toBlob, toPng } from "html-to-image";
import drink0 from "../assets/drinks/0.png";
import drinkImages from "../assets/drinks";
import { COLORS } from "../theme/colors";
import type { PersonalityType } from "../data/types";
import { DEX_DATA } from "../data/dexData";
import { getCharacterType } from "../data/characterType";
import { createOrUpdateCollectionShare } from "../api/collections/collections.api";
import Modal from "./Modal";
import DexBackground from "./DexBackground";
import { CloseIcon } from "./icons";
import DexBox from "./DexBox";

export default function DexShareModal({
  type,
  dexStatus,
  onClose,
  onShareSns,
  onSaveImage,
}: {
  type: PersonalityType;
  dexStatus?: Record<string, { unlocked: boolean; collectionRate: number }>;
  onClose: () => void;
  onShareSns: (shareUrl?: string) => void;
  onSaveImage: () => void;
}) {
  const characterType = getCharacterType(type.id);
  const dexEntry = DEX_DATA.find((d) => d.typeId === type.id);
  const repImg = dexEntry ? drinkImages[dexEntry.id] : drink0;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (!cardRef.current) {
      onSaveImage();
      return;
    }
    // TODO: 지금은 웹 다운로드 방식. 실제 처리 방식(앱 내 저장 등) 확정되면 교체
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `moodtail-dex-${characterType.id}.png`;
    link.href = dataUrl;
    link.click();

    // 도감 공유 이미지 저장은 최선 노력으로만 시도합니다 — 실패해도(비로그인 등) 위의
    // 로컬 다운로드는 이미 끝났으므로 사용자 입장에서는 정상적으로 동작합니다.
    try {
      const blob = await toBlob(cardRef.current, { pixelRatio: 2 });
      if (blob) await createOrUpdateCollectionShare(blob);
    } catch (err) {
      console.error("도감 공유 이미지 저장에 실패했습니다", err);
    }
    onSaveImage();
  };

  const handleShareSns = async () => {
    if (!cardRef.current) {
      onShareSns();
      return;
    }
    try {
      const blob = await toBlob(cardRef.current, { pixelRatio: 2 });
      if (!blob) throw new Error("썸네일 이미지 생성에 실패했습니다");
      const { shareUrl } = await createOrUpdateCollectionShare(blob);
      onShareSns(shareUrl);
    } catch (err) {
      console.error("도감 공유 URL 생성에 실패했습니다", err);
      onShareSns();
    }
  };

  return (
    <Modal onClose={onClose} background={<DexBackground />} maxWidth={360}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.orange }}>MoodTail</span>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </button>
      </div>

      <div ref={cardRef}>
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20,
            padding: 18,
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 14,
            boxShadow: "0 8px 20px rgba(255, 107, 53, 0.16)",
          }}
        >
          <img src={repImg} alt="" style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.ink, whiteSpace: "nowrap" }}>
              {characterType.name}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {DEX_DATA.map((dex) => {
            const status = dexStatus?.[dex.typeId];
            return (
              <DexBox
                key={dex.id}
                drinkImg={drinkImages[dex.id]}
                typeId={dex.typeId}
                unlocked={status?.unlocked ?? dex.unlocked}
                collectionRate={status?.collectionRate ?? dex.collectionRate}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleShareSns}
          style={{
            flex: 1,
            border: "none",
            background: COLORS.orange,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            padding: "12px 0",
            borderRadius: 14,
            cursor: "pointer",
          }}
        >
          SNS 공유하기
        </button>
        <button
          onClick={handleSaveImage}
          style={{
            flex: 1,
            border: `1px solid ${COLORS.border}`,
            background: "#fff",
            color: COLORS.orange,
            fontSize: 13,
            fontWeight: 700,
            padding: "12px 0",
            borderRadius: 14,
            cursor: "pointer",
          }}
        >
          이미지 저장
        </button>
      </div>
    </Modal>
  );
}
