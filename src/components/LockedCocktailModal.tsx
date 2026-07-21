import type { Cocktail } from "../data/types";
import TwoButtonModal from "./common/modal/TwoButtonModal";

export default function LockedCocktailModal({
  cocktail,
  onClose,
  onGoTest,
}: {
  cocktail: Cocktail;
  onClose: () => void;
  onGoTest: () => void;
}) {
  return (
    <TwoButtonModal
      isOpen
      title={"아래 조건 중 하나를 달성하면\n캐릭터가 해금돼요!"}
      description={`· ${cocktail.hint}\n· 오늘의 취향 테스트에서 "${cocktail.name}" 결과 받기`}
      leftButton={{ label: "테스트하러 가기", onClick: onGoTest, variant: "primary" }}
      rightButton={{ label: "닫기", onClick: onClose, variant: "secondary" }}
      onOverlayClick={onClose}
    />
  );
}
