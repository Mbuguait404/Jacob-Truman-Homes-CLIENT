import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import { useBlogs } from "../../context/BlogsContext";
import { api } from "../../api/client";
import { BLOG_CATEGORIES } from "../../data/blogs";

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BLANK_FORM = {
  title: "",
  slug: "",
  category: "Buying",
  author: "Jacob Truman",
  readTime: "5 min read",
  publishedAt: new Date().toISOString().slice(0, 10),
  excerpt: "",
  coverImage: "",
  seed: "",
  content: [{ heading: "", paragraphs: "" }],
  featured: false,
  hidden: false,
};

const blankSection = () => ({ heading: "", paragraphs: "" });

export default function AdminBlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, addBlog, updateBlog } = useBlogs();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const existing = id ? blogs.find((b) => String(b.id) === id) : null;
  const [form, setForm] = useState(
    existing
      ? {
          ...existing,
          publishedAt: (existing.publishedAt || "").slice(0, 10),
          content: Array.isArray(existing.content)
            ? existing.content.map((s) => ({
                heading: s.heading || "",
                paragraphs: Array.isArray(s.paragraphs) ? s.paragraphs.join("\n") : s.paragraphs || "",
              }))
            : [{ heading: "", paragraphs: "" }],
        }
      : BLANK_FORM
  );

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const toggle = (key) => () => setForm({ ...form, [key]: !form[key] });

  const setSection = (idx, key) => (e) =>
    setForm((prev) => {
      const content = prev.content.map((s, i) => (i === idx ? { ...s, [key]: e.target.value } : s));
      return { ...prev, content };
    });
  const addSection = () => setForm((prev) => ({ ...prev, content: [...prev.content, blankSection()] }));
  const removeSection = (idx) =>
    setForm((prev) => ({ ...prev, content: prev.content.filter((_, i) => i !== idx) }));

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const data = new FormData();
      for (const file of files) data.append("images", file);
      const res = await api.upload("/uploads", data);
      const url = (res.urls && res.urls[0]) || res.url;
      if (url) setForm((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
      content: form.content
        .filter((s) => s.heading && s.heading.trim())
        .map((s) => ({
          heading: s.heading.trim(),
          paragraphs: String(s.paragraphs)
            .split("\n")
            .map((p) => p.trim())
            .filter(Boolean),
        })),
    };

    try {
      if (existing) {
        await updateBlog({ ...payload, _id: existing._id, id: existing.id });
      } else {
        await addBlog(payload);
      }
      navigate("/admin/blogs");
    } catch (err) {
      alert(err.message || "Save failed");
    }
  };

  return (
    <div>
      <h1 className="jth-admin__title">{existing ? "Edit post" : "Add a blog post"}</h1>
      <div className="jth-admin__panel jth-admin__form">
        <form onSubmit={handleSubmit}>
          <div className="jth-admin__form-grid">
            <label>
              Title
              <input required value={form.title} onChange={set("title")} />
            </label>
            <label>
              Slug (optional — auto from title)
              <input value={form.slug} onChange={set("slug")} placeholder="my-post-title" />
            </label>
            <label>
              Category
              <select value={form.category} onChange={set("category")}>
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Author
              <input value={form.author} onChange={set("author")} />
            </label>
            <label>
              Read time
              <input value={form.readTime} onChange={set("readTime")} placeholder="5 min read" />
            </label>
            <label>
              Published date
              <input type="date" value={form.publishedAt || ""} onChange={set("publishedAt")} />
            </label>
            <label>
              Image seed (fallback if no upload)
              <input value={form.seed || ""} onChange={set("seed")} placeholder="blog-my-post" />
            </label>
            <label className="jth-admin__toggle">
              <input type="checkbox" checked={form.featured} onChange={toggle("featured")} />
              Featured on blog home
            </label>
            <label className="jth-admin__toggle">
              <input type="checkbox" checked={form.hidden} onChange={toggle("hidden")} />
              Hide from public site
            </label>
          </div>

          <label>
            Excerpt
            <textarea rows={3} required value={form.excerpt} onChange={set("excerpt")} />
          </label>

          <label>
            Cover image
            <div className="jth-admin__image-upload">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="jth-btn jth-btn--outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload size={15} /> {uploading ? "Uploading…" : "Upload cover"}
              </button>
            </div>
            {form.coverImage && (
              <div className="jth-admin__image-previews">
                <div className="jth-admin__image-preview">
                  <img src={form.coverImage} alt="" />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, coverImage: "" }))}
                    title="Remove"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </label>

          <div className="jth-admin__unit-types">
            <div className="jth-admin__unit-types-head">
              <h3>Sections</h3>
              <button type="button" className="jth-btn jth-btn--outline" onClick={addSection}>
                <Plus size={14} /> Add section
              </button>
            </div>
            {form.content.map((s, idx) => (
              <div className="jth-admin__section" key={idx}>
                <div className="jth-admin__section-head">
                  <input
                    placeholder="Section heading"
                    value={s.heading}
                    onChange={setSection(idx, "heading")}
                  />
                  <button
                    type="button"
                    className="jth-admin__unit-remove"
                    onClick={() => removeSection(idx)}
                    aria-label="Remove section"
                    disabled={form.content.length === 1}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="Paragraphs — one per line"
                  value={s.paragraphs}
                  onChange={setSection(idx, "paragraphs")}
                />
              </div>
            ))}
          </div>

          <div className="jth-admin__form-actions">
            <button type="button" className="jth-btn jth-btn--outline" onClick={() => navigate("/admin/blogs")}>
              Cancel
            </button>
            <button type="submit" className="jth-btn jth-btn--primary">
              Save post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
