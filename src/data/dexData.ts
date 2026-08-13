export interface DexEntry {
  id: number;
  name: string;
  unlocked: boolean;
  collectionRate?: number;
  typeId: string;
  typeNumber: number;
}

export const DEX_DATA: DexEntry[] = [
  { id: 0, name: "이상주의자", unlocked: false, typeId: "idealist", typeNumber: 1 },
  { id: 1, name: "낭만주의자", unlocked: false, typeId: "romantic", typeNumber: 4 },
  { id: 2, name: "환상가", unlocked: false, typeId: "fantasist", typeNumber: 7 },
  { id: 3, name: "직설가", unlocked: false, typeId: "straightforward", typeNumber: 11 },
  { id: 4, name: "현실주의자", unlocked: false, typeId: "realist", typeNumber: 3 },
  { id: 5, name: "신중주의자", unlocked: false, typeId: "cautious", typeNumber: 0 },
  { id: 6, name: "열정가", unlocked: false, typeId: "passionate", typeNumber: 5 },
  { id: 7, name: "분석가", unlocked: false, typeId: "analyst", typeNumber: 2 },
  { id: 8, name: "평론가", unlocked: false, typeId: "critic", typeNumber: 6 },
  { id: 9, name: "평화주의자", unlocked: false, typeId: "peacemaker", typeNumber: 8 },
  { id: 10, name: "안정가", unlocked: false, typeId: "stable", typeNumber: 9 },
  { id: 11, name: "평등주의자", unlocked: false, typeId: "egalitarian", typeNumber: 10 },
];
