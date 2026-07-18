import type { ReactNode } from "react";
import { COLORS, FONT_FAMILY } from "../theme/colors";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: 390,
        margin: "0 auto",
        background:
          "radial-gradient(circle at 8% 4%, #FFEFC260 0%, transparent 30%), " +
          "radial-gradient(circle at 92% 8%, #FFD3CF55 0%, transparent 38%), " +
          "radial-gradient(circle at 100% 78%, #FFD7D255 0%, transparent 35%), " +
          "radial-gradient(circle at 2% 96%, #D3F3E860 0%, transparent 32%), " +
          COLORS.cream,
        borderRadius: 28,
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        minHeight: 700,
      }}
    >
      {children}
    </div>
  );
}
