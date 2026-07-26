export interface DexEntry {
  id: number;
  name: string;
  unlocked: boolean;
  collectionRate?: number;
  typeId?: string;
}

export const DEX_DATA: DexEntry[] = [
  { id: 0, name: "이상주의자", unlocked: true, typeId: "idealist" },
  { id: 1, name: "낭만주의자", unlocked: true, typeId: "romantic" },
  { id: 2, name: "환상가", unlocked: true },
  { id: 3, name: "직설가", unlocked: true },
  { id: 4, name: "현실주의자", unlocked: true, typeId: "realist" },
  { id: 5, name: "신중주의자", unlocked: false, collectionRate: 56 },
  { id: 6, name: "열정가", unlocked: false, collectionRate: 56 },
  { id: 7, name: "분석가", unlocked: false, collectionRate: 56 },
  { id: 8, name: "평론가", unlocked: false, collectionRate: 56 },
  { id: 9, name: "평화주의자", unlocked: false, collectionRate: 56 },
  { id: 10, name: "안정가", unlocked: false, collectionRate: 56 },
  { id: 11, name: "평등주의자", unlocked: false, collectionRate: 56 },
];
