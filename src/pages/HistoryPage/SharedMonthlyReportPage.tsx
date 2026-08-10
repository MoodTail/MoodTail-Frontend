import { useEffect, useState } from 'react';
import { getSharedMonthlyReport } from '../../api/reports/reports.api';
import type { GetSharedMonthlyReportResult } from '../../api/reports/reports.types';
import './SharedMonthlyReportPage.css';

interface SharedMonthlyReportPageProps {
  shareToken: string;
}

function SharedMonthlyReportPage({ shareToken }: SharedMonthlyReportPageProps) {
  const [sharedReport, setSharedReport] = useState<GetSharedMonthlyReportResult>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();

    void getSharedMonthlyReport(shareToken, controller.signal)
      .then(setSharedReport)
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error('공유 월간 리포트를 불러오지 못했습니다.', error);
        setErrorMessage('공유 링크가 만료되었거나 존재하지 않습니다.');
      });

    return () => controller.abort();
  }, [shareToken]);

  return (
    <main className="shared-monthly-report-page">
      {sharedReport ? (
        <>
          <h1>{sharedReport.year}년 {sharedReport.month}월 월간 리포트</h1>
          <img src={sharedReport.shareImageUrl} alt={`${sharedReport.year}년 ${sharedReport.month}월 MoodTail 월간 리포트`} />
        </>
      ) : (
        <p>{errorMessage ?? '월간 리포트를 불러오는 중...'}</p>
      )}
    </main>
  );
}

export default SharedMonthlyReportPage;
