interface TestResultPageProps {
  onBack: () => void;
}

function TestResultPage({ onBack }: TestResultPageProps) {
  return (
    <div>
      <button type="button" onClick={onBack} aria-label="상세 화면으로 돌아가기">
        뒤로가기
      </button>
      <h1>테스트 결과</h1>
    </div>
  );
}

export default TestResultPage;
export type { TestResultPageProps };
