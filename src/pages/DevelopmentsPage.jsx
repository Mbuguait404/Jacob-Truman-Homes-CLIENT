import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X, ShieldCheck, MapPin, Building2, AlertTriangle } from "lucide-react";
import DevelopmentCard from "../components/common/DevelopmentCard";
import RevealOnScroll from "../components/common/RevealOnScroll";
import FaqSection from "../components/common/FaqSection";
import PageHero from "../components/common/PageHero";
import { Eyebrow } from "../components/common/SmallBits";
import { useDevelopments } from "../context/DevelopmentsContext";
import { DEVELOPMENTS_FAQS } from "../data/faqs";
import { DEV_CITIES, DEV_STATUSES } from "../data/developments";
import Seo from "../components/common/Seo";

const STATUS_TABS = ["All", ...DEV_STATUSES];

export default function DevelopmentsPage() {
  const { visibleDevelopments, error } = useDevelopments();
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get("city") || "All";
  const status = searchParams.get("status") || "All";

  const activeFilters = [
    city !== "All" && { key: "city", label: city },
    status !== "All" && { key: "status", label: status },
  ].filter(Boolean);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "All") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());

  const featured = visibleDevelopments.filter((d) => d.featured && !d.hidden);

  const filtered = visibleDevelopments.filter((d) => {
    if (city !== "All" && d.city !== city) return false;
    if (status !== "All" && d.status !== status) return false;
    return true;
  });

  return (
    <>
      <Seo
        title="Property Developments & Off-Plan Projects in Kenya"
        description="Explore new-build and off-plan developments across Nairobi, Kiambu, Eldoret and Kajiado from Truman Properties — apartments, villas and mixed-use communities with unit types and pricing."
        path="/developments"
      />
      <PageHero
        seed="jacob-truman-developments"
        eyebrow="New-build & off-plan"
        title={`${visibleDevelopments.length} ${visibleDevelopments.length === 1 ? "development" : "developments"} across Kenya`}
        subtitle="Explore new-build and off-plan projects from vetted developers — apartments, villas and mixed-use communities, with unit types and pricing released as each project progresses."
        badges={[
          { icon: <ShieldCheck size={14} />, label: "Vetted developers" },
          { icon: <MapPin size={14} />, label: "Nationwide" },
          { icon: <Building2 size={14} />, label: "Off-plan & complete" },
        ]}
      />

      <div className="jth-page-header-wrap">
        {error && (
          <div className="jth-fallback-notice">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {featured.length > 0 && (
          <RevealOnScroll delay={80}>
            <section className="jth-section jth-dev-featured">
              <div className="jth-section__head">
                <div>
                  <Eyebrow>Spotlight</Eyebrow>
                  <h2>Featured developments</h2>
                </div>
                <Link className="jth-link" to="/developments">
                  View all
                </Link>
              </div>
              <div className="jth-listings-grid">
                {featured.map((d) => (
                  <DevelopmentCard key={d.id} development={d} />
                ))}
              </div>
            </section>
          </RevealOnScroll>
        )}

        <RevealOnScroll delay={80}>
          <section className="jth-section">
            <div className="jth-dev-tabs" role="tablist" aria-label="Browse by status">
              {STATUS_TABS.map((s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={status === s}
                  className={`jth-dev-tab ${status === s ? "jth-dev-tab--active" : ""}`}
                  onClick={() => updateParam("status", s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="jth-filters">
              <div className="jth-filters__bar">
                <div className="jth-filters__group">
                  <label>City</label>
                  <select value={city} onChange={(e) => updateParam("city", e.target.value)}>
                    <option>All</option>
                    {DEV_CITIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="jth-filters__meta">
                {activeFilters.length > 0 && (
                  <div className="jth-filters__tags">
                    {activeFilters.map((f) => (
                      <button key={f.key} className="jth-filter-tag" onClick={() => updateParam(f.key, "All")}>
                        {f.label} <X size={12} />
                      </button>
                    ))}
                    <button className="jth-filter-tag jth-filter-tag--clear" onClick={clearFilters}>
                      Clear all
                    </button>
                  </div>
                )}
                <div className="jth-filters__count">
                  <SlidersHorizontal size={14} /> {filtered.length} {filtered.length === 1 ? "development" : "developments"}
                </div>
              </div>
            </div>

            <div className="jth-listings-grid">
              {filtered.map((d) => (
                <DevelopmentCard key={d.id} development={d} />
              ))}
              {filtered.length === 0 && (
                <div className="jth-empty">
                  <Search size={32} />
                  <h3>No developments match those filters</h3>
                  <p>Try widening your search, or <a href="/contact">tell us what you're after</a> and we'll look for it.</p>
                </div>
              )}
            </div>
          </section>
        </RevealOnScroll>

        <FaqSection eyebrow="Good to know" title="Questions about our developments" items={DEVELOPMENTS_FAQS} />
      </div>
    </>
  );
}
