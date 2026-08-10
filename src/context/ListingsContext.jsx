import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/client";

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
      const normalized = (data.listings || []).map(normalizeListing);
      setListings(normalized);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load listings");
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

  const value = {
    listings,
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
