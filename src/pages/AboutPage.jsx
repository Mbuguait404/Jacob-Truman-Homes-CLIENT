import React from "react";
import { ShieldCheck, Award, Star, Lightbulb, Heart, Check, MapPin, Users } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";
import RevealOnScroll from "../components/common/RevealOnScroll";
import PageHero from "../components/common/PageHero";

export default function AboutPage() {
  return (
    <div className="jth-about">
      {/* ── About Us Hero ── */}
      <PageHero
        seed="jacob-truman-about"
        eyebrow="About Jacob Truman Properties"
        title="Connecting you with quality properties across Kenya."
        subtitle="Jacob Truman Properties is a trusted real estate company specializing in the sale, letting, management, and investment advisory of residential, commercial, and land properties across Kenya. We are committed to connecting clients with quality properties while delivering exceptional service, transparency, and value."
        badges={[
          { icon: <Award size={14} />, label: "Est. 2011" },
          { icon: <Users size={14} />, label: "240+ homes placed" },
          { icon: <MapPin size={14} />, label: "Kenya-wide" },
        ]}
      />

      {/* ── Owner ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-owner">
          <Img seed="owner-jacob-full" w={700} h={860} className="jth-owner__portrait" />
          <div className="jth-owner__content">
            <Eyebrow>Founder &amp; principal agent</Eyebrow>
            <h2>Jacob Truman</h2>
            <p>Jacob started in property management in Nairobi&rsquo;s Kilimani in 2008 before founding the agency in 2011. He now leads a team of experienced professionals serving clients across Kenya, and remains personally committed to the values that built this company &mdash; integrity, professionalism, and a genuine passion for connecting people with the right property.</p>
            <div className="jth-owner__stats">
              <div><strong>15+</strong><span>Years in property</span></div>
              <div><strong>240+</strong><span>Properties placed</span></div>
              <div><strong>4+</strong><span>Regions served</span></div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Vision & Mission ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-vision-mission">
          <div className="jth-vm-card">
            <Eyebrow>Our Vision</Eyebrow>
            <p>To be Kenya&rsquo;s most trusted and innovative real estate company, transforming lives through exceptional property solutions.</p>
          </div>
          <div className="jth-vm-card">
            <Eyebrow>Our Mission</Eyebrow>
            <p>To provide professional, transparent, and customer-focused real estate services that help our clients make informed property decisions while creating lasting value.</p>
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Core Values ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-values-section">
          <Eyebrow>What we stand for</Eyebrow>
          <h2>Our Core Values</h2>
          <div className="jth-values">
            <div className="jth-value">
              <ShieldCheck size={22} />
              <h3>Integrity</h3>
              <p>We conduct business with honesty and transparency.</p>
            </div>
            <div className="jth-value">
              <Award size={22} />
              <h3>Professionalism</h3>
              <p>We uphold the highest industry standards.</p>
            </div>
            <div className="jth-value">
              <Star size={22} />
              <h3>Excellence</h3>
              <p>We strive to exceed client expectations.</p>
            </div>
            <div className="jth-value">
              <Lightbulb size={22} />
              <h3>Innovation</h3>
              <p>We embrace modern technology and creative marketing.</p>
            </div>
            <div className="jth-value">
              <Heart size={22} />
              <h3>Customer Focus</h3>
              <p>Our clients are at the heart of everything we do.</p>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Why Choose Us ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-why-us">
          <Eyebrow>The difference</Eyebrow>
          <h2>Why Choose Us?</h2>
          <div className="jth-why-us__grid">
            {[
              "Personalized customer service",
              "Wide portfolio of verified properties",
              "Professional marketing and photography",
              "Honest and transparent transactions",
              "Strong knowledge of the Kenyan property market",
              "End-to-end support from inquiry to completion",
            ].map((item) => (
              <div key={item} className="jth-why-us__item">
                <Check size={16} /> {item}
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* ── Areas We Serve ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-areas">
          <Eyebrow>Where we operate</Eyebrow>
          <h2>Areas We Serve</h2>
          <p className="jth-areas__intro">We proudly serve clients across Kenya, with a strong presence in:</p>
          <div className="jth-areas__grid">
            <span>Nairobi</span>
            <span>Kiambu</span>
            <span>Eldoret</span>
            <span>Kajiado</span>
          </div>
          <p className="jth-areas__note">And other key growth locations nationwide.</p>
        </section>
      </RevealOnScroll>

      {/* ── Our Commitment ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-commitment">
          <div className="jth-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Eyebrow>Our promise</Eyebrow>
            <h2>Our Commitment</h2>
            <p>At Jacob Truman Properties, we believe that every property represents an opportunity. Our goal is to build lasting relationships by delivering reliable, efficient, and professional real estate solutions tailored to each client&rsquo;s needs.</p>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
