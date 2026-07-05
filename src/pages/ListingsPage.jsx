import React from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Eyebrow } from "../components/common/SmallBits";
import ListingCard from "../components/common/ListingCard";
import { useListings } from "../context/ListingsContext";
import { CITIES } from "../data/listings";

export default function ListingsPage() {
  const { listings } = useListings();
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get("city") || "All";
  const type = searchParams.get("type") || "All";
  const beds = searchParams.get("beds") || "Any";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "All" || value === "Any") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const filtered = listings.filter((l) => {
    if (city !== "All" && l.city !== city) return false;
    if (type !== "All" && l.listingType !== type) return false;
    if (beds !== "Any" && l.beds < Number(beds)) return false;
    return true;
  });

  return (
    <div className="jth-page-header-wrap">
      <div className="jth-page-header">
        <Eyebrow>Listings</Eyebrow>
        <h1>{filtered.length} homes across Nairobi &amp; Eldoret</h1>
      </div>

      <div className="jth-filters">
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
        <div className="jth-filters__count">
          <Search size={14} /> {filtered.length} results
        </div>
      </div>

      <div className="jth-listings-grid">
        {filtered.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
        {filtered.length === 0 && (
          <div className="jth-empty">
            No homes match those filters yet. Try widening your search, or tell us what you're after and we'll look for it.
          </div>
        )}
      </div>
    </div>
  );
}
