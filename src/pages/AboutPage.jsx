import React from "react";
import { ShieldCheck, Handshake, Star } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";

export default function AboutPage() {
  return (
    <div className="jth-about">
      <section className="jth-about__hero">
        <div>
          <Eyebrow>About the agency</Eyebrow>
          <h1>Fifteen years of quiet introductions between people and houses.</h1>
          <p>Jacob Truman Homes was founded in Nairobi in 2011 and opened a second office in Eldoret in 2017, built on the idea that a good agent spends more time listening than talking.</p>
        </div>
        <Img seed="about-hero" w={900} h={700} />
      </section>

      <section className="jth-section jth-owner">
        <Img seed="owner-jacob-full" w={700} h={860} className="jth-owner__portrait" />
        <div className="jth-owner__content">
          <Eyebrow>Owner &amp; principal agent</Eyebrow>
          <h2>Jacob Truman</h2>
          <p>Jacob started in property management in Nairobi's Kilimani in 2008, before founding the agency in 2011 with a single rented desk and a handful of landlord clients. He now leads a team of nine across Nairobi and Eldoret, and still personally handles the agency's Karen and Runda listings.</p>
          <p>"I'd rather place ten families in the right home than twenty in the wrong one. That's the only metric that's ever mattered here."</p>
          <div className="jth-owner__stats">
            <div><strong>15+</strong><span>Years in property</span></div>
            <div><strong>240+</strong><span>Homes placed</span></div>
            <div><strong>9</strong><span>Team members</span></div>
          </div>
        </div>
      </section>

      <section className="jth-section jth-process">
        <Eyebrow>Our story</Eyebrow>
        <h2>How the agency grew</h2>
        <div className="jth-process__grid">
          <div className="jth-process__step">
            <span className="jth-process__n">2011</span>
            <h3>Founded in Kilimani</h3>
            <p>Jacob Truman Homes opens with a single office and a focus on Nairobi rentals.</p>
          </div>
          <div className="jth-process__step">
            <span className="jth-process__n">2017</span>
            <h3>Eldoret office opens</h3>
            <p>Demand from diaspora clients and Rift Valley families leads to a second office in Elgon View.</p>
          </div>
          <div className="jth-process__step">
            <span className="jth-process__n">Today</span>
            <h3>Sales, lettings &amp; management</h3>
            <p>A team of nine now handles buying, selling, renting and full property management in both cities.</p>
          </div>
        </div>
      </section>

      <section className="jth-section jth-values">
        <div className="jth-value">
          <ShieldCheck size={22} />
          <h3>Discretion</h3>
          <p>Every listing and every client's business is handled in confidence, always.</p>
        </div>
        <div className="jth-value">
          <Handshake size={22} />
          <h3>Fair dealing</h3>
          <p>We represent one side of a transaction at a time, and say so plainly.</p>
        </div>
        <div className="jth-value">
          <Star size={22} />
          <h3>Long term</h3>
          <p>We'd rather keep a client for fifteen years than close one deal quickly.</p>
        </div>
      </section>
    </div>
  );
}
