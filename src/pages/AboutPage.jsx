import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Star,
  Lightbulb,
  Heart,
  Check,
  MapPin,
  Users,
  Building2,
  Home,
  Landmark,
  TrendingUp,
  Megaphone,
  Calculator,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";
import RevealOnScroll from "../components/common/RevealOnScroll";
import PageHero from "../components/common/PageHero";
import FaqSection from "../components/common/FaqSection";
import { SERVICES_FAQS } from "../data/faqs";

const SERVICES = [
  {
    icon: Building2,
    title: "Property Sales",
    description:
      "Expert guidance through every step of buying or selling residential, commercial and land properties. We handle negotiations, documentation and closing to ensure a smooth transaction.",
    cta: "Browse homes for sale",
    to: "/listings?type=For+Sale",
  },
  {
    icon: Home,
    title: "Residential & Commercial Letting",
    description:
      "Find the perfect rental property or let your property to qualified tenants through our managed letting service. We screen applicants, handle leases and ensure timely rent collection.",
    cta: "Browse rentals",
    to: "/listings?type=For+Rent",
  },
  {
    icon: ShieldCheck,
    title: "Property Management",
    description:
      "Full-service property management including tenant vetting, lease administration, rent collection and ongoing maintenance. We protect your investment so you don't have to worry.",
    cta: "Enquire now",
    to: `/sell?service=${encodeURIComponent("Property Management")}`,
  },
  {
    icon: Landmark,
    title: "Land Sales",
    description:
      "Access verified land parcels for residential, commercial or agricultural investment across Kenya. We verify titles, boundaries and zoning to ensure you buy with confidence.",
    cta: "Enquire about land",
    to: `/buy?service=${encodeURIComponent("Land Sales")}`,
  },
  {
    icon: TrendingUp,
    title: "Investment Consultancy",
    description:
      "Data-driven property investment advice to help you make informed decisions and maximise returns. We analyse market trends, location potential and ROI projections.",
    cta: "Get in touch",
    to: `/buy?service=${encodeURIComponent("Investment Consultancy")}`,
  },
  {
    icon: Megaphone,
    title: "Property Marketing",
    description:
      "Professional photography, targeted marketing and creative campaigns to showcase your property to the right audience across digital and traditional channels.",
    cta: "Market your property",
    to: `/sell?service=${encodeURIComponent("Property Marketing")}`,
  },
  {
    icon: Calculator,
    title: "Property Valuation Support",
    description:
      "Reliable valuation support and market analysis to ensure your property is priced competitively. Our valuations are based on current comparable sales and market conditions.",
    cta: "Request valuation",
    to: `/sell?service=${encodeURIComponent("Property Valuation Support")}`,
  },
  {
    icon: Users,
    title: "Project Marketing for Developers",
    description:
      "End-to-end marketing solutions for residential and commercial development projects. From pre-launch strategy to sell-out, we position your project for maximum uptake.",
    cta: "See our developments",
    to: "/developments",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

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
          <div className="jth-owner__media">
            <Img src="/jack_truman.png" w={700} h={860} alt="Jacob Truman, Founder & Principal Agent" className="jth-owner__portrait" />
            <Img src="/jack_truman_sitting.png" w={520} h={620} alt="Jacob Truman on site" className="jth-owner__portrait-2" />
          </div>
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

      {/* ── Services ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-section" id="services">
          <div className="jth-section__head">
            <div>
              <Eyebrow>What we do</Eyebrow>
              <h2>Comprehensive property services</h2>
            </div>
          </div>
          <div className="jth-services-page__grid">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div className="jth-service-page-card" key={s.title}>
                  <div className="jth-service-page-card__icon">
                    <Icon size={28} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <Link className="jth-link" to={s.to}>
                    {s.cta} <ChevronRight size={15} />
                  </Link>
                </div>
              );
            })}
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

      {/* ── Services FAQ ── */}
      <FaqSection eyebrow="Answers" title="Questions about our services" items={SERVICES_FAQS} />

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

      {/* ── CTA ── */}
      <RevealOnScroll delay={100}>
        <section className="jth-cta-band">
          <h2>Ready to get started?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "560px", margin: "0 auto 28px", fontSize: "16px" }}>
            Tell us what you need and we&rsquo;ll match you with the right service and the right property.
          </p>
          <div className="jth-hero__actions">
            <button className="jth-btn jth-btn--primary jth-btn--lg" onClick={() => navigate("/sell")}>
              Sell with us
            </button>
            <button className="jth-btn jth-btn--outline-light jth-btn--lg" onClick={() => navigate("/buy")}>
              Buy or rent
            </button>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
