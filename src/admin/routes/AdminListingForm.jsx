import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListings } from "../../context/ListingsContext";
import { CITIES } from "../../data/listings";

const BLANK_FORM = {
  title: "", city: "Nairobi", neighborhood: "", price: "", listingType: "For Sale",
  propertyType: "Apartment", beds: 2, baths: 1, area: "", status: "Available",
  description: "", amenities: "", seed: "",
};

export default function AdminListingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, addListing, updateListing } = useListings();

  const existing = id ? listings.find((l) => String(l.id) === id) : null;
  const [form, setForm] = useState(
    existing
      ? { ...existing, amenities: existing.amenities.join(", ") }
      : BLANK_FORM
  );

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      id: existing ? existing.id : undefined,
      price: Number(form.price) || 0,
      beds: Number(form.beds) || 0,
      baths: Number(form.baths) || 0,
      area: Number(form.area) || 0,
      featured: existing ? existing.featured : false,
      seed: form.seed || `listing-${Date.now()}`,
      amenities: String(form.amenities)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (existing) updateListing(payload);
    else addListing(payload);

    navigate("/admin/listings");
  };

  return (
    <div>
      <h1 className="jth-admin__title">{existing ? "Edit listing" : "Add a listing"}</h1>
      <div className="jth-admin__panel jth-admin__form">
        <form onSubmit={handleSubmit}>
          <div className="jth-admin__form-grid">
            <label>
              Title
              <input required value={form.title} onChange={set("title")} />
            </label>
            <label>
              City
              <select value={form.city} onChange={set("city")}>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Neighbourhood
              <input value={form.neighborhood} onChange={set("neighborhood")} />
            </label>
            <label>
              Price (KES)
              <input type="number" required value={form.price} onChange={set("price")} />
            </label>
            <label>
              Listing type
              <select value={form.listingType} onChange={set("listingType")}>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </label>
            <label>
              Property type
              <select value={form.propertyType} onChange={set("propertyType")}>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Townhouse</option>
              </select>
            </label>
            <label>
              Bedrooms
              <input type="number" min="0" value={form.beds} onChange={set("beds")} />
            </label>
            <label>
              Bathrooms
              <input type="number" min="0" value={form.baths} onChange={set("baths")} />
            </label>
            <label>
              Area (m²)
              <input type="number" value={form.area} onChange={set("area")} />
            </label>
            <label>
              Status
              <select value={form.status} onChange={set("status")}>
                <option>Available</option>
                <option>Under Offer</option>
                <option>Sold</option>
              </select>
            </label>
          </div>
          <label>
            Description
            <textarea rows={4} value={form.description} onChange={set("description")} />
          </label>
          <label>
            Amenities (comma separated)
            <input value={form.amenities} onChange={set("amenities")} />
          </label>
          <div className="jth-admin__form-actions">
            <button type="button" className="jth-btn jth-btn--outline" onClick={() => navigate("/admin/listings")}>
              Cancel
            </button>
            <button type="submit" className="jth-btn jth-btn--primary">
              Save listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
