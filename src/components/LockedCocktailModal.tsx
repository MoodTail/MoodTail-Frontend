import TwoButtonModalLeftAligned from "./common/modal/TwoButtonModalLeftAligned";

export default function LockedCocktailModal({
  name,
  hint,
  onClose,
  onGoTest,
}: {
  name: string;
  hint?: string;
  onClose: () => void;
  onGoTest: () => void;
}) {
  const conditions = [
    ...(hint ? [hint] : []),
    `오늘의 취향 테스트에서 "${name}" 결과 받기`,
    "히스토리에서 해당 타입 칵테일 4잔 이상 기록 (수집률 50% 이상)",
  ];
  const description = conditions.map((line) => `· ${line}`).join("\n");

  return (
    <TwoButtonModalLeftAligned
      isOpen
      title={"아래 조건 중 하나를 달성하면\n캐릭터가 해금돼요!"}
      description={description}
      leftButton={{ label: "테스트하러 가기", onClick: onGoTest, variant: "primary" }}
      rightButton={{ label: "닫기", onClick: onClose, variant: "secondary" }}
      onOverlayClick={onClose}
    />
  );
}
