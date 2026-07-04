import { useState } from "react";
import { COLORS } from "../theme/colors";
import { TYPES } from "../data/types";
import Modal from "./Modal";
import {
  CloseIcon,
  CopyIcon,
  FacebookIcon,
  InstagramIcon,
  KakaoIcon,
  Mascot,
  NaverIcon,
  TrophyIcon,
  UnlockedIcon,
} from "./icons";

const SHARE_URL = "moodtail.app/dex/u/8f21ac";
const BADGE_COLORS = ["#FF9448", "#5CA6D9", "#D77CC0"];

export default function DexShareModal({
  repTypeId,
  onClose,
  onShared,
  onSaved,
}: {
  repTypeId: string;
  onClose: () => void;
  onShared: () => void;
  onSaved: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const repType = TYPES.find((t) => t.id === repTypeId)!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${SHARE_URL}`);
    } catch {
      // clipboard may be unavailable; ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: COLORS.orange }}>MoodTail</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <CloseIcon />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <Mascot size={40} color={repType.color} />
        <div>
          <div style={{ fontSize: 11, color: COLORS.inkSoft, fontWeight: 600 }}>대표 타입</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.ink }}>{repType.name}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {BADGE_COLORS.map((c, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: COLORS.chipBg,
              borderRadius: 12,
              padding: "8px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TrophyIcon color={c} size={26} />
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: "9px 12px",
          marginBottom: 14,
        }}
      >
        <span style={{ fontSize: 11.5, color: COLORS.inkSoft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {SHARE_URL}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 700,
            color: COLORS.orange,
            flexShrink: 0,
          }}
        >
          <CopyIcon /> {copied ? "복사됨" : "URL 복사하기"}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 18 }}>
        <KakaoIcon />
        <FacebookIcon />
        <NaverIcon />
        <InstagramIcon />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginBottom: 18,
        }}
      >
        {TYPES.map((t) => (
          <div
            key={t.id}
            style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: "10px 4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <UnlockedIcon color={t.color} size={26} />
            <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.ink }}>{t.name}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onSaved}
          style={{
            flex: 1,
            border: `1px solid ${COLORS.border}`,
            background: "#fff",
            color: COLORS.ink,
            fontSize: 13,
            fontWeight: 700,
            padding: "12px 0",
            borderRadius: 14,
            cursor: "pointer",
          }}
        >
          이미지 저장
        </button>
        <button
          onClick={onShared}
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
      </div>
    </Modal>
  );
}
