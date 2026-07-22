import type { ReactElement, ReactNode } from "react";
import { COLORS } from "../theme/colors";

export function Mascot({ size = 56, color = "#FF9448" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="20" cy="14" r="9" fill={color} stroke={COLORS.orange} strokeWidth="2" />
      <path
        d="M20 6 L20 22 M12 14 L28 14 M14.3 8.3 L25.7 19.7 M25.7 8.3 L14.3 19.7"
        stroke={COLORS.orange}
        strokeWidth="1.2"
      />
      <path d="M12 20 h32 l-4 26 a6 6 0 0 1 -6 5 h-12 a6 6 0 0 1 -6 -5 z" fill="#FF7A3D" />
      <circle cx="21" cy="34" r="2.6" fill={COLORS.ink} />
      <circle cx="35" cy="34" r="2.6" fill={COLORS.ink} />
      <path d="M22 42 q6 5 12 0" stroke={COLORS.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function UnlockedIcon({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 14 h24 l-3 19 a4.5 4.5 0 0 1 -4.5 3.7 h-9 a4.5 4.5 0 0 1 -4.5 -3.7 z" fill={color} />
      <circle cx="15.5" cy="24" r="1.8" fill={COLORS.ink} />
      <circle cx="24.5" cy="24" r="1.8" fill={COLORS.ink} />
      <path d="M16 30 q4 3.2 8 0" stroke={COLORS.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke={COLORS.lockedIcon} strokeWidth="2" />
      <path d="M8 11 V8 a4 4 0 0 1 8 0 v3" stroke={COLORS.lockedIcon} strokeWidth="2" />
    </svg>
  );
}

export function ChevronLeft({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 5 L8 12 L15 19" stroke={COLORS.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = 18, color = COLORS.inkSoft }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6 L18 18 M18 6 L6 18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function TrophyIcon({ color, size = 34 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <path d="M10 6 h14 v8 a7 7 0 0 1 -14 0 z" fill={color} />
      <path d="M10 8 h-4 a4 4 0 0 0 4 6 M24 8 h4 a4 4 0 0 1 -4 6" stroke={color} strokeWidth="1.8" fill="none" />
      <rect x="15" y="21" width="4" height="4" fill={color} />
      <rect x="11" y="26" width="12" height="3" rx="1.5" fill={color} />
    </svg>
  );
}

export function GlassIcon({
  shape = "highball",
  color = COLORS.inkSoft,
  size = 36,
}: {
  shape?: "martini" | "rocks" | "highball" | "coupe";
  color?: string;
  size?: number;
}) {
  const paths: Record<string, ReactElement> = {
    martini: (
      <path
        d="M8 9 h20 l-9 11 v9 M13.5 29 h9"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    coupe: (
      <path
        d="M9 11 a9 8 0 0 0 18 0 M18 19 v10 M13.5 29 h9"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    rocks: (
      <path
        d="M11 12 h14 l-1.5 16 a2 2 0 0 1 -2 1.8 h-7 a2 2 0 0 1 -2 -1.8 z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    ),
    highball: (
      <path
        d="M13 8 h10 l-1.2 21 a1.8 1.8 0 0 1 -1.8 1.7 h-4 a1.8 1.8 0 0 1 -1.8 -1.7 z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {paths[shape]}
    </svg>
  );
}

export function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke={COLORS.inkSoft} strokeWidth="1.8" />
      <path d="M6 15 H5 a2 2 0 0 1 -2 -2 V5 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 v1" stroke={COLORS.inkSoft} strokeWidth="1.8" />
    </svg>
  );
}

function SocialCircle({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 800,
        color: "#fff",
      }}
    >
      {children}
    </div>
  );
}

export function KakaoIcon() {
  return <SocialCircle bg="#FEE500">
    <span style={{ color: "#3C1E1E" }}>K</span>
  </SocialCircle>;
}
export function FacebookIcon() {
  return <SocialCircle bg="#1877F2">f</SocialCircle>;
}
export function NaverIcon() {
  return <SocialCircle bg="#03C75A">N</SocialCircle>;
}
export function InstagramIcon() {
  return (
    <SocialCircle bg="linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)">
      IG
    </SocialCircle>
  );
}

