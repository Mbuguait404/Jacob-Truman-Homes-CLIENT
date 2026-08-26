import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/client";
import { INITIAL_DEVELOPMENTS } from "../data/developments";

const DevelopmentsContext = createContext(null);

function normalizeDev(doc) {
  return {
    ...doc,
    id: doc._id?.toString?.() || doc._id || doc.id,
  };
}

export function DevelopmentsProvider({ children }) {
  const [developments, setDevelopments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevelopments = async () => {
    setLoading(true);
    try {
      const data = await api.get("/developments?limit=100");
      const fetched = data.developments || [];
      if (fetched.length > 0) {
        setDevelopments(fetched.map(normalizeDev));
        setError(null);
      } else {
        setDevelopments(INITIAL_DEVELOPMENTS);
        setError("No live developments found. Showing sample projects.");
      }
    } catch (err) {
      setDevelopments(INITIAL_DEVELOPMENTS);
      setError("Unable to reach server. Showing sample projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopments();
  }, []);

  const addDevelopment = async (development) => {
    const payload = { ...development };
    delete payload.id;
    const created = await api.post("/developments", payload);
    setDevelopments((prev) => [normalizeDev(created), ...prev]);
    return created;
  };

  const updateDevelopment = async (development) => {
    const mongoId = development._id || development.id;
    const payload = { ...development };
    delete payload.id;
    delete payload._id;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.__v;
    const updated = await api.put(`/developments/${mongoId}`, payload);
    setDevelopments((prev) =>
      prev.map((d) => (d.id === mongoId ? normalizeDev(updated) : d))
    );
    return updated;
  };

  const deleteDevelopment = async (id) => {
    await api.del(`/developments/${id}`);
    setDevelopments((prev) => prev.filter((d) => d.id !== id));
  };

  const visibleDevelopments = developments.filter((d) => !d.hidden);

  const value = {
    developments,
    visibleDevelopments,
    loading,
    error,
    refresh: fetchDevelopments,
    addDevelopment,
    updateDevelopment,
    deleteDevelopment,
  };

  return (
    <DevelopmentsContext.Provider value={value}>
      {children}
    </DevelopmentsContext.Provider>
  );
}

export function useDevelopments() {
  const ctx = useContext(DevelopmentsContext);
  if (!ctx) throw new Error("useDevelopments must be used within a DevelopmentsProvider");
  return ctx;
}
