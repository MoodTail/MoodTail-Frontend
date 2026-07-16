interface MonthlyReportPageProps {
  onBack: () => void;
}

function MonthlyReportPage({ onBack }: MonthlyReportPageProps) {
  return (
    <div>
      <button type="button" onClick={onBack} aria-label="히스토리로 돌아가기">
        뒤로가기
      </button>
      <h1>월간 리포트</h1>
    </div>
  );
}

export default MonthlyReportPage;
export type { MonthlyReportPageProps };
