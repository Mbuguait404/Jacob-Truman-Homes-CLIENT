import React from "react";

export default function Img({ seed, w = 800, h = 600, alt = "", className = "", style = {} }) {
  return (
    <img
      src={`https://picsum.photos/seed/${seed}/${w}/${h}`}
      alt={alt}
      className={`archival-photo ${className}`}
      style={style}
      loading="lazy"
    />
  );
}
