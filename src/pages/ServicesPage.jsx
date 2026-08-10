import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../components/common/Img";
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
    to: "/sell",
  },
  {
    icon: Landmark,
    title: "Land Sales",
    description:
      "Access verified land parcels for residential, commercial or agricultural investment across Kenya. We verify titles, boundaries and zoning to ensure you buy with confidence.",
    cta: "View land listings",
    to: "/listings",
  },
  {
    icon: TrendingUp,
    title: "Investment Consultancy",
    description:
      "Data-driven property investment advice to help you make informed decisions and maximise returns. We analyse market trends, location potential and ROI projections.",
    cta: "Get in touch",
    to: "/buy",
  },
  {
    icon: Megaphone,
    title: "Property Marketing",
    description:
      "Professional photography, targeted marketing and creative campaigns to showcase your property to the right audience across digital and traditional channels.",
    cta: "Market your property",
    to: "/sell",
  },
  {
    icon: Calculator,
    title: "Property Valuation Support",
    description:
      "Reliable valuation support and market analysis to ensure your property is priced competitively. Our valuations are based on current comparable sales and market conditions.",
    cta: "Request valuation",
    to: "/sell",
  },
  {
    icon: Users,
    title: "Project Marketing for Developers",
    description:
      "End-to-end marketing solutions for residential and commercial development projects. From pre-launch strategy to sell-out, we position your project for maximum uptake.",
    cta: "Partner with us",
    to: "/sell",
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="jth-services-page">
      {/* Hero */}
      <section className="jth-services-hero">
        <div className="jth-services-hero__bg">
          <Img seed="jacob-truman-services" w={1600} h={900} className="jth-services-hero__bg-img" loading="eager" />
        </div>
        <div className="jth-services-hero__scrim" />
        <div className="jth-services-hero__content">
          <Eyebrow>What we do</Eyebrow>
          <h1>Comprehensive property services</h1>
          <p>
            From sales and letting to management and investment advisory — we deliver
            professional, transparent and customer-focused real estate solutions across Kenya.
          </p>
          <div className="jth-hero-badges">
            <span className="jth-hero-badge"><Calendar size={14} /> Est. 2011</span>
            <span className="jth-hero-badge"><Layers size={14} /> 8 Services</span>
            <span className="jth-hero-badge"><MapPin size={14} /> Kenya-wide</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
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

      {/* Why work with us */}
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

      {/* CTA */}
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
    </div>
  );
}
