import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/client";
import { BLOGS } from "../data/blogs";

const BlogsContext = createContext(null);

function normalizeBlog(doc) {
  return {
    ...doc,
    id: doc._id?.toString?.() || doc._id || doc.id,
    content: doc.content || doc.sections || [],
  };
}

export function BlogsProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await api.get("/blogs?limit=100");
      const fetched = data.blogs || [];
      if (fetched.length > 0) {
        setBlogs(fetched.map(normalizeBlog));
        setError(null);
      } else {
        setBlogs(BLOGS.map(normalizeBlog));
        setError("No live posts found. Showing sample articles.");
      }
    } catch (err) {
      setBlogs(BLOGS.map(normalizeBlog));
      setError("Unable to reach server. Showing sample articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addBlog = async (blog) => {
    const payload = { ...blog };
    delete payload.id;
    const created = await api.post("/blogs", payload);
    setBlogs((prev) => [normalizeBlog(created), ...prev]);
    return created;
  };

  const updateBlog = async (blog) => {
    const mongoId = blog._id || blog.id;
    const payload = { ...blog };
    delete payload.id;
    delete payload._id;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.__v;
    const updated = await api.put(`/blogs/${mongoId}`, payload);
    setBlogs((prev) => prev.map((b) => (b.id === mongoId ? normalizeBlog(updated) : b)));
    return updated;
  };

  const deleteBlog = async (id) => {
    await api.del(`/blogs/${id}`);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const visibleBlogs = blogs.filter((b) => !b.hidden);

  const value = {
    blogs,
    visibleBlogs,
    loading,
    error,
    refresh: fetchBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
  };

  return <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>;
}

export function useBlogs() {
  const ctx = useContext(BlogsContext);
  if (!ctx) throw new Error("useBlogs must be used within a BlogsProvider");
  return ctx;
}
