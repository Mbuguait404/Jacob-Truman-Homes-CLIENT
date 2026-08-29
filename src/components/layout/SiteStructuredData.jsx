import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE } from "../../config/site";

// Site-wide JSON-LD: real-estate agent / organisation, the website entity
// with a sitelinks search action, and the areas served. Rendered once in
// the public layout so search engines can build rich results.
export default function SiteStructuredData() {
  const agent = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE.url}/#agent`,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    image: `${SITE.url}${SITE.logo}`,
    logo: `${SITE.url}${SITE.logo}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: [
      "Nairobi",
      "Kiambu",
      "Eldoret",
      "Kajiado",
      "Kilimani",
      "Kileleshwa",
      "Lavington",
      "Westlands",
      "Karen",
      "Runda",
      "Kikuyu",
      "Thika",
      "Ruiru",
      "Ngong",
      "Kitengela",
      "Ongata Rongai",
    ].map((name) => ({ "@type": "City", name })),
    sameAs: SITE.sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#agent` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/listings?neighborhood={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(agent)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
    </Helmet>
  );
}
