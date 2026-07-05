import React from "react";
import { Bed, Bath, Maximize2 } from "lucide-react";

export function Eyebrow({ children }) {
  return <div className="jth-eyebrow">{children}</div>;
}

export function StatusBadge({ status }) {
  const modifier = status.replace(/\s+/g, "").toLowerCase();
  return <span className={`jth-badge jth-badge--${modifier}`}>{status}</span>;
}

export function SpecRow({ listing, compact }) {
  return (
    <div className={`jth-specs ${compact ? "jth-specs--compact" : ""}`}>
      <span><Bed size={compact ? 14 : 16} /> {listing.beds}</span>
      <span><Bath size={compact ? 14 : 16} /> {listing.baths}</span>
      <span><Maximize2 size={compact ? 14 : 16} /> {listing.area} m²</span>
    </div>
  );
}
