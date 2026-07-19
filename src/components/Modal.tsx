import type { ReactNode } from "react";
import { COLORS, GRADIENTS } from "../theme/colors";
import GradientBackground from "./GradientBackground";

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.overlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 20,
        borderRadius: 28,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 22,
          width: "100%",
          maxWidth: 320,
          boxShadow: "0 20px 40px rgba(43,35,28,0.25)",
        }}
      >
        <GradientBackground colors={GRADIENTS.mint} />
        <div style={{ position: "relative", zIndex: 1, padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}
