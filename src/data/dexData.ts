export interface DexEntry {
  id: number;
  name: string;
  unlocked: boolean;
  collectionRate?: number;
  typeId: string;
  typeNumber: number;
}

export const DEX_DATA: DexEntry[] = [
  { id: 0, name: "이상주의자", unlocked: true, typeId: "idealist", typeNumber: 1 },
  { id: 1, name: "낭만주의자", unlocked: true, typeId: "romantic", typeNumber: 2 },
  { id: 2, name: "환상가", unlocked: true, typeId: "fantasist", typeNumber: 0 },
  { id: 3, name: "직설가", unlocked: true, typeId: "straightforward", typeNumber: 8 },
  { id: 4, name: "현실주의자", unlocked: true, typeId: "realist", typeNumber: 7 },
  { id: 5, name: "신중주의자", unlocked: false, collectionRate: 56, typeId: "cautious", typeNumber: 6 },
  { id: 6, name: "열정가", unlocked: false, collectionRate: 56, typeId: "passionate", typeNumber: 3 },
  { id: 7, name: "분석가", unlocked: false, collectionRate: 56, typeId: "analyst", typeNumber: 4 },
  { id: 8, name: "평론가", unlocked: false, collectionRate: 56, typeId: "critic", typeNumber: 5 },
  { id: 9, name: "평화주의자", unlocked: false, collectionRate: 56, typeId: "peacemaker", typeNumber: 9 },
  { id: 10, name: "안정가", unlocked: false, collectionRate: 56, typeId: "stable", typeNumber: 10 },
  { id: 11, name: "평등주의자", unlocked: false, collectionRate: 56, typeId: "egalitarian", typeNumber: 11 },
];
