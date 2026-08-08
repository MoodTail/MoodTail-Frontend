import type { CharacterType } from "../../data/characterType";
import FitUnfitCard from "./FitUnfitCard";

export default function FitUnfitMatch({
  goodMatch,
  goodMatchImg,
  badMatch,
  badMatchImg,
}: {
  goodMatch?: CharacterType;
  goodMatchImg?: string;
  badMatch?: CharacterType;
  badMatchImg?: string;
}) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 22 }}>
      <FitUnfitCard label="잘 맞는 타입" name={goodMatch?.name} color={goodMatch?.color} img={goodMatchImg} />
      <FitUnfitCard label="안 맞는 타입" name={badMatch?.name} color={badMatch?.color} img={badMatchImg} />
    </div>
  );
}
