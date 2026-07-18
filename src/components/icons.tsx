import { COLORS } from "../theme/colors";

export function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={COLORS.inkSoft} strokeWidth="2" />
      <path d="M20 20 L16.5 16.5" stroke={COLORS.inkSoft} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M15 5 L8 12 L15 19" stroke={COLORS.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={COLORS.border} />
      <path d="M9 9 L15 15 M15 9 L9 15" stroke={COLORS.inkSoft} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BookmarkIcon({
  filled = false,
  color,
  size = 13,
}: {
  filled?: boolean;
  color: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3.5 h12 a1 1 0 0 1 1 1 V21 l-7 -4.5 L5 21 V4.5 a1 1 0 0 1 1 -1 z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlassPlaceholderIcon({
  color = COLORS.inkSoft,
  size = 28,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path
        d="M13 8 h10 l-1.2 21 a1.8 1.8 0 0 1 -1.8 1.7 h-4 a1.8 1.8 0 0 1 -1.8 -1.7 z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeft({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 5 L8 12 L15 19"
        stroke={COLORS.ink}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
