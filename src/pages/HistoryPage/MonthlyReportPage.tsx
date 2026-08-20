import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toBlob, toPng } from "html-to-image";
import {
  getSharedMonthlyReport,
  getMonthlyReport,
  uploadMonthlyReportShareImage,
} from "../../api/reports/reports.api";
import type {
  MonthlyReportResult,
  MonthlyReportTasteProfile,
} from "../../api/reports/reports.types";
import chevronLeftIcon from "../../assets/icons/chevron-left.svg";
import monthlyReportCharacter from "../../assets/images/history/monthly_report_character.png";
import Button from "../../components/Button/Button";
import ActionCompleteToast from "../../components/Modal/ActionCompleteToast";
import MonthlyReportBackground from "../../components/common/MonthlyReportBackground";
import ResultSnsShareModal from "../../components/common/modal/ResultSnsShareModal";
import { CHARACTER_IMAGES, type CharacterType } from "../../constants/characters";
import { RESULT_TYPE_THEMES } from "../../constants/resultTypeThemes";
import "./MonthlyReportPage.css";

interface MonthlyReportPageProps {
  onBack: () => void;
  reportMonth: Date;
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function fitCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxSize: number,
  minSize: number,
  weight = 800,
) {
  let size = maxSize;
  while (size > minSize) {
    context.font = `${weight} ${size}px Pretendard, sans-serif`;
    if (context.measureText(text).width <= maxWidth) break;
    size -= 1;
  }
  context.font = `${weight} ${size}px Pretendard, sans-serif`;
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
) {
  const lines: string[] = [];
  let line = '';

  for (const character of text) {
    const candidate = line + character;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line.trimEnd());
      line = character.trimStart();
      if (lines.length === maxLines - 1) break;
    } else {
      line = candidate;
    }
  }

  if (line && lines.length < maxLines) lines.push(line.trim());
  return lines;
}

function getReportCharacterImage(report: MonthlyReportResult) {
  const typeCode = report.monthlyMoodType.typeCode as CharacterType;
  return report.monthlyMoodType.characterImageUrl
    ?? CHARACTER_IMAGES[typeCode]
    ?? monthlyReportCharacter;
}

function drawImageContained(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

async function createMonthlyReportPng(report: MonthlyReportResult) {
  await document.fonts.ready;
  const character = new Image();
  character.crossOrigin = 'anonymous';
  character.src = getReportCharacterImage(report);
  try {
    await character.decode();
  } catch {
    character.removeAttribute('crossorigin');
    character.src = monthlyReportCharacter;
    await character.decode();
  }

  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = 345 * scale;
  canvas.height = 687 * scale;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('이미지 캔버스를 생성할 수 없습니다.');
  context.scale(scale, scale);

  const gradient = context.createLinearGradient(0, 0, 0, 687);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.58, '#fffaf8');
  gradient.addColorStop(1, '#f7fffc');
  context.fillStyle = gradient;
  drawRoundedRect(context, 0, 0, 345, 687, 23);
  context.fill();

  const drawCard = (x: number, y: number, width: number, height: number, radius: number) => {
    context.fillStyle = '#ffffff';
    context.strokeStyle = '#f0e6e1';
    context.lineWidth = 1;
    drawRoundedRect(context, x, y, width, height, radius);
    context.fill();
    context.stroke();
  };

  context.textAlign = 'center';
  context.fillStyle = '#ff6f4f';
  context.font = '800 30px Pretendard, sans-serif';
  context.fillText('MoodTail', 172.5, 71);

  drawCard(18, 102, 309, 184, 24);
  drawImageContained(context, character, 26, 125, 134, 134);
  context.fillStyle = '#ffe1d8';
  drawRoundedRect(context, 168, 135, 82, 28, 14);
  context.fill();
  context.fillStyle = '#ff6248';
  context.font = '700 12px Pretendard, sans-serif';
  const primaryType = report.topMoodTypes.find(
    (type) => type.moodTypeId === report.monthlyMoodType.moodTypeId,
  );
  context.fillText(
    `${primaryType?.ranking ?? 1}위 · ${primaryType?.count ?? 0}회`,
    209,
    154,
  );
  context.textAlign = 'left';
  context.fillStyle = '#17172a';
  fitCanvasText(context, report.monthlyMoodType.name, 143, 22, 14);
  context.fillText(report.monthlyMoodType.name, 168, 195);
  context.fillStyle = '#666666';
  context.font = '500 10px Pretendard, sans-serif';
  const descriptionLines = wrapCanvasText(
    context,
    report.monthlyMoodType.shortDescription,
    143,
    3,
  );
  descriptionLines.forEach((line, index) => {
    context.fillText(line, 168, 222 + index * 20);
  });

  drawCard(18, 302, 309, 291, 24);
  context.fillStyle = '#17172a';
  context.font = '700 17px Pretendard, sans-serif';
  context.fillText('많이 마신 칵테일 TOP3', 36, 350);
  context.fillStyle = '#777777';
  context.font = '400 10px Pretendard, sans-serif';
  context.fillText('히스토리에 기록한 칵테일 기준이에요.', 36, 371);

  const rankColors = ['#ff6248', '#34dbce', '#ffc92c'];
  const cocktails = report.frequentCocktails.map((cocktail, index) => ({
    rank: cocktail.ranking,
    name: cocktail.nameKo || cocktail.nameEn,
    count: cocktail.count,
    percent: cocktail.recordPercentage,
    color: rankColors[index] ?? '#ff6248',
  }));
  cocktails.forEach((cocktail, index) => {
    const y = 383 + index * 70;
    drawCard(27, y, 289, 64, 18);
    context.fillStyle = cocktail.color;
    context.beginPath();
    context.arc(57, y + 31, 15, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.font = '700 12px Pretendard, sans-serif';
    context.fillText(String(cocktail.rank), 57, y + 35);
    context.textAlign = 'left';
    context.fillStyle = '#17172a';
    context.font = '700 16px Pretendard, sans-serif';
    context.fillText(cocktail.name, 86, y + 26);
    context.fillStyle = '#777777';
    context.font = '400 11px Pretendard, sans-serif';
    context.fillText(`${cocktail.count}회 기록`, 86, y + 45);
    context.fillStyle = '#ff6248';
    context.textAlign = 'right';
    context.font = '700 14px Pretendard, sans-serif';
    context.fillText(`${cocktail.percent}%`, 296, y + 37);
  });

  drawCard(18, 609, 309, 70, 24);
  context.textAlign = 'left';
  context.fillStyle = '#17172a';
  context.font = '700 16px Pretendard, sans-serif';
  context.fillText('활동 통계', 36, 651);
  context.fillStyle = '#ff6248';
  context.font = '700 15px Pretendard, sans-serif';
  context.fillText(`테스트 ${report.activity.testCount}회`, 148, 651);
  context.fillStyle = '#2878ff';
  context.fillText(`기록 ${report.activity.drinkingRecordCount}회`, 253, 651);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('PNG 이미지를 생성할 수 없습니다.'));
    }, 'image/png');
  });
}

const RADAR_CENTER = { x: 132.5, y: 112 };
const RADAR_ENDPOINTS = [
  { x: 132.5, y: 22.4 },
  { x: 217.7, y: 84.4 },
  { x: 185.2, y: 184.5 },
  { x: 79.8, y: 184.5 },
  { x: 47.3, y: 84.4 },
];

function toRadarPoints(scores: MonthlyReportTasteProfile) {
  const values = [
    scores.sweetness,
    scores.sourness,
    scores.bitterness,
    scores.alcoholIntensity,
    scores.refreshing,
  ];

  return RADAR_ENDPOINTS.map((endpoint, index) => {
    const ratio = values[index] / 100;
    const x = RADAR_CENTER.x + (endpoint.x - RADAR_CENTER.x) * ratio;
    const y = RADAR_CENTER.y + (endpoint.y - RADAR_CENTER.y) * ratio;
    return [Number(x.toFixed(1)), Number(y.toFixed(1))] as const;
  });
}

function hasTasteScore(scores: MonthlyReportTasteProfile | null): scores is MonthlyReportTasteProfile {
  return scores !== null && Object.values(scores).some((score) => score > 0);
}

function SummaryCard({
  report,
  useLocalCharacterImage = false,
}: {
  report: MonthlyReportResult;
  useLocalCharacterImage?: boolean;
}) {
  const primaryType = report.topMoodTypes.find(
    (type) => type.moodTypeId === report.monthlyMoodType.moodTypeId,
  );
  const localCharacterImage = RESULT_TYPE_THEMES[report.monthlyMoodType.typeCode]?.characterImage;

  return (
    <section
      className="monthly-report-page__box monthly-report-page__summary"
      aria-label="이번 달 대표 타입"
    >
      <img
        className="monthly-report-page__summary-character"
        src={useLocalCharacterImage && localCharacterImage
          ? localCharacterImage
          : getReportCharacterImage(report)}
        alt={`${report.monthlyMoodType.name} 캐릭터`}
      />
      <div className="monthly-report-page__summary-copy">
        <span className="monthly-report-page__summary-rank">
          {primaryType?.ranking ?? 1}위 · {primaryType?.count ?? 0}회
        </span>
        <h2
          className="monthly-report-page__summary-type"
          style={report.monthlyMoodType.name.length > 8
            ? { fontSize: '20px', lineHeight: '24px' }
            : undefined}
        >
          {report.monthlyMoodType.name}
        </h2>
        <p className="monthly-report-page__summary-description">
          “{report.monthlyMoodType.shortDescription}”
        </p>
      </div>
    </section>
  );
}

function CocktailsCard({ report }: { report: MonthlyReportResult }) {
  return (
    <section className="monthly-report-page__box monthly-report-page__cocktails">
      <h2>많이 마신 칵테일 TOP3</h2>
      <p className="monthly-report-page__cocktails-description">
        히스토리에 기록한 칵테일 기준이에요.
      </p>
      <div className="monthly-report-page__cocktail-list">
        {report.frequentCocktails.map((cocktail) => (
          <article
            className="monthly-report-page__cocktail-card"
            key={cocktail.cocktailId}
          >
            <span
              className={`monthly-report-page__cocktail-rank monthly-report-page__cocktail-rank--${cocktail.ranking}`}
            >
              {cocktail.ranking}
            </span>
            <div className="monthly-report-page__cocktail-copy">
              <h3>{cocktail.nameKo || cocktail.nameEn}</h3>
              <p>{cocktail.count}회 기록</p>
            </div>
            <strong className="monthly-report-page__cocktail-percent">
              {cocktail.recordPercentage}%
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivityCard({ report }: { report: MonthlyReportResult }) {
  return (
    <section className="monthly-report-page__box monthly-report-page__activity">
      <h2>활동 통계</h2>
      <strong className="monthly-report-page__activity-count monthly-report-page__activity-count--test">
        테스트 {report.activity.testCount}회
      </strong>
      <strong className="monthly-report-page__activity-count monthly-report-page__activity-count--record">
        기록 {report.activity.drinkingRecordCount}회
      </strong>
    </section>
  );
}

function MonthlyReportPage({ onBack, reportMonth }: MonthlyReportPageProps) {
  const reportYear = reportMonth.getFullYear();
  const reportMonthNumber = reportMonth.getMonth() + 1;
  const [report, setReport] = useState<MonthlyReportResult>();
  const [isReportLoading, setIsReportLoading] = useState(true);
  const [reportError, setReportError] = useState<string>();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSnsShareModalOpen, setIsSnsShareModalOpen] = useState(false);
  const [isSaveCompleteToastOpen, setIsSaveCompleteToastOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShareImageUploading, setIsShareImageUploading] = useState(false);
  const [monthlyReportShareImageUrl, setMonthlyReportShareImageUrl] = useState<string>();
  const [monthlyReportShareUrl, setMonthlyReportShareUrl] = useState<string>();
  const [shareImageError, setShareImageError] = useState<string>();
  const sharePreviewRef = useRef<HTMLDivElement>(null);
  const mobileFrame = document.querySelector<HTMLElement>(".app");
  const secondaryTypes =
    report?.topMoodTypes.filter(
      (type) => type.moodTypeId !== report.monthlyMoodType.moodTypeId,
    ) ?? [];
  const hasSecondaryTypeData = secondaryTypes.length > 0;
  const currentRadarPoints = report
    ? toRadarPoints(report.displayAverageTasteScores)
    : [];
  const previousRadarPoints = report
    && hasTasteScore(report.previousMonthTasteProfile)
    && hasTasteScore(report.previousMonthDisplayTasteScores)
    ? toRadarPoints(report.previousMonthDisplayTasteScores)
    : [];

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        setIsReportLoading(true);
        setReportError(undefined);
        const result = await getMonthlyReport(
          { year: reportYear, month: reportMonthNumber },
          controller.signal,
        );
        setReport(result);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setReport(undefined);
        setReportError("월간 리포트를 불러오지 못했습니다.");
      } finally {
        if (!controller.signal.aborted) setIsReportLoading(false);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [reportMonthNumber, reportYear]);

  const handleOpenShareModal = () => {
    if (!report) return;
    setShareImageError(undefined);
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  const createVisibleShareCardPng = async () => {
    if (!sharePreviewRef.current) {
      if (!report) throw new Error('월간 리포트 데이터가 없습니다.');
      return createMonthlyReportPng(report);
    }

    const preview = sharePreviewRef.current;
    const previewImages = Array.from(preview.querySelectorAll('img'));
    await Promise.all(previewImages.map(async (image) => {
      if (image.complete && image.naturalWidth > 0) return;
      await image.decode();
    }));
    await document.fonts.ready;

    const captureOptions = {
      pixelRatio: 2,
      cacheBust: false,
      backgroundColor: '#fffaf8',
    };

    try {
      const blob = await toBlob(preview, captureOptions);
      if (!blob) throw new Error('toBlob returned null');
      return blob;
    } catch (error) {
      console.error('월간 리포트 카드 toBlob 캡처 실패, toPng로 재시도', error);

      try {
        const dataUrl = await toPng(preview, captureOptions);
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error(`PNG 변환 실패: ${response.status}`);

        const blob = await response.blob();
        if (!blob.size) throw new Error('toPng returned an empty image');
        return blob;
      } catch (fallbackError) {
        console.error('월간 리포트 카드 toPng 캡처도 실패', fallbackError);
        throw fallbackError;
      }
    }
  };

  const handleSaveImage = async () => {
    if (isSaving || !report) return;
    setIsSaving(true);

    try {
      const blob = await createVisibleShareCardPng();
      const file = new File([blob], 'moodtail-monthly-report.png', {
        type: 'image/png',
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);

      setIsSaveCompleteToastOpen(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error('월간 리포트 이미지 저장 실패', error);
      alert('이미지 저장에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenSnsShare = async () => {
    if (isShareImageUploading || !report) return;

    try {
      setIsShareImageUploading(true);
      setShareImageError(undefined);

      const blob = await createVisibleShareCardPng();
      if (blob.size > 5 * 1024 * 1024) {
        throw new Error("월간 리포트 이미지가 5MB를 초과했습니다.");
      }

      const image = new File([blob], "moodtail-monthly-report.png", {
        type: "image/png",
      });
      const result = await uploadMonthlyReportShareImage({
        year: reportYear,
        month: reportMonthNumber,
        image,
      });
      const sharedReport = await getSharedMonthlyReport(result.shareToken);

      setMonthlyReportShareUrl(result.shareUrl);
      setMonthlyReportShareImageUrl(sharedReport.shareImageUrl);
      setIsSnsShareModalOpen(true);
    } catch (error) {
      console.error("월간 리포트 공유 이미지 업로드 실패", error);
      setShareImageError(undefined);
      alert('공유 링크 생성에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsShareImageUploading(false);
    }
  };

  if (!report) {
    return (
      <div className="monthly-report-page">
        <MonthlyReportBackground variant="short" />
        <header className="monthly-report-page__header">
          <button
            type="button"
            className="monthly-report-page__back-button"
            onClick={onBack}
            aria-label="히스토리로 돌아가기"
          >
            <img src={chevronLeftIcon} alt="" />
          </button>
          <div>
            <h1>월간 리포트</h1>
            <p>지난 달과 이번 달의 맛 변화를 비교해요</p>
          </div>
        </header>
        <p className="monthly-report-page__status">
          {isReportLoading ? "월간 리포트를 불러오는 중..." : reportError}
        </p>
      </div>
    );
  }

  return (
    <div
      className="monthly-report-page"
      data-report-month={`${reportMonth.getFullYear()}-${String(
        reportMonth.getMonth() + 1,
      ).padStart(2, '0')}`}
    >
      <MonthlyReportBackground variant={hasSecondaryTypeData ? 'long' : 'short'} />
      <header className="monthly-report-page__header">
        <button
          type="button"
          className="monthly-report-page__back-button"
          onClick={onBack}
          aria-label="히스토리로 돌아가기"
        >
          <img src={chevronLeftIcon} alt="" />
        </button>
        <div>
          <h1>월간 리포트</h1>
          <p>지난 달과 이번 달의 맛 변화를 비교해요</p>
        </div>
      </header>

      <main className="monthly-report-page__content">
        <SummaryCard report={report} />

        {hasSecondaryTypeData && (
          <section className="monthly-report-page__box monthly-report-page__types">
            <h2>다음으로 많이 나온 타입</h2>
            <div
              className={`monthly-report-page__type-list${secondaryTypes.length === 1 ? ' monthly-report-page__type-list--single' : ''}`}
            >
              {secondaryTypes.map((type, index) => (
                <article
                  className="monthly-report-page__type-card"
                  key={type.moodTypeId}
                >
                  <span
                    className={`monthly-report-page__type-rank monthly-report-page__type-rank--${index === 0 ? 'second' : 'third'}`}
                  >
                    {type.ranking}
                  </span>
                  <div className="monthly-report-page__type-copy">
                    <h3>{type.name}</h3>
                    <p
                      className={`monthly-report-page__type-count monthly-report-page__type-count--${index === 0 ? 'second' : 'third'}`}
                    >
                      {type.count}회
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="monthly-report-page__box monthly-report-page__taste-chart">
          <h2>맛 지표 비교</h2>
          <svg
            className="monthly-report-page__radar-chart"
            viewBox="0 0 265 228.7"
            role="img"
            aria-label="지난달과 이번달의 맛 지표 비교 그래프"
          >
            <g className="monthly-report-page__radar-grid">
              <polygon points="132.5,22.4 217.7,84.4 185.2,184.5 79.8,184.5 47.3,84.4" />
              <polygon
                points="132.5,22.4 217.7,84.4 185.2,184.5 79.8,184.5 47.3,84.4"
                transform="translate(132.5 112) scale(.75) translate(-132.5 -112)"
              />
              <polygon
                points="132.5,22.4 217.7,84.4 185.2,184.5 79.8,184.5 47.3,84.4"
                transform="translate(132.5 112) scale(.5) translate(-132.5 -112)"
              />
              <polygon
                points="132.5,22.4 217.7,84.4 185.2,184.5 79.8,184.5 47.3,84.4"
                transform="translate(132.5 112) scale(.25) translate(-132.5 -112)"
              />
              <line x1="132.5" y1="112" x2="132.5" y2="22.4" />
              <line x1="132.5" y1="112" x2="217.7" y2="84.4" />
              <line x1="132.5" y1="112" x2="185.2" y2="184.5" />
              <line x1="132.5" y1="112" x2="79.8" y2="184.5" />
              <line x1="132.5" y1="112" x2="47.3" y2="84.4" />
            </g>

            <g className="monthly-report-page__radar-labels">
              <text x="132.5" y="14" textAnchor="middle">당도</text>
              <text x="235" y="88" textAnchor="middle">산도</text>
              <text x="203" y="207" textAnchor="middle">쓴맛</text>
              <text x="62" y="207" textAnchor="middle">도수</text>
              <text x="28" y="88" textAnchor="middle">청량감</text>
            </g>

            {previousRadarPoints.length > 0 && (
              <>
                <polygon
                  className="monthly-report-page__radar-area monthly-report-page__radar-area--previous"
                  points={previousRadarPoints.map((point) => point.join(",")).join(" ")}
                />
                <g className="monthly-report-page__radar-points monthly-report-page__radar-points--previous">
                  {previousRadarPoints.map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
                  ))}
                </g>
              </>
            )}
            <polygon
              className="monthly-report-page__radar-area monthly-report-page__radar-area--current"
              points={currentRadarPoints.map((point) => point.join(",")).join(" ")}
            />
            <g className="monthly-report-page__radar-points monthly-report-page__radar-points--current">
              {currentRadarPoints.map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
              ))}
            </g>
          </svg>

          <div className="monthly-report-page__chart-legend" aria-label="그래프 범례">
            {previousRadarPoints.length > 0 && (
              <span className="monthly-report-page__legend-item monthly-report-page__legend-item--previous">
                지난달
              </span>
            )}
            <span className="monthly-report-page__legend-item monthly-report-page__legend-item--current">
              이번달
            </span>
          </div>
        </section>

        <section className="monthly-report-page__taste-metrics" aria-label="맛 지표">
          {[
            { label: '도수', value: report.displayAverageTasteScores.alcoholIntensity, highlighted: true },
            { label: '당도', value: report.displayAverageTasteScores.sweetness, highlighted: false },
            { label: '산도', value: report.displayAverageTasteScores.sourness, highlighted: true },
            { label: '쓴맛', value: report.displayAverageTasteScores.bitterness, highlighted: false },
            { label: '청량감', value: report.displayAverageTasteScores.refreshing, highlighted: true },
          ].map(({ label, value, highlighted }) => (
            <div
              className={`monthly-report-page__metric${
                highlighted ? ' monthly-report-page__metric--highlighted' : ''
              }`}
              key={label}
            >
              <span className="monthly-report-page__metric-label">{label}</span>
              <strong className="monthly-report-page__metric-value">{value}</strong>
            </div>
          ))}
        </section>

        <CocktailsCard report={report} />

        <ActivityCard report={report} />

        <button
          type="button"
          className="monthly-report-page__share-button"
          onClick={handleOpenShareModal}
        >
          공유하기
        </button>
      </main>

      {isShareModalOpen && createPortal(
        <div
          className="monthly-report-share-modal__overlay"
          onClick={handleCloseShareModal}
        >
          <section
            className="monthly-report-share-modal"
            role="dialog"
            aria-modal="true"
            aria-label="월간 리포트 공유 미리보기"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="monthly-report-share-modal__title">MoodTail</h2>
            <button
              type="button"
              className="monthly-report-share-modal__close"
              onClick={handleCloseShareModal}
              aria-label="공유 미리보기 닫기"
            >
              ×
            </button>
            <div ref={sharePreviewRef} className="monthly-report-share-modal__preview">
              <SummaryCard report={report} useLocalCharacterImage />
              <CocktailsCard report={report} />
              <ActivityCard report={report} />
            </div>

            <div className="monthly-report-share-modal__actions">
              <Button
                variant="primary"
                className="monthly-report-share-modal__button"
                onClick={() => void handleOpenSnsShare()}
                disabled={isShareImageUploading}
              >
                {isShareImageUploading ? "업로드 중..." : "SNS 공유하기"}
              </Button>
              <Button
                variant="light"
                className="monthly-report-share-modal__button monthly-report-share-modal__button--save"
                onClick={handleSaveImage}
                disabled={isSaving}
              >
                {isSaving ? '저장 중...' : '이미지 저장'}
              </Button>
            </div>
            {shareImageError && (
              <p className="monthly-report-share-modal__error">
                {shareImageError}
              </p>
            )}
          </section>
        </div>,
        mobileFrame ?? document.body,
      )}

      {isSnsShareModalOpen && monthlyReportShareUrl && monthlyReportShareImageUrl &&
        createPortal(
          <ResultSnsShareModal
            isOpen
            url={monthlyReportShareUrl}
            onClose={() => setIsSnsShareModalOpen(false)}
            kakaoShare={{
              title: `MoodTail ${reportYear}년 ${reportMonthNumber}월 리포트`,
              description: `${report.monthlyMoodType.name} 유형의 월간 취향 리포트예요.`,
              imageUrl: monthlyReportShareImageUrl,
              webUrl: monthlyReportShareUrl,
              buttonTitle: '결과 이미지 보기',
            }}
          />,
          mobileFrame ?? document.body,
        )}

      {isSaveCompleteToastOpen &&
        createPortal(
          <div className="monthly-report-page__save-toast">
            <ActionCompleteToast
              action="저장"
              onClose={() => setIsSaveCompleteToastOpen(false)}
            />
          </div>,
          mobileFrame ?? document.body,
        )}
    </div>
  );
}

export default MonthlyReportPage;
export type { MonthlyReportPageProps };
