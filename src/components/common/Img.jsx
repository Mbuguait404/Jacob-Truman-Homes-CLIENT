import React, { useState } from "react";

export default function Img({ seed, src, w = 800, h = 600, alt = "", className = "", style = {}, loading = "lazy" }) {
  const [errored, setErrored] = useState(false);
  const url = !errored && src ? src : `https://picsum.photos/seed/${seed}/${w}/${h}`;

  return (
    <img
      src={url}
      alt={alt}
      className={`archival-photo ${className}`}
      style={style}
      loading={loading}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onError={() => setErrored(true)}
    />
  );
}
