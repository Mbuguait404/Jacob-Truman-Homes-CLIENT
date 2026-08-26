import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Loader2, Eye, X, ImageOff, Clock } from "lucide-react";
import { useBlogs } from "../../context/BlogsContext";
import { formatBlogDate } from "../../utils/format";

function PreviewModal({ post, onClose }) {
  if (!post) return null;
  const sections = post.content || post.sections || [];

  return (
    <div className="jth-admin__modal-backdrop" onClick={onClose}>
      <div className="jth-admin__modal jth-admin__modal--wide" onClick={(e) => e.stopPropagation()}>
        <div className="jth-admin__modal-header">
          <h3>{post.title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="jth-admin__modal-body">
          <div className="jth-admin__modal-meta">
            <span className="jth-blog-card__category">{post.category}</span>
            <span>{formatBlogDate(post.publishedAt) || post.date}</span>
            {post.readTime && <span><Clock size={13} /> {post.readTime}</span>}
          </div>
          {post.coverImage && (
            <img className="jth-admin__modal-cover" src={post.coverImage} alt="" />
          )}
          <p className="jth-admin__modal-desc">{post.excerpt}</p>
          <div className="jth-admin__modal-sections">
            {sections.map((s, i) => (
              <div key={i} className="jth-admin__modal-section">
                <h4>{s.heading}</h4>
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogs() {
  const { blogs, deleteBlog, loading } = useBlogs();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleDelete = async (b) => {
    if (!window.confirm(`Delete "${b.title}"? This can't be undone.`)) return;
    try {
      await deleteBlog(b.id);
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="jth-admin__title-row">
        <h1 className="jth-admin__title">Blog posts</h1>
        <button className="jth-btn jth-btn--primary" onClick={() => navigate("/admin/blogs/new")}>
          + Add post
        </button>
      </div>
      <div className="jth-admin__panel">
        {loading ? (
          <div className="jth-admin__loading">
            <Loader2 size={20} className="jth-spin" /> Loading posts…
          </div>
        ) : (
          <>
            <table className="jth-admin__table jth-admin__table--fixed jth-admin__table--desktop">
              <thead>
                <tr>
                  <th style={{ width: "34%" }}>Title</th>
                  <th style={{ width: "16%" }}>Category</th>
                  <th style={{ width: "18%" }}>Date</th>
                  <th style={{ width: "32%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b.id} className={b.hidden ? "jth-admin__row--hidden" : ""}>
                    <td>
                      {b.title}
                      {b.hidden && <span className="jth-admin__hidden-badge">Hidden</span>}
                      {b.featured && <span className="jth-admin__featured-badge">Featured</span>}
                    </td>
                    <td>{b.category}</td>
                    <td>{formatBlogDate(b.publishedAt) || b.date}</td>
                    <td className="jth-admin__row-actions">
                      <button onClick={() => setPreview(b)} title="Preview">
                        <Eye size={12} /> Preview
                      </button>
                      <button onClick={() => navigate(`/admin/blogs/${b.id}/edit`)} title="Edit">
                        <Pencil size={12} /> Edit
                      </button>
                      <button className="jth-admin__row-action--danger" onClick={() => handleDelete(b)} title="Delete">
                        <Trash2 size={12} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan="4">No blog posts yet.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="jth-admin__cards">
              {blogs.map((b) => (
                <div className="jth-admin__card" key={b.id}>
                  <div className="jth-admin__card-row">
                    <div>
                      <div className="jth-admin__card-label">Title</div>
                      <div className="jth-admin__card-value">
                        {b.title}
                        {b.hidden && <span className="jth-admin__hidden-badge">Hidden</span>}
                        {b.featured && <span className="jth-admin__featured-badge">Featured</span>}
                      </div>
                    </div>
                  </div>
                  <div className="jth-admin__card-row">
                    <div>
                      <div className="jth-admin__card-label">Category</div>
                      <div className="jth-admin__card-value--muted">{b.category}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="jth-admin__card-label">Date</div>
                      <div className="jth-admin__card-value--muted">{formatBlogDate(b.publishedAt) || b.date}</div>
                    </div>
                  </div>
                  <div className="jth-admin__card-row">
                    <div className="jth-admin__row-actions">
                      <button onClick={() => setPreview(b)}>
                        <Eye size={12} /> Preview
                      </button>
                      <button onClick={() => navigate(`/admin/blogs/${b.id}/edit`)}>
                        <Pencil size={12} /> Edit
                      </button>
                      <button className="jth-admin__row-action--danger" onClick={() => handleDelete(b)}>
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && <p>No blog posts yet.</p>}
            </div>
          </>
        )}
      </div>
      {preview && <PreviewModal post={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
