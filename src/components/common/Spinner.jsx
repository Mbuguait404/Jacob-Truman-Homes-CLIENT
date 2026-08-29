import React from "react";

export function Spinner({ size = 16, light = false }) {
  return (
    <span
      className={`jth-spinner${light ? " jth-spinner--light" : ""}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <span className="jth-spinner__circle" />
    </span>
  );
}

export default Spinner;
