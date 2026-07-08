import type { ButtonHTMLAttributes } from "react";
import "../../styles/Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "text";
}

function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
