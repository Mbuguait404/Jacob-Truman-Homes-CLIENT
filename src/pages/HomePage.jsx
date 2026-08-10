import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Building2, Home, Landmark, ShieldCheck, TrendingUp, Megaphone, Calculator, Users, Quote, MapPin } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";
import ListingCard from "../components/common/ListingCard";
import RevealOnScroll from "../components/common/RevealOnScroll";
import { useListings } from "../context/ListingsContext";
import { TESTIMONIALS } from "../data/testimonials";
import { PROCESS_STEPS } from "../data/process";
import { CITIES } from "../data/listings";

export default function HomePage() {
  const { visibleListings } = useListings();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("All Regions");
  const [searchType, setSearchType] = useState("All Types");
  const featured = visibleListings.filter((l) => l.featured);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchCity !== "All Regions") params.set("city", searchCity);
    if (searchType !== "All Types") params.set("type", searchType);
    const query = params.toString();
    navigate(query ? `/listings?${query}` : "/listings");
  };

  return (
    <>
      <section className="jth-hero">
        <div className="jth-hero__bg">
          <Img seed="hero-main" w={1600} h={1000} className="jth-hero__bg-img" loading="eager" />
        </div>
        <div className="jth-hero__scrim" />
        <div className="jth-hero__content">
          <div className="jth-hero__text">
            <Eyebrow>Across Kenya · Est. 2011</Eyebrow>
            <h1>Find your place in Kenya</h1>
            <p>Sale, letting, management and investment advisory of residential, commercial and land properties — with exceptional service, transparency and value.</p>
          </div>

          <div className="jth-hero__search">
            <div className="jth-hero__search-field">
              <label>Location</label>
              <select value={searchCity} onChange={(e) => setSearchCity(e.target.value)}>
                <option>All Regions</option>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="jth-hero__search-divider" />
            <div className="jth-hero__search-field">
              <label>Type</label>
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option>All Types</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <button className="jth-btn jth-btn--primary jth-btn--lg" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="jth-hero__actions">
            <button className="jth-btn jth-btn--primary jth-btn--lg" onClick={() => navigate("/listings")}>
              Browse listings <ArrowRight size={16} />
            </button>
            <button className="jth-btn jth-btn--outline-light jth-btn--lg" onClick={() => navigate("/sell")}>
              Sell with us
            </button>
          </div>
        </div>
      </section>

      <RevealOnScroll>
        <section className="jth-section jth-strip">
          {[
            { num: "240+", label: "Homes placed since 2011" },
            { num: "4+", label: "Regions across Kenya" },
            { num: "18 days", label: "Average time to let" },
            { num: "4.9 / 5", label: "Client satisfaction" },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="jth-strip__divider" />}
              <div className="jth-strip__item">
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </div>
            </React.Fragment>
          ))}
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
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
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
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
              <h3>Property Marketing</h3>
              <p>Professional photography, targeted marketing, and creative campaigns to showcase your property.</p>
              <Link className="jth-link" to="/sell">
                Market your property <ChevronRight size={15} />
              </Link>
            </div>
            <div className="jth-service-card">
              <Calculator size={26} />
              <h3>Property Valuation Support</h3>
              <p>Reliable valuation support and market analysis to ensure your property is priced competitively.</p>
              <Link className="jth-link" to="/sell">
                Request valuation <ChevronRight size={15} />
              </Link>
            </div>
            <div className="jth-service-card">
              <Users size={26} />
              <h3>Project Marketing for Developers</h3>
              <p>End-to-end marketing solutions for residential and commercial development projects.</p>
              <Link className="jth-link" to="/sell">
                Partner with us <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <section className="jth-section jth-process">
          <div className="jth-section__head">
            <div>
              <Eyebrow>How a sale runs</Eyebrow>
              <h2>Three stages, start to close</h2>
            </div>
          </div>
          <div className="jth-process__grid">
            {PROCESS_STEPS.map((s, i) => (
              <div className="jth-process__step" key={s.n}>
                <div className="jth-process__marker">
                  <span className="jth-process__n">{s.n}</span>
                  {i < PROCESS_STEPS.length - 1 && <div className="jth-process__connector" />}
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
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
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <section className="jth-section jth-map-section">
          <div className="jth-section__head">
            <div>
              <Eyebrow>Where we are</Eyebrow>
              <h2>Across Kenya</h2>
            </div>
          </div>
          <div className="jth-map-wrap">
            <iframe
              title="Jacob Truman Properties locations"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19891906804!2d36.68266045!3d-1.3028619499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="jth-map-locations">
            {["Nairobi", "Kiambu", "Eldoret", "Kajiado"].map((city) => (
              <span key={city} className="jth-map-location">
                <MapPin size={13} /> {city}
              </span>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <section className="jth-section jth-testimonials">
          <div className="jth-testimonials__head">
            <Eyebrow>In their words</Eyebrow>
            <h2>Trusted by homeowners & investors</h2>
          </div>
          <div className="jth-testimonials__grid">
            {TESTIMONIALS.map((t) => (
              <div className="jth-testimonial" key={t.name}>
                <div className="jth-testimonial__quote-mark">
                  <Quote size={32} />
                </div>
                <p>{t.quote}</p>
                <div className="jth-testimonial__who">
                  <div className="jth-testimonial__avatar">
                    <Img seed={`avatar-${t.name.toLowerCase().replace(/\s+/g, "-")}`} w={48} h={48} alt={t.name} />
                  </div>
                  <div className="jth-testimonial__meta">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <section className="jth-cta-band">
          <h2>Every property represents an opportunity.</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "560px", margin: "0 auto 28px", fontSize: "16px" }}>
            Let us help you make your next move with confidence. Our experienced team is dedicated to making the process seamless and rewarding.
          </p>
          <div className="jth-hero__actions">
            <button className="jth-btn jth-btn--primary jth-btn--lg" onClick={() => navigate("/sell")}>
              Sell with us
            </button>
            <button className="jth-btn jth-btn--outline-light jth-btn--lg" onClick={() => navigate("/listings")}>
              Buy or rent
            </button>
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
