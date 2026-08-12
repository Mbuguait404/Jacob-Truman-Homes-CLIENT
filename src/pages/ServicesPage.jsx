import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RevealOnScroll from "../components/common/RevealOnScroll";
import {
  Building2,
  Home,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Megaphone,
  Calculator,
  Users,
  ArrowRight,
  ChevronRight,
  Calendar,
  MapPin,
  Layers,
} from "lucide-react";
import { Eyebrow } from "../components/common/SmallBits";
import FaqSection from "../components/common/FaqSection";
import PageHero from "../components/common/PageHero";
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
    cta: "Partner with us",
    to: `/sell?service=${encodeURIComponent("Project Marketing for Developers")}`,
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="jth-services-page">
      {/* Hero */}
      <PageHero
        seed="jacob-truman-services"
        eyebrow="What we do"
        title="Comprehensive property services"
        subtitle="From sales and letting to management and investment advisory — we deliver professional, transparent and customer-focused real estate solutions across Kenya."
        badges={[
          { icon: <Calendar size={14} />, label: "Est. 2011" },
          { icon: <Layers size={14} />, label: "8 Services" },
          { icon: <MapPin size={14} />, label: "Kenya-wide" },
        ]}
      />

      {/* Services Grid */}
      <RevealOnScroll delay={100}>
        <section className="jth-section">
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

      {/* Why work with us */}
      <RevealOnScroll delay={100}>
        <section className="jth-section jth-services-why">
          <div className="jth-services-why__head">
            <Eyebrow>The difference</Eyebrow>
            <h2>Why work with Jacob Truman Properties?</h2>
          </div>
          <div className="jth-services-why__grid">
            {[
              "Personalized customer service",
              "Wide portfolio of verified properties",
              "Professional marketing and photography",
              "Honest and transparent transactions",
              "Strong knowledge of the Kenyan property market",
              "End-to-end support from inquiry to completion",
            ].map((item) => (
              <div key={item} className="jth-services-why__item">
                <ArrowRight size={16} /> {item}
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* FAQ */}
      <FaqSection eyebrow="Answers" title="Questions about our services" items={SERVICES_FAQS} />

      {/* CTA */}
      <RevealOnScroll delay={100}>
        <section className="jth-cta-band">
          <h2>Ready to get started?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "560px", margin: "0 auto 28px", fontSize: "16px" }}>
            Tell us what you need and we'll match you with the right service and the right property.
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
