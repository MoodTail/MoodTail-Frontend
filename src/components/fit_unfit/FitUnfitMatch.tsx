import type { CharacterType } from "../../data/characterType";
import FitUnfitCard from "./FitUnfitCard";
import NameTag from "../NameTag";

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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <FitUnfitCard label="잘 맞는 타입" name={goodMatch?.name} img={goodMatchImg} />
        {goodMatch && (
          <NameTag text={goodMatch.name} bgColor={goodMatch.nameTagColor} fontColor={goodMatch.fontColor} width={165} fontSize={12} />
        )}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <FitUnfitCard label="안 맞는 타입" name={badMatch?.name} img={badMatchImg} />
        {badMatch && (
          <NameTag text={badMatch.name} bgColor={badMatch.nameTagColor} fontColor={badMatch.fontColor} width={165} fontSize={12} />
        )}
      </div>
    </div>
  );
}
