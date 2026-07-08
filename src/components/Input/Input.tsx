import type { InputHTMLAttributes } from "react";
import "../../styles/Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, ...rest }: InputProps) {
  return <input className={`custom-input ${className ?? ""}`} {...rest} />;
}

export default Input;
