import type { ReactNode } from "react";
import { COLORS, FONT_FAMILY } from "../theme/colors";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: 390,
        margin: "0 auto",
        background: COLORS.cream,
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
