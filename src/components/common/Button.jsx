import React from "react";
import { Spinner } from "./Spinner";

export function Button({
  loading = false,
  disabled = false,
  children,
  className = "",
  type = "button",
  light = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`jth-btn${loading ? " jth-btn--loading" : ""} ${className}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner light={light} />}
      <span className="jth-btn__label">{children}</span>
    </button>
  );
}

export default Button;
