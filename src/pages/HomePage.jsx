import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Building2, Home, Landmark, ShieldCheck, TrendingUp, Megaphone, Quote } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";
import ListingCard from "../components/common/ListingCard";
import { useListings } from "../context/ListingsContext";
import { TESTIMONIALS } from "../data/testimonials";
import { PROCESS_STEPS } from "../data/process";

export default function HomePage() {
  const { listings } = useListings();
  const navigate = useNavigate();
  const featured = listings.filter((l) => l.featured);

  return (
    <>
      <section className="jth-hero">
        <div className="jth-hero__grid">
          <Img seed="hero-main" w={1200} h={1500} className="jth-hero__img jth-hero__img--a" />
          <Img seed="hero-b" w={900} h={700} className="jth-hero__img jth-hero__img--b" />
          <Img seed="hero-c" w={900} h={700} className="jth-hero__img jth-hero__img--c" />
        </div>
        <div className="jth-hero__scrim" />
        <div className="jth-hero__content">
          <Eyebrow>Across Kenya · Est. 2011</Eyebrow>
          <h1>
            Your trusted partner
            <br />
            in Kenyan real
            <br />
            estate.
          </h1>
          <p>We specialise in the sale, letting, management and investment advisory of residential, commercial and land properties across Kenya — with transparency, integrity and exceptional service.</p>
          <div className="jth-hero__actions">
            <button className="jth-btn jth-btn--primary jth-btn--lg" onClick={() => navigate("/listings")}>
              Browse listings <ArrowRight size={16} />
            </button>
            <button className="jth-btn jth-btn--outline jth-btn--lg" onClick={() => navigate("/sell")}>
              Sell with us
            </button>
          </div>
        </div>
      </section>

      <section className="jth-section jth-strip">
        <div className="jth-strip__item"><strong>240+</strong><span>Homes placed since 2011</span></div>
        <div className="jth-strip__item"><strong>4+</strong><span>Regions — across Kenya</span></div>
        <div className="jth-strip__item"><strong>18 days</strong><span>Average time to let</span></div>
        <div className="jth-strip__item"><strong>4.9 / 5</strong><span>Client satisfaction</span></div>
      </section>

      <section className="jth-section">
        <div className="jth-section__head">
          <div>
            <Eyebrow>Featured</Eyebrow>
            <h2>Currently keeping watch over</h2>
          </div>
          <Link className="jth-link" to="/listings">
            View all listings <ChevronRight size={16} />
          </Link>
        </div>
        <div className="jth-featured-grid">
          {featured[0] && <ListingCard listing={featured[0]} size="lg" />}
          <div className="jth-featured-grid__side">
            {featured.slice(1, 3).map((l) => (
              <ListingCard key={l.id} listing={l} size="sm" />
            ))}
          </div>
        </div>
      </section>

      <section className="jth-section jth-services">
        <Eyebrow>What we do</Eyebrow>
        <h2>Comprehensive property services</h2>
        <div className="jth-services__grid">
          <div className="jth-service-card">
            <Building2 size={26} />
            <h3>Property Sales</h3>
            <p>Expert guidance through every step of buying or selling residential, commercial and land properties.</p>
            <Link className="jth-link" to="/listings?type=For+Sale">
              Browse homes for sale <ChevronRight size={15} />
            </Link>
          </div>
          <div className="jth-service-card">
            <Home size={26} />
            <h3>Residential &amp; Commercial Letting</h3>
            <p>Find the perfect rental property or let your property to qualified tenants through our managed letting service.</p>
            <Link className="jth-link" to="/listings?type=For+Rent">
              Browse rentals <ChevronRight size={15} />
            </Link>
          </div>
          <div className="jth-service-card">
            <ShieldCheck size={26} />
            <h3>Property Management</h3>
            <p>Full-service property management including tenant vetting, lease administration, and ongoing maintenance.</p>
            <Link className="jth-link" to="/sell">
              Enquire now <ChevronRight size={15} />
            </Link>
          </div>
          <div className="jth-service-card">
            <Landmark size={26} />
            <h3>Land Sales</h3>
            <p>Access verified land parcels for residential, commercial or agricultural investment across Kenya.</p>
            <Link className="jth-link" to="/listings">
              View land listings <ChevronRight size={15} />
            </Link>
          </div>
          <div className="jth-service-card">
            <TrendingUp size={26} />
            <h3>Investment Consultancy</h3>
            <p>Data-driven property investment advice to help you make informed decisions and maximise returns.</p>
            <Link className="jth-link" to="/buy">
              Get in touch <ChevronRight size={15} />
            </Link>
          </div>
          <div className="jth-service-card">
            <Megaphone size={26} />
            <h3>Property Marketing &amp; Valuation</h3>
            <p>Professional photography, targeted marketing, and reliable valuation support for your property.</p>
            <Link className="jth-link" to="/sell">
              Market your property <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="jth-section jth-process">
        <div className="jth-section__head">
          <div>
            <Eyebrow>How a sale runs</Eyebrow>
            <h2>Three stages, start to close</h2>
          </div>
        </div>
        <div className="jth-process__grid">
          {PROCESS_STEPS.map((s) => (
            <div className="jth-process__step" key={s.n}>
              <span className="jth-process__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="jth-section jth-cities">
        <Link className="jth-city-panel" to="/listings?city=Nairobi">
          <Img seed="city-nairobi" w={900} h={1100} />
          <div className="jth-city-panel__label">
            <h3>Nairobi &amp; Kiambu</h3>
            <span>Karen · Kilimani · Runda · Westlands · Lavington · Kiambu · Thika</span>
          </div>
        </Link>
        <Link className="jth-city-panel" to="/listings?city=Eldoret">
          <Img seed="city-eldoret" w={900} h={1100} />
          <div className="jth-city-panel__label">
            <h3>Eldoret &amp; Kajiado</h3>
            <span>Elgon View · Pioneer · Kapsoya · Racecourse · Kajiado · Ngong</span>
          </div>
        </Link>
      </section>

      <section className="jth-section jth-testimonials">
        <Eyebrow>In their words</Eyebrow>
        <div className="jth-testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <div className="jth-testimonial" key={t.name}>
              <Quote size={22} />
              <p>{t.quote}</p>
              <div className="jth-testimonial__who">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="jth-cta-band">
        <h2>Ready to buy, sell, let or invest in Kenyan property?</h2>
        <div className="jth-hero__actions">
          <button className="jth-btn jth-btn--primary jth-btn--lg" onClick={() => navigate("/sell")}>
            Sell with us
          </button>
          <button className="jth-btn jth-btn--outline-light jth-btn--lg" onClick={() => navigate("/listings")}>
            Buy or rent
          </button>
        </div>
      </section>
    </>
  );
}
