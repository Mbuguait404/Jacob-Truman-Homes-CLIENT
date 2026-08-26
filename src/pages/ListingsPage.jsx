import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, X, ShieldCheck, MapPin, Home, AlertTriangle, Maximize2 } from "lucide-react";
import ListingCard from "../components/common/ListingCard";
import RevealOnScroll from "../components/common/RevealOnScroll";
import FaqSection from "../components/common/FaqSection";
import PageHero from "../components/common/PageHero";
import { useState, useMemo, lazy, Suspense } from "react";
import { useListings } from "../context/ListingsContext";
import { LISTINGS_FAQS } from "../data/faqs";
import { CITIES } from "../data/listings";
import { NEIGHBOURHOODS, NEIGHBOURHOOD_NAMES } from "../data/neighbourhoods";

const PropertyMap = lazy(() => import("../components/common/PropertyMap"));

export default function ListingsPage() {
  const { visibleListings, error } = useListings();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const city = searchParams.get("city") || "All";
  const neighborhood = searchParams.get("neighborhood") || "All";
  const type = searchParams.get("type") || "All";
  const beds = searchParams.get("beds") || "Any";
  const [mapOpen, setMapOpen] = useState(true);
  const [mapExpanded, setMapExpanded] = useState(false);

  const activeFilters = [
    city !== "All" && { key: "city", label: city },
    neighborhood !== "All" && { key: "neighborhood", label: neighborhood },
    type !== "All" && { key: "type", label: type },
    beds !== "Any" && { key: "beds", label: `${beds} beds+` },
  ].filter(Boolean);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "All" || value === "Any") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filtered = visibleListings.filter((l) => {
    if (city !== "All" && l.city !== city) return false;
    if (neighborhood !== "All" && l.neighborhood !== neighborhood) return false;
    if (type !== "All" && l.listingType !== type) return false;
    if (beds !== "Any" && l.beds < Number(beds)) return false;
    return true;
  });

  // Map pins: count visible listings per neighbourhood (ignoring the
  // neighbourhood filter so the map stays usable while one is selected).
  const mapPoints = useMemo(() => {
    return NEIGHBOURHOODS.map((n) => {
      const count = visibleListings.filter((l) => {
        if (l.neighborhood !== n.name) return false;
        if (city !== "All" && l.city !== city) return false;
        if (type !== "All" && l.listingType !== type) return false;
        if (beds !== "Any" && l.beds < Number(beds)) return false;
        return true;
      }).length;
      return { name: n.name, city: n.city, lat: n.lat, lng: n.lng, count };
    }).filter((p) => p.count > 0);
  }, [visibleListings, city, type, beds]);

  // Same set used for the map pins, but kept as listings for rich popups
  const mapListings = useMemo(() => {
    return visibleListings.filter((l) => {
      if (city !== "All" && l.city !== city) return false;
      if (type !== "All" && l.listingType !== type) return false;
      if (beds !== "Any" && l.beds < Number(beds)) return false;
      return true;
    });
  }, [visibleListings, city, type, beds]);

  return (
    <>
      <PageHero
        seed="jacob-truman-listings"
        eyebrow="Browse"
        title={`${filtered.length} ${filtered.length === 1 ? "home" : "homes"} across Kenya`}
        subtitle="Verified properties for sale, rent and investment across Nairobi, Kiambu, Eldoret, Kajiado and beyond."
        badges={[
          { icon: <ShieldCheck size={14} />, label: "Verified listings" },
          { icon: <MapPin size={14} />, label: "Nationwide" },
          { icon: <Home size={14} />, label: "Sale & Rent" },
        ]}
      />

      <div className="jth-page-header-wrap">
        {error && (
          <div className="jth-fallback-notice">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}
        <div className="jth-filters">
          <div className="jth-filters__bar">
            <div className="jth-filters__group">
              <label>City</label>
              <select value={city} onChange={(e) => updateParam("city", e.target.value)}>
                <option>All</option>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="jth-filters__group">
              <label>Type</label>
              <select value={type} onChange={(e) => updateParam("type", e.target.value)}>
                <option>All</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <div className="jth-filters__group">
              <label>Neighbourhood</label>
              <select value={neighborhood} onChange={(e) => updateParam("neighborhood", e.target.value)}>
                <option>All</option>
                {NEIGHBOURHOOD_NAMES.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="jth-filters__group">
              <label>Minimum beds</label>
              <select value={beds} onChange={(e) => updateParam("beds", e.target.value)}>
                <option>Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
          <div className="jth-filters__meta">
            {activeFilters.length > 0 && (
              <div className="jth-filters__tags">
                {activeFilters.map((f) => (
                  <button key={f.key} className="jth-filter-tag" onClick={() => updateParam(f.key, f.key === "beds" ? "Any" : "All")}>
                    {f.label} <X size={12} />
                  </button>
                ))}
                <button className="jth-filter-tag jth-filter-tag--clear" onClick={clearFilters}>
                  Clear all
                </button>
              </div>
            )}
            <div className="jth-filters__count">
              <SlidersHorizontal size={14} /> {filtered.length} {filtered.length === 1 ? "home" : "homes"}
            </div>
          </div>
        </div>

        <div
          className={`jth-split${mapOpen ? "" : " jth-split--collapsed"}${
            mapExpanded ? " jth-split--expanded" : ""
          }`}
        >
          <div className="jth-split__list">
            <RevealOnScroll delay={80}>
              <div className="jth-listings-grid">
                {filtered.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
                {filtered.length === 0 && (
                  <div className="jth-empty">
                    <Search size={32} />
                    <h3>No homes match those filters</h3>
                    <p>Try widening your search, or <a href="/buy">tell us what you're after</a> and we'll look for it.</p>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          </div>

          {mapOpen && (
            <aside className="jth-split__map">
              <div className="jth-split__map-bar">
                <span className="jth-split__map-title">
                  <MapPin size={14} /> Map
                </span>
                <div className="jth-split__map-actions">
                  {!mapExpanded && (
                    <button
                      type="button"
                      className="jth-icon-btn"
                      title="Expand map"
                      onClick={() => setMapExpanded(true)}
                    >
                      <Maximize2 size={15} />
                    </button>
                  )}
                  <button
                    type="button"
                    className="jth-icon-btn"
                    title={mapExpanded ? "Collapse map" : "Hide map"}
                    onClick={() => (mapExpanded ? setMapExpanded(false) : setMapOpen(false))}
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
              <div className="jth-split__map-body">
                <div className="jth-prop-map-head">
                  <span>
                    <MapPin size={14} />
                    {mapPoints.length
                      ? `${mapPoints.reduce((s, p) => s + p.count, 0)} homes plotted across ${mapPoints.length} neighbourhoods`
                      : "No homes plotted yet"}
                  </span>
                  <span className="jth-prop-map-hint">Tap a pin to filter by neighbourhood</span>
                </div>
                <div className="jth-split__map-canvas">
                  <Suspense fallback={<div className="jth-prop-map" />}>
                    <PropertyMap
                      points={mapPoints}
                      listings={mapListings}
                      selected={neighborhood}
                      onSelect={(n) => updateParam("neighborhood", n)}
                      onOpenListing={(id) => navigate(`/listings/${id}`)}
                      expanded={mapExpanded}
                    />
                  </Suspense>
                </div>
              </div>
            </aside>
          )}
        </div>

        {!mapOpen && (
          <button type="button" className="jth-map-show" onClick={() => setMapOpen(true)}>
            <MapPin size={15} /> Show map
          </button>
        )}

        <FaqSection eyebrow="Good to know" title="Questions about our listings" items={LISTINGS_FAQS} />
      </div>
    </>
  );
}
