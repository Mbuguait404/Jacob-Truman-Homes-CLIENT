import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import Img from "../components/common/Img";
import RevealOnScroll from "../components/common/RevealOnScroll";
import FaqSection from "../components/common/FaqSection";
import PageHero from "../components/common/PageHero";
import { BLOGS } from "../data/blogs";
import { BLOG_FAQS } from "../data/faqs";

export default function BlogsPage() {
  const [featured, ...rest] = BLOGS;

  return (
    <>
      <PageHero
        seed="jacob-truman-blogs"
        eyebrow="Insights"
        title="Notes from the Kenyan property market"
        subtitle="Practical guides, market analysis and honest numbers from the team at Jacob Truman Properties — written for buyers, sellers and investors."
        badges={[
          { icon: <Newspaper size={14} />, label: `${BLOGS.length} articles` },
          { icon: <Calendar size={14} />, label: "Updated monthly" },
          { icon: <Clock size={14} />, label: "5 min reads" },
        ]}
      />

      <div className="jth-blogs-wrap">
        <RevealOnScroll delay={80}>
          <section className="jth-blogs">
            <Link className="jth-blog-card jth-blog-card--featured" to={`/blogs/${featured.slug}`}>
              <div className="jth-blog-card__media">
                <Img seed={featured.seed} w={1200} h={700} alt={featured.title} />
              </div>
              <div className="jth-blog-card__body">
                <div className="jth-blog-card__meta">
                  <span className="jth-blog-card__category">{featured.category}</span>
                  <span><Calendar size={13} /> {featured.date}</span>
                  <span><Clock size={13} /> {featured.readTime}</span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="jth-link">
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <section className="jth-blogs-grid">
            {rest.map((b) => (
              <Link className="jth-blog-card" to={`/blogs/${b.slug}`} key={b.slug}>
                <div className="jth-blog-card__media">
                  <Img seed={b.seed} w={900} h={560} alt={b.title} />
                </div>
                <div className="jth-blog-card__body">
                  <div className="jth-blog-card__meta">
                    <span className="jth-blog-card__category">{b.category}</span>
                    <span><Calendar size={13} /> {b.date}</span>
                    <span><Clock size={13} /> {b.readTime}</span>
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.excerpt}</p>
                  <span className="jth-link">
                    Read article <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </section>
        </RevealOnScroll>

        <FaqSection eyebrow="Good to know" title="Questions about buying, selling & investing" items={BLOG_FAQS} />
      </div>
    </>
  );
}
