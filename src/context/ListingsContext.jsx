import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/client";
import { INITIAL_LISTINGS } from "../data/listings";

const ListingsContext = createContext(null);

function normalizeListing(doc) {
  // MongoDB returns _id; frontend components expect `id`.
  // Keep both so admin API calls can use _id when needed.
  return {
    ...doc,
    id: doc._id?.toString?.() || doc._id || doc.id,
  };
}

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const data = await api.get("/listings?limit=100&sort=-createdAt");
      const fetched = (data.listings || []);
      if (fetched.length > 0) {
        setListings(fetched.map(normalizeListing));
        setError(null);
      } else {
        // API returned empty — fall back to static seed data
        setListings(INITIAL_LISTINGS);
        setError("No live listings found. Showing sample properties.");
      }
    } catch (err) {
      // API unavailable — fall back to static seed data
      setListings(INITIAL_LISTINGS);
      setError("Unable to reach server. Showing sample properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const addListing = async (listing) => {
    const payload = { ...listing };
    delete payload.id; // API will create _id
    const created = await api.post("/listings", payload);
    setListings((prev) => [normalizeListing(created), ...prev]);
    return created;
  };

  const updateListing = async (listing) => {
    const mongoId = listing._id || listing.id;
    const payload = { ...listing };
    delete payload.id;
    delete payload._id;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.__v;
    const updated = await api.put(`/listings/${mongoId}`, payload);
    setListings((prev) =>
      prev.map((l) => (l.id === mongoId ? normalizeListing(updated) : l))
    );
    return updated;
  };

  const deleteListing = async (id) => {
    await api.del(`/listings/${id}`);
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const visibleListings = listings.filter((l) => !l.hidden);

  const value = {
    listings,
    visibleListings,
    loading,
    error,
    refresh: fetchListings,
    addListing,
    updateListing,
    deleteListing,
  };

  return (
    <ListingsContext.Provider value={value}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error("useListings must be used within a ListingsProvider");
  return ctx;
}
