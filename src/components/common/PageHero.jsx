import React from "react";
import Img from "./Img";
import { Eyebrow } from "./SmallBits";

export default function PageHero({ seed, eyebrow, title, subtitle, badges = [], children }) {
  return (
    <section className="jth-page-hero">
      <div className="jth-page-hero__bg">
        <Img seed={seed} w={1600} h={900} className="jth-page-hero__bg-img" loading="eager" />
      </div>
      <div className="jth-page-hero__scrim" />
      <div className="jth-page-hero__content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
        {badges.length > 0 && (
          <div className="jth-hero-badges">
            {badges.map((b, i) => (
              <span key={i} className="jth-hero-badge">
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
