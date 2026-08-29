import React, { useState } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { ChevronLeft, MapPin, Building2, CalendarClock, Check, ShieldCheck, Phone, Mail, Star, TrendingUp, Wallet, Eye, Bed, Bath, Maximize } from "lucide-react";
import Img from "../components/common/Img";
import Seal from "../components/common/Seal";
import { StatusBadge, WhatsAppIcon, Eyebrow } from "../components/common/SmallBits";
import RevealOnScroll from "../components/common/RevealOnScroll";
import { useDevelopments } from "../context/DevelopmentsContext";
import { formatPrice } from "../utils/format";

const TIMELINE = [
  { status: "Upcoming", label: "Planning" },
  { status: "Off-Plan", label: "Off-Plan Sales" },
  { status: "Under Construction", label: "Construction" },
  { status: "Finishing", label: "Finishing" },
  { status: "Completed", label: "Handover" },
];

function statusIndex(status) {
  if (status === "Upcoming") return 0;
  if (status === "Off-Plan") return 1;
  if (status === "Under Construction") return 2;
  if (status === "Completed" || status === "Sold Out") return 4;
  return 0;
}

function formatDate(value) {
  if (!value) return "TBA";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
}

export default function DevelopmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { visibleDevelopments } = useDevelopments();
  const [activeImg, setActiveImg] = useState(0);
  const [activeUnit, setActiveUnit] = useState(0);

  const development = visibleDevelopments.find((d) => String(d.id) === id || d.slug === id);
  if (!development) return <Navigate to="/developments" replace />;

  const gallery = development.images?.length
    ? development.images
    : [development.slug, `${development.slug}-b`, `${development.slug}-c`].filter(Boolean);

  const minPrice = development.unitTypes?.length
    ? Math.min(...development.unitTypes.map((u) => u.priceFrom || Infinity))
    : null;

  const currentStep = statusIndex(development.status);
  const unit = development.unitTypes?.[activeUnit];

  const waText = encodeURIComponent(
    `Hi Jacob Truman Properties, I would like to register my interest in ${development.title} (${development.neighborhood}, ${development.city}).`
  );
  const waPriceText = encodeURIComponent(
    `Hi Jacob Truman Properties, please send me the full price list for ${development.title} (${development.neighborhood}, ${development.city}).`
  );
  const mapQuery = encodeURIComponent(`${development.neighborhood}, ${development.city}, Kenya`);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`;

  return (
    <div className="jth-detail jth-dev-detail">
      <button className="jth-back" onClick={() => navigate("/developments")}>
        <ChevronLeft size={16} /> Back to developments
      </button>

      <div className="jth-detail__gallery">
        <div className="jth-detail__hero-img">
          <Img src={gallery[activeImg]} w={1400} h={900} alt={development.title} loading="eager" />
          <div className="jth-detail__seal">
            <Seal size={74} />
          </div>
          <div className="jth-detail__gallery-badge">
            {activeImg + 1} / {gallery.length}
          </div>
        </div>
        <div className="jth-detail__thumbs">
          {gallery.map((s, i) => (
            <button key={s + i} className={i === activeImg ? "active" : ""} onClick={() => setActiveImg(i)}>
              <Img src={s} w={300} h={220} />
            </button>
          ))}
        </div>
      </div>

      <div className="jth-detail__layout">
        <div className="jth-detail__main">
          <div className="jth-detail__title-row">
            <div>
              <span className="jth-card__type">{development.developer}</span>
              <h1>{development.title}</h1>
              <span className="jth-card__loc">
                <MapPin size={14} /> {development.neighborhood}, {development.city}
              </span>
            </div>
            <StatusBadge status={development.status} />
          </div>

          <div className="jth-dev-detail__facts">
            <div><CalendarClock size={16} /> <span>Completion</span> <strong>{formatDate(development.completionDate)}</strong></div>
            <div><Building2 size={16} /> <span>Units</span> <strong>{development.unitTypes?.length || 0} types</strong></div>
            <div><MapPin size={16} /> <span>Location</span> <strong>{development.neighborhood}, {development.city}</strong></div>
          </div>

          <div className="jth-divider" />
          <h3 className="jth-detail__subhead">About this development</h3>
          <p className="jth-detail__desc">{development.description}</p>

          {/* Construction progress */}
          <RevealOnScroll delay={80}>
            <section className="jth-dev-timeline">
              <Eyebrow>Progress</Eyebrow>
              <h3 className="jth-detail__subhead">Construction timeline</h3>
              <div className="jth-dev-timeline__track">
                {TIMELINE.map((step, i) => (
                  <div
                    key={step.label}
                    className={`jth-dev-timeline__step ${i <= currentStep ? "is-done" : ""} ${i === currentStep ? "is-current" : ""}`}
                  >
                    <div className="jth-dev-timeline__dot">{i < currentStep ? <Check size={13} /> : i + 1}</div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          <div className="jth-divider" />
          <h3 className="jth-detail__subhead">Available units</h3>
          <div className="jth-dev-units">
            <div className="jth-dev-units__head">
              <span>Type</span>
              <span>Beds</span>
              <span>Baths</span>
              <span>Area</span>
              <span>From</span>
            </div>
            {development.unitTypes?.map((u, i) => (
              <div className="jth-dev-units__row" key={u.type + i}>
                <span><strong>{u.type}</strong></span>
                <span>{u.beds}</span>
                <span>{u.baths}</span>
                <span>{u.area} m²</span>
                <span>{formatPrice(u.priceFrom, false)}</span>
              </div>
            ))}
            {(!development.unitTypes || development.unitTypes.length === 0) && (
              <div className="jth-dev-units__row jth-dev-units__row--empty">
                <span>Unit types to be released.</span>
              </div>
            )}
          </div>

          {/* Floor plans */}
          {development.unitTypes?.length > 0 && (
            <RevealOnScroll delay={80}>
              <section className="jth-dev-floorplans">
                <Eyebrow>Floor plans</Eyebrow>
                <h3 className="jth-detail__subhead">Explore the layouts</h3>
                <div className="jth-dev-floorplans__tabs">
                  {development.unitTypes.map((u, i) => (
                    <button
                      key={u.type + i}
                      className={`jth-dev-floorplans__tab ${i === activeUnit ? "is-active" : ""}`}
                      onClick={() => setActiveUnit(i)}
                    >
                      {u.type}
                    </button>
                  ))}
                </div>
                {unit && (
                  <div className="jth-dev-floorplans__panel">
                    <Img
                      src={`https://picsum.photos/seed/${development.slug}-${unit.type.replace(/\s+/g, "-").toLowerCase()}-floor/900/680`}
                      w={900}
                      h={680}
                      alt={`${unit.type} floor plan`}
                      className="jth-dev-floorplans__img"
                    />
                    <div className="jth-dev-floorplans__specs">
                      <h4>{unit.type}</h4>
                      <ul>
                        <li><Bed size={15} /> {unit.beds} bedrooms</li>
                        <li><Bath size={15} /> {unit.baths} bathrooms</li>
                        <li><Maximize size={15} /> {unit.area} m²</li>
                        <li><Wallet size={15} /> From {formatPrice(unit.priceFrom, false)}</li>
                      </ul>
                      <Link className="jth-btn jth-btn--outline" to="/contact">Enquire about this unit</Link>
                    </div>
                  </div>
                )}
              </section>
            </RevealOnScroll>
          )}

          <div className="jth-divider" />
          <h3 className="jth-detail__subhead">Amenities &amp; finishes</h3>
          <div className="jth-amenities">
            {(development.amenities || []).map((a) => (
              <div key={a} className="jth-amenities__item">
                <Check size={15} /> {a}
              </div>
            ))}
            {(!development.amenities || development.amenities.length === 0) && (
              <p className="jth-detail__desc">Details to be confirmed.</p>
            )}
          </div>

          {/* Location + map */}
          <div className="jth-divider" />
          <RevealOnScroll delay={80}>
            <section className="jth-dev-location">
              <Eyebrow>Location</Eyebrow>
              <h3 className="jth-detail__subhead">Where you'll be</h3>
              <p className="jth-detail__desc">
                {development.title} is located in {development.neighborhood}, {development.city} — close to schools, healthcare, shopping and major transport routes.
              </p>
              <div className="jth-map-wrap">
                <iframe title={`Map of ${development.neighborhood}, ${development.city}`} src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </section>
          </RevealOnScroll>

          {/* Video / virtual tour */}
          {development.videoUrl && (
            <div className="jth-divider" />
          )}
          {development.videoUrl && (
            <RevealOnScroll delay={80}>
              <section className="jth-dev-video">
                <Eyebrow>Virtual tour</Eyebrow>
                <h3 className="jth-detail__subhead">Walk through the project</h3>
                <div className="jth-dev-video__frame">
                  <iframe
                    title={`${development.title} virtual tour`}
                    src={development.videoUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </section>
            </RevealOnScroll>
          )}
        </div>

        <aside className="jth-detail__sidebar">
          <div className="jth-price-card">
            <div className="jth-price-card__header">
              <span className="jth-price-card__type">{development.status}</span>
              <div className="jth-price-card__price">
                {minPrice != null && minPrice !== Infinity ? `From ${formatPrice(minPrice, false)}` : "Price on request"}
              </div>
            </div>
            <Link className="jth-btn jth-btn--primary jth-btn--block" to="/contact">
              Register interest
            </Link>
            <div className="jth-price-card__cta-row">
              <a className="jth-btn jth-btn--cta jth-btn--cta-call" href="tel:+254718806741">
                <Phone size={15} /> Call now
              </a>
              <a
                className="jth-btn jth-btn--cta jth-btn--cta-wa"
                href={`https://wa.me/254718806741?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={15} /> WhatsApp
              </a>
            </div>
            <div className="jth-dev-detail__cta-row">
              <Link className="jth-btn jth-btn--outline jth-btn--block" to="/contact">
                <Eye size={15} /> Book a viewing
              </Link>
              <a className="jth-btn jth-btn--outline jth-btn--block" href={`https://wa.me/254718806741?text=${waPriceText}`} target="_blank" rel="noopener noreferrer">
                <Wallet size={15} /> Request price list
              </a>
            </div>
            <div className="jth-divider" />
            <div className="jth-price-card__agent">
              <div>
                <strong>{development.developer}</strong>
                <span>Developer</span>
              </div>
            </div>
            <div className="jth-price-card__contact">
              <span><Phone size={14} /> 0718 806741 | 0100201010</span>
              <span><Mail size={14} /> <a href="mailto:info.trumanproperties@gmail.com">info.trumanproperties@gmail.com</a></span>
            </div>
          </div>

          <RevealOnScroll delay={80}>
            <div className="jth-dev-invest">
              <h3><TrendingUp size={16} /> Why invest here</h3>
              <ul>
                <li><Wallet size={15} /> <div><strong>From {minPrice != null && minPrice !== Infinity ? formatPrice(minPrice, false) : "request"}</strong><span>Flexible payment plans available — ask our team.</span></div></li>
                <li><Star size={15} /> <div><strong>Vetted developer</strong><span>We share timelines openly and recommend independent legal review.</span></div></li>
                <li><TrendingUp size={15} /> <div><strong>Growth area</strong><span>{development.city} continues to see strong demand and capital appreciation.</span></div></li>
              </ul>
            </div>
          </RevealOnScroll>

          <div className="jth-trust-card">
            <ShieldCheck size={18} />
            <span>Vetted developer. We share completion timelines openly and recommend independent legal review before you commit.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
