import React from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, ShieldCheck, MapPin, Home, AlertTriangle } from "lucide-react";
import Img from "../components/common/Img";
import { Eyebrow } from "../components/common/SmallBits";
import ListingCard from "../components/common/ListingCard";
import { useListings } from "../context/ListingsContext";
import { CITIES } from "../data/listings";

export default function ListingsPage() {
  const { visibleListings, error } = useListings();
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get("city") || "All";
  const type = searchParams.get("type") || "All";
  const beds = searchParams.get("beds") || "Any";

  const activeFilters = [
    city !== "All" && { key: "city", label: city },
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
    if (type !== "All" && l.listingType !== type) return false;
    if (beds !== "Any" && l.beds < Number(beds)) return false;
    return true;
  });

  return (
    <>
      <div className="jth-listings-hero">
        <div className="jth-listings-hero__bg">
          <Img seed="jacob-truman-listings" w={1600} h={900} className="jth-listings-hero__bg-img" loading="eager" />
        </div>
        <div className="jth-listings-hero__scrim" />
        <div className="jth-listings-hero__content">
          <Eyebrow>Browse</Eyebrow>
          <h1>{filtered.length} {filtered.length === 1 ? "home" : "homes"} across Kenya</h1>
          <p>Verified properties for sale, rent and investment across Nairobi, Kiambu, Eldoret, Kajiado and beyond.</p>
          <div className="jth-hero-badges">
            <span className="jth-hero-badge"><ShieldCheck size={14} /> Verified listings</span>
            <span className="jth-hero-badge"><MapPin size={14} /> Nationwide</span>
            <span className="jth-hero-badge"><Home size={14} /> Sale &amp; Rent</span>
          </div>
        </div>
      </div>

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
      </div>
    </>
  );
}
