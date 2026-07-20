import { useState } from "react";
import chevronLeftIcon from "../../assets/icons/chevron-left.svg";
import monthlyReportCharacter from "../../assets/images/history/monthly_report_character.png";
import Button from "../../components/Button/Button";
import SaveCompleteModal from "../../components/Modal/SaveCompleteModal";
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

async function createMonthlyReportPng() {
  await document.fonts.ready;
  const character = new Image();
  character.src = monthlyReportCharacter;
  await character.decode();

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
  context.drawImage(character, 26, 125, 134, 134);
  context.fillStyle = '#ffe1d8';
  drawRoundedRect(context, 168, 135, 82, 28, 14);
  context.fill();
  context.fillStyle = '#ff6248';
  context.font = '700 12px Pretendard, sans-serif';
  context.fillText('1위 · 7회', 209, 154);
  context.textAlign = 'left';
  context.fillStyle = '#17172a';
  context.font = '800 22px Pretendard, sans-serif';
  context.fillText('현실주의자', 168, 195);
  context.fillStyle = '#666666';
  context.font = '500 10px Pretendard, sans-serif';
  context.fillText('“차분하지만 분명한 취향이', 168, 222);
  context.fillText('이번 달을 채웠어요.”', 168, 242);

  drawCard(18, 302, 309, 291, 24);
  context.fillStyle = '#17172a';
  context.font = '700 17px Pretendard, sans-serif';
  context.fillText('많이 마신 칵테일 TOP3', 36, 350);
  context.fillStyle = '#777777';
  context.font = '400 10px Pretendard, sans-serif';
  context.fillText('히스토리에 기록한 칵테일 기준이에요.', 36, 371);

  const cocktails = [
    { rank: 1, name: '피치 하이볼', count: 5, percent: 42, color: '#ff6248' },
    { rank: 2, name: '모히토', count: 3, percent: 28, color: '#34dbce' },
    { rank: 3, name: '선라이즈 소다', count: 2, percent: 18, color: '#ffc92c' },
  ];
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
  context.fillText('테스트 12회', 148, 651);
  context.fillStyle = '#2878ff';
  context.fillText('기록 8회', 253, 651);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('PNG 이미지를 생성할 수 없습니다.'));
    }, 'image/png');
  });
}

function SummaryCard() {
  return (
    <section
      className="monthly-report-page__box monthly-report-page__summary"
      aria-label="이번 달 대표 타입"
    >
      <img
        className="monthly-report-page__summary-character"
        src={monthlyReportCharacter}
        alt="현실주의자 캐릭터"
      />
      <div className="monthly-report-page__summary-copy">
        <span className="monthly-report-page__summary-rank">1위 · 7회</span>
        <h2 className="monthly-report-page__summary-type">현실주의자</h2>
        <p className="monthly-report-page__summary-description">
          "차분하지만 분명한 취향이
          <br />
          이번 달을 채웠어요."
        </p>
      </div>
    </section>
  );
}

function CocktailsCard() {
  return (
    <section className="monthly-report-page__box monthly-report-page__cocktails">
      <h2>많이 마신 칵테일 TOP3</h2>
      <p className="monthly-report-page__cocktails-description">
        히스토리에 기록한 칵테일 기준이에요.
      </p>
      <div className="monthly-report-page__cocktail-list">
        {[
          { rank: 1, name: '피치 하이볼', count: 5, percent: 42 },
          { rank: 2, name: '모히토', count: 3, percent: 28 },
          { rank: 3, name: '선라이즈 소다', count: 2, percent: 18 },
        ].map(({ rank, name, count, percent }) => (
          <article className="monthly-report-page__cocktail-card" key={rank}>
            <span
              className={`monthly-report-page__cocktail-rank monthly-report-page__cocktail-rank--${rank}`}
            >
              {rank}
            </span>
            <div className="monthly-report-page__cocktail-copy">
              <h3>{name}</h3>
              <p>{count}회 기록</p>
            </div>
            <strong className="monthly-report-page__cocktail-percent">
              {percent}%
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivityCard() {
  return (
    <section className="monthly-report-page__box monthly-report-page__activity">
      <h2>활동 통계</h2>
      <strong className="monthly-report-page__activity-count monthly-report-page__activity-count--test">
        테스트 12회
      </strong>
      <strong className="monthly-report-page__activity-count monthly-report-page__activity-count--record">
        기록 8회
      </strong>
    </section>
  );
}

function MonthlyReportPage({ onBack, reportMonth }: MonthlyReportPageProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaveCompleteModalOpen, setIsSaveCompleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveImage = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const blob = await createMonthlyReportPng();
      const file = new File([blob], 'moodtail-monthly-report.png', {
        type: 'image/png',
      });
      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
        navigator.userAgent,
      );
      const canShareFile = Boolean(navigator.canShare?.({ files: [file] }));

      if (isMobile && canShareFile) {
        await navigator.share({ files: [file], title: 'MoodTail 월간 리포트' });
      } else {
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }

      setIsShareModalOpen(false);
      setIsSaveCompleteModalOpen(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error('월간 리포트 이미지 저장 실패', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="monthly-report-page"
      data-report-month={`${reportMonth.getFullYear()}-${String(
        reportMonth.getMonth() + 1,
      ).padStart(2, '0')}`}
    >
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
        <SummaryCard />

        <section className="monthly-report-page__box monthly-report-page__types">
          <h2>다음으로 많이 나온 타입</h2>
          <div className="monthly-report-page__type-list">
            <article className="monthly-report-page__type-card">
              <span className="monthly-report-page__type-rank monthly-report-page__type-rank--second">
                2
              </span>
              <div className="monthly-report-page__type-copy">
                <h3>낭만주의자</h3>
                <p className="monthly-report-page__type-count monthly-report-page__type-count--second">
                  3회
                </p>
              </div>
            </article>

            <article className="monthly-report-page__type-card">
              <span className="monthly-report-page__type-rank monthly-report-page__type-rank--third">
                3
              </span>
              <div className="monthly-report-page__type-copy">
                <h3>낭만주의자</h3>
                <p className="monthly-report-page__type-count monthly-report-page__type-count--third">
                  2회
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="monthly-report-page__box monthly-report-page__taste-chart">
          <h2>맛 지표 비교</h2>
          <svg
            className="monthly-report-page__radar-chart"
            viewBox="0 0 265 228.7"
            role="img"
            aria-label="지난달과 이번달의 맛 지표 비교 그래프"
          >
            <g className="monthly-report-page__radar-grid">
              <polygon points="132.5,29 211.4,86.4 181.3,179.1 83.7,179.1 53.6,86.4" />
              <polygon
                points="132.5,29 211.4,86.4 181.3,179.1 83.7,179.1 53.6,86.4"
                transform="translate(132.5 112) scale(.75) translate(-132.5 -112)"
              />
              <polygon
                points="132.5,29 211.4,86.4 181.3,179.1 83.7,179.1 53.6,86.4"
                transform="translate(132.5 112) scale(.5) translate(-132.5 -112)"
              />
              <polygon
                points="132.5,29 211.4,86.4 181.3,179.1 83.7,179.1 53.6,86.4"
                transform="translate(132.5 112) scale(.25) translate(-132.5 -112)"
              />
              <line x1="132.5" y1="112" x2="132.5" y2="29" />
              <line x1="132.5" y1="112" x2="211.4" y2="86.4" />
              <line x1="132.5" y1="112" x2="181.3" y2="179.1" />
              <line x1="132.5" y1="112" x2="83.7" y2="179.1" />
              <line x1="132.5" y1="112" x2="53.6" y2="86.4" />
            </g>

            <g className="monthly-report-page__radar-labels">
              <text x="132.5" y="14" textAnchor="middle">당도</text>
              <text x="235" y="88" textAnchor="middle">산도</text>
              <text x="203" y="207" textAnchor="middle">쓴맛</text>
              <text x="62" y="207" textAnchor="middle">도수</text>
              <text x="28" y="88" textAnchor="middle">청량감</text>
            </g>

            <polygon
              className="monthly-report-page__radar-area monthly-report-page__radar-area--previous"
              points="132.5,72 181.4,96.1 146.2,130.8 99.8,157 71,92"
            />
            <g className="monthly-report-page__radar-points monthly-report-page__radar-points--previous">
              {[[132.5, 72], [181.4, 96.1], [146.2, 130.8], [99.8, 157], [71, 92]].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
              ))}
            </g>
            <polygon
              className="monthly-report-page__radar-area monthly-report-page__radar-area--current"
              points="132.5,52.2 174.3,98.4 155.9,144.2 90.5,169.7 88.3,97.6"
            />
            <g className="monthly-report-page__radar-points monthly-report-page__radar-points--current">
              {[[132.5, 52.2], [174.3, 98.4], [155.9, 144.2], [90.5, 169.7], [88.3, 97.6]].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
              ))}
            </g>
          </svg>

          <div className="monthly-report-page__chart-legend" aria-label="그래프 범례">
            <span className="monthly-report-page__legend-item monthly-report-page__legend-item--previous">
              지난달
            </span>
            <span className="monthly-report-page__legend-item monthly-report-page__legend-item--current">
              이번달
            </span>
          </div>
        </section>

        <section className="monthly-report-page__taste-metrics" aria-label="맛 지표">
          {[
            { label: '도수', value: 45, highlighted: true },
            { label: '당도', value: 30, highlighted: false },
            { label: '산도', value: 70, highlighted: true },
            { label: '쓴맛', value: 20, highlighted: false },
            { label: '청량감', value: 90, highlighted: true },
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

        <CocktailsCard />

        <ActivityCard />

        <button
          type="button"
          className="monthly-report-page__share-button"
          onClick={() => setIsShareModalOpen(true)}
        >
          공유하기
        </button>
      </main>

      {isShareModalOpen && (
        <div
          className="share-modal-overlay"
          onClick={() => setIsShareModalOpen(false)}
        >
          <section
            className="share-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="share-modal__close"
              onClick={() => setIsShareModalOpen(false)}
              aria-label="공유 미리보기 닫기"
            >
              ×
            </button>
            <h2 id="share-modal-title" className="share-modal__title">
              MoodTail
            </h2>

            <div className="share-modal__preview">
              <SummaryCard />
              <CocktailsCard />
              <ActivityCard />
            </div>

            <div className="share-modal__actions">
              <Button variant="primary" className="share-modal__button">
                SNS 공유하기
              </Button>
              <Button
                variant="light"
                className="share-modal__button share-modal__button--save"
                onClick={handleSaveImage}
                disabled={isSaving}
              >
                {isSaving ? '저장 중...' : '이미지 저장'}
              </Button>
            </div>
          </section>
        </div>
      )}

      {isSaveCompleteModalOpen && (
        <SaveCompleteModal
          title="저장 완료되었습니다"
          onClose={() => setIsSaveCompleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MonthlyReportPage;
export type { MonthlyReportPageProps };
