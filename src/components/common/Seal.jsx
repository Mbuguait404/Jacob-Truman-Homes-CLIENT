import React from "react";

export default function Seal({ size = 74 }) {
  return (
    <div className="jth-seal" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <path id="sealArcTop" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
        <path id="sealArcBottom" d="M 85 55 A 35 35 0 0 1 15 55" fill="none" />
        <text fontSize="8.2" letterSpacing="2.5" fill="currentColor" fontFamily="Work Sans">
          <textPath href="#sealArcTop" startOffset="50%" textAnchor="middle">JACOB TRUMAN</textPath>
        </text>
        <text fontSize="8.2" letterSpacing="2.5" fill="currentColor" fontFamily="Work Sans">
          <textPath href="#sealArcBottom" startOffset="50%" textAnchor="middle">HOMES · EST.</textPath>
        </text>
        <text x="50" y="56" fontSize="20" fill="currentColor" textAnchor="middle" fontFamily="Fraunces" fontWeight="500">
          JTH
        </text>
      </svg>
    </div>
  );
}
