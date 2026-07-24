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
        width: "100%",
        margin: "0 auto",
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      {background ?? <GradientBackground colors={GRADIENTS.mint} />}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingTop: 44,
        }}
      >
        {children}
      </div>
    </div>
  );
}
