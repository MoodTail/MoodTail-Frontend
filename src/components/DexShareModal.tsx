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
import { CloseIcon } from "./icons";
import DexBox from "./DexBox";

const SHARE_BOX_SHADOW = "3px 4px 6px 0px rgba(255, 107, 53, 0.35)";

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
    link.download = "MoodTail_Result.png";
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
    <Modal onClose={onClose} background={<div style={{ position: "absolute", inset: 0, background: "#fff" }} />} maxWidth={360}>
      <div style={{ position: "relative" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <CloseIcon />
        </button>

        {/* 이미지 저장/공유 시 캡처되는 영역 — 닫기 버튼과 하단 액션 버튼은 이 밖에 있어 캡처에서 제외됩니다 */}
        <div ref={cardRef} style={{ background: "#fff", padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: COLORS.orange }}>MoodTail</span>
          </div>

          <div
            style={{
              background: COLORS.card,
              border: "1px solid #fff",
              borderRadius: 20,
              padding: "19px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 14,
              boxShadow: SHARE_BOX_SHADOW,
            }}
          >
          <img src={repImg} alt="" style={{ width: 64, height: 64, objectFit: "contain", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600, marginBottom: 4 }}>
              대표 타입
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: COLORS.ink,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {characterType.name}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {DEX_DATA.map((dex) => {
            const status = dexStatus?.[dex.typeId];
            return (
              <div key={dex.id} style={{ width: "calc((100% - 20px) / 3)" }}>
                <DexBox
                  drinkImg={drinkImages[dex.id]}
                  typeId={dex.typeId}
                  unlocked={status?.unlocked ?? dex.unlocked}
                  collectionRate={status?.collectionRate ?? dex.collectionRate}
                  border="1px solid #fff"
                  boxShadow={SHARE_BOX_SHADOW}
                  nameFontSize={8}
                />
              </div>
            );
          })}
        </div>
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
            borderRadius: 20,
            cursor: "pointer",
          }}
        >
          SNS 공유하기
        </button>
        <button
          onClick={handleSaveImage}
          style={{
            flex: 1,
            border: "1px solid #fff",
            background: "#fff",
            color: COLORS.orange,
            fontSize: 13,
            fontWeight: 700,
            padding: "12px 0",
            borderRadius: 20,
            boxShadow: SHARE_BOX_SHADOW,
            cursor: "pointer",
          }}
        >
          이미지 저장
        </button>
      </div>
    </Modal>
  );
}
