import type { ReactNode } from "react";

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
        background: "rgba(43, 35, 28, 0.55)",
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
          background: "#fff",
          borderRadius: 22,
          width: "100%",
          maxWidth: 320,
          padding: 24,
          boxShadow: "0 20px 40px rgba(43,35,28,0.25)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
