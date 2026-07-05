import React, { createContext, useContext, useState } from "react";
import { INITIAL_LISTINGS } from "../data/listings";

const ListingsContext = createContext(null);

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(INITIAL_LISTINGS);

  const addListing = (listing) => {
    setListings((prev) => [{ ...listing, id: Date.now() }, ...prev]);
  };

  const updateListing = (listing) => {
    setListings((prev) => prev.map((l) => (l.id === listing.id ? listing : l)));
  };

  const deleteListing = (id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing, updateListing, deleteListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error("useListings must be used within a ListingsProvider");
  return ctx;
}
