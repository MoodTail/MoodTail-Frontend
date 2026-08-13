import { useRef, useState, type FC } from "react";
import { toBlob, toPng } from "html-to-image";
import cocktail from "../../assets/images/glass/glass-1.png";
import MatchSummaryCard from "./MatchSummaryCard";
import SaveCompleteToast from "../common/SaveCompleteToast";
import ResultSnsShareModal from "../common/modal/ResultSnsShareModal";
import "../../styles/ShareResultModal.css";
import Button from "../Button/Button";

interface RankEntry {
  rank: number;
  name: string;
  description: string;
  percent: number;
  color: string;
}

interface ShareResultModalProps {
  onClose: () => void;
  onGenerateShare: (
    imageBlob: Blob,
  ) => Promise<{ shareUrl: string; shareImageUrl: string } | null>;
  topPick: {
    tagline: string;
    name: string;
    description: string;
    myMatchPercent: number;
    partnerMatchPercent: number;
    imageUrl?: string;
  };
  ranking: RankEntry[];
  matchPercent: number;
  myAvatarUrl?: string;
  partnerAvatarUrl?: string;
}

const ShareResultModal: FC<ShareResultModalProps> = ({
  onClose,
  onGenerateShare,
  topPick,
  ranking,
  matchPercent,
  myAvatarUrl,
  partnerAvatarUrl,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isSnsModalOpen, setIsSnsModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareImageUrl, setShareImageUrl] = useState("");
  const [capturedImageBlob, setCapturedImageBlob] = useState<Blob | null>(null);

  const captureCard = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    try {
      const card = cardRef.current;
      const images = Array.from(card.querySelectorAll("img"));
      await Promise.all(
        images.map(async (image) => {
          if (image.complete && image.naturalWidth > 0) return;
          await image.decode();
        }),
      );
      await document.fonts.ready;

      const captureOptions = {
        pixelRatio: 2,
        cacheBust: false,
        backgroundColor: "#ffffff",
      };

      const blob = await toBlob(card, captureOptions);
      if (!blob) throw new Error("이미지 생성에 실패했습니다.");
      return blob;
    } catch (error) {
      console.error("결과 카드 toBlob 캡처 실패, toPng로 재시도", error);
      try {
        const card = cardRef.current;
        const captureOptions = {
          pixelRatio: 2,
          cacheBust: false,
          backgroundColor: "#ffffff",
        };
        const dataUrl = await toPng(card, captureOptions);
        const res = await fetch(dataUrl);
        if (!res.ok) throw new Error(`PNG 변환 실패: ${res.status}`);
        const blob = await res.blob();
        if (!blob.size) throw new Error("빈 이미지가 생성되었습니다.");
        return blob;
      } catch (fallbackError) {
        console.error("결과 카드 toPng 캡처도 실패", fallbackError);
        return null;
      }
    }
  };

  const handleSaveImage = async () => {
    const blob = capturedImageBlob ?? (await captureCard());
    if (!blob) {
      alert("이미지 저장에 실패했어요. 잠시 후 다시 시도해주세요.");
      return;
    }
    if (!capturedImageBlob) setCapturedImageBlob(blob);
    const fileName = `moodtail-${topPick.name || "result"}.png`;
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
    setShowSaveToast(true);
  };

  const handleOpenSnsShare = async () => {
    setIsSharing(true);
    try {
      const blob = capturedImageBlob ?? (await captureCard());
      if (!blob) {
        alert("공유 링크 생성에 실패했어요. 잠시 후 다시 시도해주세요.");
        return;
      }
      if (!capturedImageBlob) setCapturedImageBlob(blob);
      const shareData = await onGenerateShare(blob);
      if (!shareData) {
        alert("공유 링크 생성에 실패했어요. 잠시 후 다시 시도해주세요.");
        return;
      }
      setShareUrl(shareData.shareUrl);
      setShareImageUrl(shareData.shareImageUrl);
      setIsSnsModalOpen(true);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="share-result-modal__overlay">
      <div className="share-result-modal">
        <button
          type="button"
          className="share-result-modal__close"
          onClick={onClose}
          aria-label="닫기"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15"
              stroke="#FF866A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 1L1 15"
              stroke="#FF866A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div ref={cardRef}>
          <p className="share-result-modal__brand">MoodTail</p>

          <div className="share-result-modal__top-card">
            <div className="share-result-modal__top-main">
              <img
                src={topPick.imageUrl || cocktail}
                alt={topPick.name}
                className="share-result-modal__top-image"
              />
              <div className="share-result-modal__top-text">
                <p className="share-result-modal__top-tagline">
                  {topPick.tagline}
                </p>
                <p className="share-result-modal__top-name">{topPick.name}</p>
                <p className="share-result-modal__top-desc">
                  {topPick.description}
                </p>
                <div className="share-result-modal__top-badges">
                  <span className="share-result-modal__top-badge share-result-modal__top-badge--mine">
                    나와의 일치율 {topPick.myMatchPercent}%
                  </span>
                  <span className="share-result-modal__top-badge share-result-modal__top-badge--friend">
                    상대방과의 일치율 {topPick.partnerMatchPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="share-result-modal__rank-title">추천 순위</p>
          <div className="share-result-modal__rank-list">
            {ranking.map((item) => (
              <div key={item.rank} className="share-result-modal__rank-item">
                <span
                  className="share-result-modal__rank-badge"
                  style={{ background: item.color }}
                >
                  {item.rank}
                </span>
                <div className="share-result-modal__rank-info">
                  <p className="share-result-modal__rank-name">{item.name}</p>
                  <p className="share-result-modal__rank-desc">
                    {item.description}
                  </p>
                </div>
                <span className="share-result-modal__rank-percent">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>

          <div className="share-result-modal__match-wrap">
            <MatchSummaryCard
              matchPercent={matchPercent}
              myAvatarUrl={myAvatarUrl}
              partnerAvatarUrl={partnerAvatarUrl}
              compact
            />
          </div>
        </div>

        <div className="share-result-modal__actions">
          <Button
            variant="share"
            className="share-result-modal__sns"
            onClick={() => void handleOpenSnsShare()}
            disabled={isSharing}
          >
            {isSharing ? "준비 중..." : "SNS 공유하기"}
          </Button>
          <Button
            variant="shareLight"
            className="share-result-modal__save"
            onClick={() => void handleSaveImage()}
          >
            이미지 저장
          </Button>
        </div>

        <ResultSnsShareModal
          isOpen={isSnsModalOpen}
          url={shareUrl}
          onClose={() => setIsSnsModalOpen(false)}
          kakaoShare={{
            title: `MoodTail - ${topPick.name}`,
            description: topPick.description,
            imageUrl: shareImageUrl,
            webUrl: shareUrl,
            buttonTitle: "결과 확인하기",
          }}
        />
      </div>

      <SaveCompleteToast
        message="저장 완료되었습니다"
        isVisible={showSaveToast}
        onHide={() => setShowSaveToast(false)}
      />
    </div>
  );
};

export default ShareResultModal;
