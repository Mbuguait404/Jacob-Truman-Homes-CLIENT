import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, Phone, ArrowRight, User } from "lucide-react";
import Img from "../components/common/Img";
import RevealOnScroll from "../components/common/RevealOnScroll";
import { Eyebrow, WhatsAppIcon } from "../components/common/SmallBits";
import { BLOGS } from "../data/blogs";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOGS.find((b) => b.slug === slug);
  if (!post) return <Navigate to="/blogs" replace />;

  const related = BLOGS.filter((b) => b.slug !== post.slug).slice(0, 2);

  return (
    <div className="jth-blog-post">
      <Link className="jth-back" to="/blogs">
        <ChevronLeft size={16} /> Back to blog
      </Link>

      <div className="jth-blog-post__head">
        <span className="jth-blog-card__category">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="jth-blog-post__meta">
          <span><User size={14} /> Jacob Truman</span>
          <span><Calendar size={14} /> {post.date}</span>
          <span><Clock size={14} /> {post.readTime}</span>
        </div>
      </div>

      <div className="jth-blog-post__hero">
        <Img seed={post.seed} w={1400} h={750} alt={post.title} loading="eager" />
      </div>

      <div className="jth-blog-post__layout">
        <article className="jth-blog-post__body">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </article>

        <aside className="jth-blog-post__aside">
          <div className="jth-blog-post__author">
            <Img seed="owner-jacob" w={96} h={96} className="jth-blog-post__author-img" />
            <Eyebrow>Written by</Eyebrow>
            <h3>Jacob Truman</h3>
            <p>Principal agent and founder of Jacob Truman Properties — 15+ years matching buyers, sellers and tenants across Kenya.</p>
          </div>
          <div className="jth-blog-post__cta">
            <h3>Questions about this topic?</h3>
            <p>We'll give you a straight answer — call or WhatsApp us.</p>
            <a className="jth-btn jth-btn--primary jth-btn--block" href="tel:+254718806741">
              <Phone size={15} /> Call us
            </a>
            <a
              className="jth-btn jth-btn--outline jth-btn--block"
              href="https://wa.me/254718806741?text=Hi%20Jacob%20Truman%20Properties,%20I%20have%20a%20question%20about%20a%20blog%20article."
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={15} /> WhatsApp us
            </a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <RevealOnScroll delay={100}>
          <section className="jth-section">
            <Eyebrow>Keep reading</Eyebrow>
            <h2>More from the blog</h2>
            <div className="jth-blogs-grid">
              {related.map((b) => (
                <Link className="jth-blog-card" to={`/blogs/${b.slug}`} key={b.slug}>
                  <div className="jth-blog-card__media">
                    <Img seed={b.seed} w={900} h={560} alt={b.title} />
                  </div>
                  <div className="jth-blog-card__body">
                    <div className="jth-blog-card__meta">
                      <span className="jth-blog-card__category">{b.category}</span>
                      <span><Calendar size={13} /> {b.date}</span>
                    </div>
                    <h3>{b.title}</h3>
                    <p>{b.excerpt}</p>
                    <span className="jth-link">
                      Read article <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </RevealOnScroll>
      )}
    </div>
  );
}
