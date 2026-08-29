import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE } from "../../config/site";

// Reusable per-page SEO wrapper. Renders <title>, meta description,
// canonical link, Open Graph + Twitter cards, and optional JSON-LD.
export default function Seo({
  title,
  description = SITE.description,
  image = SITE.logo,
  path = "",
  type = "website",
  jsonLd,
  children,
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | Real Estate Across Kenya`;
  const canonical = `${SITE.url}${path}`;
  const ogImage = image?.startsWith("http") ? image : `${SITE.url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {children}
    </Helmet>
  );
}
