import type { ReactNode } from "react";
import { FONT_FAMILY, GRADIENTS } from "../theme/colors";
import GradientBackground from "./GradientBackground";

export default function PhoneFrame({
  children,
  background,
}: {
  children: ReactNode;
  background?: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: 390,
        margin: "0 auto",
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {background ?? <GradientBackground colors={GRADIENTS.mint} />}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
